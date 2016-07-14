/**
 * Created by Tony on 2016/7/12.
 */
angular.module('starter.ResAttachmentController',[
    'ngCordova',
    'starter.ResAttachmentService',
    'starter.commonutils',
    'starter.globalservice'])

  .controller('ResAttachmentCtrl', ['$scope',
    '$ionicModal',
    'ResAttachmentService',
    '$cordovaFile',
    'CommonUtils',
    'GlobalSetting',
    function ($scope,$ionicModal,ResAttachmentService,$cordovaFile,
              CommonUtils,GlobalSetting) {
      $scope.mResAttachmentService = ResAttachmentService;

      $scope.onItemClick = function(entity){
        $scope.mResAttachmentService.mListCtrl.closeAttachments();
        $scope.downloadImage();
      };

      //下载图片
      $scope.downloadImage = function(){
        var savePath = GlobalSetting.getLocalCachePathWhole();
        var url = 'http://www.hangge.com/blog/images/logo.png';

        CommonUtils.checkDirIsExist(savePath,function(isOK){
          if(isOK){
            console.log('文件夹已经存在');
            CommonUtils.checkFileIsExist(savePath + "/" + CommonUtils.getFileName(url),function(resp){
              if(resp){
                console.log('文件已经存在');
              }else{
                console.log('文件不存在');
              }
            });
          }else{
            CommonUtils.recurCreateDirectory(
              GlobalSetting.getLocalPath(),
              GlobalSetting.getLocalRootPath()+"/"+GlobalSetting.getLocalCachePath(),
              function(success){
                console.log("success:"+success.toString());

                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                //  fs.root.getFile(savePath+"/newPersistentFile.txt", {create: true, exclusive: false},
                //    function (fileEntry) {
                //      console.log("success:" + fileEntry.toURL());
                //    },
                //    function (error) {
                //      console.log("error:" + JSON.stringify(error).toString());
                //    })
                //});
              },
              function(error){
                console.log("error:"+JSON.stringify(error).toString());
              });
            }
          });

      }

      //下载文件
      function download(fileEntry, uri) {
        var fileTransfer = new FileTransfer();
        var fileURL = fileEntry.toURL();

        fileTransfer.download(
          uri,
          fileURL,
          function (entry) {
            console.log("下载成功！");
            console.log("文件保存位置: " + entry.toURL());
          },
          function (error) {
            console.log("下载失败！");
            console.log("error source " + error.source);
            console.log("error target " + error.target);
            console.log("error code" + error.code);
          },
          null, // or, pass false
          {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
          }
        );
      }

      //文件创建失败回调
      function  onErrorCreateFile(error){
        console.log("文件创建失败！")
      }

      //FileSystem加载失败回调
      function  onErrorLoadFs(error){
        console.log("文件系统加载失败！")
      }

    }])
