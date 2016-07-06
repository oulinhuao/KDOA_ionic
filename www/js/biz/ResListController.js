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
      // 当前页码
      currentPage: 1,
      // 是否还有数据
      noMoreData: false,
      // 数据集
      list: [],
      listDisp: [],
      allCount : 0,
      currentCount : 0,
      index : 1,
      isFrist:true,

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
            var l = [];
            for (var n = 0; n < size; n++) {
              var obj = objDataList[n];
              if(!obj.IsDeleted){
                var entity = {
                  ServerId:obj.ServerId,
                  Title : obj.Title,
                  KeyWord : obj.KeyWord,
                  CategoryId : obj.CategoryId,
                  CategoryName : obj.CategoryName,
                  ViewCount : obj.ViewCount,
                  Content : obj.Content,
                  Author : obj.Author,
                  UserId : obj.UserId,
                  UserName : obj.UserName,
                  WorkDate : obj.WorkDate,
                  CreateTime : obj.CreateTime,
                  IsDeleted : obj.IsDeleted,
                  UpdateTime : obj.UpdateTime,
                  HtmlFileUrl : obj.HtmlFileUrl,
                  ContentImages : obj.ContentImages,
                  Attachments : obj.Attachments};
                $scope.ctrl.list.push(entity);
              }
            }

            $scope.$broadcast('scroll.refreshComplete');
          }
        });
      },
      getDispData:function(){
        $scope.mEntity
      }

    };

    $scope.ctrl.init();
}])
