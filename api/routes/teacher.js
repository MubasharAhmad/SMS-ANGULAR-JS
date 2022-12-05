const express = require("express");
const router = express.Router();

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

// GET api/teacher/getAllTeachers
router.get(
    "/getAllTeachers",
    fetchuser,
    async (req, res) => {
        try {
            // get all teachers
            const teachers = await User.find({ isActived: true, role: "teacher", isVerified: true, isRejected: false });
            if (!teachers) {
                return res.status(400).json({ success: false, msg: "No teachers found" });
            }
            return res.status(200).json({ success: true, teachers });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;