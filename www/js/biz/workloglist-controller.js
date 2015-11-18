angular.module('starter.workloglistcontroller',['starter.workloglistservice',
  'ngCordova',
  'common.dateutils'])

.controller('WorklogListCtrl', ['$scope',
  '$state',
  '$timeout',
  '$cordovaNetwork',
  '$cordovaToast',
  '$ionicLoading',
  'IsIOSDevice',
  'IsAndroidDevice',
  'Workloglistservice',
  'DateUtils',
  function ($scope, $state, $timeout, $cordovaNetwork, $cordovaToast, $ionicLoading, IsIOSDevice, IsAndroidDevice, Workloglistservice,DateUtils) {
    var mDateUtils = DateUtils;
    // 当前$scope作用域
    var scope;
    scope = $scope.datalist = {
      // 当前页码
      currentPage: 1,
      // 是否还有数据
      noMoreData: false,
      // 数据集
      list: [],
      allCount : 0,
      currentCount : 0,
      index : 1,

      reset: function(){
        scope.currentPage = 1;
        scope.noMoreData = false;
        scope.list = [];
        scope.allCount = 0;
        scope.currentCount = 0;
        scope.index = 1;

      },

      initAction: function () {
        scope.doRefresh();

      },
      /**
       * 下拉下载
       */
      doRefresh: function () {
        //if (IsAndroidDevice || IsIOSDevice) {
        //    if ($cordovaNetwork.isOffline()) {
        //        $cordovaToast.showShortBottom("当前网络无连接！");
        //        return;
        //    }
        //}
        $timeout(function () {
          /**
           * 调用返回数据
           * @param flag
           *    -1 错误
           *    0 没有更多
           */
          var callback = function(flag){
            if(flag == -1){
              $cordovaToast.showShortBottom("访问异常...");
            }else if(flag == 0){
              $cordovaToast.showShortBottom("没有更多...");
            }
          };

          var successCallback = function(response){
            if("InvaildToken" === response){
              // 需要登录
              $cordovaToast.showShortBottom("您还没有登录...");
              $scope.$broadcast('scroll.refreshComplete');
            }else{
              var objResponse = JSON.parse(response);
              scope.allCount = objResponse.total;
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
                scope.currentCount++;
                scope.list.push(entity);
              }
              $scope.$broadcast('scroll.refreshComplete');
              //$scope.$broadcast('scroll.infiniteScrollComplete');
            }

          };
          scope.reset();
          Workloglistservice.getWorklogListPaged(1,successCallback);

        });

        //$scope.$broadcast('scroll.refreshComplete');
      },
      /**
       * 加载更多
       */
      doLoadMore:function(){
        var successCallback = function(response){
          if("InvaildToken" === response){
            // 需要登录
            $cordovaToast.showShortBottom("您还没有登录...");
            $scope.$broadcast('scroll.refreshComplete');
          }else{
            var objResponse = JSON.parse(response);
            var objDataList = objResponse.pageData;
            var arrEntity = [];
            var size = objDataList.length;
            if(size > 0){
              scope.index ++;
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
              scope.currentCount++;
              scope.list.push(entity);
            }
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }

        };
        if(scope.currentCount <= scope.allCount){
          Workloglistservice.getWorklogListPaged(scope.index+1,successCallback);
        }else{
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      }
    };


    scope.initAction();


    $scope.goMain = function () {
      $state.go('main');
    };
}])
