var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var todos = createTodos();

app.get("/", function(req, res) {
   
   res.send("TODO API Root"); 
});

app.get("/todos", function(req, res) {
   
   res.json(todos); 
});

app.get("/todos/:id", function(req, res) {
    
    var id = parseInt(req.params.id, 10);
    var todo = null;
    
    todos.forEach(function(t) {
        if (t.id == id) {
            todo = t;
            return;   
        }                
    });
    
    if (todo) {
        res.json(todo);
    } else
        res.status(404).send();                 
});

app.listen(PORT, function() {     
    
   console.log("Server is up and running!");
   console.log("Listening on port "+PORT+" ..."); 
});

function createTodos() {
    
    var todo1 = {id: 1, description: "Morning lunch", done: true};
    var todo2 = {id: 2, description: "Play videogame", done: true};
    var todo3 = {id: 3, description: "Study Node.js", done: false};
    var todos = [todo1, todo2, todo3];
    
    return todos;
};