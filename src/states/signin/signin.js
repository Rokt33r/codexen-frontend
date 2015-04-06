angular.module('codexen.states.signin')
    .config(function($stateProvider){
        $stateProvider.state('signin', {
            url:'/signin',
            templateUrl:'states/signin/signin.tpl.html',
            controller:'SignInController',
            controllerAs:'vm',
            data:{
                guest:true
            }
        });
    })
    .controller('SignInController', function(Auth, $state){
        var vm = this;

        vm.error = null;

        vm.signin = function(){
            vm.error = null;
            Auth.attempt(vm.email, vm.password, function(){
                if(Auth.hasPendingState()){
                    var pending = Auth.releasePendingState();
                    $state.go(pending.state, pending.params);
                    return;
                }
                $state.go('home');
            }, function(data){
                vm.error = data.error;
            });
        }
    });