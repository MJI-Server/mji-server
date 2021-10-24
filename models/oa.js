const {model, Schema} = require('mongoose');

const oaSchema = new Schema({
    
    codOA: {
        type: String,
        required: true
    },
    oa: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('OA', oaSchema);