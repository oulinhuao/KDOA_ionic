angular.module('starter.WorklogDetialController',[
  'ngCordova',
  'common.dateutils'])

.controller('WorklogDetialCtrl', ['$scope',
  '$state',
  '$stateParams',
  'DateUtils',
  '$ionicHistory',
  function ($scope, $state,$stateParams,DateUtils,$ionicHistory) {
    $scope.mEntity = $stateParams.projEntity;

}])
