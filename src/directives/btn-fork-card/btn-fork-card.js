/* global angular */
angular.module('codexen.directives')
  .directive('btnForkCard', function (Card, $modal, $timeout, $state) {
    return {
      restrict: 'A',
      template: '<i class="fa fa-code-fork"></i> <span ng-bind="btnLabel"></span>',
      scope: {
        card: '=btnForkCard'
      },
      link: function (scope, element) {
        scope.btnLabel = 'Fork'
        var isForked = false
        scope.newCard = null

        var openForkModal = function () {
          $modal.open({
            templateUrl: 'directives/btn-fork-card/modal-fork-card.tpl.html',
            resolve: {
              card: function () {
                return scope.newCard
              }
            },
            controller: function ($modalInstance, card, $scope) {
              $scope.card = card

              $scope.edit = function () {
                $state.go('cards.edit', {card_id: card.id})
                $modalInstance.dismiss()
              }

              $scope.undo = function () {
                Card.destroy(card.id)
                  .success(function (data) {
                    $modalInstance.close({type: 'undo'})
                  })
                  .error(function (data, status) {
                    console.log('Error ! :', status)
                    console.log(data)
                  })
              }

              $scope.cancel = function () {
                $modalInstance.dismiss()
              }

              $scope.codemirrorLoaded = function (editor) {
                $timeout(function () {
                  editor.refresh()
                }, 0)
              }

              $scope.$on('cardMobilized', function () {
                $modalInstance.dismiss()
              })
            }
          }).result.then(function (result) {
            if (result.type === 'undo') {
              scope.btnLabel = 'Fork'
              scope.newCard = null
              isForked = false
            }
          })
        }

        element.on('click', function () {
          if (!isForked) {
            element.attr('disabled', 'disabled')
            scope.btnLabel = 'on Forking...'

            Card.fork(scope.card.id)
              .success(function (data) {
                scope.newCard = data.card
                isForked = true
                element.attr('disabled', null)
                scope.btnLabel = 'Already Forked'

                openForkModal()
              })
              .error(function (data, status) {
                console.log('Error ! :', status)
                console.log(data)

                element.attr('disabled', null)
                scope.btnLabel = 'Failed to Fork'
              })
          } else {
            openForkModal()
          }
        })
      }
    }
  })
