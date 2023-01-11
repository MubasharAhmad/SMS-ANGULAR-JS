const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sendEmail = require("../js/emailer");

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const Varification = require("../models/Varification");


const API_URL = process.env.API_URL;
const WEB_URL = process.env.WEB_URL;

router.post(
    "/addTeacher",
    fetchuser,
    async (req, res) => {
        let success = false;
        try {
            const { teacherName, teacherEmail, treacherDescription } = req.body;
            // check if user already exists
            let user = await User.findOne({ email: teacherEmail });
            if (user) {
                return res.status(400).json({ success: false, msg: "User already exists" });
            }

            let password = Math.random().toString(36).slice(-8);

            // encrypt password using bcrypto
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(password, salt);

            // create new user
            user = await User({
                name: teacherName,
                email: teacherEmail,
                password: securedPassword,
                role: "teacher",
                description: treacherDescription,
                isActived: false,
                isVerified: true,
                isRejected: false
            });
            // save user
            await user.save();

            const lastVarification = await Varification.findOne({ email: teacherEmail });
            if (lastVarification) {
                await lastVarification.remove();
            }
            const code = Math.random().toString(36).substring(2, 15);
            const varification = new Varification({
                email: teacherEmail,
                code: code,
                date: Date.now()
            });
            await varification.save();
            let Body = `<div style="text-align: center">
            <img src="${WEB_URL}/assets/images/logo.png" alt="logo" border="0">
            <h1>Welcome To The GLORIOUS Future School</h1>
            <p>This is Your Varification Code: <b>${code}</b></p>
            <p>You are added as a teacher in our school. Please verify your email address by clicking the button below.</p>
            <p>Your password is: <b>${password}</b></p>
            <p>Go and try for login with your email and password.</p>
            <p>If you have any problem with your account, please
            <a href="${WEB_URL}/#contact" style="border: none;
            color: #4c78af;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            cursor: pointer;
            font-size: 16px;">Contact Us.</a></p>
            <p>Thanks for using our service.</p>
        </div>`
            sendEmail(teacherEmail, "Verify Email", Body, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ success, msg: "Internal Server Error" });
                }
                else {
                    success = true;
                    return res.status(200).json({ success: true, msg: "Teacher added successfully and Email has been sent." });
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);



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