angular.module('codexen.states.users.index')
    .config(function($stateProvider){
        $stateProvider.state('users.index', {
            url:'/list?{page:int}',
            templateUrl:'states/users/users.index.tpl.html',
            controller:'UsersIndexController',
            controllerAs:'vm',
            params:{
                page:1
            }
        })
    })
    .controller('UsersIndexController', function (User, $state) {

        var vm = this;

        var page = $state.params.page;

        User.index(page).success(function(data){

            vm.users = data.users;

            vm.currentPage = page;

            vm.changePage = function(){

                console.log('Changed : ', vm.currentPage);

                $state.go('users.index', {page:vm.currentPage});

            };

        });

    });