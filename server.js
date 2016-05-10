/**
 * @author Victor Hugo
 * @since 30/04/2016
 * 
 * Node.js TODO API Sample
 */
var PORT = process.env.PORT || 3000;
var DATABASE_URL = "mongodb://localhost/todo-api";

var _ = require("underscore");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var userRouter = require("./routes/user");
var todoRouter = require("./routes/todos");

var app = express();

mongoose.connect(DATABASE_URL);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed ..."));

db.once("open", function() {
    
    console.log("MongoDB connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Get API root
 */
app.get("/", function(req, res) {
   
   res.send("TODO API Root"); 
});

/**
 * Add Routes
 */
userRouter(app);
todoRouter(app);

/**
 * Start server
 */
app.listen(PORT, function() {     
    
   console.log("Server is up and running!");
   console.log("Listening on port "+PORT+" ..."); 
});