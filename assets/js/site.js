
$(function() {
	var each = function(i, block) {
		hljs.highlightBlock(block);
	};

	$('pre code').each(each);
});

(function () {
    var style = $('#devCss');

    window.updateCss = function () {
        style.attr('href', style.attr('href').replace(/\?*[0-9]*$/, '?' + Date.now()));
        console.log('update-CSS');
    };

    $DOC.keyup(function (e) {
        if (e.keyCode == 193) updateCss();
    });

    if (location.search.indexOf('refresh') !== -1) {
        setInterval(window.updateCss, 1000);
    }
})();