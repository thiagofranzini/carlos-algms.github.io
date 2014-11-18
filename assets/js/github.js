( function (){
	var Github = function (){

		function escapeHtml( str ){
			return $( '<div />' ).text( str ).html();
		}


		function _makeRepoLine( repo ) {
		    var li = $('<li />'), a = $('<a />'), p = $('<p />');

		    li.append(a);
		    li.append(p);

		    a.attr('href', repo.html_url).html(repo.name);
		    p.html( escapeHtml(repo.description || '') );

		    return li;
		}

		function render( targetId, repos ) {
		    var target = $(targetId);
		    target.empty();

		    _.forEach(repos, function (repo) {
		        target.append( _makeRepoLine(repo) );
		    });
		}

		function clearRepos( repos, options ) {
		    var clean = _removeForks(repos, options);
		    clean = _removeExceededRepos(repos, options);
		    return clean;
		}

		function _removeForks( repos, options ) {

			if( ! options.skip_forks ) return repos;

			return _.filter(repos, function(repo) {
			    return !repo.fork;
			});
		}

		function _removeExceededRepos(repos, options) {
		    if (!options.count) return repos;
		    return repos.splice(options.count);
		}

		return {
		    showRepos : function ( options ){
				$.ajax({
					url : "https://api.github.com/users/" + options.user + "/repos?sort=pushed",
					dataType: 'json',
                    cache: true
				})
				.done(function (data) {

					if( ! data ) return;

					var repos = clearRepos(data, options);

					render( options.target, repos );
				})
				.fail(function ( err ) {
					$( options.target + ' li.loading' ).addClass( 'error' ).text( "Error loading feed" );
				});
			}
		};
	};

	$(function() {

	    setTimeout(function() {
		    var githubReposContainers = $('.github-repos-container');

		    if( githubReposContainers.length ) {
			    var github = Github();

			    $('.github-repos-container').each(function () {
				    github.showRepos( $(this).data('data') );
			    });
		    }
	    }, 100);
    });

} )();