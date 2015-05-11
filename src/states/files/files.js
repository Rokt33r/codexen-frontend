/* global angular */
angular.module('codexen.states.files')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/files', '/explore/files')
      .when('/files/', '/explore/files')

    $stateProvider.state('files', {
      url: '/files',
      template:'<div ui-view></div>'
    })
  })
