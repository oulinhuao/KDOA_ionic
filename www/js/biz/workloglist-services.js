angular.module('starter.workloglistservice',
  [ 'angularSoap',
  'starter.globalservice'])

.factory("Workloglistservice", ['$soap',
  'GlobalSetting',
  function ($soap,GlobalSetting) {
  var dataList = [];
  var MaxTime;

  var totalCount = 0;
  var countCount = 0;




  return {
    /**
     * 分页获取数据
     * @param callbackMethod
     * @returns {*}
     */
    getWorklogListPaged: function (index,callbackMethod) {
      return $soap.post(GlobalSetting.getUrlBusiness(), "GetMyWorkLogListPaged", {
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

  }
}])
