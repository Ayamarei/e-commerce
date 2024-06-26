import express from "express";
import * as RV from "./review.validation.js";
import * as RC from "./review.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";


const reviewRouter = express.Router({ mergeParams: true });


reviewRouter.post("/",
    validation(RV.addReview),
    auth([...validRoles.User, ...validRoles.Admin]),
    RC.addReview
)

reviewRouter.delete("/:id",
    // validation(RV.addReview),
    auth([...validRoles.User, ...validRoles.Admin]),
    RC.removeReview
)

export default reviewRouter;
