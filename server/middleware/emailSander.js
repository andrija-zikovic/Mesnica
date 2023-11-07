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

const emailSander = async (email, invNum, buyName, pdfBuffer) => {
    const info = {
        from: '"Mesnica" bigblondeandrew@gmail.com',
        to: email,
        subject: `Račun broj ${invNum}`,
        text: `${buyName} hvala vam na kupovini, u privitku je vaš račun.`,
        attachments: [{
          filename: `Račun_br_${invNum}.pdf`,
          encoding: 'base64',
          content: pdfBuffer,
        }]
    };

    transporter.sendMail(info, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = emailSander