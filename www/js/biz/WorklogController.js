angular.module('starter.WorklogController',[
  'ngCordova',
  'common.dateutils',
  'starter.WorklogService',
  'starter.SelectorService'])

.controller('WorklogCtrl', ['$scope',
  '$state',
  '$stateParams',
  'IsIOSDevice',
  'IsAndroidDevice',
  '$ionicNavBarDelegate',
  'DateUtils',
  'WorklogService',
  'SelectorService',
  function ($scope, $state,$stateParams,IsIOSDevice, IsAndroidDevice,$ionicNavBarDelegate,DateUtils,
            WorklogService,SelectorService) {
    $scope.mEntity = $stateParams.projEntity;
    $scope.mDateUtils = DateUtils;
    SelectorService.mInitModal($scope);

    $scope.goMain = function () {
      $state.go('main');
    };

    $scope.goWorklog = function() {
      mEntity = null;
      $state.go('worklog');
    };

    $scope.goDetial = function(id){
      $state.go('worklog.detial');
    }

    // 测试数据
    $scope.mWorklog = {ServerId:23, CompId : 32,
      CompName : '上海公司', ProjId : 4,
      ProjName : '上海公司非项目事务', WorkTypeId : 2,
      WorkTypeName : '其他事务',
      UserId : 22, UserRealName : '欧林华',
      WorkHour : 8, WorkDate : '2015-3-3',
      CreateDate : '6543234',
      WorkContent : '', Remark : '',
      IsDeleted : 'false', UpdateTime : '236767890'};






}])
