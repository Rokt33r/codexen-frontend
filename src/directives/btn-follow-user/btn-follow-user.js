angular.module('codexen.directives.btn-follow-user')
    .directive('btnFollowUser', function(User, $timeout){
        var isLoaded = false;

        return {
            restrict:'A',
            template:'<i class="fa fa-rss"></i> <span ng-bind="label"></span>',
            scope:{
                user:'=btnFollowUser'
            },
            link:function(scope, element){

                scope.$on('userFetched', function(){
                    reload();
                });

                var reload = function(){
                    if(scope.user && scope.user.is_followed) {
                        scope.label = 'Following';
                        element.addClass('btn-primary')
                            .removeClass('btn-danger')
                            .removeClass('btn-default');

                        element.on('click', function(){
                            User.unfollow(scope.user.name)
                                .success(function(){
                                    scope.user.is_followed = false;
                                    $timeout(function(){
                                        reload();
                                    });
                                });
                        });

                        element.on('mouseenter', function(){
                            scope.label = 'Unfollow';

                            element.removeClass('btn-primary')
                                .addClass('btn-danger')
                                .removeClass('btn-default');

                            scope.$apply();

                            element.one('mouseleave', function(){
                                scope.label = 'Following';

                                element.addClass('btn-primary')
                                    .removeClass('btn-danger')
                                    .removeClass('btn-default');

                                scope.$apply();
                            });
                        });
                        $timeout(function(){
                            scope.$apply();
                        }, 0);
                    }else{
                        scope.label = 'follow';

                        element.removeClass('btn-primary')
                            .removeClass('btn-danger')
                            .addClass('btn-default');

                        element.on('click', function(){
                            User.follow(scope.user.name)
                                .success(function(){
                                    scope.user.is_followed = true;
                                    $timeout(function(){
                                        reload();
                                    });
                                });
                        });

                        element.off('mouseenter')
                            .off('mouseleave');
                    }
                };

                if(!isLoaded){
                    reload();
                    isLoaded = true;
                }

            }
        }
    });