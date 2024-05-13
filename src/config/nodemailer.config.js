import nodemailer from 'nodemailer';

const secretKey = process.env.GOOGLE_PASSWOR;
const transporter = nodemailer.createTransport({
    service: 'smt.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ezequielleivacecchi@gmail.com',
        pass: secretKey
    }
});

export default transporter;