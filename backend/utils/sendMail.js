const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_MAIL_Id,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL_Id,
            to: email,
            subject: 'OTP Verification',
            text: ` Your OTP is: ${otp}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(' Email sent: ', info.response, "otp: ", otp);
    } catch (error) {
        console.error(' Error sending email: ', error);
    }
};

module.exports = sendMail;
