angular.module('starter.UserInfoController', [
  'ngCordova',
  'starter.globalservice',
  'starter.UserInfoService',
  'starter.CommentUtilsService'])

  .controller('UserInfoCtrl',['$scope',
    '$state',
    'UserInfoService',
    'GlobalSetting',
    '$timeout',
    'CommentUtils',
    function ($scope, $state,
              UserInfoService, GlobalSetting,$timeout,CommentUtils) {
      $scope.loginData = {username:'',password:''};
      $scope.loadingShow = false;
      $scope.loginText = "登录";

      // 去数据库获取上次登录的帐号（加个延时,不加延时有问题，暂未解决）
      $timeout(function() {
        $scope.getLastUser();
      },500);


      // 登录操作
      $scope.doLogin = function () {
        if(!$scope.loadingShow){
          var name = $scope.loginData.username;
          var pwd = $scope.loginData.password;
          // 必须输入验证
          if (typeof(name) == "undefined" || name.length == 0) {
            CommentUtils.t.showToast('用户名必须输入!');
            return false;
          }
          if (typeof(pwd) == "undefined" || pwd.length == 0) {
            CommentUtils.t.showToast('密码必须输入!');
            return false;
          }

          if(!CommentUtils.n.isOnline(true)){
            return;
          }

          $scope.loadingShow = true;
          $scope.loginText = "登录中";

          UserInfoService.doLogin(name, pwd).
          then(function (response) {
            $scope.loadingShow = false;

            if (response == '-1' || response == '' || response == 'undefined' || response == null) {
              CommentUtils.t.showToast('用户名或密码错误!');
            } else {
              var info = JSON.parse(response);
              if(info.ServerId > 0){
                GlobalSetting.setUserId(info.ServerId);
                GlobalSetting.setUserToken(info.Token);
                $scope.loginSuccess();

                UserInfoService.loginSuccess(info,pwd);
              }else{
                // 未知错误
                $scope.loginText = "登录";
                CommentUtils.t.showToast('用户名或密码错误!');
              }
            }
          });
        }
      };

      $scope.goMain = function () {
        $state.go('main');
      };

      $scope.loginSuccess = function () {
        $scope.goMain();
        $scope.loadingShow = false;
        $scope.loginText = "登录";
      };

      $scope.getLastUser = function(){
        UserInfoService.getEntityLastLogin(function(entity){
          if(entity != null && typeof(entity) != "undefined" && entity.SERVER_ID > 0){
            $scope.loginData.username = entity.USER_NAME;
            $scope.loginData.password = entity.PSWD;
          }
        },function(err){
          console.log(err.message);
        });

      };


    }]);
