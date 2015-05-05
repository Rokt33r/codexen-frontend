/* global angular */
angular.module('codexen.states.decks')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/decks', '/decks/mydeck')
      .when('/decks/', '/decks/mydeck')

    $stateProvider.state('decks', {
      url: '/decks',
      template: '<ui-view></ui-view>'
    })

  })
