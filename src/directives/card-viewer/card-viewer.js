angular.module('codexen.directives.card-viewer')
    .directive('cardViewer', function(Auth){
        return {
            templateUrl:'directives/card-viewer/card-viewer.tpl.html',
            scope:{
                card:'='
            },
            link:function(scope){

                var watchers;
                scope.$watch('card', function(){
                    watchers = scope.$$watchers;
                    scope.$$watchers = [];
                });

                scope.isMine = Auth.getCurrentUser().id == scope.card.owner_id;

            }
        };
    });