angular.module('codexen.states.cards')
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider
            .when('/cards', '/cards/create')
            .when('/cards/', '/cards/create');

        $stateProvider.state('cards', {
            url:'/cards',
            template:'<ui-view></ui-view>'
        });

    });