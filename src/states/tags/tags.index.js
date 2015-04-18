angular.module('codexen.states.tags.index')
    .config(function($stateProvider){
        $stateProvider.state('tags.index', {
            url:'/list',
            templateUrl:'states/tags/tags.index.tpl.html',
            controller:'TagsIndexController as vm'
        });
    })
    .controller('TagsIndexController', function($state, Tag, $scope, $timeout){
        var vm = this;

        var watchers = null;

        Tag.index('', 500)
            .success(function(data){
                console.log(data.tags);
                vm.tags = data.tags;

                $timeout(function(){
                    watchers = $scope.$$watchers;
                    $scope.$$watchers = null;
                },0);
            })
            .error(function(data, status){
                console.log('Error !! ', status);
                console.log('data : ', data);
            });


    });