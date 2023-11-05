const express = require("express")
const { MarketItemModel } = require("../Modals/marketItems.modal")

const MarketRouter = express.Router()
// MarketRouter.get("/dealer/:id", async (req, res) => {
//     const ID = req.body.dealer
//     try {
//      
//         const data = await MarketItemModel.find({ dealer: ID })
//         res.status(200).send(data)
//     } catch (err) {
//         res.status(400).send({ 'msg': err.message })
//         console.log({ "error": err })
//     }
// })
// get data
MarketRouter.get("/dealer", async (req, res) => {
    const ID = req.body.dealer
    try {
        console.log('ID:', ID)
        const data = await MarketItemModel.find({dealer: ID })
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send({'msg':err.message})
        console.log({ "error": err })
    }
})
// post data
MarketRouter.post("/create", async (req, res) => {
    const payload = req.body
    const newNote = new MarketItemModel(payload)
    await newNote.save()
    res.send(newNote)
})

// delete data
MarketRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    try {
        await MarketItemModel.findByIdAndDelete({ _id: ID })
        res.status(200).send(`Note with ID ${ID} Deleted`)
    } catch (err) {
        console.log({ "msg": "Error Occured", "error": err })
    }
})

// update data
MarketRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    try {
        await MarketItemModel.findByIdAndUpdate({ '_id': ID }, req.body)
        res.status(200).send(`Data has been updated successfuly`)
    } catch (err) {
        res.status(400).send(err.message)
        console.log({ "msg": "Error Occured", "error": err })
    }
})

module.exports = {
    MarketRouter
}