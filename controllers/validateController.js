const speakeasy = require("speakeasy")
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")

const db = new JsonDB(new Config("myDatabase", true, false, "/"));

//validate token
module.exports.validateController = (req, res) => {
    const { token, userId } = req.body;
  
    try {
      const path = `/user/${userId}`;
      const user = db.getData(path);
  
      const { base32: secret } = user.secret;
  
      const tokenValidates = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        Window: 1,
      });
  
      if (tokenValidates) {
        res.json({ Validated: true });
      } else {
        res.json({ Validated: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error finding user" });
    }
  };
  