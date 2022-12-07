const express = require("express");
const router = express.Router();

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

// GET api/teacher/getAllTeachers
router.get(
    "/getAllClerks",
    fetchuser,
    async (req, res) => {
        try {
            // get all clerk
            const clerks = await User.find({ isActived: true, role: "clerk", isVerified: true, isRejected: false });
            if (!clerks) {
                return res.status(400).json({ success: false, msg: "No clerks found" });
            }
            return res.status(200).json({ success: true, clerks });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;