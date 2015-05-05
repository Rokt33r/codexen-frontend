/* global angular */
angular.module('codexen.states.decks')
  .config(function ($stateProvider) {
    $stateProvider.state('decks.show', {
      url: '/:deck_label',
      templateUrl: 'states/decks/decks.show.tpl.html',
      controller: 'DecksShowController as vm'
    })
  })
  .controller('DecksShowController', function ($state, Deck, $modal, $scope, $timeout, $filter) {
    var vm = this

    // init
    var deckLabel = $state.params.deck_label
    var isFetched = false

    var attachCard = function (cards, fetchedCards) {
      cards.map(function (card) {
        if (angular.isArray(card.cards)) attachCard(card.cards, fetchedCards)

        if (!card.card_id) return

        fetchedCards.forEach(function (aCard) {
          if (aCard.id === card.card_id) card.card = aCard
        })
      })
    }

    Deck.show(deckLabel)
      .success(function (data) {
        vm.deck = data.deck

        attachCard(vm.deck.cards, data.cards)

        $timeout(function () {
          isFetched = true
        }, 0)

      })
      .error(function (data, status) {
        console.log('Error !! ', status)
        console.log('data : ', data)

        $state.go('notfound')
      })

    // methods
    vm.addGenerator = function () {
      vm.deck.cards.push({
        type: 'generator',
        command: '',
        card_id: 0,
        override: ''
      })
      vm.emitDeckChanged()
    }

    vm.addRunner = function () {
      vm.deck.cards.push({
        type: 'runner',
        command: '',
        card_id: 0,
        override: ''
      })
      vm.emitDeckChanged()
    }

    vm.addGroup = function () {
      vm.deck.cards.push({
        type: 'group',
        command: '',
        label: '',
        cards: []
      })
      vm.emitDeckChanged()
    }

    vm.selectCard = function (card) {
      console.log(card)
      $modal.open({
        templateUrl: 'states/decks/modal-select-card.tpl.html',
        resolve: {
          targetCard: function () {
            return card
          }
        },
        controller: function ($modalInstance, $scope, targetCard, User, Auth) {
          var currentUser = Auth.getCurrentUser()

          // init
          User.cards(currentUser.name)
            .success(function (data) {
              $scope.searchedCards = data.cards
              console.log('found cards', data.cards)
            })
            .error(function (data, status) {
              console.log('Error !! ', status)
              console.log('data : ', data)
            })

          // method
          $scope.searchCards = function () {
            User.cards(currentUser.name, 1, $scope.search)
              .success(function (data) {
                $scope.searchedCards = data.cards
                console.log('found cards', data.cards)
              })
              .error(function (data, status) {
                console.log('Error !! ', status)
                console.log('data : ', data)
              })
          }

          $scope.selectCard = function (selectedCard) {
            vm.emitDeckChanged()
            $modalInstance.close(selectedCard)
          }

          $scope.cancel = function () {
            $modalInstance.dismiss()
          }
        }
      }).result.then(function (selectedCard) {
        card.card_id = selectedCard.id
        card.card = selectedCard
      })
    }

    vm.showPreview = function (card) {
      $modal.open({
        templateUrl: 'states/decks/modal-preview-card.tpl.html',
        resolve: {
          targetCard: function () {
            return card
          }
        },
        controller: function ($scope, targetCard, Card, $modalInstance, $state) {
          Card.show(targetCard.card_id)
            .success(function (data) {
              $scope.card = data.card
            }).error(function (data, status) {
            console.log('Error !! ', status)
            console.log('data : ', data)
          })

          $scope.edit = function () {
            $state.go('cards.edit', {card_id: $scope.card.id})
            $modalInstance.dismiss()
          }

          $scope.cancel = function () {
            $modalInstance.dismiss()
          }
        }
      })
    }

    vm.deleteCard = function (index) {
      vm.deck.cards.splice(index, 1)
    }

    vm.toJson = JSON.stringify

    // debouncing methods for auto-saving
    vm.emitDeckChanged = function () {
      $scope.$emit('deckChanged')
    }

    var promise = null

    var isQueued = false
    var isSaving = false

    var queueSaving = function () {
      if (isSaving) {
        isQueued = true
        return
      }

      if (promise) {
        $timeout.cancel(promise)
        promise = null
      }
      vm.message = 'Saving queued.'

      promise = $timeout(function () {
        save()
      }, 500)
    }

    var save = function () {
      isSaving = true

      vm.message = 'On saving...'

      var params = {
        memo: vm.deck.memo,
        cards: $filter('deck')(vm.deck.cards)
      }
      Deck.update(deckLabel, params)
        .success(function (data) {
          isSaving = false

          vm.message = '<i class="fa fa-check"></i> Successfully saved at ' + (new Date()).toString()

          if (isQueued) {
            isQueued = false
            queueSaving()
          }
        })
        .error(function (data, status) {
          console.log('Errror ! ', status)
          console.log(data)
          vm.message = '<i class="fa fa-exclamation"></i> Failed to saving : ' + status
          $timeout(function () {
            queueSaving()
          }, 3000)

        })
    }

    $scope.$on('deckChanged', function (e) {
      e.preventDefault()
      if (!isFetched) return
      queueSaving()
    })

    $scope.$watch('vm.deck.memo', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        vm.emitDeckChanged()
      }
    })
  })
  .filter('deck', function () {
    return function (cards) {
      if (!angular.isArray(cards)) return []
      return cards.map(function (card) {
        switch (card.type) {
          case 'generator':
            return {
              type: card.type,
              command: card.command,
              card_id: card.card_id,
              filename: card.filename,
              isAddonOpen: card.isAddonOpen
            }
          case 'runner':
            return {
              type: card.type,
              command: card.command,
              card_id: card.card_id,
              runtime: card.runtime,
              isAddonOpen: card.isAddonOpen
            }
          case 'group':
            if (!angular.isArray(card.cards)) return []
            var childCards = card.cards.map(function (childCard) {
              switch (childCard.type) {
                case 'generator':
                  return {
                    type: childCard.type,
                    card_id: childCard.card_id,
                    filename: childCard.filename,
                    isAddonOpen: childCard.isAddonOpen
                  }
                case 'runner':
                  return {
                    type: childCard.type,
                    card_id: childCard.card_id,
                    runtime: childCard.runtime,
                    isAddonOpen: childCard.isAddonOpen
                  }
              }
            })
            return {
              type: card.type,
              command: card.command,
              label: card.label,
              cards: childCards,
              isAddonOpen: card.isAddonOpen
            }
        }
      })
    }
  })
