/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {
    $stateProvider.state('explore.users', {
      url: '/users?{page:int}',
      views:{
        'explore-root': {
          templateUrl: 'states/users/users.index.tpl.html',
          controller: 'UsersIndexController as vm'
        }
      },
      params: {
        page: 1
      }
    })
  })
