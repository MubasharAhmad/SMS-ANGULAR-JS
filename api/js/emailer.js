const nodeMailer = require("nodemailer");

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

const sendEmail = (to, subject, body, callBack = null) => {
    const mailOptions = {
        from: Transporter_Email,
        to: to,
        subject: subject,
        html: body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if(callBack){
            callBack(error, info);
        }
    });
}

module.exports = sendEmail;