angular.module('codexen.directives.btn-delete-card')
    .directive('btnDeleteCard', function(Card, $modal, $timeout){

        return {
            restrict:'A',
            template:'<i class="fa fa-trash"></i> Delete',
            scope:{
                card:'=btnDeleteCard'
            },
            link:function(scope, element){
                element.on('click', function(){
                    console.log(scope.card);
                    $modal.open({
                        templateUrl: 'directives/btn-delete-card/modal-delete-card.tpl.html',
                        resolve:{
                            card:function(){
                                return scope.card;
                            }
                        },
                        controller: function($modalInstance, card, $scope){

                            $scope.card = card;

                            $scope.confirm = function(){
                                $modalInstance.close();
                            };

                            $scope.cancel = function(){
                                $modalInstance.dismiss();
                            };

                            $scope.codemirrorLoaded = function(editor){
                                $timeout(function(){
                                    editor.refresh();
                                },0)
                            }

                        }
                        }).result.then(function () {
                            Card.destroy(scope.card.id).success(function(data){
                                console.log('Successfully deleted');
                                console.log(data.card);
                                scope.$emit('cardDeleted', data.card);
                            }).error(function(data, status){
                                console.log('Error ! :', status);
                                console.log(data);
                            });
                        }, function () {
                            console.log('dismissed');
                        });

                });
            }
        }
    });