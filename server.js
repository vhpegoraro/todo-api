/**
 * @author Victor Hugo
 * @since 30/04/2016
 * 
 * Node.js TODO API Sample
 */
var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var PORT = process.env.PORT || 3000;
var todos = getAll();

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
   
   res.json(todos); 
});

/**
 * Get a todo by its id
 */
app.get("/todos/:id", function(req, res) {
    
    var id = parseInt(req.params.id, 10);
    var todo = findById(id);        
    
    if (todo) {
        res.json(todo);
    } else
        res.status(404).send();                 
});

/**
 * Create a new todo
 */
app.post("/todos", function(req, res) {
   
    var todo = req.body;
    
    if (todo) {
        save(todo);
        res.status(201).send();
    } else
        res.status(406).send();    
});

/**
 * Start server
 */
app.listen(PORT, function() {     
    
   console.log("Server is up and running!");
   console.log("Listening on port "+PORT+" ..."); 
});

/**
 * Create and return all todos
 */
function getAll() {
    
    var todo1 = {id: 1, description: "Morning lunch", done: true};
    var todo2 = {id: 2, description: "Play videogame", done: true};
    var todo3 = {id: 3, description: "Study Node.js", done: false};
    var todos = [todo1, todo2, todo3];
    
    return todos;
};

/**
 * Find and return a todo by id
 */
function findById(id) {
    
    var todo = null;            
    
    todos.forEach(function(t) {
        if (t.id == id) {
            todo = t;
            return;   
        }                
    });
    
    return todo;
};

/**
 * Save a new todo
 */
function save(todo) {
    
    var id = todos.length;
    
    if (id == 0) {
        id = 1;
    } else 
        id++;
    
    todo.id = id;
          
    todos.push(todo);
    
};