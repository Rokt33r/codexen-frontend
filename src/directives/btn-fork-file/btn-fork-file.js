/* global angular */
angular.module('codexen.directives')
  .directive('btnForkFile', function (File, $modal, $timeout, $state) {
    return {
      restrict: 'A',
      template: '<i class="fa fa-code-fork"></i> <span ng-bind="btnLabel"></span> <samall ng-bind="file.fork_count"></small>',
      scope: {
        file: '=btnForkFile'
      },
      link: function (scope, element) {
        scope.btnLabel = 'Fork'
        var isForked = false
        scope.newFile = null

        var openForkModal = function () {
          $modal.open({
            templateUrl: 'directives/btn-fork-file/modal-fork-file.tpl.html',
            resolve: {
              file: function () {
                return scope.newFile
              }
            },
            controller: function ($modalInstance, file, $scope) {
              $scope.file = file

              $scope.edit = function () {
                $state.go('files.edit', {file_id: file.id})
                $modalInstance.dismiss()
              }

              $scope.undo = function () {
                File.destroy(file.id)
                  .success(function (data) {
                    $modalInstance.close({type: 'undo'})
                  })
                  .error(function (data, status) {
                    console.log('Error ! :', status)
                    console.log(data)
                  })
              }

              $scope.cancel = function () {
                $modalInstance.dismiss()
              }

              $scope.codemirrorLoaded = function (editor) {
                $timeout(function () {
                  editor.refresh()
                }, 0)
              }

              $scope.$on('fileMobilized', function () {
                $modalInstance.dismiss()
              })
            }
          }).result.then(function (result) {
              if (result.type === 'undo') {
                scope.btnLabel = 'Fork'
                scope.newFile = null
                isForked = false
              }
            })
        }

        element.on('click', function () {
          if (!isForked) {
            element.attr('disabled', 'disabled')
            scope.btnLabel = 'on Forking...'

            File.fork(scope.file.id)
              .success(function (data) {
                scope.newFile = data.file
                isForked = true
                element.attr('disabled', null)
                scope.btnLabel = 'Already Forked'

                openForkModal()
              })
              .error(function (data, status) {
                console.log('Error ! :', status)
                console.log(data)

                element.attr('disabled', null)
                scope.btnLabel = 'Failed to Fork'
              })
          } else {
            openForkModal()
          }
        })
      }
    }
  })
