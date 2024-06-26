


import mongoose from "mongoose";
import chalk from "chalk";



export const DBConnection= async () => {
   await mongoose.connect(process.env.dbUrl).then(() => {
        console.log(chalk.cyan(`db connected in ${process.env.dbUrl}`))
    }).catch((err) => {
        console.log({ msg: chalk.red("fail connect to db"), err });
    })
}