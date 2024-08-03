const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
    const token = req.header('Authorization');
    if ( !token ) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify( token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch ( e ) {
        res.status(401).json({ message: "Token is not valid" });
    }
}