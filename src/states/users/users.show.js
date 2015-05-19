/* global angular */
angular.module('codexen.states.users')
  .config(function ($stateProvider) {
    $stateProvider.state('users.show', {
      url: '/:user_name',
      views:{
        'users-root@users':{
          templateUrl: 'states/users/users.show.tpl.html',
          controller: 'UsersShowController as vm'
        }
      }
    })
  })
  .controller('UsersShowController', function (User, $state, $scope, $window, $timeout, Auth) {
    var vm = this

    var userName = $state.params.user_name

    console.log($state.params)

    vm.isLoaded = false

    vm.isMe = false

    User.show(userName).success(function (data) {
      vm.user = data.user

      vm.isMe = Auth.getCurrentUser() ? Auth.getCurrentUser().id === vm.user.id : false

      loadFolders()

      $timeout(function () {
        $scope.$broadcast('userFetched')
      }, 0)

    }).error(function (data, status) {
      $state.go('notfound')
    })

    var loadFolders = function(){
      User.folders(userName).success(function(data){
        vm.folders = data.folders
      })
    }

    $scope.$on('folderDeleted', function (event, card) {
      event.preventDefault()
      loadFolders()
    })

  })
