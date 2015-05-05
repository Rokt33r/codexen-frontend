/* global angular */
angular.module('codexen.states.tags')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/tags', '/tags/list')
      .when('/tags/', '/tags/list')

    $stateProvider.state('tags', {
      url: '/tags',
      template: '<ui-view></ui-view>'
    })
  })
