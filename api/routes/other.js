const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const axios = require("axios");

const Messaga = require("../models/Message");

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

            // verify existence of email
            const { data } = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=9bd9f51f3f98494fa65c2253a079282f&email=${req.body.email}`);
            if (data.is_smtp_valid.value !== true) {
                return res.status(400).json({ success, msg: "Email does not exist" });
            }

            // save message in database
            const message = new Messaga({
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
            console.error(error.message);
            res.status(500).send({ success, msg: "Internal Server Error" });
        }
    }
);

module.exports = router;