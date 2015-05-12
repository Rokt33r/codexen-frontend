/* global angular */
angular.module('codexen.services')
  .factory('Tag', function (apiUrl, $http) {
    var index = function (search, limit) {
      var url = apiUrl + 'tags'

      var params = {}

      if (angular.isString(search)) params.search = search
      params.limit = limit

      return $http.get(url, {params: params})
    }

    var show = function (tag_name) {
      var url = apiUrl + 'tags/' + tag_name

      return $http.get(url)
    }

    var files = function (tag_name, page){
      var url = apiUrl + 'tags/' + tag_name + '/files'

      if (!page) page = 1

      var params = {
        page: page
      }

      return $http.get(url, {
        params: params
      })
    }

    return {
      index: index,
      show: show,
      files: files
    }

  })
