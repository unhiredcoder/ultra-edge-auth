const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelCodeSchema = new Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },
    used: { 
        type: Boolean, 
        default: false 
    }
});

const LabelCode = mongoose.model('labelcodes', LabelCodeSchema);
module.exports = LabelCode;
