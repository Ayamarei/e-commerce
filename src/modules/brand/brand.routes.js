import express from "express";
import * as CV from "./brand.validation.js";
import * as CC from "./brand.controller.js";
import { validation } from "../../middleware/validation.js";
import { headers } from "../../utils/generalField.js";
import { validRoles } from "../../utils/systemRoles.js";
import { auth } from "../../middleware/auth.js";
import { multerCloudinary } from "../../services/multer.js";


const brandRouter = express.Router();

brandRouter.post(
  "/create",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(CV.createbrand),
  CC.createbrand
);

brandRouter.put(
  "/update/:id",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(CV.updatebrand),
  CC.updatebrand
);

export default brandRouter;
