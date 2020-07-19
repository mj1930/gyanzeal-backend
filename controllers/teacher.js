// import student from '../models/student';

let crypt = new(require('../utils/crypt'));
let teacherModel = require('../models/teacher');
let bcrypt = require('bcrypt');

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

    async login(req, res) {
        let studentData = {};
        let data = req.body.loginData;
        let userMail = data.email;
        let password = data.password;
        let isExists = 0;
        isExists = await teacherModel.countDocuments({
            $or : [
                {
                    email: userMail
                },
                {
                    isDeleted: false
                },
                {
                    isActive: false
                }
            ]
        });
        if (!isExists) {
            return  {
                studentData,
                isExists
            };
        } else {
            studentData = await teacherModel.findOne({
                $and: [
                    {
                        email: userMail
                    },
                    {
                        isDeleted: false
                    },
                    {
                        isActive: true
                    }
                ]
            }).lean();
            if (studentData) {
                let isMatch = await bcrypt.compare(password, studentData.password);
                if (isMatch) {
                    delete studentData['password'];
                    return {
                        isExists: 1,
                        studentData
                    }
                }
            }
        }
    }
}