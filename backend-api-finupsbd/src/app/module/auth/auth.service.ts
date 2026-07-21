// /* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt, { JwtPayload } from 'jsonwebtoken';

// import { prisma } from '../../../app';
// import { passwordHash } from '../../utils/passwordHash';
// import sendEmail from '../../utils/sendEmail';
// import {
//   accessTokenGenerate,
//   refreshTokenGenerate,
// } from '../../utils/tokenGenerate';
// import { TUser } from '../user/user.interface';
// import bcrypt from 'bcrypt';
// import { ConfigFile } from '../../../config';
// import { generateUserId } from '../../utils/generateUserId';
// import AppError from '../../error/AppError';
// import { StatusCodes } from 'http-status-codes';
// import { verificationPINEmailTemplate } from '../../utils/email-template/verificationPIN';
// import { TMiddlewareUser } from '../../types/commonTypes';
// import phoneOtpSend from '../../utils/phoneOtpSend';

// //Sign up User

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const signUp = async (payload: TUser, userSessionInfo: { ip: string, device: string, browser: string, location: string }) => {

//   const isAlreadySignUpRequest = await prisma.user.findFirst({
//     where: {
//       email: payload.email,
//     },
//   });

//   if (isAlreadySignUpRequest) {
//     throw new AppError(StatusCodes.CONFLICT, 'You have already an account please login');
//   }

//   const { email } = payload;
//   payload.password = await passwordHash(payload.password);

//   //   const pin = crypto.randomBytes(3).toString('hex'); // 6-digit PIN
//   const pin = Math.floor(100000 + Math.random() * 900000).toString();
//   const pinExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
//   payload.pin = pin;
//   payload.pinExpiry = pinExpiry;
//   payload.userId = await generateUserId();

//   const userIsExist = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (userIsExist) {
//     if (userIsExist && userIsExist.emailVerified === false) {
//       const sendOtp = await prisma.user.update({ where: { email }, data: { pin: pin, pinExpiry: pinExpiry } });
//       const MailSubject = 'Your PIN for Verification';
//       const MailText = `
//     <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
//         <h2 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">Your Verification PIN Code</h2>
//         <p style="font-size: 16px; color: #555;">Hello ${userIsExist?.name}</p>
//         <p style="font-size: 16px; color: #555;">Your PIN code for verification is:</p>
//         <h2 style="color: #007BFF; font-size: 36px; font-weight: bold; text-align: center; margin: 20px 0;">${sendOtp.pin}</h2>
//         <p style="font-size: 16px; color: #555;"><strong>🔒 Security Note:</strong> This PIN is valid for <strong>15 minutes</strong> only. Please do not share it with anyone.</p>
//         <p style="font-size: 16px; color: #555;">If you did not request this PIN, please ignore this email or contact our support team immediately.</p>
//         <p style="font-size: 16px; color: #555;">Thank you,</p>
//         <p style="font-size: 16px; color: #555; font-weight: bold;">FinupsBD</p>
//       </div>
//     </div>
//   `;
//       await sendEmail(payload?.email, MailSubject, MailText);
//       // phoneOtpSend(phone, "send message")
//       throw new AppError(200, 'Check your email for verification PIN thank you');
//     }
//     if (userIsExist.emailVerified) {
//       throw new AppError(StatusCodes.CONFLICT, 'You have already verified user. Please login thank you');
//     }
//   }

//   const result = await prisma.user.create({ data: payload });
//   const MailSubject = 'Your PIN for Verification';
//   const MailText = `
//   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 30px;">
//     <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//       <h2 style="color: #333333; text-align: center; font-size: 24px; margin-bottom: 24px;">📩 Email Verification</h2>
//       <p style="font-size: 16px; color: #555555;">Dear <strong>${payload?.name}</strong>,</p>
//       <p style="font-size: 16px; color: #555555;">Thank you for registering with us. To complete your account setup, please use the One Time Password (OTP) provided below:</p>
//       <div style="text-align: center; margin: 24px 0;">
//         <span style="display: inline-block; background-color: #e6f0ff; color: #007BFF; font-size: 36px; font-weight: bold; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
//           ${result?.pin}
//         </span>
//       </div>
//       <p style="font-size: 16px; color: #555555;"><strong>⚠️ Note:</strong> This OTP is valid for a limited time (15 minutes). Please do not share it with anyone to ensure the security of your account.</p>
//       <p style="font-size: 16px; color: #555555;">If you did not request this, please ignore this email or contact our support team immediately.</p>
//       <p style="font-size: 16px; color: #555555;">Best regards,</p>
//       <p style="font-size: 16px; font-weight: bold; color: #333333;">Finups BD</p>
//     </div>
//   </div>
// `;

//   // const phoneOtpSuccess = await phoneOtpSend(payload?.phone, `Your OTP is ${result?.pin}. Never share this code with anyone.`)
//    await sendEmail(payload?.email, MailSubject, MailText);

//   console.log("massage send successfully")

//   return {
//     email: result.email
//   };
// };

// const login = async (payload: { email: string; password: string }) => {
//   const { email } = payload;

//   const user = await prisma.user.findUnique({
//     where: { email },
//     include: {
//       profile: true
//     }

//   });

//   if (!user) {
//     throw new AppError(404, 'We can’t find an account with those details, please register your account!');
//   }

//   if (!user.emailVerified) {
//     throw new AppError(500,
//       'Your email is not verified. Please verify your email before logging in.'
//     );
//   }

//   if (!user?.isActive) {
//     throw new AppError(400, 'Your account is inactive. Please contact support.');
//   }

//   const passwordCompare = await bcrypt.compare(
//     payload?.password,
//     user?.password
//   );

//   if (!passwordCompare) {
//     throw new AppError(400, 'Invalid password! please input valid password.');
//   }

//   const jwtPayload = {
//     name: user?.name,
//     avater: user?.profile?.avatar,
//     userId: user?.id,
//     role: user?.role,
//     email: user?.email,
//   };

//   const accessToken = accessTokenGenerate(jwtPayload, '30d');
//   const refreshToken = refreshTokenGenerate(jwtPayload, '365d');

//   await prisma.user.update({
//     where: {
//       email: user?.email,
//     },
//     data: {
//       lastLogin: new Date(),
//     },
//   }); // last login tracking

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

// const validatePin = async (payload: { email: string; pin: string }) => {
//   const { email, pin } = payload;

//   console.log(email, pin)

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     throw new AppError(400, 'User not found');
//   }

//   const currentTime = new Date();
//   if (user?.pinExpiry && user?.pinExpiry < currentTime) {
//     throw new AppError(400, 'PIN has expired');
//   }

//   if (user?.pin !== pin) {
//     throw new AppError(400, 'Invalid PIN');
//     // return { success: false, message: 'Invalid PIN' };
//   }

//   await prisma.user.update({
//     where: { email },
//     data: { emailVerified: true },
//   });

//   const emailSubject = 'Your PIN for Verification';
//   const bodyText = verificationPINEmailTemplate(user?.name ?? "", user?.userId ?? "")

//   await sendEmail(email, emailSubject, bodyText);
//   return {};
// };

// const forgetPassword = async (payload: { email: string }) => {
//   const { email } = payload;

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new AppError(404, 'User not found! Please provide valid email !');
//   }

//   if (!user.emailVerified) {
//     throw new AppError(502, 'Your email is not verified. Please verify your email');
//   }

//   if (!user?.isActive) {
//     throw new AppError(502, 'Your account is inactive. Please contact support.');
//   }

//   const jwtPayload = {
//     email: user.email,
//   }

//   const token = accessTokenGenerate(jwtPayload, '1h');

//   const passwordresetLink = `${ConfigFile.CLIENT_URL}/auth/reset-password?token=${token}&email=${user?.email}`;

//   const emailSubject = 'Your Reset Password Link';
//   const bodyHtml = `
// <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 40px;">
//   <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//     <!-- Header -->
//     <div style="background-color: #28a745; padding: 20px; text-align: center;">
//       <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Password Reset Request</h1>
//     </div>

//     <!-- Body -->
//     <div style="padding: 30px;">
//       <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hi ${user.name},</p>
//       <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
//         We received a request to reset your password. Click the button below to choose a new password. This link will expire in 1 hour.
//       </p>

//       <div style="text-align: center; margin-bottom: 30px;">
//         <a
//           href="${passwordresetLink}"
//           style="
//             display: inline-block;
//             background-color: #28a745;
//             color: #ffffff;
//             text-decoration: none;
//             padding: 15px 25px;
//             border-radius: 4px;
//             font-size: 18px;
//           "
//           target="_blank"
//         >
//           Reset Password
//         </a>
//       </div>

//       <p style="font-size: 14px; color: #777; margin-bottom: 20px;">
//         If you didn’t ask to reset your password, just ignore this email. No changes were made to your account.
//       </p>
//       <p style="font-size: 16px; color: #555;">Thanks,</p>
//       <p style="font-size: 16px; color: #555; font-weight: bold;">finupsBD Team</p>
//     </div>

//     <!-- Footer -->
//     <div style="background-color: #f0f0f0; padding: 15px; text-align: center;">
//       <p style="font-size: 14px; color: #777; margin: 0;">&copy; ${new Date().getFullYear()} finupsBD. All rights reserved.</p>
//     </div>
//   </div>
// </div>

// `;
//   await sendEmail(email, emailSubject, bodyHtml);

//   return {};
// };

// const resetPassword = async (payload: {
//   newPassword: string;
//   email: string;
// }) => {
//   const { email, newPassword } = payload;

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   if (!user.emailVerified) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY,
//       'Your email was not verifyed. Please verify your email before reset your password'
//     );
//   }

//   if (!user?.isActive) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
//   }

//   const passwordHashing = await passwordHash(newPassword);

//   await prisma.user.update({
//     where: { email },
//     data: { password: passwordHashing },
//   });

//   return {};
// };

// const refreshToken = async (token: string) => {
//   if (!token) {
//     throw new AppError(StatusCodes.UNAUTHORIZED, 'You are unauthorized');
//   }
//   const decode = (await jwt.verify(
//     token,
//     ConfigFile.JWT_REFRESH_SECRET as string
//   )) as JwtPayload;

//   const user = await prisma.user.findUnique({
//     where: { email: decode.email },
//     include: {
//       profile: true,
//     }
//   });

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
//   }

//   if (!user?.isActive) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'You are not a valid user');
//   }

//   if (!user?.emailVerified) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'You are not valid user');
//   }

//   const jwtPayload = {
//     name: user?.name,
//     avater: user?.profile?.avatar,
//     userId: user?.id,
//     role: user?.role,
//     email: user?.email,
//   };

//   const accessToken = accessTokenGenerate(jwtPayload, '1d');

//   return {
//     accessToken,
//   };
// };

// const changePassword = async (payload: {
//   oldPassword: string;
//   newPassword: string;
// }, user: TMiddlewareUser) => {

//   const { email } = user

//   const userData = await prisma.user.findUnique({ where: { email } });

// console.log(userData)
//   if (!userData) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   if (!userData.emailVerified) {
//     throw new AppError(StatusCodes.CONTINUE,
//       'Your email is not verified. Please verify your email before reset your password'
//     );
//   }

//   if (!userData?.isActive) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
//   }

//   const passwordHashing = await passwordHash(payload?.newPassword);

//   if (!userData?.password) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'User password not found');
//   }

// const checkSamePassword = await bcrypt.compare( payload?.newPassword, userData?.password);

//   if (checkSamePassword) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'You old password and new password are same. Please provide different password');
//   }

//   const passwordCompare = await bcrypt.compare( payload?.oldPassword, userData?.password);

//   if (!passwordCompare) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'Please Provide valid password');
//   }

//   await prisma.user.update({
//     where: { email },
//     data: { password: passwordHashing },
//   });

//   const emailSubject = 'Password Changed';
//   const bodyText = `
//     <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
//     <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
//       <h2 style="color: #333; text-align: center; font-size: 28px; margin-bottom: 20px; font-weight: bold;">Your Password Has Been Changed</h2>
//       <p style="font-size: 16px; color: #555; text-align: center;">Hello ${userData?.name},</p>
//       <p style="font-size: 16px; color: #555; margin-bottom: 20px;">We wanted to let you know that your password has been successfully updated. If you initiated this change, no further action is required.</p>

//       <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
//         <p style="font-size: 16px; color: #555; font-weight: bold;">Important Security Information:</p>
//         <ul style="font-size: 14px; color: #555; padding-left: 20px;">
//           <li style="margin-bottom: 8px;">If you did not request this change, please reset your password immediately.</li>
//           <li style="margin-bottom: 8px;">Check your account activity for any unusual behavior.</li>
//           <li style="margin-bottom: 8px;">For further assistance, contact our support team at <a href="mailto:support@finupsbd.com" style="color: #007BFF;">support@finupsbd.com</a>.</li>
//         </ul>
//       </div>

//       <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">Your security is our top priority. We take every measure to ensure your account remains protected.</p>

//       <div style="text-align: center;">
//         <p style="font-size: 16px; color: #555;">Thank you for using finupsBD!</p>
//         <p style="font-size: 16px; color: #555; font-weight: bold;">The finupsBD Team</p>
//       </div>

//       <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #aaa;">
//         <p>If you did not request this change, please ignore this email. This message was sent automatically, and you do not need to reply.</p>
//       </div>
//     </div>
//   </div>

//   `;

//   await sendEmail(email, emailSubject, bodyText);
//   return {};
// };

// export const AuthServices = {
//   signUp,
//   validatePin,
//   login,
//   forgetPassword,
//   resetPassword,
//   refreshToken,
//   changePassword
// };
