/* global angular */
angular.module('codexen.states.cards')
  .config(function ($stateProvider) {
    $stateProvider.state('cards.show', {
      url: '/:card_id',
      templateUrl: 'states/cards/cards.show.tpl.html',
      controller: 'CardsShowController',
      controllerAs: 'vm'
    })
  })
  .controller('CardsShowController', function (Card, $state, $scope, Auth) {
    var vm = this

    var cardId = $state.params.card_id

    vm.card = {}

    Card.show(cardId).success(function (data) {
      vm.card = data.card
      vm.isMine = Auth.getCurrentUser().id === vm.card.owner_id
    }).error(function (data, status) {
      if (status === 400) $state.go('notfound')
    })

    $scope.$on('cardDeleted', function (event) {
      event.preventDefault()
      $state.go('users.show', {user_name: vm.card.owner.name})
    })

  })
