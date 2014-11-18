
$(document).ready(function() {
	var each = function(i, block) {
		hljs.highlightBlock(block);
	};

	$('pre code').each(each);
});