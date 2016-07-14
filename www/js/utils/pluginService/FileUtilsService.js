/**
 * Created by Tony on 2016/7/14.
 */
angular.module('starter.FileUtilsService', [
  'ngCordova',
  'starter.globalservice'
])

  .factory("FileUtils",[
    '$cordovaFile',
    'GlobalSetting',
    function($cordovaFile,
      GlobalSetting){

    var ctrl = {

      /**
       * 获取文件名
       * @param source
       * @returns {*}
       */
      getFileName: function(source){
        var fileName = null;
        if(source!=null && source!=undefined && source.length>0){
          if(source.indexOf("/")<0){
            fileName = source;
          }else{
            var p = source.lastIndexOf('/');
            if ((p > -1) && (p < (source.length))) {
              fileName = source.substring(source.lastIndexOf("/") + 1);
            }
          }
        }
        return fileName;
      },
      /**
       * 递归创建目录
       * @param path     根目录
       * @param dir      文件夹名
       * @param success
       * @param fail
       */
      recurCreateDirectory: function(path, dir, success, fail){
        var self = this;
        if(dir.indexOf('/')>=0){
          var first = dir.substring(0,dir.indexOf('/'));
          var remain = dir.substring(dir.indexOf('/')+1);
          $cordovaFile.createDir(path, first, true).then(function(){
            self.recurCreateDirectory(path+'/'+first, remain, success, fail);
          }, fail);
        } else {
          $cordovaFile.createDir(path, dir, true).then(success, fail);
        }
      },
      /**
       * 检查文件是否存在
       * @param path
       * @param callbackMethod
       */
      checkFileIsExist: function (path, callbackMethod) {
        if (path != undefined && path != null && path != "") {
          var root = path.substring(0, path.lastIndexOf("/") + 1);
          var name = path.substring(path.lastIndexOf("/") + 1);
          $cordovaFile.checkFile(root, name).then(function (res) {
            callbackMethod(true);
          }, function (err) {
            console.log(err.message);
            callbackMethod(false);
          });
        } else {
          callbackMethod(false);
        }
      },
      /**
       *
       * @param path
       * @param callbackMethod
       */
      checkDirIsExist: function(path, callbackMethod){
        if (path != undefined && path != null && path != "") {
          var root = path.substring(0, path.lastIndexOf("/") + 1);
          var name = path.substring(path.lastIndexOf("/") + 1);
          $cordovaFile.checkDir(root, name).then(function (res) {
            callbackMethod(true);
          }, function (err) {
            console.log(err.message);
            callbackMethod(false);
          });
        } else {
          callbackMethod(false);
        }
      },
      /**
       * 创建文件
       * @param path 文件存放路径
       * @param fileName
       * @param callBack
         */
      createFile:function(path, fileName, callBack){
        ctrl.checkDirIsExist(path,function(isOK){
          if(isOK){
            ctrl.checkFileIsExist(path+"/"+fileName,callBack);
          }else{
            var rootEndPoint = path.lastIndexOf(GlobalSetting.getLocalPath()) + 1;
            var root = path.substring(0,rootEndPoint);
            var filePath = path.substring(rootEndPoint);

            ctrl.recurCreateDirectory();
          }
        });
        ctrl.checkFileIsExist(path+"/"+fileName,callBack);
      }
    }
    return ctrl;

  }])
