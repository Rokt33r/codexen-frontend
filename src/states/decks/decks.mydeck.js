/* global angular */
angular.module('codexen.states.decks')
  .config(function ($stateProvider) {
    $stateProvider.state('decks.mydeck', {
      url: '/mydeck',
      controller: function (Auth, $state) {
        var currentUser = Auth.getCurrentUser()
        $state.go('decks.show', {deck_label: currentUser.name})
      },
      data: {
        auth: true
      }
    })
  })
