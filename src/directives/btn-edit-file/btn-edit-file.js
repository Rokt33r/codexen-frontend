angular.module('codexen.directives')
  .directive('btnEditFile', function($state){
    return {
      restrict:'A',
      template:'<i class="fa fa-edit"></i> Edit',
      scope:{
        file:'=btnEditFile'
      },
      link:function(scope, el){
        el.on('click', function(){
          $state.go('files.edit', {file_id:scope.file.id})
        })
      }
    }
  })
