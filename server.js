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
var app = express();

mongoose.connect(DATABASE_URL);
var db = mongoose.connection;
var Todo = require("./models/todo");

db.on("error", console.error.bind(console, "MongoDB connection failed ..."));

db.once("open", function() {
    
    console.log("MongoDB connected!");
});

app.use(bodyParser.json());

/**
 * Get API root
 */
app.get("/", function(req, res) {
   
   res.send("TODO API Root"); 
});

/**
 * Get all todos
 */
app.get("/todos", function(req, res) {      
   
   Todo.find({}, function(err, todos) {
        
        if (err) 
            res.status(500).send();
        
        res.json(todos);                
    });       
});

/**
 * Get a todo by its id
 */
app.get("/todos/:id", function(req, res) {    
    
    Todo.findById(req.params.id, function(error, todo) {
       
       if (error)
           res.status(400).send();
        
        if (todo) {
            res.json(todo);
        } else
            res.status(404).send();
    });                                 
});

/**
 * Create a new todo
 */
app.post("/todos", function(req, res) {
   
    var newTodo = Todo({
        description: req.body.description,
        done: req.body.done
    });
   
   newTodo.save(function(error) {
       
       if (error) {
           res.status(400).send();
           return;
       }                  
        
        res.status(200).send();                    
   });            
});

/**
 * Delete a todo
 */
app.delete("/todos/:id", function(req, res) {
      
    Todo.findByIdAndRemove(req.params.id, function(error, todo) {
       
       if (error)
           res.status(400).send();
        
        if (todo) {
            res.status(200).send();
        } else {
            res.status(404).send();
        }            
    });
});

/**
 * Update a todo
 */
app.put("/todos", function(req, res) {
    
    Todo.findByIdAndUpdate(req.body._id, { $set: req.body }, function(error, todo) {       
       
       if (error)
           res.status(400).send();
        
        if (todo) {
            res.status(200).send();
        } else {
            res.status(404).send();
        }            
    });
});

/**
 * Start server
 */
app.listen(PORT, function() {     
    
   console.log("Server is up and running!");
   console.log("Listening on port "+PORT+" ..."); 
});