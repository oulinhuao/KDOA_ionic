var DeviceType="IOS";
//IOS支付宝支付插件
window.ImageLoad = function(str, callback) {
    cordova.exec(callback, function(err) {
                 //callback('Nothing to echo.');
           }, "ImagePlugin", "addStr", [str]);
};

function DateStringToLong(dateStr){
    if(dateStr==null || dateStr=="null"){
        return 0;
    }
    var strTime=dateStr.substring(0,19);
    var longDate= new Date((strTime).replace(new RegExp("-","gm"),"/")).getTime();
    return longDate;
}