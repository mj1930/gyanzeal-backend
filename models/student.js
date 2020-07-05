require('../common/common')
/**
 * Schema for User
 */
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        default: ''
    },
    phoneNumber: {
        type: String,
        required: true,
        default: ''
    },
    state: {
        type: String,
        required: true,
        default: ''
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    gender: {
        type: String, // male / female
        required: true,
        default: ''
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    modified_at: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
    class: {
        type: String,
        default: ''
    },
    courses: {
        type: Array,
        default: []
    }
}, {
    collection: 'student'
    // strict: false
});

module.exports = mongoose.model('student', userSchema);
