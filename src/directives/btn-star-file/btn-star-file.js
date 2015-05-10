/* global angular */
angular.module('codexen.directives')
  .directive('btnStarFile', function (File, $modal, $timeout, $state) {
    return {
      restrict: 'A',
      template: '<i class="fa fa-star"></i> <span ng-bind="btnLabel"></span> <samall ng-bind="file.star_count"></small>',
      scope: {
        file: '=btnStarFile'
      },
      link: function (scope, element) {
        scope.btnLabel = 'Star'
        var isStarred = false
        scope.newFile = null
      }
    }
  })
