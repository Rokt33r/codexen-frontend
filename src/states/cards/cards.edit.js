angular.module('codexen.states.cards.edit')
    .config(function($stateProvider){
        $stateProvider.state('cards.edit', {
            url:'/:card_id/edit',
            templateUrl:'states/cards/cards.edit.tpl.html',
            controller:'CardsEditController',
            controllerAs:'vm'
        });
    })
    .controller('CardsEditController', function($state, Card, Tag){
        var vm = this;

        var cardId = $state.params.card_id;

        vm.card = {};
        vm.card.tags = [];

        Card.show(cardId).success(function(data){
            console.log(data);
            vm.card = data.card;
        });

        vm.save = function(){
            var tags = _.pluck(vm.card.tags, 'name');

            var params = {
                label:vm.card.label,
                filename:vm.card.filename,
                code:vm.card.code,
                memo:vm.card.memo,
                tags:tags
            };

            return Card.update(cardId, params)
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