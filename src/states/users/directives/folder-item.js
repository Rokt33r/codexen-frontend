/* global angular */
angular.module('codexen.states.users')
  .directive('folderItem', function(){
    return {
      restrict:'E',
      templateUrl:'states/users/directives/folder-item.tpl.html'
    }
  })