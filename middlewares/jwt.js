import jwt from "jsonwebtoken";
import {config} from "dotenv";
config()


const payload = {
    iss: "beproject",
    sub: "ID",
    aud: "beprojectuser"

    // !!TODO
    //id: user.id,
    //name: user.name,
    //email. user.email
}

const secretkey = process.env.SECRETKEY

const token = jwt.sign(payload, secretkey, {expiresIn: "1h"})

