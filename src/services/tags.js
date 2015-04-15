angular.module('codexen.services.tags')
    .factory('Tag', function(Config, $http){

        var index = function(search){

            var url = Config.rootUrl + 'tags';

            var params = {};

            if(angular.isString(search)) params.search = search;

            return $http.get(url, {params:params});
        };

        return {
            index:index
        };

    });