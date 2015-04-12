angular.module('codexen.states.users.show')
    .config(function($stateProvider){
        $stateProvider.state('users.show', {
            url:'/:user_name?{page:int}',
            templateUrl:'states/users/users.show.tpl.html',
            controller:'UsersShowController',
            controllerAs:'vm',
            params:{
                page:1
            }

        });
    })
    .controller('UsersShowController', function(User, $state){

        var vm = this;

        var page = $state.params.page;

        var userName = $state.params.user_name;

        User.show(userName).success(function(data){
            console.log(data.user);
            vm.user = data.user;

            User.cards(userName, page).success(function(data){
                vm.cards = data.cards;

                vm.currentPage = page;

                vm.changePage = function(){

                    console.log('Changed : ', vm.currentPage);

                    $state.go('users.show', {user_name:userName, page:vm.currentPage});

                };
            });

        }).error(function(data, status){
            console.log('Error occurs !!');
            console.log('data : ', data);
            console.log('status : ', status);
            if(status == 404){
                $state.go('notfound');
            }
        });

    });