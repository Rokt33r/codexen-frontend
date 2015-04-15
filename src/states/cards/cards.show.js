angular.module('codexen.states.cards.show')
    .config(function($stateProvider){
        $stateProvider.state('cards.show', {
            url:'/:card_id',
            templateUrl:'states/cards/cards.show.tpl.html',
            controller:'CardsShowController',
            controllerAs:'vm'
        });
    })
    .controller('CardsShowController', function(Card, $state){
        var vm = this;

        var cardId = $state.params.card_id;

        vm.card = {};

        Card.show(cardId).success(function(data){
            console.log(data);
            vm.card = data.card;
        });
    });