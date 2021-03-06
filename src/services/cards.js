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

        var destroy = function(cardId){
            var url = Config.rootUrl + 'cards/' + cardId;

            return $http.delete(url);
        };

        var fork = function(cardId){
            var url = Config.rootUrl + 'cards/' + cardId + '/fork';

            return $http.post(url);
        };

        var mobilize = function(cardId, params){
            var url = Config.rootUrl + 'cards/' + cardId + '/mobilize';

            return $http.post(url, params);
        };

        return {
            store:store,
            show:show,
            update:update,
            destroy:destroy,
            fork:fork,
            mobilize:mobilize
        };
    });