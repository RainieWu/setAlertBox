/*
	author:		吴颖琳
	contact:	ng.winglam@qq.com
	date: 		2018.01.12-2018.03.24
	p.s.:		依赖jQuery，配合setAlertBox.css使用
*/


/*
	功能：设置弹窗，包括关闭按钮、标题、弹窗信息、按钮
	参数：必选，对象，设置弹窗所用到的信息
		{
			className: "",				// 可选，字符串，弹窗额外的类名
			close: true,				// 可选，布尔值，是否有关闭按钮，默认为false
			maskClose: true,			// 可选，布尔值，点击遮罩能否关闭弹窗，默认为false
			title: "",					// 可选，字符串，标题文本，默认无标题
			message: "",				// 必选，字符串，弹窗信息文本
			buttons: [{					// 可选，数组，默认为一个“确定”按钮
				value: "",				// 必选，字符串，按钮文本
				callback: function() {}	// 可选，函数，点击按钮的回调函数，默认操作为关闭弹窗
			}]
		}
		参数示例1：
			{
				className: "my-alert-box",
				close: true,
				maskClose: true,
				title: "标题",
				message: "弹窗信息",
				buttons: [{
					value: "确定",
					callback: function() {
						console.log("确定");
					}
				}, {
					value: "取消",
					callback: function() {
						console.log("取消");
					}
				}]
			}
		参数示例2：
			{
				message: "弹窗信息"
			}
*/
function setAlertBox(param) {
	if(!param.buttons) {
		param.buttons = [{
			value: "确定",
			callback: function() {
				$(".alert-box").remove();
			}
		}];
	}

	var html = "";
	if(param.className) {
		html += "<div class='alert-box " + param.className +"'>";
	} else {
		html += "<div class='alert-box'>";
	}
	html += "<div class='box'>";
	if(param.close) {
		html += "<span class='close'></span>";
	}
	if(param.title) {
		html += "<p class='title'>" + param.title +"</p>";
	}
	html += "<div class='message'>" + param.message + "</div>"
		 + "<div class='buttons'>";
	for(var i = 0; i < param.buttons.length; i++) {
		html += "<button index=" + (i + 1) +" class='btn" + (i + 1) +"'>" + param.buttons[i].value +"</button>";
		if(!param.buttons[i].callback) {
			param.buttons[i].callback = function() {
				$(".alert-box").remove();
			}
		}
	}
	html += "</div>" + "</div>" + "</div>";
	$("body").append(html);
	$(".alert-box").hide().fadeIn();

	if(param.close) {
		$(".alert-box .close").click(function() {
			$(".alert-box").remove();
		});
	}
	if(param.maskClose) {
		$(".alert-box").click(function(e) {
			if($(e.target).parent().is(("body"))) {
				$(".alert-box").remove();
			}
		});
	}
	$(".alert-box .buttons button").click(function(e) {
		param.buttons[$(e.target).attr("index") - 1].callback();
	});
}