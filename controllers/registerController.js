const uuid = require("uuid")
const speakeasy = require("speakeasy")
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")


const db = new JsonDB(new Config("myDatabase", true, false, "/"));

// Register user & create temp secret
module.exports.registerController = (req, res) => {
    const id = uuid.v4();
    try {
        const path = `/user/${id}`;
        const temp_secret = speakeasy.generateSecret();
        db.push(path, { id, temp_secret });
        res.json({ id, secret: temp_secret.base32 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error generating the secret" });
    }
}
