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
    
    var todo = findByRequestId(req);        
    
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
    
    if (!isValidTodo(todo))
        return res.status(400).send();        
    
    save(todo);
    
    res.status(200).send();    
});

/**
 * Delete a todo
 */
app.delete("/todos/:id", function(req, res) {
      
    var todo = findByRequestId(req);        
    
    if (todo) {
        todos = _.reject(todos, function(t) {
            return t.id == todo.id;
        });
        res.status(200).send();
    } else
        res.status(404).send();
});

/**
 * Update a todo
 */
app.put("/todos", function(req, res) {
    
    if (!isValidPutRequest(req))
        res.status(400).send(); 
      
    var todo = findById(req.body.id);        
    
    if (todo) {
        var updatedTodo = _.extend(todo, req.body);
        todos.forEach(function(t) {
            if (t.id == updatedTodo.id) {
                 t = updatedTodo;
                 return;
            }                 
        });
        res.status(200).send();
    } else
        res.status(404).send();
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
 * Return a todo by its request id
 */
function findByRequestId(req) {
  
    return _.findWhere(todos, {id: parseInt(req.params.id, 10)});
};

/**
 * Return a todo by its id
 */
function findById(id) {
  
    return _.findWhere(todos, {id: id});
};

/**
 * Check if todo is valid
 */
function isValidTodo(todo) {
    
    var isTodoObject = (_.isString(todo.description) && _.isBoolean(todo.done));
    var hasDescription = (isTodoObject && todo.description.trim().length > 0);
    var isValid = (isTodoObject && hasDescription);
    
    return isValid;
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
    
    todo = _.pick(todo, "id", "description", "done");
              
    todos.push(todo);    
};

/**
 * Check if the PUT request body is valid
 */
function isValidPutRequest(req) {
    
    var body = _.pick(req.body, "description", "completed");
        
    //TODO implement this ...
    
    return true;
};