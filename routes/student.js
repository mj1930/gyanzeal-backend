const express = require('express');
const router = express.Router();
responeCtrl = require('../utils/response');
const studentCtrl = require('../controllers/student');

router.post('/studentSignUp', async (req, res) => {
    const studentCtrlFucntion = new studentCtrl();
    const result = await studentCtrlFucntion.register(req);
    // Get Structure Response
    let response = '';
    if (result.isExist > 0) {
        response = responeCtrl.getResponse(undefined, 'USER AlREADY EXIST', 201);
    } else {
        response = responeCtrl.getResponse(result.result, 'SUCCESSFUL', 200);
    }
    // Return Response
    res.status(response.statusCode).send(response);
});

module.exports = router;