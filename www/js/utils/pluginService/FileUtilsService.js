/**
 * Created by Tony on 2016/7/14.
 */
angular.module('starter.FileUtilsService', [
  'ngCordova',
  'ionic',
  'starter.globalservice'
])

  .factory("FileUtils",[
    '$cordovaFile',
    '$ionicLoading',
    '$cordovaFileOpener2',
    'GlobalSetting',
    function($cordovaFile,$ionicLoading,$cordovaFileOpener2,
      GlobalSetting){

    var self = {

      getFileExtensionName:function(source){
        var eName = "";
        if(source!=null && source!=undefined && source.length>0){
          var p = source.lastIndexOf('.');
          if(p > 0){
            eName = source.substring(p+1);
          }
        }
        return eName;
      },

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
       * 创建文件(如果目录不存在 会自动创建目录)
       * @param path 文件存放路径
       * @param fileName
       * @param callBack
         */
      createFile:function(path, fileName, callBack){
        self.checkDirIsExist(path,function(isOK){
          if(isOK){
            self.checkFileIsExist(path+"/"+fileName,function(exist){
              if(!exist){
                $cordovaFile.createFile(path, fileName, true)
                  .then(function (success) {
                    callBack(true);
                  }, function (error) {
                    callBack(false);
                  });
              }
            });
          }else{
            var root = GlobalSetting.getLocalPath();
            var rootEndPoint = root.length;
            var filePath = rootEndPoint >= 0 ? path.substring(rootEndPoint) : path;
            self.recurCreateDirectory(root,filePath,
              function(success){
                $cordovaFile.createFile(path, fileName, true)
                  .then(function (success) {
                    callBack(true);
                  }, function (error) {
                    callBack(false);
                  });
              },
              function(error){
                console.log("error:"+JSON.stringify(error).toString());
                callBack(false);
              });
          }
        });
      },

      downFile:function(downUrl,savePath,progressFuc,successCall,errorCall){
        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
          progressFuc(progressEvent);
        };
        var uri = encodeURI(downUrl);
        var pathUrl = savePath+"/"+self.getFileName(downUrl);
        ft.download(
          uri,
          pathUrl,
          successCall,
          errorCall,
          false,
          {
            headers: {
              "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
          }
        );
        return ft;
      },
      getMIMEType:function(fileName){
        var MIME_MapTable = [
          // [后缀名， MIME类型]
          [ "3gp", "video/3gpp" ],
          [ "apk", "application/vnd.android.package-archive" ],
          [ "asf", "video/x-ms-asf" ],
          [ "avi", "video/x-msvideo" ],
          [ "bin", "application/octet-stream" ],
          [ "bmp", "image/bmp" ],
          [ "c", "text/plain" ],
          [ "class", "application/octet-stream" ],
          [ "conf", "text/plain" ],
          [ "cpp", "text/plain" ],
          [ "doc", "application/msword" ],
          [ "docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ],
          [ "xls", "application/vnd.ms-excel" ],
          [ "xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ],
          [ "exe", "application/octet-stream" ],
          [ "gif", "image/gif" ],
          [ "gtar", "application/x-gtar" ],
          [ "gz", "application/x-gzip" ],
          [ "h", "text/plain" ],
          [ "htm", "text/html" ],
          [ "html", "text/html" ],
          [ "jar", "application/java-archive" ],
          [ "java", "text/plain" ],
          [ "jpeg", "image/jpeg" ],
          [ "jpg", "image/jpeg" ],
          [ "js", "application/x-javascript" ],
          [ "log", "text/plain" ],
          [ "m3u", "audio/x-mpegurl" ],
          [ "m4a", "audio/mp4a-latm" ],
          [ "m4b", "audio/mp4a-latm" ],
          [ "m4p", "audio/mp4a-latm" ],
          [ "m4u", "video/vnd.mpegurl" ],
          [ "m4v", "video/x-m4v" ],
          [ "mov", "video/quicktime" ],
          [ "mp2", "audio/x-mpeg" ],
          [ "mp3", "audio/x-mpeg" ],
          [ "mp4", "video/mp4" ],
          [ "mpc", "application/vnd.mpohun.certificate" ],
          [ "mpe", "video/mpeg" ],
          [ "mpeg", "video/mpeg" ],
          [ "mpg", "video/mpeg" ],
          [ "mpg4", "video/mp4" ],
          [ "mpga", "audio/mpeg" ],
          [ "msg", "application/vnd.ms-outlook" ],
          [ "ogg", "audio/ogg" ],
          [ "pdf", "application/pdf" ],
          [ "png", "image/png" ],
          [ "pps", "application/vnd.ms-powerpoint" ],
          [ "ppt", "application/vnd.ms-powerpoint" ],
          [ "pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation" ],
          [ "prop", "text/plain" ],
          [ "rc", "text/plain" ],
          [ "rmvb", "audio/x-pn-realaudio" ],
          [ "rtf", "application/rtf" ],
          [ "sh", "text/plain" ],
          [ "tar", "application/x-tar" ],
          [ "tgz", "application/x-compressed" ],
          [ "txt", "text/plain" ],
          [ "wav", "audio/x-wav" ],
          [ "wma", "audio/x-ms-wma" ],
          [ "wmv", "audio/x-ms-wmv" ],
          [ "wps", "application/vnd.ms-works" ],
          [ "xml", "text/plain" ],
          [ "z", "application/x-compress" ],
          [ "zip", "application/x-zip-compressed" ],
          [ "", "*/*" ] ];

        var end = self.getFileExtensionName(fileName);
        console.log(end);
        var type = "*/*";
        for (var i = 0; i < MIME_MapTable.length; i++) {
          if (end == MIME_MapTable[i][0]) {
            type = MIME_MapTable[i][1];
            break;
          }
        }
        return type.toLowerCase();
      },
      openFile:function(wholePath,successCall){
        var type = self.getMIMEType(wholePath);
        console.log(type);
        $cordovaFileOpener2.open(wholePath,type).then(
          successCall, function(err) {
            console.log(JSON.stringify(err));
          });
      }
    }
    return self;

  }])
