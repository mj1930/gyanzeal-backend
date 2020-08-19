const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/courses');

router.post('/add-course', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.addCourse(req);
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    } else {
        res.status(201).json({
            message: "Course already exists"
        });
    }
});

router.post('/add-class', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.addClass(req);
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    } else {
        res.status(201).json({
            message: "Class already exists"
        });
    }
});

router.post('/add-subject', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.addSubject(req);
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    } else {
        res.status(201).json({
            message: "Subject already exists"
        });
    }
});

router.get('/get-courses', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.getAllCourses();
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    }
});

router.get('/get-classes', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.getAllClasses();
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    }
});

router.get('/get-subjects', async (req, res) => {
    const courseFunction = new courseCtrl();
    const result = await courseFunction.getAllSubject();
    if (result && Object.keys(result).length !== 0) {
        res.status(200).json({
            result
        });
    }
});

module.exports = router;