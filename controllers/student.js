// import student from '../models/student';

let crypt = new(require('../utils/crypt'));
let studentModel = require('../models/student');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    }
});
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
            $and : [
                {
                    email: userData.email
                },
                {
                    isDeleted: false
                },
                {
                    isActive: true
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
            this.sendMail(userData.email);
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
                    let token = jwt.sign({
                        emailAddress: studentData.email,
                        isStudent: true
                    }, process.env.APP_SECRET, {
                        expiresIn: '24h' // expires in 24 hours
                    });
                    return {
                        isExists: 1,
                        studentData,
                        token
                    }
                }
            }
        }
    }

    async sendMail(email) {
        transporter.sendMail({
            from: `"ADMIN", ${process.env.GMAIL_USER}`, // sender address
            to: email, // list of receivers
            subject: "Temporary Password", // Subject line
            // text: "Hello world?", // plain text body
            html: "<b>Please find your password below</b><br><b>Password: </b>gyanzeal123", // html body
        }).then((err, info) => {
            if (err) {
                throw err;
            }
        });
    }
}