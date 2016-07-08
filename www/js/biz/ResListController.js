angular.module('starter.ResListController',[
  'ngCordova',
  'ionic',
  'starter.CommentUtilsService',
  'starter.ResService'
  ])

.controller('ResListCtrl', ['$scope',
  '$state',
  '$stateParams',
  '$ionicPlatform',
  '$ionicHistory',
  'CommentUtils',
  'ResService',
  function ($scope,$state,$stateParams,
    $ionicPlatform,$ionicHistory,CommentUtils,ResService) {
    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $ionicHistory.goBack();
    });

    $scope.mEntity = $stateParams.Entity;

    if($scope.mEntity == undefined || $scope.mEntity == null){
      $scope.mTitle = "信息资源";
    }else{
      $scope.mTitle = $scope.mEntity.Name;
    }
    $scope.mCurrentId = $scope.mEntity.ServerId;

      // 当前$scope作用域
    $scope.ctrl = {

      reset: function(){
        $scope.ctrl.currentPage = 1;
        $scope.ctrl.noMoreData = false;
        $scope.ctrl.list = [];
        $scope.ctrl.allCount = 0;
        $scope.ctrl.currentCount = 0;
        $scope.ctrl.index = 1;
        $scope.ctrl.isFrist = true;

      },

      init: function () {
        $scope.ctrl.doRefresh();

      },
      /**
       */
      doRefresh: function () {
        $scope.ctrl.noMoreData = true;
        if (!CommentUtils.n.isOnline(true)) {
          $scope.ctrl.isFrist = false;
          $scope.$broadcast('scroll.refreshComplete');
          return;
        }
        $scope.ctrl.reset();

        ResService.getListPaged(1).then(function(response){
          $scope.ctrl.isFrist = false;
          if("InvaildToken" === response){
            // 需要登录
            CommentUtils.t.showToast("您还没有登录...");
            $scope.$broadcast('scroll.refreshComplete');
          }else{
            var objResponse = JSON.parse(response);
            $scope.ctrl.allCount = objResponse.total;
            var objDataList = objResponse.pageData;
            var size = objDataList.length;
            $scope.ctrl.currentCount += size;
            for (var n = 0; n < size; n++) {
              var obj = objDataList[n];
              if(!obj.IsDeleted && obj.CategoryId == $scope.mCurrentId){
                $scope.ctrl.list.push(obj);
              }
            }
            $scope.$broadcast('scroll.refreshComplete');
          }
        });
      },

    };
    $scope.onItemClick=function(entity){
      $state.go('res_detial',{Entity:entity});
    };

    $scope.ctrl.init();
}])
