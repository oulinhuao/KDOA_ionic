angular.module('starter.WorklogDetialController',[
  'ngCordova',
  'common.dateutils',
  'ionic',
  'DialogService',
  'starter.WorklogService',
  'starter.NativeUtilsService'])

.controller('WorklogDetialCtrl', ['$scope',
  '$state',
  '$stateParams',
  'DateUtils',
  '$ionicHistory',
  '$ionicActionSheet',
  'DialogUtil',
  'WorklogService',
  'NativeUtils',
  function ($scope, $state,$stateParams,
            DateUtils,$ionicHistory, $ionicActionSheet,
            DialogUtil,WorklogService,NativeUtils
            ) {
    $scope.mEntity = $stateParams.projEntity;

    $scope.showMenu = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '修改' },
        ],
        destructiveText: '删除',
        cancelText: '取消',
        buttonClicked: function(index) {
          switch(index){
            case 0:// 修改
              $state.go('worklogdetial_edit',{projEntity:$scope.mEntity});
            break;
          }
        },
        destructiveButtonClicked:function(){
          if(!NativeUtils.n.isOnline(true)){
            return;
          }
          DialogUtil.dialogConfirm('','确定删除这条数据？').then(function(res){
            if(res) {
              NativeUtils.l.showLoading();
              WorklogService.deleteWorklog(scope.list[index]).then(function(response){
                NativeUtils.l.hideLoading();
                if("InvaildToken" === response){
                  // 需要登录
                  NativeUtils.t.showToast("您的帐号在其他设备登录，请重新登录");
                }else {
                  // 成功 返回的是时间字符串 yyyy-MM-dd hh:mm:ss
                  if(response != undefined && response.length > 4){
                    $ionicHistory.goBack();
                    return;
                  }
                }
                NativeUtils.t.showToast("删除失败");
              });
            } else {
              hideSheet();
            }
          });
        }
      });
    }
}])
