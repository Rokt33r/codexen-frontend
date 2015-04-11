angular.module('codexen.states.users.show')
    .config(function($stateProvider){
        $stateProvider.state('users.show', {
            url:'/:user_name',
            templateUrl:'states/users/users.show.tpl.html',
            controller:'UsersShowController',
            controllerAs:'vm'
        });
    })
    .controller('UsersShowController', function(User, $state){

        var vm = this;
        console.log('show loaded');

        var userName = $state.params.user_name;

        User.show(userName).success(function(data){
            console.log(data.user);
            vm.user = data.user;
        }).error(function(data, status){
            console.log('Error occurs !!');
            console.log('data : ', data);
            console.log('status : ', status);
            if(status == 404){
                $state.go('notfound');
            }
        });

    });