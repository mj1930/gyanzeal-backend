const express = require('express');
const router = express.Router();
responeCtrl = require('../utils/response');
const teacherCtrl = require('../controllers/teacher');

router.post('/teacher-signup', async (req, res) => {
    const teacherFunction = new teacherCtrl();
    const result = await teacherFunction.register(req);
    // Get Structure Response
    let response = '';
    if (result.isExist > 0) {
        response = responeCtrl.getResponse(undefined, 'USER AlREADY EXIST', 201);
    } else {
        if (!result.isExists) {
            res.status(200).send({
                status: 200,
                data: result.teacherData,
                message: "An Email has been sent successfully to your email. Please Check."
            });
        } else {
            res.status(201).send({
                status: 201,
                data: result.teacherData,
                message: "User already Exists"
            });
        }
    }
});

router.post('/login', async (req, res) => {
    const teacherCtrlFucntion = new teacherCtrl();
    const result = await teacherCtrlFucntion.login(req);
    if (result && result.isExists === 1) {
        res.status(200).send({
            status: 200,
            data: result.teacherData,
            token: result.token,
            message: 'Login Successful'
        });
    } else if (result && result.isExists === 0){
        res.status(201).send({
            status: 201,
            message: "User doesn't exists"
        });
    } else if (result && result.isExists === 2) {
        res.status(201).send({
            status: 201,
            message: "Password not matching"
        });
    } else {
        res.status(202).send({
            status: 202,
            message: "error while login"
        });
    }
});

router.post('/update-profile', async (req, res) => {
    const teacherCtrlFucntion = new teacherCtrl();
    const result = await teacherCtrlFucntion.updateProfile(req);
    if (result && Object.keys(result).length > 0) {
        res.status(200).send({
            status: 200,
            data: result,
            message: 'Data Retrieved Succesfully'
        });
    } else if (result && Object.keys(result).length == 0) {
        res.status(201).send({
            status: 201,
            data: {},
            message: 'No data found'
        });
    } else {
        res.status(202).send({
            status: 202,
            message: "error while login"
        });
    }
});

router.get('/fetch-profile', async (req, res) => {
    const teacherCtrlFucntion = new teacherCtrl();
    const result = await teacherCtrlFucntion.findTeacherProfile(req);
    if (result && Object.keys(result).length > 0) {
        res.status(200).send({
            status: 200,
            data: result,
            message: 'Data Retrieved Succesfully'
        });
    } else if (result && Object.keys(result).length == 0) {
        res.status(201).send({
            status: 201,
            data: {},
            message: 'No data found'
        });
    } else {
        res.status(202).send({
            status: 202,
            message: "error while login"
        });
    }
});

module.exports = router;