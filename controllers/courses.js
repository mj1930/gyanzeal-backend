const courseModel = require('../models/courses');
const classesModel = require('../models/classes');
const subjectsModel = require('../models/subjects');

module.exports = class CoursesController {

    constructor() {}

    async addCourse(req) {
        let name = req.body.courseName;
        try {
            let count = await courseModel.countDocuments({
                name
            });
            if (!count) {
                let courseData = await courseModel.create({name});
                return courseData;
            } else {
                return {};
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllCourses() {
        try {
            let courseData = await courseModel.find().lean();
            return courseData;
        } catch (e) {
            throw e;
        }
    }

    async addClass(req) {
        let name = req.body.className;
        let courseName = req.body.courseName;
        try {
            let courseData = await courseModel.findOne({
                name: courseName
            }).lean();
            let classCount = await classesModel.countDocuments({$and : [{courseId:courseData._id}, {name}]});
            let obj = {
                courseId: courseData._id,
                name
            }
            if (!classCount) {
                let classData = await classesModel.create(obj);
                return classData;
            } else {
                return {};
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllClasses() {
        try {
            let classData = await classesModel.find().lean();
            return classData;
        } catch (e) {
            throw e;
        }
    }

    async addSubject(req) {
        let name = req.body.subjectName;
        let className = req.body.className;
        let courseName = req.body.courseName;
        try {
            let courseData = await courseModel.findOne({
                name: courseName
            }).lean();
            let classData = await classesModel.findOne({
                $and: [
                    {
                        courseId: courseData._id
                    },
                    {
                        name: className
                    }
                ]
            }).lean();
            let subjectCount = await subjectsModel.countDocuments({
                $and: [
                    {
                        courseId: courseData._id
                    },
                    {
                        classId: classData._id
                    },
                    {
                        name
                    }
                ]
            });
            let obj = {
                name,
                courseId: courseData._id,
                classId: classData._id
            };
            if (!subjectCount) {
                let subjectData = await subjectsModel.create(obj);
                return subjectData;
            } else {
                return {};
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllSubject() {
        try {
            let subjectData = await subjectsModel.find().lean();
            return subjectData;
        } catch (e) {
            throw e;
        }
    }
}