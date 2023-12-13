import {Router} from "express";
import {deleteUser, get, loginUser, register, update} from "../controller/user.controller.js";
import {emailValidation} from "../middlewares/validation/emailValidation.js";
import {firstNameValidation, lastNameValidation} from "../middlewares/validation/nameValidation.js";
import {validationHandler} from "../middlewares/validation/validationHandler.js";
import {tokenChecker} from "../middlewares/tokenChecker.js";

export const userRoutes = Router();

userRoutes.post("/signup", firstNameValidation, lastNameValidation, emailValidation, validationHandler, register)
userRoutes.post("/login", loginUser)
userRoutes.get("/all", tokenChecker, get)
userRoutes.patch("/update", update)
userRoutes.delete("/delete", deleteUser)