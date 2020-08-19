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
    status: {
        type: String,
        default: 'unverified'
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
    },
    classes: {
        type: Array,
        default: []
    },
    typeofTeacher: {
        type: String,
        default: 'scholastic' // Scholastic Or GZ Specials(gzSpecial) or // both
    },
    gzclasses: {
        type: Array,
        default: []
    },
    filePath: {
        type: String,
        default: ''
    }
}, {
    collection: 'teacher'
    // strict: false
});

module.exports = mongoose.model('teacher', teacherSchema);
