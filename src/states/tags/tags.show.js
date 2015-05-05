/* global angular */
angular.module('codexen.states.tags')
  .config(function ($stateProvider) {
    $stateProvider.state('tags.show', {
      url: '/:tag_name?{page:int}',
      templateUrl: 'states/tags/tags.show.tpl.html',
      controller: 'TagsShowController as vm',
      params: {
        page: 1
      }
    })
  })
  .controller('TagsShowController', function ($state, Tag, $scope, $timeout, $window) {
    var vm = this

    var tagName = $state.params.tag_name
    var page = $state.params.page

    vm.isLoaded = false

    Tag.show(tagName).success(function (data) {
      console.log(data.tag)
      vm.tag = data.tag

      loadCards()

    }).error(function (data, status) {
      console.log('Error !! ', status)
      console.log('data : ', data)

      $state.go('notfound')
    })

    vm.searchTags = function () {
      Tag.index(vm.search, 30)
        .success(function (data) {
          console.log(data.tags)
          vm.searchedTags = data.tags
        })
        .error(function (data, status) {
          console.log('Error !! ', status)
          console.log('data : ', data)
        })
    }

    vm.searchTags()

    var loadCards = function () {
      var currentOffset = $window.pageYOffset
      Tag.cards(tagName, page).success(function (data) {
        vm.cards = data.cards
        vm.isLoaded = true

        // redirect last page if current page is more than last page
        if (page > vm.cards.last_page) $state.go('tags.show', {tag_name: tagName, page: vm.cards.last_page})

        vm.currentPage = page

        vm.changePage = function () {
          console.log('Changed : ', vm.currentPage)

          $state.go('tags.show', {tag_name: tagName, page: vm.currentPage})

        }

        $timeout(function () {
          $window.scrollTo(0, currentOffset)
        }, 0)
      })
    }

    $scope.$on('cardDeleted', function (event, card) {
      event.preventDefault()
      loadCards()
    })

  })
