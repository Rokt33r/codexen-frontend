angular.module('codexen.services.users')
    .factory('User', function($http, Config){

        var url = Config.rootUrl + 'users';

        var index = function (page){
            if(!page) page = 1;
            return $http.get(url, {
                params:{
                    page:page
                }
            });
        };

        return {
            index:index
        }

    });