angular.module('codexen.directives.card-viewer')
    .directive('cardViewer', function(){
        return {
            templateUrl:'directives/card-viewer/card-viewer.tpl.html',
            scope:{
                card:'='
            },
            link:function(scope){

            }
        };
    });