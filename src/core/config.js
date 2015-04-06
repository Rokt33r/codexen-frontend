angular.module('codexen.core.config')
    .config(function($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    });