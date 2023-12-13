import {check} from "express-validator";

export const emailValidation = check("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Dies ist keine gültige Email")