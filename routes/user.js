var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "@123";
var User = require(".././models/user");

module.exports = function(app) {
    
    /**
     * Create a new user
     */
    app.post("/users", function(req, res) {
    
        var newUser = User({
            login: req.body.login,
            password: req.body.password,
            name: req.body.name
        });
    
        newUser.save(function(error) {
        
            if (error) {
                res.status(400).send(error);
                return;
            }                  
            
            res.status(200).send();                    
        });            
    });
    
    /**
     * Authenticate a user and provide token
     */
    app.post("/login", function(req, res) {
        
        var login = req.body.login;
        var password = req.body.password;
        
        if (!login || !password) {
            return res.send(401);
        }                
        
        User.findOne({login: login}, function(error, user) {
            
            if (error)
                return res.send(401);
            
            user.checkPassword(password, function(isMatch) {
                
                if (!isMatch)
                    return res.send(401);
                
                var expires = moment().add(7, "days").valueOf();
                var token = jwt.encode({
                                iss: user.id,
                                exp: expires
                            }, secret);
                            
                return res.json({
                            token: token,
                            expires: expires,
                            user: user.toJSON()
                        });
            });
            
        });
        
    });
};