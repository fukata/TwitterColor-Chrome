var default_options = new Object();
default_options.username = "";
default_options.my_bg_color = "E3F1FF";
default_options.to_my_bg_color = "F7F8AA";
default_options.more_rule_count = 0;
default_options.more_rule_max = 10;
default_options.more_rule_color = "F7F8AA";
for (var i=1; i<default_options.more_rule_max; i++) {
	default_options["rule_text_"+i] = "";
	default_options["rule_color_"+i] = "";
}