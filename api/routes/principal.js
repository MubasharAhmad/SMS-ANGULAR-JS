const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodeMailer = require("nodemailer");
const axios = require('axios')

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

// url
const API_URL = process.env.API_URL;
const WEB_URL = process.env.WEB_URL;

// for email sender
const Transporter_Email = process.env.TRANSPORTER_EMAIL;
const Trasnporter_Password = process.env.TRANSPORTER_PASSWORD;

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: Transporter_Email,
        pass: Trasnporter_Password
    }
});

//  POST api/principal/getAllUsers
router.post(
    "/getAllUsers",
    fetchuser,
    async (req, res) => {
        try { 
            // get all users and deselect password and role not equal to principal
            const users = await User.find({ role: { $ne: "principal" }, isVerified: false, isRejected: false, isActived:true }).select("-password -_id");
            if (!users) {
                return res.status(400).json({ success, msg: "No users found" });
            }
            return res.status(200).json({ success: true, users });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//  POST api/principal/verifyUser
router.post(
    "/acceptApplication",
    fetchuser,
    async (req, res) => {
        try {
            const { email } = req.body;
            // get user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, msg: "No user found" });
            }
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ success: true, msg: "User verified" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// POST api/principal/rejectApplication
router.post(
    "/rejectApplication",
    fetchuser,
    async (req, res) => {
        try {
            const { email } = req.body;
            // get user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, msg: "No user found" });
            }
            user.isRejected = true;
            await user.save();
            return res.status(200).json({ success: true, msg: "User's application rejected" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


module.exports = router;
