angular.module('codexen.states.decks.show')
    .config(function($stateProvider){
        $stateProvider.state('decks.show', {
            url:'/:deck_label',
            templateUrl:'states/decks/decks.show.tpl.html',
            controller:'DecksShowController as vm'
        });
    })
    .controller('DecksShowController', function($state){
        var vm = this;

        var deckLabel = $state.params.deck_label;

        console.log(deckLabel);

    });