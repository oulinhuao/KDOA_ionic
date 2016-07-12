angular.module('starter.WorklogController',[
  'ngCordova',
  'ionic'])

.controller('WorklogCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  function ($scope,$state,$ionicPlatform) {

    $scope.goMain = function () {
      $state.go('main');
    };
    $scope.goAddWorklog = function () {
      $state.go('worklogdetial_edit');
    };

    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $scope.goMain();
    });



}])
