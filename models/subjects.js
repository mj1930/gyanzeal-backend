require('../common/common')
/**
 * Schema for User
 */
const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "classes",
        required: false
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "courses",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'subject'
});

module.exports = mongoose.model('subject', subjectSchema);