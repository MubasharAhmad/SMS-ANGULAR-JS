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
                    teacher: (await User.findOne({ email : subject.teacher }))._id
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


module.exports = router;
