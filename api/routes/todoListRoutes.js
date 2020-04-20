'use strict';
module.exports = function(app) {
    const todoList = require('../controllers/todoListController');
    
    app.route('/tasks')
    .get(todoList.getTasks)
    .post(todoList.createTask);
    
    app.route('/tasks/:taskId')
    .get(todoList.getTask)
    .put(todoList.updateTask)
    .delete(todoList.deleteTask);
};
