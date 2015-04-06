angular.module('codexen.states.notfound')
    .config(function($stateProvider){
        $stateProvider.state('notfound', {
            url:'/notfound',
            templateUrl:'states/notfound/notfound.tpl.html'
        });
    });