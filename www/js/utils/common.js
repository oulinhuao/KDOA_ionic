
function DateStringToLong(dateStr){
    if(dateStr==null || dateStr=="null"){
        return 0;
    }
    var strTime=dateStr.substring(0,19);
    var longDate= new Date((strTime).replace(new RegExp("-","gm"),"/")).getTime();
    return longDate;
}

function show(obj) {
    document.getElementById(obj).style.display="";//隐藏
}

 function hide(obj) {
    document.getElementById(obj).style.display="none";//隐藏
}

function showOrHide(obj){
    var style=document.getElementById(obj).style.display;
    if(style=='none'){
        style="";
    }else{
        style="none";
    }
    document.getElementById(obj).style.display=style;//隐藏
}

function createYears(obj, Cyear) {
    var len = 134; // select长度,即option数量
    var selObj = document.getElementById(obj);
    var selIndex = len - 1;
    var newOpt; // OPTION对象
    
    // 循环添加OPION元素到年份select对象中
    for (i = 1; i <= len; i++) {
        if (selObj.options.length != len) { // 如果目标对象下拉框升度不等于设定的长度则执行以下代码
            newOpt = window.document.createElement("OPTION"); // 新建一个OPTION对象
            newOpt.text = Cyear - len + i; // 设置OPTION对象的内容
            newOpt.value = Cyear - len + i; // 设置OPTION对象的值
            selObj.options.add(newOpt, i); // 添加到目标对象中
        }
        
    }
}

// 验证手机号码
function validateMobile(mobile)
{
    if(mobile.length==0)
    {
        return false;
    }
    if(mobile.length!=11)
    {
        return false;
    }
    
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!myreg.test(mobile))
    {
        return false;
    }
    
    return true;
}

// 验证邮箱
function validateEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}
