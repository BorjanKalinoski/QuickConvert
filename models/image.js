const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    files: [{
        data: {
            type: Buffer,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    }]
    ,
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires: '3m'},
    }
});
module.exports = mongoose.model('Image', imageSchema);