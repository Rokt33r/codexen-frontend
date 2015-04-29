angular.module('codexen.services.request-invitation')
    .factory('RequestInvitation', function($http){

        var url = 'http://register.codexen.org/api/request';

        var send = function(email){
            return $http.post(url, {
                email:email
            });
        };

        return {
            send:send
        };
    });