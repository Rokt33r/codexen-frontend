/* global angular */
angular.module('codexen.states.auth')
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .when('/auth', '/explore/signup')
      .when('/auth/', '/explore/signup')

    $stateProvider.state('auth', {
      url: '/auth',
      templateUrl: 'states/auth/auth.tpl.html'
    })
  })