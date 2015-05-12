/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {


    $stateProvider.state('explore.tags.show', {
      url: '/:tag_name',
      views:{
        'explore-root@explore': {
          templateUrl:'states/explore/explore.tags.show.tpl.html',
          controller: 'ExploreTagsShowController as vm'
        }
      }
    })
  })
  .controller('ExploreTagsShowController', function (Tag, $timeout, $scope, $state) {
    var vm = this

    var tagName = vm.tagName = $state.params.tag_name

    var page = $state.params.page

    vm.isLoaded = false

    Tag.files(tagName, page).success(function (data) {
      vm.files = data.files
      vm.isLoaded = true

      // redirect last page if current page is more than last page
      if (page > vm.files.last_page) $state.go('explore.tags.show', {tag_name:tagName, page: vm.files.last_page})

      vm.currentPage = page

      vm.changePage = function () {
        console.log('Changed : ', vm.currentPage)

        $state.go('explore.files', {page: vm.currentPage})

      }

    }).error(function (data, status) {
      console.log('Error !! ', status)
      console.log('data : ', data)
      if(status == 0) return

      $state.go('notfound')
    })
  })
