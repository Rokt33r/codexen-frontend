/* global angular */
angular.module('codexen.directives')
  .directive('signinForm', function (Auth, $state) {
    return {
      templateUrl: 'directives/signin-form/signin-form.tpl.html',
      scope: {},
      link: function (scope, element) {
        scope.signin = function () {
          scope.form.email.$setDirty()
          scope.form.password.$setDirty()
          scope.error = null

          if(scope.form.$invalid) {
            scope.error = 'Invalid Form'
            return
          }

          Auth.attempt(scope.email, scope.password, function () {
            if (Auth.hasPendingState()) {
              var pending = Auth.releasePendingState()

              $state.go(pending.state, pending.params)

              return
            }

            $state.go('home')

          }, function (data, status) {
            switch(status){
              case 401:
                scope.error = 'Invalid Credentials'
                scope.password = ''
                return
              case 422:
                scope.error = 'Invalid Request'
                return
            }

            scope.error = data.error

          })
        }

      }
    }
  })
