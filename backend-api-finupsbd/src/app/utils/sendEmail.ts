import nodemailer from 'nodemailer';
import AppError from '../error/AppError';
import { StatusCodes } from 'http-status-codes';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const sendEmail = async (
  toEmail: string,
  emailSubject: string,
  bodyText: string,
  // html: string,
) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODE_MAILER_EMAIL, // sender address
      to: toEmail, // list of receivers
      subject: emailSubject, // Subject line
      text: bodyText, // plain text body
      html: bodyText, // html body
    });

    console.log('Message sent:', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error(error);
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, `Email Send Failded`);
  }
};

export default sendEmail;

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: 'in-v3.mailjet.com',
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: process.env.MAILJET_API_KEY,
//     pass: process.env.MAILJET_SECRET_KEY,
//   },
// });

// const sendEmail = async (toEmail: string, emailSubject: string, bodyText: string,
//   // html: string,

// ) => {
//   const info = await transporter.sendMail({
//     from: process.env.SENDER_EMAIL, // sender address
//     to: toEmail, // list of receivers
//     subject: emailSubject, // Subject line
//     text: bodyText, // plain text body
//     html: bodyText, // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// };

// export default sendEmail;
