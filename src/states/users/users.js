angular.module('codexen.states.users')
    .config(function($stateProvider){
        $stateProvider.state('users', {
            url:'/users?{page:int}',
            templateUrl:'states/users/users.tpl.html',
            controller:'UsersController',
            controllerAs:'vm',
            params:{
                page:1
            }
        })
    })
    .controller('UsersController', function (User, $state, $stateParams) {
        var vm = this;

        var page = $state.params.page;

        User.index(page).success(function(data){

            vm.users = data.users;

            vm.currentPage = page;

            vm.changePage = function(){
                console.log('changed : ', vm.currentPage);
                $state.go('users', {page:vm.currentPage});
            };

        });

    });