const express = require('express');
const router = express.Router();
responeCtrl = require('../utils/response');
const teacherCtrl = require('../controllers/teacher');

router.post('/teacherSignUp', async (req, res) => {
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

module.exports = router;