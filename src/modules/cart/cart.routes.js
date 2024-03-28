import express from "express";
import * as CV from "./cart.validation.js";
import * as CC from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middleware/validation.js";


const cartRouter = express.Router();

cartRouter.post(
  "/create",
  auth(validRoles.Admin),
  validation(CV.createCart),
  CC.createCart
);

cartRouter.put(
  "/remove",
  auth(validRoles.Admin),
  validation(CV.removeCart),
  CC.removeCart
);
cartRouter.put(
  "/clear",
  auth(validRoles.Admin),
  validation(CV.clearCart),
  CC.clearCart
);



export default cartRouter;
