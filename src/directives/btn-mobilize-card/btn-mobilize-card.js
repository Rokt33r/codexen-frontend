angular.module('codexen.directives.btn-mobilize-card')
    .directive('btnMobilizeCard', function($modal, Deck, Auth, Card){

        return {
            restrict:'A',
            template:'<i class="fa fa-location-arrow"></i> Mobilize',
            scope:{
                card:'=btnMobilizeCard'
            },
            link:function(scope, element){

                element.on('click', function(){
                    $modal.open({
                        templateUrl:'directives/btn-mobilize-card/modal-mobilize-card.tpl.html',
                        resolve:{
                            card:function(){
                                return scope.card;
                            }
                        },
                        controller:function ($scope, $modalInstance, card){
                            $scope.card = card;

                            $scope.params = {};
                            $scope.params.cardType = 'generator';
                            $scope.params.card_id = card.id;
                            $scope.params.add_to = 'deck';

                            var currentUser = Auth.getCurrentUser();

                            Deck.show(currentUser.name)
                                .success(function(data){
                                    $scope.deck = data.deck;

                                    $scope.groupCards = data.deck.cards.filter(function(card){
                                        return card.type == 'group';
                                    });
                                    $scope.params.groupCommand = $scope.groupCards[0];
                                })
                                .error(function(data, status){
                                    console.log('Errror ! : ', status);
                                    console.log(data);
                                });

                            $scope.mobilize = function(){

                                var params = {
                                    deck_label:$scope.deck.label,
                                    add_to:$scope.params.add_to,
                                    type:$scope.params.cardType,
                                    filename:$scope.params.filename,
                                    runtime:$scope.params.runtime
                                };
                                if($scope.params.add_to == 'deck'){
                                    params.command = $scope.params.command;
                                }
                                if($scope.params.add_to == 'group'){
                                    params.command = $scope.params.groupCommand.command;
                                }
                                Card.mobilize($scope.card.id, params)
                                    .success(function(data){
                                        console.log('Successfully done.');
                                        $modalInstance.close();
                                    })
                                    .error(function(data, status){
                                        console.log('Errror ! : ', status);
                                        console.log(data);
                                    });
                            };

                            $scope.cancel = function(){
                                $modalInstance.dismiss();
                            }
                        }
                    })
                });
            }
        }
    });