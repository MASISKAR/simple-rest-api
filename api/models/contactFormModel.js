const idGenerator = require('../utils/idGenerator');

class ContactFormModel{
    constructor(data){
        if(!data.name){
            throw new Error('The name field is required');
        }
        if(!data.email){
            throw new Error('The email field is required');
        }
        this.name = data.name;
        this.email = data.email;
        this.message = data.message || '';
    }
    id = idGenerator();
    created_at = new Date();
}

module.exports = ContactFormModel;
