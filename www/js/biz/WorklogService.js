﻿angular.module('starter.WorklogService',
  [ 'angularSoap',
  'starter.globalservice'])

.factory("WorklogService", ['$soap',
  'GlobalSetting',
  function ($soap,GlobalSetting) {
  return {
    /**
     * 分页获取数据
     * @param callbackMethod
     * @returns {*}
     */
    getWorklogById: function (index,callbackMethod) {
      $soap.post(GlobalSetting.getUrlBusiness(), "GetMyWorkLogListPaged", {
        beginWorkDate:"",
        endWorkDate:"2015-12-1",
        pageIndex: index,
        pageSize: GlobalSetting.getServerPageSize(),
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      }).then(function(response){
        callbackMethod(response);
      });
    },
    /**
     * 添加工作日志
     * @param entity
     * @returns {*}
     */
    addWorklogByEntity:function(entity){
      return $soap.post(GlobalSetting.getUrlBusiness(), "AddWorkLog", {
        ProjId:entity.ProjId,
        WorkDate: entity.WorkDate,
        WorkTypeId: entity.WorkTypeId,
        WorkHour: entity.WorkHour,
        WorkContent: entity.WorkContent,
        Remark: entity.Remark,
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken()
      });
    },
    /**
     * 修改工作日志
     * @param entity
     * @returns {*}
     */
    updateWorklogByEntity:function(entity){
      return $soap.post(GlobalSetting.getUrlBusiness(), "UpdateWorkLog", {
        ServerId:entity.ServerId,
        ProjId:entity.ProjId,
        WorkDate: entity.WorkDate,
        WorkTypeId: entity.WorkTypeId,
        WorkHour: entity.WorkHour,
        WorkContent: entity.WorkContent,
        Remark: entity.Remark,
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken()
      });
    },
    deleteWorklog:function(entity){
      return $soap.post(GlobalSetting.getUrlBusiness(), "DeleteWorkLog", {
        serverId:entity.ServerId,
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken()
      });
    },
    getWorkTypeList:function(lastUpdateTime){
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetWorkTypeList", {
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
        updateTime: "2001-12-1"
      });
    },
    getProjList:function(lastUpdateTime){
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetProjectList", {
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
        updateTime: "2001-12-1"
      });
    }

  }
}]);
