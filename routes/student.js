const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');

router.post('/studentSignUp', async (req, res) => {
    const studentCtrlFucntion = new studentCtrl();
    const result = await studentCtrlFucntion.register(req);
    if (!result.isExists) {
        res.status(200).send({
            status: 200,
            data: result.studentData,
            message: "An Email has been sent successfully to your email. Please Check."
        });
    } else {
        res.status(201).send({
            status: 201,
            message: "User already Exists"
        });
    }
});

router.post('/login', async (req, res) => {
    const studentCtrlFucntion = new studentCtrl();
    const result = await studentCtrlFucntion.login(req, res);
    if (result && result.isExists === 1) {
        res.status(200).send({
            status: 200,
            data: result.studentData,
            token: result,token,
            message: 'Login Successful'
        });
    } else if (result.isExists === 0){
        res.status(201).send({
            status: 201,
            message: "User doesn't exists"
        });
    } else if (result.isExists === 2) {
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

module.exports = router;