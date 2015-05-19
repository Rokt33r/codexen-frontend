/* global angular */
angular.module('codexen.states.users')
  .config(function ($stateProvider) {
    $stateProvider.state('users.index', {
      url: '/list?{page:int}',
      views:{
        'users-root':{
          templateUrl: 'states/users/users.index.tpl.html',
          controller: 'UsersIndexController as vm'
        }
      },
      params: {
        page: 1
      }
    })
  })
  .controller('UsersIndexController', function (User, $state) {
    var vm = this

    var page = $state.params.page

    User.index(page).success(function (data) {
      vm.users = data.users

      vm.currentPage = page

      vm.changePage = function () {
        console.log('Changed : ', vm.currentPage)

        $state.go('explore.users', {page: vm.currentPage})

      }

    })

  })
