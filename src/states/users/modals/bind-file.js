/* global angular */
angular.module('codexen.states.users')
  .controller('BindFileModalController', function($modalInstance, files){
    var vm = this

    vm.files = files

    vm.selectFile = function(){

    }

    vm.cancel = function (){
      $modalInstance.dismiss()
    }
  })