angular.module('starter.ResCategoryController',[
  'ngCordova',
  'ionic',
  'starter.NativeUtilsService',
  'starter.ResService'
  ])

.controller('ResCategoryCtrl', ['$scope',
  '$state',
  '$ionicPlatform',
  '$ionicHistory',
  'NativeUtils',
  'ResService',
  function ($scope,$state,$ionicPlatform,$ionicHistory,NativeUtils,ResService) {

    // android 返回按钮
    $ionicPlatform.onHardwareBackButton(function(){
      $scope.goBack();
    });
    $scope.goBack = function(){
      if($scope.ctrl.mParents.length > 0){
        var entity = $scope.ctrl.mParents[$scope.ctrl.mParents.length - 1];
        if(entity.ServerId > 0){
          if(entity.ParentId > 0 && !$scope.mIsCate){
            $scope.ctrl.getDispData(entity.ParentId);
          }else{
            $scope.mIsCate = true;
          }
          $scope.ctrl.mParents.pop();
          return;
        }
      }
      $ionicHistory.goBack();
    }

    $scope.mIsCate = true;

    $scope.ctrl = {
      // 数据集
      listAll: [],
      list: [],
      list2: [],
      mParents: [],
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
            NativeUtils.t.showToast("您还没有登录...");
          }else{
            var objResponse = JSON.parse(response);
            var size = objResponse.length;
            $scope.ctrl.listAll.length = 0;
            for (var n = 0; n < size; n++) {
              var obj = objResponse[n];
              if(!obj.IsDeleted){
                $scope.ctrl.listAll.push(obj);
              }
            }
            size = $scope.ctrl.listAll.length;
            var l = [];
            for (var n = 0; n < size; n++) {
              var obj = $scope.ctrl.listAll[n];
              if(obj.ParentId == 0){
                l.push(obj);
              }
            }
            size = l.length;
            for(var n = 0; n < size; n += 2){
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
      },
      /**
       * 刷新列表
       * @param parentId
       * @returns {boolean} 返回列表是否切换了
         */
      getDispData:function(parentId){
        var size = $scope.ctrl.listAll.length;
        var isChange = false;
        for (var n = 0; n < size; n++) {
          var obj = $scope.ctrl.listAll[n];
          if(parentId == obj.ParentId){
            if(!isChange){
              $scope.ctrl.list2.length = 0;
            }
            isChange = true;
            $scope.ctrl.list2.push(obj);
          }
        }
        if(isChange && $scope.mIsCate){
          $scope.mIsCate = false;
        }
        return isChange;
      },
      onItemClicked:function(entity){
        if(!$scope.ctrl.getDispData(entity.ServerId)){
          $scope.ctrl.goResList(entity)
        }else{
          $scope.ctrl.mParents.push(entity);
        }

      },
      goResList:function(entity){
        $state.go('res_list',{Entity:entity});
      }

    }


    $scope.ctrl.init();
}])
