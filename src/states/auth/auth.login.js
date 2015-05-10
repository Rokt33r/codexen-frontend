/* global angular */
angular.module('codexen.states.auth')
  .config(function ($stateProvider) {
    $stateProvider.state('auth.login', {
      url: '/login',
      templateUrl: 'states/auth/auth.login.tpl.html',
      controller: 'LoginController as vm',
      data: {
        guest: true
      }
    })
  })
  .controller('LoginController', function () {})
