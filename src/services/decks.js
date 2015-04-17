angular.module('codexen.services.decks')
    .factory('Deck', function(Config, $http){

        var show = function(deck_label){
            var url = Config.rootUrl + 'decks/' + deck_label;

            return $http.get(url);
        };

        var update = function(deck_label, params){
            var url = Config.rootUrl + 'decks/' + deck_label;

            return $http.put(url, params);
        };

        return {
            show:show,
            update:update
        };
    });