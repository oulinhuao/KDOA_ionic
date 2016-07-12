angular.module('starter.ResService',
  [ 'angularSoap',
  'starter.globalservice'])

.factory("ResService", ['$soap',
  'GlobalSetting',
  function ($soap,GlobalSetting) {
  return {
    /**
     * 获取资讯信息类别
     */
    getCategories: function () {
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetInfoCategories", {
        updateTime:"2001-1-1",
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      });
    },
    getListCount:function(){
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetInfoListUpdatedCount", {
        updateTime:"2001-1-1",
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      });
    },
    getListPaged: function (index) {
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetInfoListPaged", {
        updateTime:"2001-1-1",
        pageIndex: index,
        pageSize: GlobalSetting.getServerPageSize,
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      });
    },
    getContentById: function (id) {
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetInfoById", {
        infoId: id,
        mobilePath: "http://kingdonsoft.com:8003/KDOA/UploadFiles/Info/image/",
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      });
    }

  }
}]);
