angular.module('starter.MainController',[
  'ngCordova'])

.controller('MainCtrl', ['$scope',
  '$state',
  function ($scope, $state) {

    $scope.goWorklog = function(){
      $state.go('worklog');
    }


}])
