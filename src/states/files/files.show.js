angular.module('codexen.states.files')
  .config(function ($stateProvider) {
    $stateProvider.state('files.show', {
      url:'/:file_id',
      templateUrl:'states/files/files.show.tpl.html',
      controller:'FilesShowController as vm'
    })
  })
  .controller('FilesShowController', function(File, $state, Auth){
    var vm = this

    var fileId = $state.params.file_id

    vm.isLoaded = false

    File.show(fileId)
      .success(function(data, status){
        vm.file = data.file
        vm.isMine = Auth.getCurrentUser().id === data.file.owner.id
        vm.isLoaded = true
        console.log(data)
      })
      .error(function(data, status){
        console.log('Error !:', status)
        console.log(data)
      })
  })