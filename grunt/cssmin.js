
module.exports = function ( grunt ) {

    return {
        site: {
            files: {
                '_source/Styles/site.min.css': ['_source/Styles/site.dev.css']
            }
        }
    };

};