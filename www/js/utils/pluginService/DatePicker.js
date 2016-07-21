/*
* 打开日期选择工具
* */
angular.module('starter.DatePickerService',
  [ 'ngCordova'])

.factory("DatePickerService", ['$cordovaDatePicker',
  function ($cordovaDatePicker) {
    var ctrl = {
      options : {
        date: new Date(),
        mode: 'date',
        androidTheme:'THEME_HOLO_LIGHT',
        todayText:'今天',
        cancelText:'取消',
        okText:'确定',
        doneButtonLabel:'确定',
        cancelButtonLabel:'取消'
      },
      onSuccess:function(date) {
        console.log(JSON.stringify(date));
      },
    onError:function(error) {
      console.log(JSON.stringify(error));
    },
      selectDate:function(options,sc,ec){
        $cordovaDatePicker.show(options).then(sc, ec);
      },
      selectDate:function(sc){
        $cordovaDatePicker.show(ctrl.options).then(sc, ctrl.onError);
      }
    };
    return ctrl;
}]);
