const jwt = require("jsonwebtoken");
const Config = require("./config");

exports.validJWT = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                jwt.verify(authorization[1], Config.SECRET_KEY, (err) => {
                    if (err) return res.sendStatus(403);
                });
                next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};