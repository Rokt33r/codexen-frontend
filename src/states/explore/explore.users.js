/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {
    $stateProvider.state('explore.users', {
      url: '/users?{page:int}',
      views:{
        'explore-root': {
          templateUrl: 'states/explore/explore.users.tpl.html',
          controller: 'ExploreUsersController as vm'
        }
      },
      params: {
        page: 1
      }
    })
  })
  .controller('ExploreUsersController', function($state, User, Auth){
    var vm = this

    var page = $state.params.page

    var relations = {
      files:{size:2},
      folders:{size:2}
    }

    var currentUser = Auth.getCurrentUser()

    vm.isMe = function(user){
      return currentUser.id == user.id
    }

    User.index(page, relations).success(function (data) {
      vm.users = data.users

      vm.currentPage = page

      vm.changePage = function () {
        console.log('Changed : ', vm.currentPage)

        $state.go('explore.users', {page: vm.currentPage})
      }
    })
  })
