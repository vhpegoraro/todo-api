var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
   
   res.send("TODO API Root"); 
});

app.listen(PORT, function() {
    
   console.log("Server is up and running!");
   console.log("Listening on port "+PORT+" ..."); 
});