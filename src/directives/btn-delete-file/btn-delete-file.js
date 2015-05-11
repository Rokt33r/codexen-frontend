/* global angular */
angular.module('codexen.directives')
  .directive('btnDeleteFile', function(File){
    return {
      restrict:'A',
      template:'<i class="fa fa-trash"></i> Delete',
      scope:{
        file:'=btnDeleteFile'
      },
      link:function(scope, element){
        element.on('click', function(){
          element.attr('disabled', 'disabled')

          File.destroy(scope.file.id)
            .success(function(data){
              scope.$emit('fileDeleted', data.file)
            })
            .error(function(data, status){
              console.log('Error! : ', status)
              console.log(data)
              element.attr('disabled', null)
            })
        })
      }
    }
  })