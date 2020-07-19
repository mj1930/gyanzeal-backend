// import student from '../models/student';

let crypt = new(require('../utils/crypt'));
let studentModel = require('../models/student');
let bcrypt = require('bcrypt');

module.exports =  class StudentController {
    constructor() {}

    async register(req) {
        let userData = req.body.studentData;
        let dataToSave = {
            name: userData.name,
            fatherName: userData.fName,
            email: userData.email,
            phoneNumber: userData.mobile,
            state: userData.state,
            city: userData.city,
            gender: userData.gender,
            password: await crypt.hashPassword('gyanzeal123'),
            isActive: true,
            isDeleted: false
        }
        let studentData;
        let isExists = 0;
        isExists = await studentModel.countDocuments({
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
            return  {
                studentData,
                isExists
            };
        } else {
            studentData = await studentModel.create(dataToSave);
            return {
                studentData,
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
        isExists = await studentModel.countDocuments({
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
            studentData = await studentModel.findOne({
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