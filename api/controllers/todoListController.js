const fs = require('fs'),
        path = require("path"),
        TodoModel = require("../models/todoModel");
const dataPath = path.join(__dirname, '../../data/tasks.json');

class TodoListController {
    
    getTasks(req, res) {
        try {
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                let tasks = JSON.parse(rawdata);
                const query = req.query;
                if (!Object.keys(query).length) return res.json(tasks);
                
                let term;
                if (query.search) {
                    term = new RegExp(query.search, 'i');
                    tasks = tasks.filter(task => term.test(task.title) || term.test(task.description));
                }
                if (query.create_lt) {
                    term = new Date(query.create_lt).getTime();
                    if (term) tasks = tasks.filter(task => term > new Date(task.created_at).getTime());
                }
                if (query.create_gt) {
                    term = new Date(query.create_gt).getTime();
                    if (term) tasks = tasks.filter(task => term < new Date(task.created_at).getTime());
                }
                if (query.complete_lt) {
                    term = new Date(query.complete_lt).getTime();
                    if (term) tasks = tasks.filter(task => term > new Date(task.date).getTime());
                }
                if (query.complete_gt) {
                    term = new Date(query.complete_gt).getTime();
                    if (term) tasks = tasks.filter(task => term < new Date(task.date).getTime());
                }
                if (query.sort) {
                    switch (query.sort) {
                        case  'a-z':
                            tasks.sort((t1, t2) => t1.title > t2.title ? 1 : -1);
                            break;
                        case  'z-a':
                            tasks.sort((t1, t2) => t1.title < t2.title ? 1 : -1);
                            break;
                        case  'creation_date_oldest':
                            tasks.sort((t1, t2) => new Date(t1.created_at).getTime() - new Date(t2.created_at).getTime());
                            break;
                        case  'creation_date_newest':
                            tasks.sort((t1, t2) => new Date(t2.created_at).getTime() - new Date(t1.created_at).getTime());
                            break;
                        case  'completion_date_oldest':
                            tasks.sort((t1, t2) => new Date(t1.date).getTime() - new Date(t2.date).getTime());
                            break;
                        case  'completion_date_newest':
                            tasks.sort((t1, t2) => new Date(t2.date).getTime() - new Date(t1.date).getTime());
                            break;
                    }
                }
                
                res.json(tasks);
            }
            else {
                return res.json([]);
            }
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
    };
    
    createTask(req, res) {
        try {
            const newTask = new TodoModel(req.body);
            let tasks = [];
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                tasks = JSON.parse(rawdata);
            }
            tasks.push(newTask);
            fs.writeFileSync(dataPath, JSON.stringify(tasks), 'utf8');
            res.json(newTask);
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
        
    }
    
    getTask(req, res) {
        try {
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                const tasks = JSON.parse(rawdata);
                const task = tasks.find(task => task.id === req.params.taskId);
                if (!task) res.status(404).send({error: "The task not found"});
                res.json(task);
            }
            else {
                return res.status(404).send({error: "The task not found"});
            }
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
    }
    
    updateTask(req, res) {
        try {
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                const tasks = JSON.parse(rawdata);
                const taskIndex = tasks.findIndex(task => task.id === req.params.taskId);
                if (taskIndex === -1) res.status(404).send({error: "The task not found"});
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    ...req.body
                }
                fs.writeFileSync(dataPath, JSON.stringify(tasks), 'utf8');
                res.json(tasks[taskIndex]);
            }
            else {
                return res.status(404).send({error: "The task not found"});
            }
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
    }
    
    deleteTask(req, res) {
        try {
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                const tasks = JSON.parse(rawdata);
                const taskIndex = tasks.findIndex(task => task.id === req.params.taskId);
                if (taskIndex === -1) res.status(404).send({error: "The task not found"});
                tasks.splice(taskIndex, 1);
                fs.writeFileSync(dataPath, JSON.stringify(tasks), 'utf8');
                res.json({success: true});
            }
            else {
                return res.status(404).send({error: "The task not found"});
            }
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
    }
    
    deleteTasks(req, res) {
        try {
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                const tasks = JSON.parse(rawdata);
                if(!req.body.tasks){
                    res.status(411).send({error: "The tasks field is required"});
                }
                if(!Array.isArray(req.body.tasks)){
                    res.status(411).send({error: "The field tasks should be an array"});
                }
                req.body.tasks.forEach(id => {
                    const taskIndex = tasks.findIndex(task => task.id === id);
                    if (taskIndex === -1) res.status(404).send({error: "The task not found"});
                    tasks.splice(taskIndex, 1);
                });
                fs.writeFileSync(dataPath, JSON.stringify(tasks), 'utf8');
                res.json({success: true});
            }
            else {
                return res.status(404).send({error: "The task not found"});
            }
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
    }
}

module.exports = new TodoListController();
