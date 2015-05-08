/* global angular */
angular.module('codexen.core.auth')
  .factory('Auth', function ($http, apiUrl, $rootScope, $state, $window) {
    /**
     * Auth state
     * states [idle, auth, user, guest]
     * @type {String}
     */
    var state = 'idle'

    var currentUser = null

    var authenticateToken = function (cbSuccess, cbError) {
      console.log('authenticating token')
      state = 'auth'
      $rootScope.$broadcast('StartAuthenticating')

      var url = apiUrl + 'auth/user'

      return $http.get(url).success(function (data) {
        console.log(data.user)
        state = 'user'
        currentUser = data.user

        $rootScope.$broadcast('EndAuthenticating', currentUser)
        angular.isFunction(cbSuccess) ? cbSuccess(data) : null
      }).error(function (data, status) {
        console.log(data.error)
        currentUser = null
        state = 'guest'

        $rootScope.$broadcast('EndAuthenticating', null)
        angular.isFunction(cbError) ? cbError(data, status) : null
      })
    }

    var attempt = function (email, password, cbSuccess, cbError) {
      var url = apiUrl + 'auth/attempt'

      return $http.post(url, {
        email: email,
        password: password
      })
        .success(function (data) {
          console.log('Success')
          $window.localStorage.setItem('id_token', data.token)
          authenticateToken(cbSuccess, cbError)
        })
        .error(function (data, status) {
          console.log('Error occurs :' + status)
          angular.isFunction(cbError) ? cbError(data, status) : null
        })
    }

    var register = function (email, password, name, profile_name, cbSuccess, cbError){
      var url = apiUrl + 'auth/register'

      return $http.post(url, {
        email:email,
        password:password,
        name:name,
        profile_name:profile_name
      })
        .success(function (data) {
          console.log('Success')
          $window.localStorage.setItem('id_token', data.token)
          authenticateToken(cbSuccess, cbError)
        })
        .error(function (data, status) {
          console.log('Error occurs :' + status)
          angular.isFunction(cbError) ? cbError(data, status) : null
        })
    }

    var signOut = function () {
      console.log('Sign out')
      $window.localStorage.removeItem('id_token')
      currentUser = null
      state = 'guest'
      $rootScope.$broadcast('EndAuthenticating', null)
      $state.go('welcome')
    }

    var isPending = false
    var pendingState = null
    var pendingParams = null

    var setPendingState = function (state, params) {
      isPending = true
      pendingState = state
      pendingParams = params
    }
    var releasePendingState = function () {
      var result = {
        state: pendingState,
        params: pendingParams
      }

      isPending = false
      pendingState = null
      pendingParams = null

      return result
    }
    var hasPendingState = function () {
      return isPending
    }

    return {
      authenticateToken: authenticateToken,
      attempt: attempt,
      register: register,
      signOut: signOut,
      getAuthState: function () {
        return state
      },
      getCurrentUser: function () {
        return currentUser
      },
      setPendingState: setPendingState,
      releasePendingState: releasePendingState,
      hasPendingState: hasPendingState
    }
  })
