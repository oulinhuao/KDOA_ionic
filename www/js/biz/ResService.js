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
    }

  }
}]);
