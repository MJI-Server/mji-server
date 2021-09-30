const {model, Schema} = require('mongoose');

const oaSchema = new Schema({
    
    codUnidad: {
        type: String,
        required: true
    },
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