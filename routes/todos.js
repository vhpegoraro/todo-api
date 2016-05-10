var requireAuth = require(".././middlewares/require-auth");
var Todo = require(".././models/todo");

module.exports = function(app) {
    
    /**
     * Get all todos
     */
    app.get("/todos", requireAuth, function(req, res) {      
    
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
};
