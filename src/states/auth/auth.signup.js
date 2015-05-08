/* global angular */
angular.module('codexen.states.auth')
  .config(function($stateProvider){
    $stateProvider.state('auth.signup', {
      url:'/signup',
      templateUrl:'states/auth/auth.signup.tpl.html',
      controller:'SignupController as vm',
      data: {
        guest: true
      }
    })
  })
  .controller('SignupController', function(){})