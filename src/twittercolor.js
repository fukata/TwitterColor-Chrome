// extends String.
String.prototype.trim = function() {
    return this.replace(/^[ ]+|[ ]+$/g, '');
};

// global valiables
var G_TWITTER_TABS = new Object();
var G_RE = new RegExp("");
G_RE.compile("^https?:\/\/twitter\.com");
var G_INTERVAL = 10000;

// updated tabs.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// check url.
	if (tab.url.match(G_RE)) {
		G_TWITTER_TABS[tabId] = tab;
	} else {
		if (tabId in G_TWITTER_TABS) {
			delete G_TWITTER_TABS[tabId];
		}
	}
});

function getOptions() {
	var options = new Object();
	for (var key in default_options) {
		options[key] = localStorage[key] || default_options[key];
	}
	return options;
}

function doUpdateColor() {
	var options = getOptions();
	var source = 'var options = ' + $.toJSON(options) + ';';
	for (var key in G_TWITTER_TABS) {
		var tab = G_TWITTER_TABS[key];
		chrome.tabs.executeScript(tab.id, {"file": "jquery-1.4.2.min.js"}, function(){});
		chrome.tabs.executeScript(tab.id, {"code": source}, function(){});
		chrome.tabs.executeScript(tab.id, {"file": "update-color.js"}, function(){});
	}
	
	// reload
	setTimeout(doUpdateColor, G_INTERVAL);
}

setTimeout(doUpdateColor, G_INTERVAL);
