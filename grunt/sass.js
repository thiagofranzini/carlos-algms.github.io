
module.exports = function ( grunt, options ) {

    return {
        site: {
            options: {
                outputStyle: 'expanded'
            },
            files: {
                '_source/Styles/site.dev.css': 'assets/scss/site.scss'
            }
        }
    };

}