var jwt = require("jwt-simple");
var User = require(".././models/user");
var secret = "@123";

module.exports = function(req, res, next) {
    
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    
    if (!token)
        return res.send(401);
        
    try {
        
        var decoded = jwt.decode(token, secret);
        
        if (decoded.exp <= Date.now()) {
            res.json(400, {error: 'Token expired'});
        }
        
        User.findOne({_id: decoded.iss}, function(error, user) {
            
            if (error)
                return res.status(500).json(error);
            
            req.user = user;
            
            return next();            
        });
        
    } catch (error) {
                        
        return res.status(401).json(error);
    }        
};