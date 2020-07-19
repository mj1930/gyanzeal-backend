require('../common/common')
/**
 * Schema for User
 */
let teacherSchema = new Schema({
    name: {
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
    mobile: {
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
    school: {
        type: String,
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
    system: {
        type: String,
        default: ''
    },
    internetSpeed: {
        type: String,
        default: ''
    },
    experienceYear: {
        type: String,
        default: ''
    },
    experienceMonth: {
        type: String,
        default: ''
    },
    compKnow: {
        type: String,
        default: ''
    },
    courses: {
        type: Array,
        default: []
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'teacher'
    // strict: false
});

module.exports = mongoose.model('teacher', teacherSchema);
