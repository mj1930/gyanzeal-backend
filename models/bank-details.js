require('../common/common')
/**
 * Schema for User
 */
let bankDetailSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "teachers",
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: false,
        default: ''
    },
    accountNumber: {
        type: String,
        required: true,
        default: ''
    },
    ifscCode: {
        type: String,
        required: true,
        default: ''
    },
    upi: {
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
    }
}, {
    collection: 'bankDetail'
    // strict: false
});

module.exports = mongoose.model('bankDetail', bankDetail);
