const jwt = require("jsonwebtoken");

function CheckTokenValidity(token) {
    let verifiedJwt;
    try {
        verifiedJwt = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (e) {
        verifiedJwt = e;
    }

    return verifiedJwt;
}

module.exports = { CheckTokenValidity };
