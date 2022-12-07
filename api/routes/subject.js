const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Subject = require("../models/Subject");
const fetchuser = require("../middleware/fetchuser");


// GET api/subject/getAllSubjects
router.get(
    "/getAllSubjects",
    fetchuser,
    async (req, res) => {
        try {
            // get all subjects
            const subjects = await Subject.find();
            if (!subjects) {
                return res.status(400).json({ success: false, msg: "No subjects found" });
            }
            return res.status(200).json({ success: true, subjects });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/subject/addSubject
router.post(
    "/addSubject",
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            const userEmail = user.email;
            const { name, description } = req.body;
            // check if subject already exists
            const subject = await Subject.findOne({ name });
            if (subject) {
                return res.status(400).json({ success: false, msg: "Subject already exists" });
            }
            // create new subject
            const newSubject = new Subject({
                name,
                description,
                addedBy: userEmail,
                lastModifiedBy: userEmail
            });
            await newSubject.save();
            return res.status(200).json({ success: true, msg: "Subject added" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/subject/deleteSubject
router.post(
    "/deleteSubject",
    fetchuser,
    async (req, res) => {
        try {
            const { name } = req.body;
            // check if subject exists
            const subject = await Subject.findOne({ name });
            if (!subject) {
                return res.status(400).json({ success: false, msg: "Subject does not exist" });
            }
            // delete subject
            await subject.remove();
            return res.status(200).json({ success: true, msg: "Subject deleted" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/subject/updateSubject
router.post(
    "/updateSubject",
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            const { id, name, description } = req.body;
            // check if subject exists
            const subject = await Subject.findById(id);
            if (!subject) {
                return res.status(400).json({ success: false, msg: "Subject does not exist" });
            }
            subject.name = name;
            subject.lastModifiedBy = user.email;
            subject.description = description;
            subject.lastModifiedDate = Date.now();
            await subject.save();
            return res.status(200).json({ success: true, msg: "Subject updated" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/subject/getSubject
router.post(
    "/getSubject",
    fetchuser,
    async (req, res) => {
        try {
            const { id } = req.body;
            // check if subject exists
            const subject = await Subject.findById(id);
            if (!subject) {
                return res.status(400).json({ success: false, msg: "Subject does not exist" });
            }
            return res.status(200).json({ success: true, subject });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;