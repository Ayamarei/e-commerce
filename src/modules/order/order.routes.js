import express from 'express';
import * as OV from "./order.validation.js";
import * as OC from "./order.controller.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middleware/validation.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  auth([...validRoles.User, ...validRoles.Admin]),
  validation(OV.createOrder),
  OC.createOrder
);

orderRouter.patch("/:orderId",
  validation(OV.cancelOrder),
  auth([...validRoles.User, ...validRoles.Admin]),
  OC.cancelOrder)

 



orderRouter.post('/webhook', express.raw({type: 'application/json'}), OC.webhook);







export default orderRouter;
