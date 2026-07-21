/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../../app';
import sendEmail from '../../../utils/sendEmail';
import AppError from '../../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import { TUserBank } from './userBankAuth.interface';
import { generateLoginId } from '../../../utils/loginIdGenerator';
import { accessTokenGenerate, refreshTokenGenerate } from '../../../utils/tokenGenerate';
import { BankName } from '@prisma/client';
import { mailBodyText } from './userBankAuth.constant';
import { formatBankName } from '../../../utils/formateBankName';
import { formatDate } from '../../../utils/formatDate';

//Sign up User

const userBankRegister = async (payload: TUserBank) => {
  const loginId = generateLoginId(); //genarate 9 digit login id fir login perpose
  payload.loginId = loginId;

  const isExistingBank = await prisma.userBank.findFirst({
    where: {
      OR: [
        { email: payload.email },
        { bankName: payload.bankName }, // Cast to 'any' or use the correct enum type if imported
      ],
    },
  });

  if (isExistingBank) {
    throw new AppError(StatusCodes.CONFLICT, 'User already exist please login, Thank you');
  }

  // Import the BankName enum from Prisma client

  // Ensure payload matches the expected type for Prisma
  const result = await prisma.userBank.create({
    data: {
      ...payload,
    },
    select: {
      loginId: true,
    },
  });

  return result;
};

const login = async (payload: { bankName: BankName; loginId: string; password: string }) => {
  const { bankName, loginId, password } = payload;
  const userBank = await prisma.userBank.findFirst({
    where: {
      AND: [{ bankName }, { loginId }],
    },
  });

  if (!userBank) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found Check your login id');
  }

  if (!userBank.isActive) {
    throw new AppError(500, 'Your account is not active now call finupsbd team thank you.');
  }

  if (userBank.isBlocked) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is blocked after too many failed login attempts. Please contact support.',
    );
  }

  if (userBank.password !== password) {
    // increment failure count
    const attempts = userBank.failedLoginAttempts + 1;
    const updateData: {
      failedLoginAttempts: number;
      isBlocked?: boolean;
      blockedAt?: Date;
    } = { failedLoginAttempts: attempts };

    if (attempts >= 3) {
      updateData.isBlocked = true;
      updateData.blockedAt = new Date();
    }

    await prisma.userBank.update({
      where: { loginId },
      data: updateData,
    });

    const mailSubject = '🔒 Security Alert: Your FinupsBD Account Has Been Locked';
    const bodyText = await mailBodyText(
      userBank.loginId,
      formatBankName(userBank.bankName),
      formatDate(userBank.blockedAt, 'ddd, MMM D, YYYY h:mm A', {
        locale: 'en-GB',
      }),
    );

    if (attempts >= 3) {
      await sendEmail(userBank.email, mailSubject, bodyText);
    }

    const triesLeft = Math.max(0, 3 - attempts);
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      `Invalid credentials. ${triesLeft} attempt(s) remaining before your account is blocked.`,
    );
  }

  const jwtPayload = {
    bankName: userBank.bankName,
    bankCode: userBank.bankCode,
    role: userBank.role,
    email: userBank.email,
    loginId: userBank.loginId,
  };

  const userBankAccessToken = accessTokenGenerate(jwtPayload, '1d');
  const userBankRefreshToken = refreshTokenGenerate(jwtPayload, '365d');

  return {
    userBankAccessToken,
    userBankRefreshToken,
  };
};

// const validatePin = async (payload: { email: string; pin: string }) => {
//   const { email, pin } = payload;

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
//   const bodyText = `
//    <head>
//       <style>
//         body {
//           font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//           color: #333;
//           margin: 0;
//           padding: 0;
//           background-color: #f4f4f4;
//         }
//         .email-container {
//           width: 100%;
//           background-color: #f4f4f4;
//           padding: 20px 0;
//         }
//         .email-content {
//           max-width: 600px;
//           margin: 0 auto;
//           background-color: #ffffff;
//           padding: 40px;
//           border-radius: 8px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }
//         .email-header {
//           text-align: center;
//           padding-bottom: 20px;
//         }
//         .email-header h2 {
//           color: #007BFF;
//           font-size: 28px;
//           margin: 0;
//         }
//         .email-body {
//           font-size: 16px;
//           line-height: 1.6;
//           color: #333;
//         }
//         .cta-button {
//           display: inline-block;
//           background-color: #007BFF;
//           color: #ffffff;
//           padding: 12px 24px;
//           text-decoration: none;
//           font-size: 16px;
//           border-radius: 4px;
//           margin-top: 20px;
//         }
//         .footer {
//           text-align: center;
//           padding-top: 30px;
//           font-size: 12px;
//           color: #777;
//         }
//         .footer a {
//           color: #007BFF;
//           text-decoration: none;
//         }
//         .social-icons img {
//           width: 24px;
//           margin: 0 10px;
//         }
//         @media (max-width: 600px) {
//           .email-content {
//             padding: 20px;
//           }
//           .email-header h2 {
//             font-size: 24px;
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <table role="presentation" class="email-container">
//         <tr>
//           <td align="center">
//             <table role="presentation" class="email-content">
//               <tr class="email-header">
//                 <td>
//                   <h2>Welcome to FinupsBd, ${user.name}!</h2>
//                 </td>
//               </tr>
//               <tr class="email-body">
//                 <td>
//                   <p>Dear ${user.name},</p>
//                   <p>Thank you for joining <strong>FinupsBd</strong>! your userID: <strong></strong>! We are thrilled to have you as part of our community.</p>
//                   <p>At FinupsBd, we strive to provide you with top-notch services and a seamless experience. Our team is here to assist you every step of the way, ensuring your journey with us is smooth and successful.</p>
//                   <p>To get started, feel free to explore our platform, and if you need any assistance, don't hesitate to reach out to our support team.</p>
//                   <a href="https://finupsbd.com/get-started" class="cta-button">Get Started</a>
//                 </td>
//               </tr>
//               <tr class="footer">
//                 <td>
//                   <p>&copy; ${new Date().getFullYear()} FinupsBd. All rights reserved.</p>
//                   <p>1234 Business St., Suite 567, City, Country</p>
//                   <div class="social-icons">
//                     <a href="https://facebook.com/finupsbd"><img src="facebook-icon.png" alt="Facebook"></a>
//                     <a href="https://twitter.com/finupsbd"><img src="twitter-icon.png" alt="Twitter"></a>
//                     <a href="https://linkedin.com/company/finupsbd"><img src="linkedin-icon.png" alt="LinkedIn"></a>
//                   </div>
//                   <p><a href="https://finupsbd.com/unsubscribe">Unsubscribe</a></p>
//                 </td>
//               </tr>
//             </table>
//           </td>
//         </tr>
//       </table>
//     </body>
// `;
//   await sendEmail(email, emailSubject, bodyText);

//   return {};
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
//     throw new AppError(404, 'User not found');
//   }

//   // if (!user.emailVerified) {
//   //   throw new AppError(500,
//   //     'Your email is not verified. Please verify your email before logging in.'
//   //   );
//   // }

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

//   const accessToken = accessTokenGenerate(jwtPayload, '1d');
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

// const forgetPassword = async (payload: { email: string }) => {
//   const { email } = payload;

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new AppError(404, 'User not found! Please provide valid email !');
//   }

//   // if (!user.emailVerified) {
//   //   throw new AppError(502, 'Your email is not verified. Please verify your email');
//   // }

//   if (!user?.isActive) {
//     throw new AppError(502, 'Your account is inactive. Please contact support.');
//   }

//   const newPassword = generateCustomPassword()

//   const newUserPassword = await prisma.user.update({
//     where: { email },
//     data: {
//       password: newPassword
//     },
//   });

//   // const pin = Math.floor(100000 + Math.random() * 900000).toString();
//   // const pinExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

//   //   const resetPin = await prisma.user.update({
//   //     where: { email },
//   //     data: {
//   //       pin: pin,
//   //       pinExpiry: pinExpiry,
//   //       emailVerified: false,
//   //     },
//   //   });

//   const emailSubject = 'Your New Password';
//   const bodyText = `
// <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 40px;">
//   <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//     <!-- Header Section -->
//     <div style="background-color: #007BFF; padding: 20px; text-align: center;">
//       <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Your New Password</h1>
//     </div>
//     <!-- Body Section -->
//     <div style="padding: 30px;">
//       <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hello ${user?.name},</p>
//       <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
//         We have generated a new password for your account. Please use the password below to log in. For your security, we highly recommend that you change it immediately after logging in.
//       </p>
//       <div style="text-align: center; margin: 30px 0;">
//         <span style="display: inline-block; background-color: #f0f0f0; padding: 15px 25px; font-size: 24px; letter-spacing: 2px; border-radius: 4px; color: #333;">
//           ${newUserPassword?.password}
//         </span>
//       </div>
//       <p style="font-size: 14px; color: #777; margin-bottom: 20px;">
//         If you did not request a new password, please contact our support team immediately.
//       </p>
//       <p style="font-size: 16px; color: #555;">Thank you,</p>
//       <p style="font-size: 16px; color: #555; font-weight: bold;">finupsBD</p>
//     </div>
//     <!-- Footer Section -->
//     <div style="background-color: #f0f0f0; padding: 15px; text-align: center;">
//       <p style="font-size: 14px; color: #777; margin: 0;">&copy; ${new Date().getFullYear()} finupsBD. All rights reserved.</p>
//     </div>
//   </div>
// </div>
// `;

//   await sendEmail(email, emailSubject, bodyText);

//   if (user) {
//     await prisma.user.update({
//       where: { email },
//       data: {
//         password: await passwordHash(user?.password)
//       },
//     });
//   }

//   return {};
// };

// const resetPassword = async (payload: {
//   newPassword: string;
//   email: string;
// }) => {
//   const { email } = payload;
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   if (!user.emailVerified) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY,
//       'Your email is not verified. Please verify your email before reset your password'
//     );
//   }

//   if (!user?.isActive) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
//   }

//   const passwordHashing = await passwordHash(payload?.newPassword);

//   await prisma.user.update({
//     where: { email },
//     data: { password: passwordHashing },
//   });

//   const emailSubject = 'Password Changed';
//   const bodyText = `
//   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
//   <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
//     <h2 style="color: #333; text-align: center; font-size: 28px; margin-bottom: 20px; font-weight: bold;">Your Password Has Been Changed</h2>
//     <p style="font-size: 16px; color: #555; text-align: center;">Hello ${user?.name},</p>
//     <p style="font-size: 16px; color: #555; margin-bottom: 20px;">We wanted to let you know that your password has been successfully updated. If you initiated this change, no further action is required.</p>

//     <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
//       <p style="font-size: 16px; color: #555; font-weight: bold;">Important Security Information:</p>
//       <ul style="font-size: 14px; color: #555; padding-left: 20px;">
//         <li style="margin-bottom: 8px;">If you did not request this change, please reset your password immediately.</li>
//         <li style="margin-bottom: 8px;">Check your account activity for any unusual behavior.</li>
//         <li style="margin-bottom: 8px;">For further assistance, contact our support team at <a href="mailto:support@pinupsdb.com" style="color: #007BFF;">support@pinupsdb.com</a>.</li>
//       </ul>
//     </div>

//     <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">Your security is our top priority. We take every measure to ensure your account remains protected.</p>

//     <div style="text-align: center;">
//       <p style="font-size: 16px; color: #555;">Thank you for using PinUpsDB!</p>
//       <p style="font-size: 16px; color: #555; font-weight: bold;">The PinUpsDB Team</p>
//     </div>

//     <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #aaa;">
//       <p>If you did not request this change, please ignore this email. This message was sent automatically, and you do not need to reply.</p>
//     </div>
//   </div>
// </div>

// `;

//   await sendEmail(email, emailSubject, bodyText);
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
// }, user: any) => {

//   const { email } = user

//   const userData = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   //   if (!user.emailVerified) {
//   //     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY,
//   //       'Your email is not verified. Please verify your email before reset your password'
//   //     );
//   //   }

//   if (user?.isActive) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
//   }

//   const passwordHashing = await passwordHash(payload?.newPassword);

//   if (!userData?.password) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'User password not found');
//   }
//   const checkPassword = await comparePassword(payload.oldPassword, userData.password);

//   if (!checkPassword) {
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
//       <p style="font-size: 16px; color: #555; text-align: center;">Hello ${user?.name},</p>
//       <p style="font-size: 16px; color: #555; margin-bottom: 20px;">We wanted to let you know that your password has been successfully updated. If you initiated this change, no further action is required.</p>

//       <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
//         <p style="font-size: 16px; color: #555; font-weight: bold;">Important Security Information:</p>
//         <ul style="font-size: 14px; color: #555; padding-left: 20px;">
//           <li style="margin-bottom: 8px;">If you did not request this change, please reset your password immediately.</li>
//           <li style="margin-bottom: 8px;">Check your account activity for any unusual behavior.</li>
//           <li style="margin-bottom: 8px;">For further assistance, contact our support team at <a href="mailto:support@pinupsdb.com" style="color: #007BFF;">support@pinupsdb.com</a>.</li>
//         </ul>
//       </div>

//       <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">Your security is our top priority. We take every measure to ensure your account remains protected.</p>

//       <div style="text-align: center;">
//         <p style="font-size: 16px; color: #555;">Thank you for using PinUpsDB!</p>
//         <p style="font-size: 16px; color: #555; font-weight: bold;">The PinUpsDB Team</p>
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

export const UserBankAuthServices = {
  userBankRegister,
  // validatePin,
  login,
  // forgetPassword,
  // resetPassword,
  // refreshToken,
  // changePassword
};
