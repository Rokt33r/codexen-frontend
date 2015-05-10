/* global angular */
angular.module('codexen.directives')
  .directive('fileItem', function (Auth) {
    return {
      restrict:'E',
      templateUrl: 'directives/file-item/file-item.tpl.html',
      scope: {
        file: '='
      },
      link: function (scope) {
        //        var watchers
        scope.$watch('file', function () {
          //          watchers = scope.$$watchers
          scope.$$watchers = []
        })

        scope.isMine = Auth.getCurrentUser().id === scope.file.owner_id

      }
    }
  })
