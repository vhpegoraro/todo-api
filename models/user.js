var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

userSchema.pre("save", function(next) {
  
    var user = this;
  
    if (!user.isModified("password")) 
        return next();
  
    bcrypt.genSalt(5, function(err, salt) {
        
        if (err) 
            return next(err);
    
        bcrypt.hash(user.password, salt, null, function(err, hash) {
             
            if (err) 
                return next(err);
            
            user.password = hash;
      
            next();
        });
    });
});

userSchema.methods.checkPassword = function(password, next) {
    
    bcrypt.compare(password, this.password, function(err, isMatch) {
      
        if (err) 
            return next(err);
        
        next(isMatch);
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
