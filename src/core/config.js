angular.module('codexen.core.config')
    .config(function($urlRouterProvider, jwtInterceptorProvider, $httpProvider, uiSelectConfig){

        $urlRouterProvider
            .when('', '/')
            .otherwise('/notfound');

        $urlRouterProvider.deferIntercept();

        jwtInterceptorProvider.tokenGetter = [function() {
            return localStorage.getItem('id_token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;
    })
    .factory('Config', function(){
        var rootUrl = 'http://localhost:8000/v0/';

        return {
            rootUrl:rootUrl
        };
    });
