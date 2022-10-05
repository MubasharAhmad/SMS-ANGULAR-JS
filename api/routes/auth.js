const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodeMailer = require("nodemailer");

const User = require("../models/User");

const JWT_SECRET = "SMS-SCHOOL-MANAGEMENT-SYSTEM-SECRET-KEY";

// for email sender
const Transporter_Email = "tajammalmaqbool11@gmail.com";
const Trasnporter_Password = "tvlpnhkiukgtzaxp";
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: Transporter_Email,
        pass: Trasnporter_Password
    }
});


//  POST api/auth/register
router.post(
    "/register",
    [
        body("name", "Please enter a valid name").isLength({ min: 3 }),
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter a password with 8 or more characters").isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            // see if user exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, msg: "User with this email already exists" });
            }

            // verify existence of email
            const { data } = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=9bd9f51f3f98494fa65c2253a079282f&email=${req.body.email}`);
            if (data.is_smtp_valid.value !== true) {
                return res.status(400).json({ success, msg: "Email does not exist" });
            }

            // encrypt password using bcrypto
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);

            // create new user
            user = await User({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword
            });
            await user.save();

            // send email to user
            const mailOptions = {
                from: Transporter_Email,
                to: req.body.email,
                subject: "Welcome to SMS",
                text: "Your account has been created successfully"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ success, msg: "Internal Server Error" });
                }
            });


            success = true;
            const dt = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(dt, JWT_SECRET);
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    });


// POST api/auth/login
router.post(
    "/login",
    [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter password").notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success, msg: "Invalid Credentials" });
            }
            // bcrypto decrypt password
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) {     
                return res.status(400).json({ success, msg: "Invalid Credentials" });
            }
            success = true;

            // send email to user
            const mailOptions = {
                from: Transporter_Email,
                to: req.body.email,
                subject: "Welcome to SMS",
                text: "You have logged in to SMS"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ success, msg: "Internal Server Error" });
                }
            });

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    });


// @route   GET api/auth/getuser
router.post("/getuser", (req, res) => {
    res.send("Get User");
});

module.exports = router;