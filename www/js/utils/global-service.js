angular.module('starter.globalservice', [])
.factory("GlobalSetting", function() {
  var localPageSize, // local data's page size
    serverPageSize, // server data's page size
    UrlBusiness, // 业务接口
    UrlUser, // 用户接口
    maxRecordValue, // 最大可下载极限值
    attachPrefixUrl, //附件路径前缀
    localPath,// 存储设备根目录
    localRootPath, // 本地存储根目录
    localCachePath, // 本地存储缓存根目录
    localTxtPath; // 本地存储文本文件目录;

  var UserId;
  var UserToken;

  return {
    getLocalPageSize: function() {
      return localPageSize;
    },
    setLocalPageSize: function(size) {
      localPageSize = size;
    },
    getServerPageSize: function() {
      return serverPageSize;
    },
    setServerPageSize: function(size) {
      serverPageSize = size;
    },
    getUrlBusiness: function() {
      return UrlBusiness;
    },
    setUrlBusiness: function(url) {
      UrlBusiness = url;
    },
    getMaxRecordValue: function() {
      return maxRecordValue;
    },
    setMaxRecordValue: function(val) {
      maxRecordValue = val;
    },
    getAttachPrefixUrl: function() {
      return attachPrefixUrl;
    },
    setAttachPrefixUrl: function(url) {
      attachPrefixUrl = url;
    },
    getUrlUser: function() {
      return UrlUser;
    },
    setUrlUser: function(url) {
      UrlUser = url;
    },
    /**
     * 获取系统存储根目录
     * @returns {*}
       */
    getLocalPath: function() {
      return localPath;
    },
    setLocalPath: function(path) {
      localPath = path;
    },
    getLocalRootPath: function() {
      return localRootPath;
    },
    getLocalRootPathWhole: function() {
      return this.getLocalPath() + this.getLocalRootPath();
    },
    getLocalCachePath: function() {
      return localCachePath;
    },
    getLocalCachePathWhole: function() {
      return this.getLocalRootPathWhole() + "/" + this.getLocalCachePath();
    },
    setLocalRootPath: function(path) {
      localRootPath = path;
    },
    getLocalTxtPath: function() {
      return localTxtPath;
    },
    setLocalTxtPath: function(path) {
      localTxtPath = path;
    },
    getUserId: function() {
      return localStorage.getItem("userId");
      //if(typeof(UserId) == "undefined" || UserId == 0) {
      //  return 22;
      //}else{
      //  return UserId;
      //}
    },
    setUserId: function(id) {
      localStorage.setItem("userId",id);
      //UserId = id;
    },
    getUserToken: function() {
      return localStorage.getItem("token");
      //if(typeof(UserToken) == "undefined" || UserToken.length == 0){
      //  return '151126144459';
      //}else{
      //  return UserToken;
      //}
    },
    setUserToken: function(token) {
      localStorage.setItem("token",token);
      //UserToken = token;
    },
    initSetting: function() {
      localPageSize = 20;
      serverPageSize = 20;
      maxRecordValue = 200;
      UrlBusiness = "http://kingdonsoft.com:8003/KDOA/webservice/mobile.asmx";
      UrlUser = "http://kingdonsoft.com:8003/KDOAWeb/webservice/mobile.asmx";
      localRootPath = "KDOA_Ionic";
      localCachePath = "cache";
      localTxtPath = "txt";
    },
    getUploadParameter:function(obj){
      var back = "";
      switch(typeof(obj))
      {
        case "string":
        case "number":
        case "boolean":
        case "object":
          back = obj == null ? "" : obj;
          break;
      }
      return back;
    }
  }
});
