/* global angular */
angular.module('codexen.directives')
  .directive('btnFollowUser', function (User, $timeout) {

    return {
      restrict: 'A',
      template: '<i class="fa fa-rss"></i> <span ng-bind="label"></span>',
      scope: {
        user: '=btnFollowUser'
      },
      link: function (scope, element) {
        var isLoaded = false
        scope.$on('userFetched', function () {
          reload()
        })

        var reload = function () {
          element.off('mouseenter')
          if (scope.user && scope.user.is_followed) {
            scope.label = 'Following'
            element.addClass('btn-wire-blue active')
              .removeClass('btn-wire-red')
              .removeClass('btn-wire-gray')

            element.one('click', function () {
              User.unfollow(scope.user.name)
                .success(function (data) {
                  scope.user.is_followed = false
                  scope.user.follower_count = data.user.follower_count
                  $timeout(function () {
                    reload()
                  })
                })
            })

            element.on('mouseenter', function () {
              scope.label = 'Unfollow'

              element.removeClass('btn-wire-blue active')
                .addClass('btn-wire-red')
                .removeClass('btn-wire-gray')

              scope.$apply()

              element.one('mouseleave', function () {
                scope.label = 'Following'

                element.addClass('btn-wire-blue active')
                  .removeClass('btn-wire-red')
                  .removeClass('btn-wire-gray')

                scope.$apply()
              })
            })
            $timeout(function () {
              scope.$apply()
            }, 0)
          } else {
            scope.label = 'Follow'

            element.removeClass('btn-wire-blue active')
              .removeClass('btn-wire-red')
              .addClass('btn-wire-gray')

            element.one('click', function () {
              User.follow(scope.user.name)
                .success(function (data) {
                  scope.user.is_followed = true
                  scope.user.follower_count = data.user.follower_count
                  $timeout(function () {
                    reload()
                  })
                })
            })

            element.off('mouseenter')
              .off('mouseleave')
          }
        }

        if (!isLoaded) {
          reload()
          isLoaded = true
        }
      }
    }
  })
