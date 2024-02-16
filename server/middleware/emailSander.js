const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.GMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const emailSender = async (email, invNum, buyName, pdfBuffer) => {
  return new Promise((resolve, reject) => {
    const info = {
      from: '"Mesnica" bigblondeandrew@gmail.com',
      to: email,
      subject: `Invoice num ${invNum}`,
      text: `${buyName}, thank you for your purchase. Attached is your invoice.`,
      attachments: [
        {
          filename: `Invoice_num_${invNum}.pdf`,
          encoding: "base64",
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(info, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
};

const emailStatusSend = async (email, invNum, buyName, status, time) => {
  return new Promise((resolve, reject) => {
    const info = {
      from: '"Mesnica" <bigblondeandrew@gmail.com>',
      to: email,
      subject: `Order num ${invNum} is ${!status ? "Rejected" : "Confirmed"}`,
      text: `Dear ${buyName},\n\n${
        !status
          ? "your order has been rejected, please try again later."
          : `your order has been confirmed.\n\nYou can pick it up at ${time}h.\n\nThank you for your purchase.`
      }`,
    };

    transporter.sendMail(info, (error, info) => {
      if (error) {
        console.log(error);
        reject(error); // Reject the promise if there's an error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info); // Resolve the promise with the info if successful
      }
    });
  });
};

module.exports = { emailSender, emailStatusSend };
