/* global angular */
angular.module('codexen.services')
  .factory('File', function ($http, apiUrl) {
    var index = function (page){
      var url = apiUrl + 'files'

      if (!page) page = 1

      var params = {
        page: page
      }

      return $http.get(url, {
        params: params
      })
    }

    var store = function (params) {
      var url = apiUrl + 'files'

      return $http.post(url, params)
    }

    var show = function (fileId) {
      var url = apiUrl + 'files/' + fileId

      return $http.get(url)
    }

    var update = function (fileId, params) {
      var url = apiUrl + 'files/' + fileId

      return $http.put(url, params)
    }

    var destroy = function (fileId) {
      var url = apiUrl + 'files/' + fileId

      return $http.delete(url)
    }

    var fork = function (fileId) {
      var url = apiUrl + 'files/' + fileId + '/fork'

      return $http.post(url)
    }

    var mobilize = function (fileId, params) {
      var url = apiUrl + 'files/' + fileId + '/mobilize'

      return $http.post(url, params)
    }

    var star = function(fileId){
      var url = apiUrl + 'files/' + fileId + '/star'

      return $http.post(url)
    }

    var unstar = function(fileId){
      var url = apiUrl + 'files/' + fileId + '/unstar'

      return $http.post(url)
    }

    return {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      fork: fork,
      mobilize: mobilize,
      star:star,
      unstar:unstar
    }
  })
