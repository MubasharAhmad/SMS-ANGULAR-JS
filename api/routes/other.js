const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const sendEmail = require("../js/emailer");

const Message = require("../models/Message");

// url
const API_URL = process.env.API_URL;
const WEB_URL = process.env.WEB_URL;


//  POST api/other/message
router.post(
    "/message",
    [
        body("firstName", "Please enter a valid first name").isLength({ min: 3 }),
        body("email", "Please enter a valid email").isEmail(),
        body("message", "Please enter a message with 5 or more characters").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let success = false;
            let Body = `<div style="text-align: center">
                <img src="${WEB_URL}/assets/images/logo.png" alt="logo" border="0">
                <h1>The GLORIOUS Future School</h1>
                <p>Your message has been recieved. Do not reply on this gmail. This is auto-reply to you. We will contact to you in 2-3 bussiness days. Please Wait!</p>
                <p>Thanks for using our service.</p>
            </div>`
            sendEmail(req.body.email, "Contact", Body, (err, info) => {
                if (err) {
                    res.status(500).send({ success, msg: "Internal Server Error" });
                }
            });

            const message = new Message({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                message: req.body.message,
                date: new Date()
            });
            await message.save();
            success = true;
            return res.status(200).json({ success, msg: "Message sent successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);

module.exports = router;