const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Class = require("../models/Class");
const Student = require("../models/Student");

router.post(
    "/addStudent",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("fathername", "Enter a valid fathername").isLength({ min: 3 }),
        body("fatheroccupation", "Enter a valid fatheroccupation").isLength({ min: 3 }),
        body("address", "Enter a valid address").isLength({ min: 3 }),
        body("rollnumber", "Enter a valid roll number").isLength({ min: 1 }),
        body("phone", "Enter a valid phone").isLength({ min: 3 }),
    ],
    fetchuser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ success: false, msg: errors.array()[0].msg });
        }
        try {
            const { name, fathername, fatheroccupation, address, rollnumber, phone, classId } = req.body;
            const _class = await Class.findById({ _id: classId});
            if (!_class) {
                return res.status(400).json({ success: false, msg: "No class found" });
            }
            const student = await Student.findOne({ rollnumber });
            if (student) {
                return res.status(400).json({ success: false, msg: "Student already exists with this roll number" });
            }
            const newStudent = new Student({
                name,
                fathername,
                fatheroccupation,
                address,
                rollnumber,
                phone,
                addedBy: req.user.id,
                classId
            });
            const savedStudent = await newStudent.save();

            _class.students.push(savedStudent._id);
            await _class.save();

            return res.status(200).json({ success: true, msg: "Student added successfully" });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
);

// GET ALL STUDENTS
router.post("/getAllStudents", fetchuser, async (req, res) => {
    try {
        const students = await Student.find({ classId: req.body.classId });
        success = true;
        return res.status(200).json({ success: true, students });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
});



module.exports = router;