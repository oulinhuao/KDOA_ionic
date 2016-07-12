angular.module('starter.workloglistservice',
  [ 'angularSoap',
  'starter.globalservice'])

.factory("Workloglistservice", ['$soap',
  'GlobalSetting',
  function ($soap,GlobalSetting) {

  return {
    /**
     * 分页获取数据
     * @param callbackMethod
     * @returns {*}
     */
    getWorklogListPaged: function (index,callbackMethod) {
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetMyWorkLogListPaged", {
        beginWorkDate:"2001-12-1",
        endWorkDate:"",
        pageIndex: index,
        pageSize: GlobalSetting.getServerPageSize(),
        userId: GlobalSetting.getUserId(),
        token: GlobalSetting.getUserToken(),
      }).then(function(response){
        callbackMethod(response);
      });
    },

  }
}])
