/* global angular */
angular.module('codexen.states.explore')
  .config(function ($stateProvider) {
    $stateProvider.state('explore.tags', {
      url: '/tags?{page:int}',
      templateUrl: 'states/explore/explore.tags.tpl.html',
      controller: 'ExploreTagsController as vm',
      params: {
        page: 1
      }
    })
  })
  .controller('ExploreTagsController', function(Tag, $timeout, $scope){
    var vm = this

    //    var watchers

    Tag.index('', 500)
      .success(function (data) {
        console.log(data.tags)
        vm.tags = data.tags

        $timeout(function () {
          //          watchers = $scope.$$watchers
          $scope.$$watchers = null
        }, 0)
      })
      .error(function (data, status) {
        console.log('Error !! ', status)
        console.log('data : ', data)
      })
  })
