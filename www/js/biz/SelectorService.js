/**
 * Created by Tony on 2016/6/6.
 */

angular.module('starter.SelectorService',['angularSoap',
  'ngCordova',
  'ionic',
  'starter.globalservice',
  'starter.WorklogService',
  'starter.CommentUtilsService'])

  .factory("SelectorService", [
    '$soap',
    '$ionicModal',
    'GlobalSetting',
    'WorklogService',
    '$ionicScrollDelegate',
    'CommentUtils',
    function($soap,$ionicModal,GlobalSetting,WorklogService,$ionicScrollDelegate,CommentUtils){
      var workLogScore;// 上面传过来的区间引用

      var _data = {
        mDisplayId:  0,
        mDispLayData : [],
        mIsCanShowLoadin : true
      };

      var ctrl = {
        mTypeName :null,
        //mDeptId:this.workLogScore.mEntity.CompId,
        mDeptId:0,
        mDeptList:[
         {
            Id:942,
            Type:0,
            Name : "上海公司"
          },
          {
            Id:941,
            Type:0,
            Name : "重庆公司"
          },
          {
            Id:943,
            Type:0,
            Name : "西藏公司"
          }
        ],
        mProjId:0,
        mProjList:null,
        mWorkTypeId:0,
        mWorkTypeList:null,

        getDept:function(){
          _data.mDispLayData.length = 0;
          _data.mIsCanShowLoadin = false;
          var size = ctrl.mDeptList.length;
          for (var n = 0; n < size; n++) {
            var obj = ctrl.mDeptList[n];
            _data.mDispLayData.push(obj);
          }
          $ionicScrollDelegate.scrollTop();
        },
        getWorkType:function(){
          _data.mDispLayData.length = 0;
          _data.mIsCanShowLoadin = true;
          if(ctrl.mWorkTypeList != null){
            _data.mIsCanShowLoadin = false;
            var size = ctrl.mWorkTypeList.length;
            for (var n = 0; n < size; n++) {
              var obj = ctrl.mWorkTypeList[n];
              _data.mDispLayData.push(ctrl.formatWorkType(obj));
            }
            _data.mDispLayData.sort(ctrl.compareFunc)
          }else{
            WorklogService.getWorkTypeList(0).then(function (response) {
              _data.mIsCanShowLoadin = false;
              if (response == '-1' || response == '' || response == 'undefined' || response == null) {
                CommentUtils.t.showToast('用户名或密码错误!');
              } else {
                ctrl.mWorkTypeList = [];
                var data = JSON.parse(response);
                var size = data.length;
                for (var n = 0; n < size; n++) {
                  var obj = data[n];
                  ctrl.mWorkTypeList.push(obj);
                  _data.mDispLayData.push(ctrl.formatWorkType(obj));
                }
                _data.mDispLayData.sort(ctrl.compareFunc)
              }
            });
          }
          $ionicScrollDelegate.scrollTop();
        },
        formatWorkType:function(obj){
          return {
            Id:obj.WorkTypeId,
            Type:1,
            Name : obj.WorkTypeName
          };
        },
        getProj:function() {
          _data.mDispLayData.length = 0;
          _data.mIsCanShowLoadin = true;
          if (ctrl.mProjList != null) {
            _data.mIsCanShowLoadin = false;
            var size = ctrl.mProjList.length;
            for (var n = 0; n < size; n++) {
              var obj = ctrl.mProjList[n]
              // 根据部门过滤项目
              if(ctrl.mDeptId === 0){
                if(workLogScore.mEntity != null){
                  ctrl.mDeptId = workLogScore.mEntity.CompId;
                }
              }
              if(ctrl.mDeptId !== 0){
                if(ctrl.mDeptId !== obj.CompId){
                  continue;
                }
              }
              _data.mDispLayData.push(ctrl.formatProj(obj));
              _data.mDispLayData.sort(ctrl.compareFunc)
            }
          }else{
            WorklogService.getProjList(0).then(function (response) {
              _data.mIsCanShowLoadin = false;
              if (response == '-1' || response == '' || response == 'undefined' || response == null) {
                CommentUtils.t.showToast('用户名或密码错误!');
              } else {
                ctrl.mProjList = [];
                var data = JSON.parse(response);
                var size = data.length;
                for (var n = 0; n < size; n++) {
                  var obj = data[n];
                  if (obj.IsClosed || obj.IsDeleted) {
                    continue;
                  }
                  ctrl.mProjList.push(obj);
                  // 根据部门过滤项目
                  if(ctrl.mDeptId === 0){
                    if(workLogScore.mEntity != null){
                      ctrl.mDeptId = workLogScore.mEntity.CompId;
                    }
                  }
                  if(ctrl.mDeptId !== 0){
                    if(ctrl.mDeptId !== obj.CompId){
                      continue;
                    }
                  }
                  _data.mDispLayData.push(ctrl.formatProj(obj));
                }
                _data.mDispLayData.sort(ctrl.compareFunc)
              }
            });
          }
          $ionicScrollDelegate.scrollTop();
        },
        formatProj:function(obj){
          return {
            Id:obj.ServerId,
            Type:2,
            Name : obj.ProjName
          };
        },
        /**
         * 比较函数
         * @param {Object} param1 要比较的参数1
         * @param {Object} param2 要比较的参数2
         * @return {Number} 如果param1 > param2 返回 1
         *                     如果param1 == param2 返回 0
         *                     如果param1 < param2 返回 -1
         */
        compareFunc:function(param1,param2){
          //如果两个参数均为字符串类型
          if(typeof param1.Name == "string" && typeof param2.Name == "string"){
            return param1.Name.localeCompare(param2.Name);
          }
          //如果参数1为数字，参数2为字符串
          if(typeof param1.Name == "number" && typeof param2.Name == "string"){
            return -1;
          }
          //如果参数1为字符串，参数2为数字
          if(typeof param1.Name == "string" && typeof param2.Name == "number"){
            return 1;
          }
          //如果两个参数均为数字
          if(typeof param1.Name == "number" && typeof param2.Name == "number"){
            if(param1.Name > param2.Name) return 1;
            if(param1.Name == param2.Name) return 0;
            if(param1.Name < param2.Name) return -1;
          }
        },
        onItemClick:function(entity){
          ctrl.closeModal();
          switch (entity.Type){
            case 0:// 选中部门
              var lastId = ctrl.mDeptId;
              if(lastId != entity.Id ){
                ctrl.mProjId = 0;
                if(workLogScore.mEntity != null){
                  workLogScore.mEntity.ProjId = 0;
                  workLogScore.mEntity.ProjName = "请选择";
                }
              }
              ctrl.mDeptId = entity.Id;
              if(workLogScore.mEntity != null){
                workLogScore.mEntity.CompId = entity.Id;
                workLogScore.mEntity.CompName = entity.Name;
              }
              break;
            case 1:
              // 选中了工作类型
              ctrl.mWorkTypeId = entity.Id;
              if(workLogScore.mEntity != null){
                workLogScore.mEntity.WorkTypeId = entity.Id;
                workLogScore.mEntity.WorkTypeName = entity.Name;
              }
              break;
            case 2:
              // 选中项目
              ctrl.mProjId = entity.Id;
              if(workLogScore.mEntity != null){
                workLogScore.mEntity.ProjId = entity.Id;
                workLogScore.mEntity.ProjName = entity.Name;
              }
              break;
          }
        },
        openModal : function (type) {
          switch(type){
            case 0:
              ctrl.getDept();
              break;
            case 1:
              ctrl.getWorkType();
              break;
            case 2:
              ctrl.getProj();
              break;
          }
          workLogScore.modal.show();
        },
        closeModal : function () {
          workLogScore.modal.hide();
        }

      };

      var _modal = function ($scope) {
        workLogScore = $scope;
        var modal = $ionicModal.fromTemplateUrl('templates/modal_list_selector.html',{
          scope:$scope,
          animation:'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          return modal
        });

        $scope.$on('$destroy', function () {
          $scope.modal.remove();
        });
        return modal;
      };

      return {
        mInitModal : _modal,
        mListCtrl : ctrl,
        mData : _data

      }
    }])
