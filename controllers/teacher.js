// import student from '../models/student';

let crypt = new(require('../utils/crypt'));
let teacherModel = require('../models/teacher');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

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
        let teacherData = {};
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
                teacherData,
                isExists
            };
        } else {
            teacherData = await teacherModel.findOne({
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
            if (teacherData) {
                let isMatch = await bcrypt.compare(password, teacherData.password);
                if (isMatch) {
                    delete teacherData.password;
                    let token = jwt.sign({
                        emailAddress: teacherData.email,
                        isTeacher: true
                    }, process.env.APP_SECRET, {
                        expiresIn: '24h' // expires in 24 hours
                    });
                    return {
                        isExists: 1,
                        teacherData,
                        token
                    }
                }
            }
        }
    }
}