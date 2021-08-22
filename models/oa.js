const {model, Schema} = require('mongoose');

const oaSchema = new Schema({
    idUnidad: {
        type: Schema.Types.ObjectId,
        ref: 'Unidad'
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