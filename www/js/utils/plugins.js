var DeviceType="IOS";
//IOS支付宝支付插件
window.ImageLoad = function(str, callback) {
    cordova.exec(callback, function(err) {
                 //callback('Nothing to echo.');
           }, "ImagePlugin", "addStr", [str]);
};

window.ImageLoad1 = function(str, callback) {
    //支付参数
    var zfbData = {};
    //商品简介
    zfbData = {
        "message": 'message', //简介
        "duration": 'long', //标题
        "position": 'center', //订单号
        "addPixelsY": '0'
    }
    cordova.exec(callback, function(err) {
                 }, "Toast", "show", [zfbData]);
};


