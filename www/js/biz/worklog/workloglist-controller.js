angular.module('starter.workloglistcontroller',['starter.workloglistservice',
  'ngCordova',
  'common.dateutils',
  'DialogService',
  'ionic',
  'starter.WorklogService',
  'starter.NativeUtilsService'])

.controller('WorklogListCtrl', ['$scope',
  '$state',
  '$timeout',
  'Workloglistservice',
  'DateUtils',
  'DialogUtil',
  'WorklogService',
  '$ionicListDelegate',
  'NativeUtils',
  function ($scope, $state, $timeout,
            Workloglistservice,DateUtils,DialogUtil,
            WorklogService,$ionicListDelegate,NativeUtils) {
    var mDateUtils = DateUtils;
    // 当前$scope作用域
    $scope.ctrl = {
      // 当前页码
      currentPage: 1,
      // 是否还有数据
      noMoreData: false,
      // 数据集
      list: [],
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

      initAction: function () {
        $scope.ctrl.doRefresh();

      },
      /**
       * 下拉下载
       */
      doRefresh: function () {
        $scope.ctrl.noMoreData = true;
        if (!NativeUtils.n.isOnline(true)) {
          $scope.ctrl.isFrist = false;
          $scope.$broadcast('scroll.refreshComplete');
            return;
        }
        $timeout(function () {
          /**
           * 调用返回数据
           * @param flag
           *    -1 错误
           *    0 没有更多
           */
          var callback = function(flag){
            if(flag == -1){
              NativeUtils.t.showToast("访问异常...");
            }else if(flag == 0){
              NativeUtils.t.showToast("没有更多...");
            }
          };

          var successCallback = function(response){
            $scope.ctrl.isFrist = false;
            if("InvaildToken" === response){
              // 需要登录
              NativeUtils.t.showToast("您还没有登录...");
              $scope.$broadcast('scroll.refreshComplete');
            }else{
              var objResponse = JSON.parse(response);
              $scope.ctrl.allCount = objResponse.total;
              var objDataList = objResponse.pageData;
              var arrEntity = [];
              for (var n = 0; n < objDataList.length; n++) {
                var obj = objDataList[n];
                var entity = {ServerId:obj.ServerId, CompId : obj.CompId,
                  CompName : obj.CompName, ProjId : obj.ProjId,
                  ProjName : obj.ProjName, WorkTypeId : obj.WorkTypeId,
                  WorkTypeName : obj.WorkTypeName,
                  UserId : obj.UserId, UserRealName : obj.UserRealName,
                  WorkHour : obj.WorkHour, WorkDate : obj.WorkDate,
                  CreateDate : obj.CreateDate,
                  WorkContent : obj.WorkContent, Remark : obj.Remark,
                  IsDeleted : obj.IsDeleted, UpdateTime : obj.UpdateTime};
                $scope.ctrl.currentCount++;
                $scope.ctrl.list.push(entity);
              }
              $scope.$broadcast('scroll.refreshComplete');
            }
          };

          $scope.ctrl.reset();
          Workloglistservice.getWorklogListPaged(1,successCallback);

        });

      },
      /**
       * 加载更多
       */
      doLoadMore:function(){
        if (!NativeUtils.n.isOnline(true)) {
          return;
        }

        var successCallback = function(response){
          if("InvaildToken" === response){
            // 需要登录
            NativeUtils.t.showToast("您还没有登录...");
            $scope.$broadcast('scroll.refreshComplete');
          }else{
            var objResponse = JSON.parse(response);
            var objDataList = objResponse.pageData;
            var size = objDataList.length;
            if(size > 0){
              $scope.ctrl.index ++;
            }
            for (var n = 0; n < size; n++) {
              var obj = objDataList[n];
              var entity = {ServerId:obj.ServerId, CompId : obj.CompId,
                CompName : obj.CompName, ProjId : obj.ProjId,
                ProjName : obj.ProjName, WorkTypeId : obj.WorkTypeId,
                WorkTypeName : obj.WorkTypeName,
                UserId : obj.UserId, UserRealName : obj.UserRealName,
                WorkHour : obj.WorkHour, WorkDate : obj.WorkDate,
                CreateDate : obj.CreateDate,
                WorkContent : obj.WorkContent, Remark : obj.Remark,
                IsDeleted : obj.IsDeleted, UpdateTime : obj.UpdateTime};
              $scope.ctrl.currentCount++;
              $scope.ctrl.list.push(entity);
            }
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }

        };
        if($scope.ctrl.currentCount <= $scope.ctrl.allCount){
          Workloglistservice.getWorklogListPaged($scope.ctrl.index+1,successCallback);
        }else{
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      },
      // 编辑
      doEdit : function(index,entity){
        $ionicListDelegate.closeOptionButtons();
        $state.go('worklogdetial_edit',{projEntity:entity});
      },
      // 删除数据
      doDelete: function(index){
        DialogUtil.dialogConfirm('','确定删除这条数据？').then(function(res){
          if(res) {
            NativeUtils.l.showLoading();
            WorklogService.deleteWorklog($scope.ctrl.list[index]).then(function(response){
              NativeUtils.l.hideLoading();
              if("InvaildToken" === response){
                // 需要登录
                NativeUtils.t.showToast("您的帐号在其他设备登录，请重新登录");
              }else {
                // 成功 返回的是时间字符串 yyyy-MM-dd hh:mm:ss
                if(response != undefined && response.length > 4){
                  $scope.ctrl.list.splice(index, 1);
                  return;
                }
              }
              NativeUtils.t.showToast("删除失败");
            });
          } else {
            //alert("取消");
          }
        });
      }
    };


    $scope.ctrl.initAction();

    $scope.goMain = function () {
      $state.go('main');
    };

    $scope.goDetial = function(pEntity){
      $ionicListDelegate.closeOptionButtons();
      $state.go('worklogdetial',{projEntity:pEntity});
    }


    $scope.deleteComplete = function () {
      $scope.ctrl.allCount --;
      $scope.ctrl.currentCount --;
    }



}])
