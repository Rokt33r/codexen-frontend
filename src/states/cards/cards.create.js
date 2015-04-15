angular.module('codexen.states.cards.create')
    .config(function($stateProvider){
        $stateProvider.state('cards.create', {
            url:'/create',
            templateUrl:'states/cards/cards.create.tpl.html',
            controller:'CardsCreateController',
            controllerAs:'vm',
            data:{
                auth:true
            }
        });
    })
    .controller('CardsCreateController', function($state, Card, Tag){
        var vm = this;

        vm.searchedTags = [];

        vm.save = function(){
            var tags = _.pluck(vm.tags, 'name');

            var params = {
                label:vm.label,
                filename:vm.filename,
                code:vm.code,
                memo:vm.memo,
                tags:tags
            };

            return Card.store(params)
                .success(function(data){
                    $state.go('cards.show', {card_id:data.card.id});
                }).error(function(data, status){
                    console.log('Error! : ', status);
                    console.log(data);
                });
        };


        vm.refreshTags = function(search){
            vm.searchedTags = [{
                name:'Searching...' + search,
                isAlert:true
            }];
            search = search.replace(/[^\w]/g, '');

            return Tag.index(search)
                .success(function(data){
                    if(search!==''&&data.tags.data.filter(function(tag){
                        return tag.name == search;
                    }).length==0) data.tags.data.unshift({
                        id:0,
                        name:search,
                        isNew:true
                    });

                    vm.searchedTags = data.tags.data;
                });
        };

        vm.tagTransform = function(tag){
            return {
                id:0,
                name:tag,
                isNew:true
            };
        };

    });