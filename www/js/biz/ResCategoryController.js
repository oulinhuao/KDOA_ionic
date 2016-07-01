angular.module('starter.ResCategoryController',[
  'ngCordova',
  'ionic'])

.controller('ResCategoryCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  '$ionicHistory',
  function ($scope,$state,$ionicPlatform,$ionicHistory) {


    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $ionicHistory.goBack();
    });



}])
