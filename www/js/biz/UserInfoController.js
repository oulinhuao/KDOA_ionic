angular.module('starter.UserInfoController', [
  'ngCordova',
  'starter.globalservice',
  'starter.UserInfoService'])

  .controller('UserInfoCtrl',['$scope',
    '$state',
    'UserInfoService',
    '$cordovaToast',
    'GlobalSetting',
    function ($scope, $state, UserInfoService, $cordovaToast,GlobalSetting) {
      $scope.loginData = {username:'lhou',password:'ou852723'};
      $scope.loading = false;
      $scope.loginText = "登录";
      //$scope.loginData.username = 'lhou';
      //$scope.loginData.password = 'ou852723';

      // 登录操作
      $scope.doLogin = function () {
        if(!$scope.loading){
          var name = $scope.loginData.username;
          var pwd = $scope.loginData.password;
          // 必须输入验证
          if (typeof(name) == "undefined" || name.length == 0) {
            $cordovaToast.showShortCenter('用户名必须输入!');
            return false;
          }

          //// 有效性验证
          //if (!validateMobile(name) && !validateEmail(name)) {
          //  $cordovaToast.show('用户名只能为邮箱地址或者手机号码!!', 'short', 'center');
          //  return false;
          //}

          if (typeof(pwd) == "undefined" || pwd.length == 0) {
            $cordovaToast.showShortCenter('密码必须输入!');
            return false;
          }

          $scope.loading = true;
          $scope.loginText = "登录中";

          UserInfoService.doLogin(name, pwd).
          then(function (response) {
            if (response == '-1' || response == '' || response == 'undefined' || response == null) {
              $cordovaToast.showShortCenter('用户名或密码错误!');
            } else {
              var info = JSON.parse(response);
              if(info.ServerId > 0){
                GlobalSetting.setUserId(info.ServerId);
                GlobalSetting.setUserToken(info.Token);
                $scope.loginSuccess();
                UserInfoService.insertOrUpdate(info);
                UserInfoService.insertOrUpdateLoginUser(info);
              }else{
                // 未知错误
                $scope.loading = false;
                $scope.loginText = "登录";
                $cordovaToast.showShortCenter('用户名或密码错误!');
              }
              //loginService.addUser(info);
              //sessionStorage.UserID = info.ID;
              //
              //$state.go(sessionStorage.BackUrl);
            }
          });
        }
      };

      $scope.goMain = function () {
        $state.go('main');
      };

      $scope.loginSuccess = function () {
        $scope.goMain();
        $scope.loading = false;
        $scope.loginText = "登录";
      };



    }]);
