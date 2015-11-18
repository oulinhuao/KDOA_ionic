$('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
$(".radio-btn").on('click', function () {
    var _this = $(this),
        block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".radio-btn").removeClass('checkedRadio');
    _this.addClass('checkedRadio');
    _this.find('input:radio').attr('checked', true);
});

$('input[name="myckb_autoKeepPwd"]').wrap('<div class="myckb_autoKeepPwd"><i></i></div>');
$('input[name="myckb_autoLogin"]').wrap('<div class="myckb_autoLogin"><i></i></div>');
$.fn.toggleCheckbox = function () {
    this.attr('checked', !this.attr('checked'));
    return this.attr('checked');
}


$('.myckb_autoLogin').on('click',function () {
    var isChecked = $(this).find(':checkbox').toggleCheckbox();
    $(this).toggleClass('checkedBox');
    
   	if(isChecked == 'checked'){
   		var keepCkb = $('.myckb_autoKeepPwd');
	   	if(keepCkb.find(':checkbox').attr('checked') != 'checked'){
	   		keepCkb.find(':checkbox').toggleCheckbox();
	    	keepCkb.toggleClass('checkedBox');
	   	}
   	}
});

$('.myckb_autoKeepPwd').on('click',function () {
    $(this).find(':checkbox').toggleCheckbox();
    $(this).toggleClass('checkedBox');
    
});




/**
 * 自动登录选择事件
 * @param {Object} isChecked
 */
function autoLogin(isChecked,chkObj){
	chkObj.attr('checked', isChecked);
	if(isChecked){
		alert("选中了");
	}else{
		alert("没");
	}
}

/**
 * 
 * @param {Object} isKeep
 */
function keepPwd(isKeep){
	if(checked){
		alert("记住密码");
	}else{
		alert("不记住");
	}
}

function login(){
//	document.location.href("main.html");     
	window.location.href = "./main.html";
	
}

function goWorkLog(){
	window.location.href = "./worklog.html";
}

