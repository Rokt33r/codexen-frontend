/* global angular */
angular.module('codexen.core.config')
  .config(function ($urlRouterProvider, jwtInterceptorProvider, $httpProvider, uiSelectConfig, $windowProvider) {
    $urlRouterProvider
      .when('', '/')
      .otherwise('/notfound')

    $urlRouterProvider.deferIntercept()

    var window = $windowProvider.$get()

    jwtInterceptorProvider.tokenGetter = [function () {
      return window.localStorage.getItem('id_token')
    }]

    $httpProvider.interceptors.push('jwtInterceptor')
    $httpProvider.interceptors.push(function() {
      return {

        'response': function(response) {
          if(response.status !== 200){
            console.log('Error !:',response.status)
            console.log('Error !:',response.body)

          }
          return response
        }
      }
    })

  })
  .factory('apiUrl', function (env) {
    var rootUrl
    switch (env) {
      case 'build':
        rootUrl = 'http://localhost:8000/'
        break
      case 'dist':
        rootUrl = 'http://api.codexen.org/v0/'
        break
    }
    return rootUrl
  })
