const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    expireAt: {
        type: Date,
        required: true
    }
});
imageSchema.index({expireAt:1},{expireAfterSeconds: 50})
module.exports = mongoose.model('Image', imageSchema);