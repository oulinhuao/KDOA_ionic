angular.module('starter.MainController',[
  'ngCordova'])

.controller('MainCtrl', ['$scope',
  '$state',
  '$ionicSideMenuDelegate',
  function ($scope, $state,$ionicSideMenuDelegate) {
    $scope.options = {
      loop: true,
      effect: 'fade',
      speed: 500,
    }



    $scope.toggleRightMemu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.logout = function(){

    }

    $scope.pageCtrl = {
      goWorkLog:function(){
        $state.go('worklog');
      },
      goRes : function(){
        $state.go('res_category');
      },
      goUserInfo:function(){
        $state.go('userInfo');
      },
      goModifyPswd:function(){
        $state.go('ModifyPswd');
      }

    }

    $scope.menuCtrl = {
      infoSettingShow:true,
      infoSettintArrowSrc:"img/arrow_up.png",
      toggleInfoSetting:function(){
        $scope.menuCtrl.infoSettingShow = !$scope.menuCtrl.infoSettingShow;
        if($scope.menuCtrl.infoSettingShow){
          $scope.menuCtrl.infoSettintArrowSrc = "img/arrow_up.png";
        }else{
          $scope.menuCtrl.infoSettintArrowSrc = "img/arrow_down.png";
        }
      },

      settingShow:true,
      settingShowArrowSrc:"img/arrow_up.png",
      toggleSetting:function(){
        $scope.menuCtrl.settingShow = !$scope.menuCtrl.settingShow;
        if($scope.menuCtrl.settingShow){
          $scope.menuCtrl.settingShowArrowSrc = "img/arrow_up.png";
        }else{
          $scope.menuCtrl.settingShowArrowSrc = "img/arrow_down.png";
        }
      },
    }


}])
