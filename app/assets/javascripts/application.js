// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks

// Bootstrap
//= require bootstrap-sprockets

//= require_tree .

$(document).ready(function(){
	// Bootstrap
	$('[data-toggle="tooltip"]').tooltip(); 
	$('[data-toggle="popover"]').popover(); 
});

// 生成短链
function shorten(form) {
	// 统一定义API服务器地址
	var apiServer = 'http://api.urlis.cn/';

	$.ajax({
		url: apiServer + 'shortens/v1',
		type: 'post',
		data: $(form).serialize(),
		complete: function(xhr) {
			if (xhr.status == 201) {
				$('#shorten_fail').hide();
				$('#shorten_success').fadeIn();
				$('#short').href(xhr.responseJSON.short);
				$('#short').text(xhr.responseJSON.short);
			} else if (xhr.status == 0) {
				// alert('创建账户失败！\n' + xhr.status + xhr.responseText);
				$('#shorten_success').hide();
				$('#shorten_fail').fadeIn();
				$('#shorten_fail_text').text('服务器未响应，可能是网络故障。');
			} else {
				$('#shorten_success').hide();
				$('#shorten_fail').fadeIn();
				$('#shorten_fail_text').text(xhr.responseJSON.error);
			}
      // {
      //  "readyState":4,
      //  "responseText":"{\"success\":\"测试成功\"}",
      //  "responseJSON":{"success":"测试成功"},
      //  "status":200,
      //  "statusText":"OK"
      // }
    },
  });

	return false;
}	

// //获取剪贴板数据方法
// function getClipboardText(event){
//   var clipboardData = event.clipboardData || window.clipboardData;
//   return clipboardData.getData("text");
// };


// //设置剪贴板数据
// function setClipboardText(event, value){
//   if(event.clipboardData){
//     return event.clipboardData.setData("text/plain", value);
//   }else if(window.clipboardData){
//     return window.clipboardData.setData("text", value);
//   }
// };