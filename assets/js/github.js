require(['jquery'], function ($) {

  $(function (){
    var githubReposContainers = $( '.github-repos-container' );
    if( ! githubReposContainers.length ) {
      return;
    }

    setTimeout(function () {
      var github = Github();

      githubReposContainers.each( function (){
        github.showRepos( $( this ).data( 'data' ) );
      });
    }, 1000);
  });

  //////////////////

  function Github() {
    return {
      showRepos : _showRepos
    };

    function _showRepos( options ) {
      $.ajax({
        url : "https://api.github.com/users/" + options.user + "/repos?sort=pushed",
        dataType : 'json',
        cache : true
      })
      .done(_showReposDone)
      .fail(_showReposFail);
    }

    function _showReposDone( data ){
      if( ! data ) {
        return;
      }
      var repos = _clearRepos( data, options );
      _render( options.target, repos );
    }

    function _showReposFail( err ){
      $( options.target + ' li.loading' ).addClass( 'error' ).text( "Error loading feed" );
    }

    function _clearRepos( repos, options ){
      var clean = _removeForks( repos, options );
      clean = _removeExceededRepos( clean, options );
      return clean;
    }

    function _removeForks( repos, options ){
      if( ! options.skip_forks ) {
        return repos;
      }

      return repos.filter(function ( repo ){
        return ! repo.fork;
      });
    }

    function _removeExceededRepos( repos, options ){
      if( ! options.count ) {
        return repos;
      }
      return repos.splice( options.count );
    }

    function _render( targetId, repos ) {
      var target = $( targetId );
      target.empty();

      repos.forEach(function ( repo ){
        target.append( _makeRepoLine( repo ) );
      });
    }

    function _makeRepoLine( repo ){
      var li = $( '<li />' );
      _appendLink(li, repo);
      _appendDescription(li, repo);

      return li;
    }

    function _appendLink(li, repo) {
      $( '<a />' )
        .attr( 'href', repo.html_url )
        .html( repo.name )
        .appendTo( li );
    }

    function _appendDescription(li, repo) {
      $( '<p />' )
        .appendTo(li)
        .html( escapeHtml( repo.description || '' ) );
    }

    function escapeHtml( str ){
      return $( '<div />' ).text( str ).html();
    }
  }

});
