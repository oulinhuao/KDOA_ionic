﻿angular.module('starter.ResDetialController',[
  'ngCordova',
  'ionic',
  'starter.NativeUtilsService',
  'starter.ResService',
  'starter.ResAttachmentService'
  ])

.controller('ResDetialCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  '$ionicHistory',
  'NativeUtils',
  'ResService',
  '$stateParams',
  'ResAttachmentService',
  function ($scope,$state,$ionicPlatform,$ionicHistory,NativeUtils,ResService,$stateParams,
            ResAttachmentService) {
    ResAttachmentService.mInitModal($scope);

    $scope.mEntity = $stateParams.Entity;
    $scope.mContent = "";
    $scope.mHasAttachments = false;

    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $ionicHistory.goBack();
    });

    $scope.openAttachments = function(){
      ResAttachmentService.mListCtrl.showAttachments($scope.mEntity.Attachments);
    };

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
            NativeUtils.t.showToast("您还没有登录...");
          }else{
            $scope.mEntity = JSON.parse(response);
            if($scope.mEntity != null && $scope.mEntity != undefined ){
              if($scope.mEntity.Attachments != undefined){
                if($scope.mEntity.Attachments instanceof Array && $scope.mEntity.Attachments.length > 0){
                  $scope.mHasAttachments = true;
                }
              }
              $scope.mContent = $scope.mEntity.Content;
            }


          }
        });
      },

    }

    $scope.clickToCancle = function(){
      //$ionicLoading.hide()
      console.log("clickToCancle");
    }
    $scope.ctrl.init();
}])
