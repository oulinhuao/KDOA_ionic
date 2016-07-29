angular.module('starter.UserInfoController',[
  'ngCordova',
  'starter.NativeUtilsService',
  'starter.UserInfoService',])

.controller('UserInfoCtrl', ['$scope',
  '$state',
  'NativeUtils',
  'UserInfoService',
  function ($scope, $state,NativeUtils,UserInfoService) {

    $scope.mUserInfo = {
      USER_NAME:"lhou",
      REAL_NAME:"欧林华",
      SEX:"1",
      DEPT_NAME:"上海公司",
      EMAIL:"lhou@kingdonsoft.com",
      MOBILE_PHONE:"18014323657"
    }


    UserInfoService.getEntityLastLogin(function(entity){
      if(entity != null && typeof(entity) != "undefined" && entity.SERVER_ID > 0){
        $scope.mUserInfo = entity;
      }
    },function(err){
      console.log(err.message);
    });


}])
