/* global angular */
angular.module('codexen.directives')
  .directive('signupForm', function (Auth, $state) {
    return {
      templateUrl: 'directives/signup-form/signup-form.tpl.html',
      scope: {},
      link: function (scope, element) {
        scope.register = function () {
          console.log('reg fired')
          if (scope.password !== scope.password_confirm) {
            scope.error = "Password doesn't match confirmation."
            return
          }

          Auth.register(scope.email, scope.password, scope.name, scope.profile_name, function () {
            if (Auth.hasPendingState()) {
              var pending = Auth.releasePendingState()
              $state.go(pending.state, pending.params)
              return
            }
            $state.go('home')
          }, function (data, status) {
            if (status === 422) {
              scope.error = 'Invalid Request'
              return
            }

            scope.error = data.error
          })
        }

      }
    }

  })
