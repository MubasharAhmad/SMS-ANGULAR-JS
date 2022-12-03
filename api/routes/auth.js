const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const axios = require('axios')
const sendEmail = require("../js/emailer");

const User = require("../models/User");
const Varification = require("../models/Varification");

// url
const API_URL = process.env.API_URL;
const WEB_URL = process.env.WEB_URL;

// jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

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

//  POST api/auth/register
router.post(
    "/register",
    [
        body("name", "Please enter a valid name").isLength({ min: 3 }),
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
        body("description", "Please enter description of min 20 chars").isLength({ min: 20 })
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
                if (user.isActived === false && !(user.isVerified === true || user.isRejected === true)) {
                    await user.remove();
                }
                else {
                    return res.status(400).json({ success, msg: "User with this email already exists" });
                }
            }

            // encrypt password using bcrypto
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);

            // create new user
            user = await User({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
                role: req.body.role,
                description: req.body.description
            });
            await user.save();

            // send email
            const response = await axios.post(`${API_URL}/api/auth/varificationEmail`, {
                email: user.email,
                userAgent: req.body.userAgent,
                vendor: req.body.vendor
            });
            if (response.data.success === false) {
                return res.status(500).json({ success, msg: "Internal Server Error" });
            }
            else {
                success = true;
                return res.status(200).json({ success, msg: "Email has been sent to you" });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);


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
            if (!user || (user && user.isActived === false)) {
                return res.status(400).json({ success, msg: "Invalid Credentials" });
            }
            if (user.isRejected) {
                return res.status(400).json({ success, msg: "Your application rejected from principal" });
            }
            if (user.isVerified === false) {
                return res.status(400).json({ success, msg: "You are not verified from principal" });
            }
            // bcrypto decrypt password
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, msg: "Invalid Credentials" });
            }
            success = true;

            // send email to user
            body = `<div style="text-align: center">
                <img src="${WEB_URL}/assets/images/logo.png" alt="logo" border="0">
                <h1>Welcome To The GLORIOUS Future School</h1>
                <p>Make sure this is you</p>
                <p>Device Details</p>
                <p>Name: ${req.body.plateform} , Browser: ${req.body.vendor}</p>
                <p>You are logged in.</p>
                <p>If you have any problem with your account, please 
                <a href="${WEB_URL}/#contact" style="border: none;
                    color: #4c78af;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    cursor: pointer;
                    font-size: 16px;">Contact Us.</a></p>
                <p>Thanks for using our service.</p>
            </div>`;
            sendEmail(req.body.email, "Welcome", body, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ success, msg: "Internal Server Error" });
                }
            });

            let data = {
                user: {
                    id: user.id,
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            const redirectTo = user.role === "principal" ? "/principal" : user.role === "teacher" ? "/teacher" : "/clerk";
            res.json({ success, authToken, redirectUrl: user.role });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);

router.post('/varificationEmail', async (req, res) => {
    let success = false;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success, msg: "Invalid Token" });
        }
        if (user.isActived) {
            return res.status(400).json({ success, msg: "Account is already activated" });
        }
        const lastVarification = await Varification.findOne({ email: req.body.email });
        if (lastVarification) {
            await lastVarification.remove();
        }
        const code = Math.random().toString(36).substring(2, 15);
        const varification = new Varification({
            email: req.body.email,
            code: code,
            date: Date.now()
        });
        await varification.save();

        body = `<div style="text-align: center">
            <img src="${WEB_URL}/assets/images/logo.png" alt="logo" border="0">
            <h1>Welcome To The GLORIOUS Future School</h1>
            <p>Make sure this is you</p>
            <p>Device Details</p>
            <p>Name: ${req.body.plateform} , Browser: ${req.body.vendor}</p>
            <p>This is Your Varification Code: <b>${code}</b></p>
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

        sendEmail(req.body.email, "Verify Email", body, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send({ success, msg: "Internal Server Error" });
            }
            else {
                success = true;
                res.status(200).json({ success, msg: "Email Sent Successfully" });
            }
        });
    } catch (error) {
        res.status(500).send({ success, msg: "Internal Server Error" });
    }
});


// post api/auth/activate
router.post("/varify", async (req, res) => {
    let success = false;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success, msg: "Invalid Credentials" });
        }
        if (user.isActived === true) {
            return res.status(400).json({ success, msg: "User already activated" });
        }
        let varification = await Varification.findOne({ email: req.body.email, code: req.body.code });
        if (!varification) {
            return res.status(400).json({ success, msg: "Invalid Credentials" });
        }
        // one hour time limit
        if (varification.date < Date.now() - 3600000) {
            return res.status(400).json({ success, msg: "Code Expired" });
        }
        user.isActived = true;
        await user.save();
        await varification.remove();
        success = true;
        res.status(200).json({ success, msg: "User activated" });
    }
    catch (error) {
        res.status(500).send({ success, msg: "Internal Server Error" });
    }
});

router.post("/forgotPassword", async (req, res) => {
    let success = false;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success, msg: "Invalid Credentials" });
        }
        // create token for email jwt
        let data = {
            email: req.body.email
        };
        const authToken = jwt.sign(data,
            JWT_SECRET, {
            expiresIn: "1h"
        });

        // send email to user
        body = `<div style="text-align: center">
            <img src="${WEB_URL}/assets/images/logo.png" alt="logo" border="0">
            <h1>The GLORIOUS Future School</h1>
            <p>You are receiving this because you (or someone else) have requested the forgot of the password for your account.</p>
            <p>Please click on the following link to complete the process:</p>
            <a href="${WEB_URL}/changepassword?token=${authToken}" style="text-color: #4c78af;">Change Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <p>Thanks for using our service.</p>
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
        sendEmail(req.body.email, "Forgot Password", body, function (error, info) {
            if (error) {
                res.status(500).send({ success, msg: "Internal Server Error" });
            }
            else {
                success = true;
                res.status(200).json({ success, msg: "Email Sent Successfully" });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success, msg: "Internal Server Error" });
    }
});


router.post(
    "/changePassword",
    [
        body("token", "Please enter token").notEmpty(),
        body("password", "Please enter a password with 8 or more characters").isLength({
            min: 8
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let token = req.body.token;
            let password = req.body.password;
            if (!token) {
                return res.status(400).json({ success, msg: "Invalid Token" });
            }
            if (!password) {
                return res.status(400).json({ success, msg: "Invalid Password" });
            }
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(400).json({ success, msg: "Invalid Token" });
                }
                let user = await User.findOne({ email: decoded.email });
                if (!user) {
                    return res.status(400).json({ success, msg: "Invalid Token" });
                }
                // encrypt password using bcrypto
                const salt = await bcrypt.genSalt(10);
                const securedPassword = await bcrypt.hash(req.body.password, salt);
                user.password = securedPassword;
                await user.save();
                success = true;
                res.status(200).json({ success, msg: "Password Changed Successfully" });
            });
        }
        catch (error) {
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);


module.exports = router;