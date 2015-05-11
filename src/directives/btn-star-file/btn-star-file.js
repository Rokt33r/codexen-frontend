/* global angular */
angular.module('codexen.directives')
  .directive('btnStarFile', function (File, $modal, $timeout, $state) {
    return {
      restrict: 'A',
      template: '<i class="fa fa-star"></i> <span ng-bind="btnLabel"></span> <samall ng-bind="file.star_count"></small>',
      scope: {
        file: '=btnStarFile'
      },
      link: function (scope, element) {
        var setUp = function () {
          element.attr('disabled', null)

          if (scope.file.is_starred) {
            scope.btnLabel = 'Starred'
            element.addClass('active')

            element.one('click', function () {
              element.attr('disabled', 'disabled')

              scope.btnLabel = 'Unstarring...'

              File.unstar(scope.file.id)
                .success(function (data, status) {
                  scope.file.star_count = data.file.star_count
                  scope.file.is_starred = data.file.is_starred
                  setUp()
                })
                .error(function (data, status) {
                  console.log('Error! : ', status)
                  console.log(data)

                  setUp()
                })
            })
          } else {
            scope.btnLabel = 'Star'
            element.removeClass('active')

            element.one('click', function () {
              element.attr('disabled', 'disabled')

              scope.btnLabel = 'Starring...'

              File.star(scope.file.id)
                .success(function (data, status) {
                  scope.file.star_count = data.file.star_count
                  scope.file.is_starred = data.file.is_starred
                  setUp()
                })
                .error(function (data, status) {
                  console.log('Error! : ', status)
                  console.log(data)

                  setUp()
                })
            })
          }
        }

        setUp()
      }
    }
  })
