angular.module('codexen.states.home')
    .config(function($stateProvider){
        $stateProvider.state('home', {
            'url':'/',
            'templateUrl':'states/home/home.tpl.html',
            'controller':'HomeController',
            'controllerAs':'vm'
        })
    })
    .controller('HomeController', function(){
        var vm = this;
    });