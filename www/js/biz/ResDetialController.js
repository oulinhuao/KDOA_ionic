angular.module('starter.ResDetialController',[
  'ngCordova',
  'ionic',
  'starter.CommentUtilsService',
  'starter.ResService'
  ])

.controller('ResDetialCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  '$ionicHistory',
  'CommentUtils',
  'ResService',
  '$stateParams',
  function ($scope,$state,$ionicPlatform,$ionicHistory,CommentUtils,ResService,$stateParams) {
    $scope.mEntity = $stateParams.Entity;
    $scope.mContent = "";

    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $scope.goBack();
    });

    $scope.ctrl = {
      isFrist:true,
      init:function(){
        $scope.ctrl.downContentById();
      },
      downContentById:function(){
        ResService.getContentById($scope.mEntity.ServerId).then(function(response){
          $scope.ctrl.isFrist = false;
          if("InvaildToken" === response){
            // 需要登录
            CommentUtils.t.showToast("您还没有登录...");
          }else{
            $scope.mEntity = JSON.parse(response);
            $scope.mContent = $scope.mEntity.Content;
          }
        });
      },

    }


    $scope.ctrl.init();
}])
