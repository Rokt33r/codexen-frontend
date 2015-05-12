/* global angular */
angular.module('codexen.states.files')
  .config(function ($stateProvider){
    $stateProvider.state('files.edit', {
      url:'/:file_id/edit',
      templateUrl:'states/files/files.edit.tpl.html',
      controller:'FilesEditController as vm',
      data: {
        auth: true
      }
    })
  })
  .controller('FilesEditController', function(File, $state, Auth, User, Tag, $scope){
    var vm = this

    var fileId = $state.params.file_id

    vm.isLoaded = false

    vm.tags = []

    vm.foldersLoaded = false

    File.show(fileId)
      .success(function(data, status){
        vm.file = data.file
        vm.tags = vm.file.tags.map(function(tag){
          return tag.name
        })

        console.log(vm.file.folder.name)
        User.folders(Auth.getCurrentUser().name)
          .success(function(data, status){
            vm.folders = data.folders
            vm.targetFolder = vm.folders.data.filter(function(folder){
              return folder.name == vm.file.folder.name
            })[0]
            vm.foldersLoaded = true
          })
      })


    vm.save = function(){
      console.log('save called')

      File.update(fileId, {
        name:vm.file.name,
        content:vm.file.content,
        description:vm.file.description,
        tags:vm.tags
      })
        .success(function(){
          $state.go('files.show', {file_id:fileId})
        })
    }

    vm.refreshTags = function (search) {
      search = search.replace(/[^\w]/g, '')

      return Tag.index(search)
        .success(function (data) {
          var tagNames = data.tags.data.map(function(tag){
            return tag.name
          })
          console.log(tagNames)

          vm.searchedTags = tagNames
        })
    }

    vm.checkTag = function($item, $model){
      console.log('item : ', $item)
      console.log('model : ', $model)

      vm.tags = vm.tags.filter(function(tag){
        return tag.match(/^[A-Za-z0-9\_]+$/)
      })
    }
  })