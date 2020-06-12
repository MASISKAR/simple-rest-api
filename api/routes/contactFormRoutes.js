'use strict';
module.exports = function(app) {
    const contactForms = require('../controllers/contactFormController');
    
    app.route('/contact')
    .post(contactForms.saveForm);
};
