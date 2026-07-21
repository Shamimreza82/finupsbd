// import express, { NextFunction, Request, Response } from "express"
// import { AuthController } from "./auth.controller"
// import validateRequest from "../../middleware/validateRequest"
// import { UserValidation } from "../user/user.validation"
// import { AuthValidation } from "./auth.validation"
// import catchAsync from "../../utils/catchAsync"
// import auth from "../../middleware/auth"

// const router = express.Router()

// router.post('/signUp', validateRequest(UserValidation.createUserValidationSchema), AuthController.signUp)
// router.post('/validate-pin', validateRequest(UserValidation.verifyPinValidationSchema), AuthController.validatePin)
// router.post('/login', validateRequest(UserValidation.loginValidationSchema), AuthController.login)
// router.post('/forget-password', validateRequest(UserValidation.forgetPasswordValidationSchema), AuthController.forgetPassword)
// router.post('/reset-password', AuthController.resetPassword)
// router.post('/change-password', auth("USER", "ADMIN", "SUPER_ADMIN"), validateRequest(UserValidation.changePasswordValidationSchema), AuthController.changePassword)
// router.post('/refresh-token',catchAsync((req: Request, res: Response, next: NextFunction) => {
//     req.cookies = AuthValidation.refreshTokenValidationSchema.parse(req.cookies)
//     next()
// }), AuthController.refreshToken)
// router.post('/logout', AuthController.logout)

// export const AuthRouter = router
