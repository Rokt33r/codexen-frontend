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
    .controller('UsersShowController', function(User, $state, $scope, $window, $timeout){

        var vm = this;

        var page = $state.params.page;

        var userName = $state.params.user_name;

        User.show(userName).success(function(data){
            console.log(data.user);
            vm.user = data.user;

            loadCards();

        }).error(function(data, status){
            console.log('Error !! ', status);
            console.log('data : ', data);

            $state.go('notfound');
        });

        var loadCards = function(){
            var currentOffset = $window.pageYOffset;
            User.cards(userName, page).success(function(data){
                vm.cards = data.cards;

                // redirect last page if current page is more than last page
                if(page > vm.cards.last_page) $state.go('users.show', {user_name:userName, page:vm.cards.last_page});

                vm.currentPage = page;

                vm.changePage = function(){

                    console.log('Changed : ', vm.currentPage);

                    $state.go('users.show', {user_name:userName, page:vm.currentPage});

                };

                $timeout(function(){
                    $window.scrollTo(0, currentOffset);
                }, 0);
            });
        };

        $scope.$on('cardDeleted', function(event, card){
            event.preventDefault();
            loadCards();
        });

    });