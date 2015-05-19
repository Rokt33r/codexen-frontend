angular.module('codexen.directives')
  .directive('tagList', function(){
    return {
      restrict:'E',
      templateUrl:'directives/tag-list/tag-list.tpl.html',
      scope:{
        tags:'=tags'
      },
      link:function(){

      }
    }
  })