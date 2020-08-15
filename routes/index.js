var express = require('express');
var router = express.Router();
const adminCtrl = require('../controllers/admin');
const admin = require('../models/admin');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/admin-login', async (req, res) => {
  const adminCtrlFunction = new adminCtrl();
  const result = await adminCtrlFunction.adminLogin(req);
  if (result && result.isExists === 1) {
      res.status(200).send({
          status: 200,
          data: result.adminData,
          token: result.token,
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

router.post('/admin-register', async (req, res) => {
  const adminCtrlFunction = new adminCtrl();
  const result = await adminCtrlFunction.adminRegister(req);
  if (result && Object.keys(result).length > 0) {
    res.status(200).send({
      status: 200,
      data: result.adminData,
      message: 'Registration Successful'
    });
  }
});

router.get('/teacher-listing', async (req, res) => {
    const adminCtrlFunction = new adminCtrl();
    const result = await adminCtrlFunction.teacherList();
    if (result) {
        res.status(200).send({
            status: 200,
            data: result
        });
    }
});

router.get('/student-listing', async(req, res) => {
  const adminCtrlFunction = new adminCtrl();
    const result = await adminCtrlFunction.studentList();
    if (result) {
        res.status(200).send({
            status: 200,
            data: result
        });
    }
})

module.exports = router;
