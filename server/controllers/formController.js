const nodemailer = require("nodemailer");
require('dotenv').config();

const user = process.env.GMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

const formReciver = async (req, res) => {
    try {
        const info = {
            from: '',
            to: 'bigblondeandrew@gmail.com',
            subject: `${req.body.name} Website Upit`,
            text: `${req.body.email}\n\n${req.body.name}\n\n${req.body.message}`,
        };

        await transporter.sendMail(info);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
};

module.exports = {formReciver};