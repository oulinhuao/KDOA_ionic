angular.module('starter.MainController',[
  'ngCordova'])

.controller('MainCtrl', ['$scope',
  '$state',
  '$ionicSideMenuDelegate',
  function ($scope, $state,$ionicSideMenuDelegate) {

    $scope.toggleRightMemu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.goWorklog = function(){
      $state.go('worklog');
    }
    $scope.goRes = function(){
      $state.go('res_category');
    }


}])
