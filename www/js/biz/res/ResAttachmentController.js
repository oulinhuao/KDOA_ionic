/**
 * Created by Tony on 2016/7/12.
 */
angular.module('starter.ResAttachmentController',[
    'ngCordova',
    'starter.ResAttachmentService',
    'starter.commonutils',
    'starter.FileUtilsService',
    'starter.globalservice'])

  .controller('ResAttachmentCtrl', ['$scope',
    '$ionicModal',
    'ResAttachmentService',
    '$cordovaFile',
    '$cordovaFileTransfer',
    'CommonUtils',
    'FileUtils',
    'GlobalSetting',
    function ($scope,$ionicModal,ResAttachmentService,$cordovaFile,$cordovaFileTransfer,
              CommonUtils,FileUtils,GlobalSetting) {
      $scope.mResAttachmentService = ResAttachmentService;

      $scope.pro = "";

      $scope.onItemClick = function(entity){
        //$scope.mResAttachmentService.mListCtrl.closeAttachments();
        $scope.downloadImage();
      };

      //下载图片
      $scope.downloadImage = function(){
        var savePath = GlobalSetting.getLocalCachePathWhole();
        var url = 'http://www.hangge.com/blog/images/logo.png';

        CommonUtils.checkDirIsExist(savePath,function(isOK){
          if(isOK){
            CommonUtils.checkFileIsExist(savePath + "/" + CommonUtils.getFileName(url),function(resp){
              if(resp){
              }else{
                down();
              }
            });
          }else{

          }
        });

        function down(){
          var ft = new FileTransfer();
          var uri = encodeURI(url);
          var pathUrl = savePath+"/"+FileUtils.getFileName(url);
          console.log('开始下载'+pathUrl);

          ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
              $scope.pro = "进度是：" + progressEvent.loaded / progressEvent.total;
            } else {
            }
          };
          ft.download(
            uri,
            pathUrl,
            function(entry) {
              console.log("download complete: " + entry.toURL());
            },
            function(error) {
              console.log("download error source " + error.source);
              console.log("download error target " + error.target);
              console.log("upload error code" + error.code);
            },
            false,
            {
              headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
              }
            }
          );
        }

      }



    }])
