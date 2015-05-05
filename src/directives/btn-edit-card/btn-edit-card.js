/* global angular */
angular.module('codexen.directives')
  .directive('btnEditCard', function ($state) {
    return {
      restrict: 'A',
      template: '<i class="fa fa-edit"></i> Edit',
      scope: {
        card: '=btnEditCard'
      },
      link: function (scope, element) {
        element.on('click', function () {
          $state.go('cards.edit', {card_id: scope.card.id})
        })
      }
    }
  })
