angular.module('starter.WorklogController',['starter.workloglistservice',
  'ngCordova'])

.controller('WorklogCtrl', ['$scope',
  '$state',
  'IsIOSDevice',
  'IsAndroidDevice',
  function ($scope, $state,IsIOSDevice, IsAndroidDevice) {
    $scope.goMain = function () {
      $state.go('main');
    };


}])
