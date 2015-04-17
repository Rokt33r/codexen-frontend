angular.module('codexen.services.users')
    .factory('User', function($http, Config){


        var index = function (page){
            var url = Config.rootUrl + 'users';
            console.log('request to ', url);

            if(!page) page = 1;

            return $http.get(url, {
                params:{
                    page:page
                }
            });
        };

        var show = function (user_name){

            var url = Config.rootUrl + 'users/' + user_name;

            return $http.get(url);

        };

        var cards = function(user_name, page, search){

            var url = Config.rootUrl + 'users/' + user_name + '/cards';

            if(!page) page = 1;

            var params = {
                page:page
            };

            if(search !== undefined || search === '') params.search = search;

            return $http.get(url, {
                params:params
            });

        };

        return {
            index:index,
            show:show,
            cards:cards
        }

    });