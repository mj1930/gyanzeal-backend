// import student from '../models/student';

let crypt = new(require('../utils/crypt'));
let teacherModel = require('../models/teacher');

module.exports =  class TeacherController {
    constructor() {
    }

    async register(req) {
        let userData = req.body.teacherData;
        userData.password = await crypt.hashPassword('gyanzeal123');
        let teacherData;
        let isExists = 0;
        isExists = await teacherModel.countDocuments({
            $or : [
                {
                    email: userData.email
                },
                {
                    isDeleted: false
                },
                {
                    isActive: false
                }
            ]
        });
        if (isExists !== 0) {
            return {
                teacherData,
                isExists
            };
        } else {
            teacherData = await teacherModel.create(userData);
            return {
                teacherData,
                isExists
            };
        }
    }
}