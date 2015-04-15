angular.module('codexen.services.cards')
    .factory('Card', function($http, Config){

        var store = function(params){
            var url = Config.rootUrl + 'cards';

            return $http.post(url, params);
        };

        return {
            store:store
        }
    });