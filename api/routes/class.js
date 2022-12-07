const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Class = require("../models/Class");
const User = require("../models/User");
const Subject = require("../models/Subject");
const fetchuser = require("../middleware/fetchuser");

router.post(
    "/addClass",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("description", "Description must be atleast 10 characters").isLength({ min: 10 }),
        body("fee", "Enter a valid fee").isLength({ min: 1 }),
    ],
    fetchuser,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            const { name, description, fee, addedSubjects } = req.body;
            const _class = await Class.findOne({ name });
            if (_class) {
                return res.status(400).json({ success: false, msg: "Class already exists" });
            }

            classSubjects = []
            for (let i = 0; i < addedSubjects.length; i++) {
                const subject = addedSubjects[i];
                const newSubject = {
                    subject: (await Subject.findOne({ name: subject.subject }))._id,
                    teacher: (await User.findOne({ email: subject.teacher }))._id
                };
                classSubjects.push(newSubject);
            }

            const newClass = new Class({
                name,
                description,
                feeperstudent: fee,
                subjects: classSubjects,
                addedBy: user.email,
                lastModifiedBy: user.email
            });
            await newClass.save();
            return res.status(200).json({ success: true, msg: "Class added" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/class/getClass
router.get(
    "/getClass/:id",
    async (req, res) => {
        try {
            const _class = await Class.findById(req.params.id);
            if (!_class) {
                return res.status(400).json({ success: false, msg: "No class found" });
            }
            return res.status(200).json({ success: true, _class });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/class/getClasses
router.get(
    "/getClasses",
    fetchuser,
    async (req, res) => {
        try {
            const _classes = await Class.find();
            if (!_classes) {
                return res.status(400).json({ success: false, msg: "No classes found" });
            }
            return res.status(200).json({ success: true, _classes });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/class/deleteClass
router.post(
    "/deleteClass/:id",
    fetchuser,
    async (req, res) => {
        try {
            const _class = await Class.findById(req.params.id);
            if (!_class) {
                return res.status(400).json({ success: false, msg: "No class found" });
            }
            await _class.remove();
            return res.status(200).json({ success: true, msg: "Class deleted" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/class/updateClass
router.post(
    "/updateClass/:id",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("description", "Description must be atleast 10 characters").isLength({ min: 10 }),
        body("fee", "Enter a valid fee").isLength({ min: 1 }),
    ],
    fetchuser,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            const { name, description, fee, addedSubjects } = req.body;
            const _class = await Class.findById(req.params.id);
            if (!_class) {
                return res.status(400).json({ success: false, msg: "No class found" });
            }
            _class.name = name;
            _class.description = description;
            _class.feeperstudent = fee;
            _class.lastModifiedBy = user.email;

            classSubjects = []
            for (let i = 0; i < addedSubjects.length; i++) {
                const subject = addedSubjects[i];
                const newSubject = {
                    subject: (await Subject.findOne({
                        name: subject.subject
                    }))._id,
                    teacher: (await User.findOne({
                        email: subject.teacher
                    }))._id
                };
                classSubjects.push(newSubject);
            }
            _class.subjects = classSubjects;
            await _class.save();
            return res.status(200).json({ success: true, msg: "Class updated" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/class/getSubjectTeachers
router.post(
    "/getSubjectTeachers",
    fetchuser,
    async (req, res) => {
        try {
            const { subjects } = req.body;
            let subjectTeachers = [];
            for (let i = 0; i < subjects.length; i++) {
                const subject = await Subject.findById(subjects[i].subject);
                if (!subject) {
                    return res.status(400).json({ success: false, msg: "No subject found" });
                }
                const _teacher = await User.findById(subjects[i].teacher);
                if (!_teacher) {
                    return res.status(400).json({ success: false, msg: "No teacher found" });
                }
                subjectTeachers.push({
                    subject: subject.name,
                    teacher: _teacher.email
                });
            }
            return res.status(200).json({ success: true, subjectTeachers });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


module.exports = router;
