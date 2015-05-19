/* global angular */
angular.module('codexen.states.users')
  .config(function ($stateProvider) {
    $stateProvider.state('users.show.folder', {
      url: '/:folder_name',
      views:{
        'users-root@users':{
          templateUrl: 'states/users/users.show.folder.tpl.html',
          controller: 'UsersShowFolderController as vm'
        }
      }

    })
  })
  .controller('UsersShowFolderController', function ($state, Folder, $modal) {
    var vm = this

    vm.loaded = false

    var userName = $state.params.user_name
    var folderName = $state.params.folder_name

    Folder.show(userName + '/' + folderName)
      .success(function(data){
        vm.folder = data.folder
        Folder.files(userName + '/' + folderName)
          .success(function(data){
            console.log(data)
            vm.folder.files = data.files
            vm.loaded = true
          })
      })

    vm.addCommand = function(){
      if(!vm.loaded) return
      console.log('add command')

      vm.folder.commands.push({
        command:'',
        file_id:null,
        type:'generator'
      })
    }

    vm.bindFile = function(command){
      console.log(command)

      var modalInstance = $modal.open({
        templateUrl:'states/users/modals/bind-file.tpl.html',
        controller:'BindFileModalController as vm',
        resolve: {
          files: function(){
            return vm.folder.files
          },
          command: function(){
            return command
          }
        }
      })
        .result.then(function(res){
          console.log(res)
        })
    }
  })
