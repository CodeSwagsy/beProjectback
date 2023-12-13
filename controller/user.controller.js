import {UserModel} from "../models/User.model.js";

export const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const existingUser = await UserModel.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                answer: {
                    code: 400,
                    message: "Die E-Mail-Adresse ist bereits registriert."
                }
            });
        }
        const data = await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        const dataObj = data.toObject();
        delete dataObj.password;
        res.status(200).json({
            answer: {
                code: 200,
                data: dataObj,
                message: "Nutzer wurde erfolgreich angelegt"
            }
        })
    } catch (err) {
        res.status(500).json({
            answer: {
                code: 500,
                message: err.message
            }

        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status(404).json({
                answer: {
                    code: 404,
                    message: "Benutzer / Email wurde nicht gefunden"
                }
            })
        }
        const isMatch = await user.auth(password);

        if (isMatch) {
            const now = new Date();
            user.lastLogin = now; // Speichere die Zeit in lokaler Zeitzone
            await user.save();
            const dataObj = user.toObject()
            delete dataObj.password;
            dataObj.lastLogin = now.toLocaleString();
            dataObj.createdAt = dataObj.createdAt.toLocaleString();
            dataObj.updatedAt = dataObj.updatedAt.toLocaleString();
            res.status(200).json({
                answer: {
                    code: 200,
                    data: dataObj,
                    message: "Du wurdest erfolgreich eingeloggt!"
                }
            })
        } else {
            return res.status(401).json({
                answer: {
                    code: 200,
                    message: "Logindaten inkorrekt"
                }
            })
        }
    } catch (err) {
        return res.status(500).json({
            answer: {
                code: 500,
                message: err.message
            }
        })
    }
}

export const get = async (req, res) => {
    try {
        const data = await UserModel.find()
        res.json(data)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const {email, firstName, lastName} = req.body;

        const user = await UserModel.findOne({email: email})

        if (!user) {
            return res.status(404).json({
                answer: {
                    code: 404,
                    message: "Benutzer wurde nicht gefunden"
                }
            });
        }

        if (firstName) {
            user.firstName = firstName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        await user.save();

        const dataObj = user.toObject();
        delete dataObj.password;
        dataObj.createdAt = dataObj.createdAt.toLocaleString();
        dataObj.updatedAt = dataObj.updatedAt.toLocaleString();

        res.status(200).json({
            answer: {
                code: 200,
                data: dataObj,
                message: "Benutzerdaten erfolgreich aktualisiert"
            }
        });
    } catch (err) {
        res.status(500).json({
            answer: {
                code: 500,
                message: err.message
            }
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await UserModel.findOne({email}); // Finde den Benutzer anhand der E-Mail-Adresse

        if (!user) {
            return res.status(404).json({message: "Benutzer nicht gefunden"});
        }

        await UserModel.deleteOne({_id: user._id}); // Lösche den Benutzer anhand der gefundenen ID
        res.status(200).json({
            answer: {
                code: 200,
                message: "Benutzer erfolgreich gelöscht"
            }
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
