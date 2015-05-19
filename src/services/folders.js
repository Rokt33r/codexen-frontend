/* global angular */
angular.module('codexen.services')
  .factory('Folder', function ($http, apiUrl) {
    var index = function (page) {
      var url = apiUrl + 'folders'

      if (!page) page = 1

      var params = {
        page: page
      }

      return $http.get(url, {
        params: params
      })
    }

    var store = function (params) {
      var url = apiUrl + 'folders'

      return $http.post(url, params)
    }

    var show = function (symbol) {
      var url = apiUrl + 'folders/' + symbol

      return $http.get(url)
    }
    
    var files = function (symbol){
      var url = apiUrl + 'folders/' + symbol + '/files'

      return $http.get(url)
    }

    var update = function (symbol, params) {
      var url = apiUrl + 'folders/' + symbol

      return $http.put(url, params)
    }

    var destroy = function (symbol) {
      var url = apiUrl + 'folders/' + symbol

      return $http.delete(url)
    }

    var fork = function (symbol) {
      var url = apiUrl + 'folders/' + symbol + '/fork'

      return $http.post(url)
    }

    var mobilize = function (symbol, params) {
      var url = apiUrl + 'folders/' + symbol + '/mobilize'

      return $http.post(url, params)
    }

    var star = function (symbol) {
      var url = apiUrl + 'folders/' + symbol + '/star'

      return $http.post(url)
    }

    var unstar = function (symbol) {
      var url = apiUrl + 'folders/' + symbol + '/unstar'

      return $http.post(url)
    }

    return {
      index: index,
      store: store,
      show: show,
      files: files,
      update: update,
      destroy: destroy,
      fork: fork,
      mobilize: mobilize,
      star: star,
      unstar: unstar
    }
  })
