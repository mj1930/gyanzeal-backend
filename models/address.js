require('../common/common')
/**
 * Schema for User
 */
const addressSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "teachers",
        required: false
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "students",
        required: false
    },
    street1: {
        type: String,
        required: false
    },
    street2: {
        type: String,
        required: false
    },
    pin: {
        type: String,
        required: false,
        default: ''
    },
    country: {
        type: String,
        required: false,
        default: ''
    },
    state: {
        type: String,
        required: false,
        default: ''
    },
    city: {
        type: String,
        required: false,
        default: ''
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
    }
}, {
    collection: 'address'
    // strict: false
});

module.exports = mongoose.model('address', addressSchema);
