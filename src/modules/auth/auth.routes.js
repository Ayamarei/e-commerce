import express from "express"
import * as AV from "./auth.validation.js";
import * as AC from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";


const authRouter = express.Router();

authRouter.post("/signUp", validation(AV.signUp) ,AC.signUp)
authRouter.get("/confirmEmail/:token", validation(AV.confirmEmail), AC.confirmEmail)
authRouter.get("/refreshToken/:token", validation(AV.confirmEmail), AC.refreshToken)
authRouter.patch("/sendCode", validation(AV.forgetPassword), AC.forgetPassword)
authRouter.patch("/resetPassword", validation(AV.resetPassword), AC.resetPassword)
authRouter.post("/signIn", validation(AV.signIn), AC.signIn)

export default authRouter