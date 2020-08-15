const crypt = new(require('../utils/crypt'));
const adminModel = require('../models/admin');
const teacherModel = require('../models/teacher');
const studentModel = require('../models/student');
const bcrypt = require('bcrypt');

module.exports = class AdminController {

    constructor() {

    }

    async adminRegister(req) {
        let name = req.body.name;
        let email = req.body.email;
        let password = await crypt.hashPassword('gautam@gyanzeal123');
        try {
            let adminData = await adminModel.create({
                name,
                email,
                password
            });
            delete adminData['password'];
            return {
                adminData
            };
        } catch (err) {
            throw err;
        }
    }

    async adminLogin (req) {
        let userMail = req.body.email;
        let password = req.body.password;
        let adminData = {};
        try {
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
                    adminData,
                    isExists
                };
            } else {
                adminData = await teacherModel.findOne({
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
                if (adminData) {
                    let isMatch = await bcrypt.compare(password, teacherData.password);
                    if (isMatch) {
                        delete teacherData.password;
                        let token = jwt.sign({
                            emailAddress: adminData.email,
                            isAdmin: true
                        }, process.env.APP_SECRET, {
                            expiresIn: '24h' // expires in 24 hours
                        });
                        return {
                            isExists: 1,
                            adminData,
                            token
                        }
                    }
                }
            }
        } catch (e) {

        }
    }

    async teacherList() {
        try {
            let teachersList = await teacherModel.find({
                isActive: true
            }, {
                password: 0
            }).lean();
            return teachersList;
        } catch (e) {
            throw e;
        }
    }

    async studentList() {
        try {
            let studentsList = await studentModel.find({
                isActive: true
            }, {
                password: 0
            }).lean();
            return studentsList;
        } catch (err) {
            throw err;
        }
    }
}