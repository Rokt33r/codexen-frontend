/* global angular */
angular.module('codexen.directives')
  .directive('userNamecard', function(){
    return {
      scope:{
        user:'='
      },
      templateUrl:'directives/user-namecard/user-namecard.tpl.html',
      link: function (scope, el, attr) {

      }
    }
  })