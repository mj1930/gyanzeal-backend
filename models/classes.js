require('../common/common')
/**
 * Schema for User
 */
const classSchema = new Schema({
    name: {
        type: String,
        required: true
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
    collection: 'class'
});

module.exports = mongoose.model('class', classSchema);