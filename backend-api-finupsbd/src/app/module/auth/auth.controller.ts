// import { StatusCodes } from 'http-status-codes';
// import catchAsync from '../../utils/catchAsync';
// import { AuthServices } from './auth.service';
// import sendResponce from '../../utils/sendResponce';
// import { ConfigFile } from '../../../config';
// import { getRequestContext } from '../../utils/super-admin-utiles/context';
// import { TMiddlewareUser } from '../../types/commonTypes';

// const signUp = catchAsync(async (req, res) => {
//   const userSessionInfo = await getRequestContext(req)
//   const result = await AuthServices.signUp(req.body, userSessionInfo);

//   console.log(userSessionInfo)

//   sendResponce(res, {
//     success: true,
//     message: "Cheack your phone or email and and verify!",
//     statusCode: StatusCodes.CREATED,
//     data: result,
//   });
// });

// const validatePin = catchAsync(async (req, res) => {
//   const result = await AuthServices.validatePin(req.body);

//   sendResponce(res, {
//     success: true,
//     message: 'User verify successfully please Login',
//     statusCode: StatusCodes.CREATED,
//     data: result,
//   });
// });

// const login = catchAsync(async (req, res) => {
//   const result = await AuthServices.login(req.body);

//   const { refreshToken, accessToken } = result;

//   console.log(refreshToken)

//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: ConfigFile.NODE_ENV === 'production',
//     sameSite: 'none',
//   });

//   res.cookie('accessToken', accessToken, {
//     httpOnly: true,
//     secure: ConfigFile.NODE_ENV === 'production',
//     sameSite: 'none',
//   });

//   sendResponce(res, {
//     success: true,
//     message: 'User login successfully!',
//     statusCode: StatusCodes.OK,
//     data: { accessToken },
//   })
// });

// const forgetPassword = catchAsync(async (req, res) => {
//   const result = await AuthServices.forgetPassword(req.body);

//   sendResponce(res, {
//     success: true,
//     message: 'Check your phone or email for verification!',
//     statusCode: StatusCodes.OK,
//     data: result
//   })

// });

// const resetPassword = catchAsync(async (req, res) => {
//   const result = await AuthServices.resetPassword(req.body);

//   sendResponce(res, {
//     success: true,
//     message: 'Password Reset successfully please login',
//     statusCode: StatusCodes.OK,
//     data: result
//   })

// });

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;

//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponce(res, {
//     success: true,
//     message: 'Access Token is retrieve',
//     statusCode: StatusCodes.OK,
//     data: result
//   })
// });

// const logout = catchAsync(async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   const { refreshToken } = req.cookies;
//   if (token) {
//     res.clearCookie(refreshToken);
//     // blacklistedTokens.add(token)

//     sendResponce(res, {
//       success: true,
//       message: 'logout Successfully',
//       statusCode: StatusCodes.OK,
//       data: {}
//     })
//   }
// });

// const changePassword = catchAsync(async (req, res) => {
//   const user = req.user
//   const result = await AuthServices.changePassword(req.body, user as TMiddlewareUser);
//   sendResponce(res, {
//     success: true,
//     message: 'Password chnage successfully ',
//     statusCode: StatusCodes.OK,
//     data: result
//   })
// });

// export const AuthController = {
//   signUp,
//   validatePin,
//   login,
//   forgetPassword,
//   resetPassword,
//   refreshToken,
//   logout,
//   changePassword
// };
