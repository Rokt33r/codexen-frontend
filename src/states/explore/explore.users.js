angular.module('codexen.states.explore.users')
    .config(function($stateProvider){
        $stateProvider.state('explore.users', {
            url:'/users?{page:int}',
            templateUrl:'states/users/users.index.tpl.html',
            controller:'UsersIndexController as vm',
            params:{
                page:1
            }
        })
    });