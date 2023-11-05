
const express = require("express")
const { MarketItemModel } = require("../Modals/marketItems.modal")

const MarketprRouter = express.Router()


MarketprRouter.get("/data", async (req, res) => {
    try {
        const market = await MarketItemModel.find().populate('oemItems')
        res.status(200).send(market)

    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

MarketprRouter.get("/price", async (req, res) => {
    const order = req.query.price
    try {
        if (order == "asc") {
            const market = await MarketItemModel.find().sort({ "currentPrice": 1 })
            res.status(200).send(market)
        } else if (order == "desc") {
            const market = await MarketItemModel.find().sort({ "currentPrice": -1 })
            res.status(200).send(market)

        } else {
            const market = await MarketItemModel.find()
            res.status(200).send(market)
        }

    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

MarketprRouter.get("/search", async (req, res) => {
    const query = req.query.search
    try {
        const market = await MarketItemModel.find({ "title": { "$regex": query, "$options": "i" } })
        res.status(200).send(market)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

module.exports = {
     MarketprRouter
}