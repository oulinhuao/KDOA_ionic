angular.module('starter.WorklogController',[
  'ngCordova'])

.controller('WorklogCtrl', ['$scope',
  '$state',
  function ($scope,$state) {

    $scope.goMain = function () {
      $state.go('main');
    };
    $scope.goAddWorklog = function () {
      $state.go('worklogdetial_edit');
    };



}])
