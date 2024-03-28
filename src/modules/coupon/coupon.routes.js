import express from "express";
import * as CV from "./coupon.validation.js";
import * as CC from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middleware/validation.js";


const couponRouter = express.Router();

couponRouter.post(
  "/create",
  auth(validRoles.Admin),
  validation(CV.createCoupon),
  CC.createCoupon
);

couponRouter.put(
  "/update/:id",
  auth(validRoles.Admin),
  validation(CV.updateCoupon),
  CC.updateCoupon
);

export default couponRouter;
