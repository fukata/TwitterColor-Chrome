// 設定値
//alert(localStorage["username"]);
var username = "fukata";
var my_bg_color = "#E3F1FF";
var to_my_bg_color = "#BFE800";

if ($("#timeline > li").size() > 0) {
	processOldUI();
} else {
	processNewUI();
}

// for old ui.
function processOldUI() {
	$("#timeline > li").each(function(){
		// author > a.href
		// Author Name
		var el_author_url = $("span.author > a", this)[0].href;
		var _splited = el_author_url.split("/");
		var author = _splited[_splited.length-1];
		if (author==options.username) {
			$(this).css("background-color","#"+options.my_bg_color);
		}
		// Entry Content
		var el_entry_content = $("span.status-body > span.status-content > span.entry-content", this)[0];
		var content = ""+el_entry_content.innerHTML;
		content = content.replace(/<\/?[^>]+>/gi, "");
		if (content.indexOf("@"+options.username, 0) != -1) {
			$(this).css("background-color","#"+options.to_my_bg_color);
		}
		
		// More rules
		if (options.more_rule_count>0) {
			for (var i=1; i<=options.more_rule_count; i++) {
				var _text = options["rule_text_"+i];
				var _color = options["rule_color_"+i];
				if (content.indexOf(_text, 0) != -1) {
					$(this).css("background-color","#"+_color);
					continue;
				}
				if (author.indexOf(_text, 0) != -1) {
					$(this).css("background-color","#"+_color);
					continue;
				}
			}
		}
	});	
}

// for new ui.
function processNewUI() {
	$("div.stream-item > div.stream-item-content").each(function(){
		// author > a.href
		// Author Name
		var author = $(this).attr('data-screen-name');
		if (author==options.username) {
			$(this).css("background-color","#"+options.my_bg_color);
		}
		// Entry Content
		var content = $(this).find('div.tweet-text').first().text();
		content = content.replace(/<\/?[^>]+>/gi, "");
		if (content.indexOf("@"+options.username, 0) != -1) {
			$(this).css("background-color","#"+options.to_my_bg_color);
		}
		
		// More rules
		if (options.more_rule_count>0) {
			for (var i=1; i<=options.more_rule_count; i++) {
				var _text = options["rule_text_"+i];
				var _color = options["rule_color_"+i];
				if (content.indexOf(_text, 0) != -1) {
					$(this).css("background-color","#"+_color);
					continue;
				}
				if (author.indexOf(_text, 0) != -1) {
					$(this).css("background-color","#"+_color);
					continue;
				}
			}
		}
	});
}
