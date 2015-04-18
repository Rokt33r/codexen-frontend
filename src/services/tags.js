angular.module('codexen.services.tags')
    .factory('Tag', function(Config, $http){

        var index = function(search, limit){

            var url = Config.rootUrl + 'tags';

            var params = {};

            if(angular.isString(search)) params.search = search;
            params.limit = limit;

            return $http.get(url, {params:params});
        };

        var show = function(tag_name){
            var url = Config.rootUrl + 'tags/' + tag_name;

            return $http.get(url);
        };

        var cards = function(tag_name, page){
            var url = Config.rootUrl + 'tags/' + tag_name + '/cards';

            if(!page) page = 1;

            var params = {
                page:page
            };

            return $http.get(url, {
                params:params
            });
        };

        return {
            index:index,
            show:show,
            cards:cards
        };

    });