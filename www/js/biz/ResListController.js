angular.module('starter.ResCategoryController',[
  'ngCordova',
  'ionic',
  'starter.CommentUtilsService',
  'starter.ResService'
  ])

.controller('ResCategoryCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  '$ionicHistory',
  'CommentUtils',
  'ResService',
  function ($scope,$state,$ionicPlatform,$ionicHistory,CommentUtils,ResService) {
    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $ionicHistory.goBack();
    });
    $scope.mTitle = "";


    $scope.ctrl = {
      // 数据集
      list: [],
      listAll: [],
      isFrist:true,

      reset: function(){
        $scope.ctrl.list = [];
        $scope.ctrl.isFrist = true;

      },
      init:function(){
        $scope.ctrl.getCateList();
      },
      getCateList:function(){
        ResService.getCategories().then(function(response){
          $scope.ctrl.isFrist = false;
          if("InvaildToken" === response){
            // 需要登录
            CommentUtils.t.showToast("您还没有登录...");
          }else{
            var objResponse = JSON.parse(response);
            var size = objResponse.length;
            for (var n = 0; n < size; n++) {
              var obj = objResponse[n];
              var entity = {
                ServerId:obj.ServerId,
                Name : obj.Name,
                ParentId : obj.ParentId,
                ParentName : obj.ParentName,
                OrderNum : obj.OrderNum,
                IsDeleted : obj.IsDeleted,
                UpdateTime : obj.UpdateTime};
              $scope.ctrl.listAll.push(entity);
            }
            var l = [];
            for(var n = 0; n < size; n++){
              var obj = $scope.ctrl.listAll[n];
              if(obj.ParentId == 0){
                l.push(obj);
              }
            }
            var lSize = l.length / 2;
            for(var n = 0; n < lSize; n++){
              var obj = {
                left:l[n],
                right:l[n+1]
              };
              $scope.ctrl.list.push(obj);
            }
            if(l.length % 2 > 0){
              var obj = {
                left:l[l.length - 1],
                right:{Name:""}
              };
              $scope.ctrl.list.push(obj);
            }
          }
        });
      }

    }



    $scope.ctrl.init();
}])
