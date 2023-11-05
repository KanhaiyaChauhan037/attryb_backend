const express = require("express")
const { OEMModel } = require("../Modals/oemItems.modal")
const OEMRouter = express.Router()


// OEMRouter.get("/:id", async (req, res) => {
//   let id = req.params.id
//   try {
//  
//       await OEMModel.find()

//     res.send(data);
//   } catch (err) {
//     res.send(err.message);
//     console.log('err:', err);
//   }
// });

// get by id 
OEMRouter.get("/", async (req, res) => {
  let { search } = req.query;
  try {
    const data = search ? await OEMModel.find({ "title": { "$regex": search, "$options": "i" } })
        :
        await OEMModel.find()

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log('err:', err);
  }
});

OEMRouter.get("/:id", async (req, res) => {
    const ID = req.params.id
  
    try {
      const data = await OEMModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  

OEMRouter.post("/post",async(req,res)=>{
    const data = req.body
    try{
        const datas = await OEMModel.insertMany(data)
        res.status(200).send(datas)
    }catch(err){
        res.status(400).send({'err':err.message})
    }
})
module.exports={
    OEMRouter
}