import express from "express";
import * as CV from "./category.validation.js";
import * as CC from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { multerCloudinary } from "../../services/multer.js";
import { auth } from "../../middleware/auth.js";
import { headers } from "../../utils/generalField.js";
import { validRoles } from "../../utils/systemRoles.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";


const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subCategories", subCategoryRouter);

categoryRouter.post(
  "/create",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(CV.createCategory),
  CC.createCategory
);

categoryRouter.put(
  "/update/:id",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(CV.updateCategory),
  CC.updateCategory
);

categoryRouter.delete(
  "/delete/:id",
  auth(validRoles.Admin),
  validation(CV.deleteCategory),
  CC.deleteCategory
);

categoryRouter.get("/", CC.getCategories);

export default categoryRouter;
