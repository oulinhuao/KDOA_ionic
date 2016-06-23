angular.module('starter.SelectorController',[
  'ngCordova',
  'starter.SelectorService'])

.controller('SelectorCtrl', ['$scope',
  'WorklogService',
  'SelectorService',
  function ($scope,WorklogService,SelectorService) {

    $scope.mSelectorService = SelectorService;

}])
