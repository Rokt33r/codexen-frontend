/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/explore', '/explore/tags')
      .when('/explore/', '/explore/tags')

    $stateProvider.state('explore', {
      url: '/explore',
      templateUrl: 'states/explore/explore.tpl.html'
    })
  })
