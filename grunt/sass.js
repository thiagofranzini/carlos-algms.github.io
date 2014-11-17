
module.exports = function ( grunt, options ) {

    return {
        site: {
            options: {
                outputStyle: 'expanded'
            },
            files: {
                'assets/scss/site.css': 'assets/scss/site.scss'
            }
        }
    };

}