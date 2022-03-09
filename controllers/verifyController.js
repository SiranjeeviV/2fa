const speakeasy = require("speakeasy")
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")

const db = new JsonDB(new Config("myDatabase", true, false, "/"));

//verify token and make secret to permanent
module.exports.verifyController = (req, res) => {
    const { token, userId } = req.body;

    try {
        const path = `/user/${userId}`;
        const user = db.getData(path);
        const { base32: secret } = user.temp_secret;

        const verified = speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token,
        });

        if (verified) {
            db.push(path, { id: userId, secret: user.temp_secret });
            res.json({ verified });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error finding user" });
    }
};

