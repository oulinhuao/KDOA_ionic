angular.module('starter.WorklogController',[
  'ngCordova',
  'common.dateutils',
  'starter.WorklogService'])

.controller('WorklogCtrl', ['$scope',
  '$state',
  '$stateParams',
  'DateUtils',
  'WorklogService',
  function ($scope, $state,$stateParams,DateUtils,
            WorklogService) {
    $scope.mDateUtils = DateUtils;

    $scope.goMain = function () {
      $state.go('main');
    };

}])
