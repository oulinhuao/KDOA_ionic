/**
 * Created by Tony on 2016/6/23.
 */
angular.module('starter.NativeUtilsService',
  [ 'ngCordova',
    'ionic',])

  .factory("NativeUtils", [
    '$window',
    '$cordovaNetwork',
    '$cordovaToast',
    '$ionicLoading',
    function ($window,$cordovaNetwork,$cordovaToast,$ionicLoading) {

      var ctrl = {
        /**
         * toast相关
         */
        t:{
          /**
           * 底部弹出toast
           * @param str 文字内容
           * @param position 位置 "t" 顶部；"c" 中间。默认底部
             */
          showToast:function(str,position){
            if($window.plugins){
              if(position){
                switch(position){
                  case "t":
                    $cordovaToast.showShortTop(str);
                    break;
                  case "c":
                    $cordovaToast.showShortCenter(str);
                    break;
                }
              }else{
                $cordovaToast.showShortBottom(str);
              }
            }else{
              console.log(" window.plugins 无法识别。Toast内容："+str);
            }
          }
        },
        /**
         * 网络相关
         */
        n:{
          /**
           * 判断是否可以用来判断网络（浏览器测试的时候，无法返回正确，这里加个判断）
           * @returns {boolean}
             */
          isAvailable : function(){
            if(undefined === navigator
              || undefined === navigator.connection
              || undefined === navigator.connection.type){
              console.log("navigator 或 navigator.connection 无法识别");
              return false;
            }else{
              return true;
            }
          },
          /**
           * 判断网络是否可用
           * @returns {boolean}
             */
          isOnline:function(is){
            if(!ctrl.n.isAvailable()){
              return true;
            }
            var s = navigator.connection.type
            if(s !== Connection.NONE){
              return true
            }else{
              if(is){
                ctrl.t.showToast("没有网路连接");
              }
              return false;
            }
          },
          notWIFI:function(){
            if(!ctrl.n.isAvailable()){
              return true;
            }
            if(navigator.connection.type === Connection.WIFI){
              return true;
            }else{
              return false;
            }
          }
        },
        l:{
          isShow:false,
          showLoading:function(){
            ctrl.l.isShow = true;
            $ionicLoading.show({
              content: '加载中...',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          },
          hideLoading:function(){
            if(ctrl.l.isShow){
              $ionicLoading.hide();
            }
          },
          isShown:function(){
            return ctrl.l.isShow;
          }
        },

      };

      return ctrl;
  }]);
