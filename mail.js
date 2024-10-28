
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ajaym.22cse@kongu.edu', 
        pass: 'netaigqrrijlgxvm',
    },
});

function sendMail(to, sub, msg) {
    transporter.sendMail({
        from: 'ajaym.22cse@kongu.edu', 
        to: to,
        subject: sub,
        html: msg,
    }, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
}

sendMail('deepikapm.22cse@kongu.edu', 'thalaivare', 'tappangu tappangu thalaivare');
