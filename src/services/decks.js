/* global angular */
angular.module('codexen.services')
  .factory('Deck', function (apiUrl, $http) {
    var show = function (deck_label) {
      var url = apiUrl + 'decks/' + deck_label

      return $http.get(url)
    }

    var update = function (deck_label, params) {
      var url = apiUrl + 'decks/' + deck_label

      return $http.put(url, params)
    }

    return {
      show: show,
      update: update
    }
  })
