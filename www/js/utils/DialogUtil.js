/**
 * Created by Tony on 2015/11/27.
 */

angular.module('DialogService',['ionic'])
  .factory('DialogUtil',['$ionicPopup',
    function($ionicPopup){
    return{
      /**
       * 确认对话框
       * @param titleStr 标题文字
       * @param template 内容文字
       * @returns 空：取消，1：确定
         */
      dialogConfirm : function (titleStr,template){
        if(typeof(titleStr) == "undefined" || titleStr.length == 0){
          titleStr = '确认提示';
        }
        if(typeof(template) == "undefined" || template.length == 0){
          template = '';
        }
        var dialog = $ionicPopup.show({
          template: template,
          title: titleStr,
          buttons: [
            { text: '取消' },
            {
              text: '确定',
              type: 'button-positive',
              onTap: function(e) {
                return 1;
              }
            },
          ]
        });
        return dialog;
      }
    };

  }]);
