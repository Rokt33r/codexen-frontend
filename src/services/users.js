/* global angular */
angular.module('codexen.services')
  .factory('User', function ($http, apiUrl) {
    var index = function (page, relations) {
      var url = apiUrl + 'users'
      console.log('request to ', url)

      if (!page) page = 1

      var params = {
        page: page
      }

      if (!(relations == null)) params.relations = relations

      return $http.get(url, {
        params: params
      })
    }

    var show = function (user_name) {
      var url = apiUrl + 'users/' + user_name

      return $http.get(url)

    }

    var folders = function (user_name){
      var url = apiUrl + 'users/' + user_name + '/folders'

      return $http.get(url)
    }

    var files = function (user_name){
      var url = apiUrl + 'users/' + user_name + '/files'

      return $http.get(url)
    }

    var follow = function (user_name) {
      var url = apiUrl + 'users/' + user_name + '/follow'

      return $http.post(url)

    }

    var unfollow = function (user_name) {
      var url = apiUrl + 'users/' + user_name + '/follow'

      return $http.delete(url)

    }

    var following = function (user_name) {
      var url = apiUrl + 'users/' + user_name + '/following'

      return $http.get(url)
    }

    var followed = function (user_name) {
      var url = apiUrl + 'users/' + user_name + '/followed'

      return $http.get(url)
    }

    return {
      index: index,
      show: show,
      folders: folders,
      files: files,
      follow: follow,
      unfollow: unfollow,
      following: following,
      followed: followed
    }

  })
