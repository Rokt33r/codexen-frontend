/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {
    $stateProvider.state('explore.tags', {
      url: '/tags?{page:int}',
      templateUrl: 'states/tags/tags.index.tpl.html',
      controller: 'TagsIndexController as vm',
      params: {
        page: 1
      }
    })
  })
