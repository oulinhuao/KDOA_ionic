angular.module('starter.WorklogEditController',[
  'ngCordova',
  'common.dateutils',
  'starter.WorklogService',
  'starter.SelectorService',
  'starter.DatePickerService',
  'ionic',
  'starter.NativeUtilsService'
])

.controller('WorklogEditCtrl', ['$scope',
  '$filter',
  '$state',
  '$stateParams',
  'DateUtils',
  'WorklogService',
  'SelectorService',
  '$ionicHistory',
  '$ionicPlatform',
  '$cordovaDatePicker',
  'DatePickerService',
  'NativeUtils',
  function ($scope,$filter, $state,$stateParams,DateUtils,
            WorklogService,SelectorService,$ionicHistory,$ionicPlatform,
            $cordovaDatePicker,
            DatePickerService,NativeUtils) {
    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $ionicHistory.goBack();
    });

    $scope.mEntity = $stateParams.projEntity;
    if($scope.mEntity == null){
      $scope.mEntity = {
        ServerId: 0,
        CompId : 0,
        CompName : "请选择",
        ProjId : 0,
        ProjName : "请选择",
        WorkTypeId : 0,
        WorkTypeName : "请选择",
        UserId : 0,
        UserRealName : "",
        WorkHour : 0,
        WorkDate : "",
        CreateDate : "",
        WorkContent : "",
        Remark : "",
        IsDeleted : false,
        UpdateTime : ""};;
    }
    $scope.mDateUtils = DateUtils;
    SelectorService.mInitModal($scope);

    $scope.showModal = function(type){
      SelectorService.mListCtrl.openModal(type);
    }

    $scope.mTitle = "日志修改";
    if($scope.mEntity.ServerId == 0){
      $scope.mTitle = "添加工作日志";
    }

    $scope.showDate=function(){
      DatePickerService.selectDate(function(date){
        console.log(JSON.stringify(date));
        $scope.mEntity.WorkDate = $filter('date')(date.getTime(),'yyyy-MM-dd')
      });
    }

    $scope.mCtrl = {

      submitSave:function(){
        if($scope.mEntity != null){
          if($scope.mEntity.CompId == 0){
            NativeUtils.t.showToast("请选择所属部门");
            return;
          }
          if($scope.mEntity.ProjId == 0){
            NativeUtils.t.showToast("请选择所属项目");
            return;
          }
          if($scope.mEntity.WorkTypeId == 0){
            NativeUtils.t.showToast("请选择工作类型");
            return;
          }
          if($scope.mEntity.WorkHour <= 0){
            NativeUtils.t.showToast("请填写工作时长");
            return;
          }
          if($scope.mEntity.WorkHour <= 0 || $scope.mEntity.WorkHour >= 24){
            NativeUtils.t.showToast("工作时长范围有误");
            return;
          }
          if($scope.mEntity.WorkContent.length == 0){
            NativeUtils.t.showToast("请填写工作内容");
            return;
          }

          NativeUtils.l.showLoading();
          if($scope.mEntity.ServerId == 0){
            WorklogService.addWorklogByEntity($scope.mEntity).then(function(response){
              NativeUtils.l.hideLoading();
              if("InvaildToken" === response){
                // 需要登录
                NativeUtils.t.showToast("您的帐号在其他设备登录，请重新登录");
              }else {
                var objResponse = JSON.parse(response);
                if(objResponse != undefined && objResponse.ServerId != undefined && objResponse.ServerId > 0){
                  NativeUtils.t.showToast("添加成功");
                  $ionicHistory.goBack();
                  return;
                }
              }
              NativeUtils.t.showToast("添加失败");
            });
          }else{
            WorklogService.updateWorklogByEntity($scope.mEntity).then(function(response){
              NativeUtils.l.hideLoading();
              if("InvaildToken" === response){
                // 需要登录
                NativeUtils.t.showToast("您的帐号在其他设备登录，请重新登录");
              }else {
                // 成功 返回的是时间字符串 yyyy-MM-dd hh:mm:ss
                if(response != undefined && response.length > 4){
                  //NativeUtils.t.showToast("修改成功");
                  $ionicHistory.goBack();
                  return;
                }
              }
              NativeUtils.t.showToast("修改失败");
            });
          }
        }
      }

    }
}])
