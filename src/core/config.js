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

    uiSelectConfig.theme = 'bootstrap'
    uiSelectConfig.resetSearchInput = true
    uiSelectConfig.appendToBody = true
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
