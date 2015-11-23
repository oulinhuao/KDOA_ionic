angular.module('starter.UserInfoController', ['ionic',
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
            $cordovaToast.show('用户名必须输入!', 'short', 'center');
            return false;
          }

          //// 有效性验证
          //if (!validateMobile(name) && !validateEmail(name)) {
          //  $cordovaToast.show('用户名只能为邮箱地址或者手机号码!!', 'short', 'center');
          //  return false;
          //}

          if (typeof(pwd) == "undefined" || pwd.length == 0) {
            $cordovaToast.show('密码必须输入!', 'short', 'center');
            return false;
          }

          $scope.loading = true;
          $scope.loginText = "登录中";
          //var md5Pwd = hex_md5(pwd).toUpperCase();
          UserInfoService.doLogin(name, pwd).
          then(function (response) {
            if (response == '-1' || response == '' || response == 'undefined' || response == null) {
              $cordovaToast.show('用户名或密码错误!', 'short', 'center');
            } else {
              var info = JSON.parse(response);
              if(info.ServerId > 0){
                GlobalSetting.setUserId(info.ServerId);
                GlobalSetting.setUserToken(info.Token);
                //UserInfoService.insertOrUpdate(info);

                $scope.goMain();
                $scope.loading = false;
                $scope.loginText = "登录";
              }else{
                // 未知错误
                $scope.loading = false;
                $scope.loginText = "登录";
                $cordovaToast.show('用户名或密码错误!', 'short', 'center');
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

      // 返回操作
      $scope.gotoRegiste = function () {
        //window.open('demos/tutorial3.html');
        $state.go("registe");
      };

      // 返回操作
      $scope.gotoDetail = function () {
        $state.go('userPwdModify', {userId: '1'});
      };

    }]);
