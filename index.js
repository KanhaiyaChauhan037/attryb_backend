const express = require("express")
require('dotenv').config()
const cors = require('cors')
const { connection } = require("./db")
const { MarketRouter } = require("./Routes/market.route")
const { auth } = require("./Middleware/auth.middleware")
const { dealerRouter } = require("./Routes/dealer.route")
const { OEMRouter } = require("./Routes/OEM.routes")
const { MarketprRouter } = require("./Routes/marketprice");

// middleware here 
const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Wellcome to home page")
})

app.use("/dealerItem", dealerRouter)
// app.use(auth)
app.use("/marketItem", MarketRouter)
app.use("/OEM", OEMRouter)
app.use('/', MarketprRouter)
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to database")
    } catch (err) {
        console.log('err:', err)
    }
    console.log(`server running at PORT ${process.env.port}`)
})