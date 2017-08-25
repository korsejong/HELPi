
module.exports={
    requireAuthentication( req, res, next ) {
        if ( req.isAuthenticated() ) {
            next();
        } else {
            res.redirect( '/' );
        }
    }
}