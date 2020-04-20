const idGenerator = require('../utils/idGenerator');

class TodoModel{
    constructor(data){
        if(!data.title){
            throw new Error('The title field is required');
        }
        this.title = data.title;
        this.description = data.description || '';
        this.date = data.date || new Date();
    }
    id = idGenerator();
    created_at = new Date();
}

module.exports = TodoModel;
