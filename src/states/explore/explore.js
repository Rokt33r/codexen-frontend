/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/explore', '/explore/files')
      .when('/explore/', '/explore/files')

    $stateProvider.state('explore', {
      url: '/explore',
      templateUrl: 'states/explore/explore.tpl.html',
      controller:'ExploreController'
    })
  })
  .controller('ExploreController', function($scope, $state){
    $scope.includes = $state.includes
  })
