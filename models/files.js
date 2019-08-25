const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    files: {
        type: Buffer,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires: '3m'},
    }
});
module.exports = mongoose.model('Files', fileSchema);