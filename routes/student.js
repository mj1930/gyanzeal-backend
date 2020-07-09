const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');

router.post('/studentSignUp', async (req, res) => {
    const studentCtrlFucntion = new studentCtrl();
    const result = await studentCtrlFucntion.register(req);
    // Get Structure Response
    let response = '';
    if (result.isExist > 0) {
        response = responeCtrl.getResponse(undefined, 'USER AlREADY EXIST', 201);
    } else {
        if (!result.isExists) {
            res.status(200).send({
                status: 200,
                data: result.studentData,
                message: "An Email has been sent successfully to your email. Please Check."
            });
        } else {
            res.status(201).send({
                status: 201,
                data: result.studentData,
                message: "User already Exists"
            });
        }
    }
});

module.exports = router;