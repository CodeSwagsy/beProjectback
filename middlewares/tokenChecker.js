export function tokenChecker(req, res, next) {
    try {
        const token = "12345678";

        if (!req.headers.token) {
            return res.status(400).json({
                answer: {
                    code: 400,
                    message: "Kein Token angegeben."
                }
            })
        }

        if (token === req.headers.token) {
            next();
        } else {
            return res.status(400).json({
                answer: {
                    code: 400,
                    message: "Token ist falsch."
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: err.message
        })
    }
}