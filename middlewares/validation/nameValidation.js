import {check} from "express-validator";

export const firstNameValidation = check("firstName")
    .isLength({min: 2})
    .withMessage("Dies ist kein gültiger Vorname")

export const lastNameValidation = check("lastName")
    .isLength({min: 2})
    .withMessage("Dies ist kein gültiger Nachname")