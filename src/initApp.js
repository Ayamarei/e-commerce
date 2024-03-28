import path from "path";
import { config } from "dotenv";
config({ path: path.resolve("config/.env") });
import { DBConnection } from "../DB/dbConnection.js";
import { globalErrorHandling } from "./utils/asyncHandler.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import productRouter from "./modules/product/product.routes.js";
import morgan from "morgan";
import chalk from "chalk"
import cors from "cors"
import reviewRouter from "./modules/review/review.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import orderRouter from "./modules/order/order.routes.js";
const port = process.env.PORT || 3001;










export const initApp = (app, express) => {


    if (process.env.Mode == "dev") {
        app.use(morgan("dev"))
    }

    app.use(cors());


    app.get("/", (req, res, next) => {
        res.status(200).json({ msg: "welcome on my project" })
    })

    app.use((req, res, next) => {
        if (req.originalUrl == "/orders/webhook") {
            next()
        } else {
            express.json()(req, res, next)
        }
    });



   
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/categories", categoryRouter);
    app.use("/subCategories", subCategoryRouter);
    app.use("/brands", brandRouter);
    app.use("/products", productRouter);
    app.use("/reviews", reviewRouter);
    app.use("/carts", cartRouter);
    app.use("/coupons", couponRouter);
    app.use("/orders", orderRouter);
   

    
    
  
  
    app.use("*", (req, res, next) => {
        let err = new Error(`${req.originalUrl} is invalid url!`)
        next(err)
    });
    DBConnection()
    app.use(globalErrorHandling);
    app.listen(port, () => console.log(chalk.cyan(`Example app listening on port ${port}`)));
};