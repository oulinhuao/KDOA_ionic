/**
 * Created by Tony on 2016/7/12.
 */
angular.module('starter.ResAttachmentController',[
    'ngCordova',
    'starter.ResAttachmentService',
    'starter.commonutils',
    'starter.FileUtilsService',
    'starter.globalservice',
    'starter.NativeUtilsService'])

  .controller('ResAttachmentCtrl', ['$scope',
    '$ionicModal',
    '$ionicPopup',
    '$ionicPlatform',
    '$ionicHistory',
    '$timeout',
    'ResAttachmentService',
    '$cordovaFile',
    '$cordovaFileTransfer',
    'CommonUtils',
    'FileUtils',
    'GlobalSetting',
    'NativeUtils',
    function ($scope,$ionicModal,$ionicPopup,$ionicPlatform,$ionicHistory,
              $timeout,ResAttachmentService,
              $cordovaFile,$cordovaFileTransfer,
              CommonUtils,FileUtils,GlobalSetting,NativeUtils) {
      // android 返回按钮
      $ionicPlatform.onHardwareBackButton(function(){
        if($scope.loadingDialog.isShow){
          cancleDown();
          $scope.loadingDialog.close();
        }else{
          $ionicHistory.goBack();
        }
      });

      $scope.mResAttachmentService = ResAttachmentService;

      /**
       * 点击附件列表的某行
       * @param entity
         */
      $scope.onItemClick = function(entity){
        //$scope.mResAttachmentService.mListCtrl.closeAttachments();
        $scope.downloadFile();
      };

        /**
         * 取消下载
         */
      $scope.cancleDown = function(){
        if($scope.loadingDialog.isShow && $scope.FileTransfer){
          $scope.FileTransfer.abort();
        }
        $scope.loadingDialog.close();
      }

      $scope.progressValue = 0;
      $scope.loadingDialog = {
        isShow:false,
        myPopup:null,
        show:function(){
          if(!$scope.loadingDialog.isShow){
            $scope.loadingDialog.myPopup = $ionicPopup.show({
              title: '下载文件',
              template: '<div><ion-spinner icon="android"></ion-spinner><div style="line-height: 28px;position: absolute;margin-left:6px;display: inline-block">下载中 {{progressValue}} %</div></div>',
              scope: $scope,
              buttons: [
                { text: '取消',
                  type: 'button-positive',
                  onTap: function(e) {
                    $scope.cancleDown();
                  }
                }
              ]
            });
          }
          $scope.loadingDialog.isShow = true;
        },
        close:function(){
          $scope.loadingDialog.myPopup.close();
          $scope.loadingDialog.isShow = false;
        }
      }


      /**
       * 下载图片
       */
      $scope.downloadFile = function(){
        if(!NativeUtils.n.isOnline(true)){
          return;
        }

        //小麦生产技术.mp4
        var url2 = 'http://kingdonsoft.com/zsnd/upload/Media/2016/01/小麦生产技术.mp4';
        var url = 'http://kingdonsoft.com/zsnd/Upload/Media/2016/05/e715508230334a1580d1b4287333c5f5.png';
        var savePath = GlobalSetting.getLocalCachePathWhole();
        var filePathWhole = savePath + "/" + CommonUtils.getFileName(url)


        // 下载进度
        var onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            var downloadProgress = (progressEvent.loaded / progressEvent.total) * 100;
            var p = Math.floor(downloadProgress);
            if($scope.progressValue != p){
              $timeout(function(){
                $scope.progressValue = p;
              },0);
            }
          } else {
          }
        };

        var doDown = function(){
          $scope.loadingDialog.show();
          $scope.FileTransfer = FileUtils.downFile(url,savePath,onprogress,
            function(entry) {
              $scope.loadingDialog.close();
              FileUtils.openFile(filePathWhole);
            },
            function(error) {
              console.log("download error source " + JSON.stringify(error));
              $scope.loadingDialog.close();
            });
        };

        CommonUtils.checkDirIsExist(savePath,function(isOK){
          if(isOK){
            CommonUtils.checkFileIsExist(filePathWhole,function(IsExist){
              if(IsExist){
                FileUtils.openFile(filePathWhole,function(){

                });
              }else{
                doDown();
              }
            });
          }else{
            FileUtils.recurCreateDirectory(GlobalSetting.getLocalPath(),
              GlobalSetting.getLocalCachePath(),
              function(ok){
                if(ok){
                  doDown();
                }
              },
              function(eror){

              });
          }
        });
      }



    }])
