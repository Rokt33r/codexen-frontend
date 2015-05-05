/* global angular */
angular.module('codexen.directives')
  .directive('signinForm', function (Auth, $state) {
    return {
      templateUrl: 'directives/signin-form/signin-form.tpl.html',
      scope: {},
      link: function (scope, element) {
        scope.signin = function () {
          scope.error = null

          Auth.attempt(scope.email, scope.password, function () {
            if (Auth.hasPendingState()) {
              var pending = Auth.releasePendingState()

              $state.go(pending.state, pending.params)

              return
            }

            $state.go('home')

          }, function (data) {
            scope.error = data.error

          })
        }

      }
    }
  })
