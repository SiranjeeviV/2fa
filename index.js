const express = require("express")
const router = require("./routes")

const app = express()

app.use(express.json())
app.use(router)

app.get("/api", (req, res) => res.json({ message: "Welcome to the 2FA" }));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));


