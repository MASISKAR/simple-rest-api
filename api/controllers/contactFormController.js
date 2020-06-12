const fs = require('fs'),
        path = require("path"),
        ContactFormModel = require("../models/contactFormModel");
const dataPath = path.join(__dirname, '../../data/contact_forms.json');

class ContactFormController {
        saveForm(req, res) {
        try {
            const newForm = new ContactFormModel(req.body);
            let forms = [];
            if (fs.existsSync(dataPath)) {
                const rawdata = fs.readFileSync(dataPath);
                forms = JSON.parse(rawdata);
            }
            forms.push(newForm);
            fs.writeFileSync(dataPath, JSON.stringify(forms), 'utf8');
            res.json({success: true});
        } catch (error) {
            res.status(400).send({error: error.toString()});
        }
        
    }
}

module.exports = new ContactFormController();
