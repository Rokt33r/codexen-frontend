angular.module('codexen.states.welcome')
    .config(function($stateProvider){
        $stateProvider.state('welcome', {
            url:'/',
            templateUrl:'states/welcome/welcome.tpl.html',
            controller:'WelcomeController',
            controllerAs:'vm',
            data:{
                guest:true
            }
        });
    })
    .controller('WelcomeController', function(){
    });