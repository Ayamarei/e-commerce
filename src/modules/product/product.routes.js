import express from "express";
import * as PV from "./product.validation.js";
import * as PC from "./product.controller.js";
import { validation } from "../../middleware/validation.js";
import { headers } from "../../utils/generalField.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { multerCloudinary } from "../../services/multer.js";
import reviewRouter from "../review/review.routes.js";


const productRouter = express.Router();


productRouter.use("/:productId/reviews", reviewRouter)

productRouter.post(
  "/create",
  validation(headers.headers),
  auth([...validRoles.Admin, ...validRoles.User]),
  multerCloudinary().array("images"),
  validation(PV.createProduct),
  PC.createProduct
);

productRouter.put(
  "/update/:productId",
  validation(headers.headers),
  auth([...validRoles.Admin, ...validRoles.User]),
  multerCloudinary().array("images"),
  validation(PV.updateProduct),
  PC.updateProduct
);


productRouter.get(
  "/",
  PC.getProducts
);

//! *****************wishlist************** */
productRouter.patch(
  "/:productId/wishList",
  auth([...validRoles.Admin, ...validRoles.User]),
  PC.addToWishList
);
productRouter.patch(
  "/:productId/wishList/remove",
  auth([...validRoles.Admin, ...validRoles.User]),
  PC.removeFromWishList
);



export default productRouter;
