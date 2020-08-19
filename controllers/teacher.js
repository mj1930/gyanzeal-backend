// import student from '../models/student';

const crypt = new(require('../utils/crypt'));
const teacherModel = require('../models/teacher');
const bankModel = require('../models/bank-details');
const addressModel = require('../models/address');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const address = require('../models/address');
const teacher = require('../models/teacher');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    }
});

module.exports =  class TeacherController {
    constructor() {
    }

    async register(req) {
        let userData = req.body.teacherData;
        userData.password = await crypt.hashPassword('gyanzeal123');
        let teacherData;
        let isExists = 0;
        if (userData['gzcourses'].length > 0 && userData['gzclasses'].length > 0) {
            userData['typeofTeacher'] = 'both';
        } else if (userData['gzclasses'].length > 0 && userData['gzcourses'].length == 0) {
            userData['typeofTeacher'] = 'gzSpecial';
        } else {
            userData['typeofTeacher'] = 'scholastic';
        }
        isExists = await teacherModel.countDocuments({
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
            return {
                teacherData,
                isExists
            };
        } else {
            teacherData = await teacherModel.create(userData);
            let addressData = {
                teacherId: teacherData['_id'],
                street1:userData.address1,
                street2:userData.address2,
                state:userData.state,
                city:userData.city,
                country:userData.country,
                pin:userData.pinCode
            };
            await addressModel.create(addressData);
            this.sendMail(userData.email);
            return {
                teacherData,
                isExists
            };
        }
    }

    async login(req) {
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

    async updateProfile(req) {
        let data = req.body.profileData;
        let email = data['email'];
        try {
            let updateData = await teacherModel.findOneAndUpdate({
                email
            }, {
                $set: {data}
            }).lean();
            let addressData = {
                teacherId: updateData['_id'],
                street1:data.address1,
                street2:data.address2,
                state:data.state,
                city:data.city,
                country:data.country,
                pin:data.pinCode
            };
            let addressObj = await addressModel.findOneAndUpdate({
                teacherId: addressData.teacherId
            }, {
                $set: {
                    addressData
                }
            });
            let bankObj = {
                teacherId: updateData['_id'],
                pan: data.pan,
                aadhar: data.aadhar,
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifscCode,
                upi: data.upi
            };
            let bankDetails = await bankModel.findOneAndUpdate({
                accountNumber: bankObj.accountNumber
            }, {
                $set: {
                    bankObj
                }
            });
            let returnData = {};
            Object.assign(returnData, updateData, bankDetails, addressObj);
            return returnData;
        } catch (e) {
            throw e;
        }
    }

    async findTeacherProfile(req) {
        let email = req.query.email;
        try {
            let profileData = await teacherModel.findOne({
                email
            }, {password: 0}).lean();
            let addressData = await addressModel.findOne({
                teacherId: profileData['_id']
            }).lean();
            let bankData = await bankModel.findOne({
                teacherId: profileData['_id']
            }).lean();
            let returnObj = {};
            Object.assign(returnObj, profileData, bankData, addressData);
            return returnObj;
        } catch (e) {
            throw e;
        }
    }

    sendMail(email) {
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