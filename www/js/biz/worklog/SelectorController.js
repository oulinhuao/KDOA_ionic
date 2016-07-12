angular.module('starter.SelectorController',[
  'ngCordova',
  'starter.SelectorService'])

.controller('SelectorCtrl', ['$scope',
  'SelectorService',
  function ($scope,SelectorService) {

    $scope.mSelectorService = SelectorService;

}])
