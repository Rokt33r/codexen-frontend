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
    .controller('WelcomeController', function(RequestInvitation){
        var vm = this;

        vm.requestEmail = '';
        vm.requestError = '';
        vm.requestSuccess = '';

        vm.sendRequest = function(){
            vm.requestError = '';
            vm.requestSuccess = '';

            RequestInvitation.send(vm.requestEmail)
                .success(function(data){
                    vm.requestSuccess = 'Requested Successfully';
                    vm.requestEmail = '';
                })
                .error(function(data, status){
                    if(status == 400){
                        vm.requestError = data.error;
                    }
                    console.log('Error : ', status);
                    console.log(data);
                })
        };

    });