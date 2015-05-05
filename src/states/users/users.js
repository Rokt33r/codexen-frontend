/* global angular */
angular.module('codexen.states.users')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/users', '/users/list')
      .when('/users/', '/users/list')

    $stateProvider.state('users', {
      url: '/users',
      template: '<div ui-view></div>'
    })

  })
