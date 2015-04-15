angular.module('codexen.services.cards')
    .factory('Card', function($http, Config){

        var store = function(params){
            var url = Config.rootUrl + 'cards';

            return $http.post(url, params);
        };

        var show = function(cardId) {
            var url = Config.rootUrl + 'cards/' + cardId;

            return $http.get(url);
        };

        var update = function(cardId, params){
            var url = Config.rootUrl + 'cards/' + cardId;

            return $http.put(url, params);
        };

        return {
            store:store,
            show:show,
            update:update
        }
    });