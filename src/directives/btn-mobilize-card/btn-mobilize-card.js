angular.module('codexen.directives.btn-mobilize-card')
    .directive('btnMobilizeCard', function(){

        return {
            restrict:'A',
            template:'<i class="fa fa-location-arrow"></i> Mobilize',
            scope:{
                card:'=btnMobilizeCard'
            },
            link:function(scope, element){

            }
        }
    });