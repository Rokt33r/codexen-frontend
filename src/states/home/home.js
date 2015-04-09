angular.module('codexen.states.home')
    .config(function($stateProvider){
        $stateProvider.state('home', {
            url:'/home',
            templateUrl:'states/home/home.tpl.html',
            controller:'HomeController',
            controllerAs:'vm',
            data:{
                auth:true
            }
        })
    })
    .controller('HomeController', function(){
        var vm = this;
    });