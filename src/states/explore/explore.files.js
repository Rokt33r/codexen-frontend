/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {
    $stateProvider.state('explore.files', {
      url: '/files?{page:int}',
      templateUrl: 'states/explore/explore.files.tpl.html',
      controller: 'ExploreFilesController as vm',
      params: {
        page: 1
      }
    })
  })
  .controller('ExploreFilesController', function($state, File, $scope, $timeout, $window){
      var vm = this

      var page = $state.params.page

      vm.isLoaded = false

      File.index(page).success(function (data) {
        vm.files = data.files
        vm.isLoaded = true

        // redirect last page if current page is more than last page
        if (page > vm.files.last_page) $state.go('explore.files', {page: vm.files.last_page})

        vm.currentPage = page

        vm.changePage = function () {
          console.log('Changed : ', vm.currentPage)

          $state.go('explore.files', {page: vm.currentPage})

        }

      }).error(function (data, status) {
        console.log('Error !! ', status)
        console.log('data : ', data)

        $state.go('notfound')
      })

      $scope.$on('cardDeleted', function (event, card) {
        event.preventDefault()
        loadCards()
      })

  })
