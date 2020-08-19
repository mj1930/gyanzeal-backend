const mongoose = require('../config/database.dev');

require('../common/common')
/**
 * Schema for User
 */
const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'course'
});

module.exports = mongoose.model('course', courseSchema);