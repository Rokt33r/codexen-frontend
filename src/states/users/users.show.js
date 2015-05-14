/* global angular */
angular.module('codexen.states.users')
  .config(function ($stateProvider) {
    $stateProvider.state('users.show', {
      url: '/:user_name?{page:int}',
      templateUrl: 'states/users/users.show.tpl.html',
      controller: 'UsersShowController',
      controllerAs: 'vm',
      params: {
        page: 1
      }

    })
  })
  .controller('UsersShowController', function (User, $state, $scope, $window, $timeout, Auth) {
    var vm = this

    var page = $state.params.page

    var userName = $state.params.user_name

    vm.isLoaded = false

    vm.isMe = false

    User.show(userName).success(function (data) {
      console.log(data.user)
      vm.user = data.user

      vm.isMe = Auth.getCurrentUser() ? Auth.getCurrentUser().id === vm.user.id : false

      loadCards()

      $timeout(function () {
        $scope.$broadcast('userFetched')
      }, 0)

    }).error(function (data, status) {
      console.log('Error !! ', status)
      console.log('data : ', data)

      $state.go('notfound')
    })

    var loadCards = function () {
    }

    $scope.$on('cardDeleted', function (event, card) {
      event.preventDefault()
      loadCards()
    })

  })
