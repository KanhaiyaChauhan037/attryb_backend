const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const { DealerModel } = require("../Modals/dealerItems.modal")

const dealerRouter = express.Router()

dealerRouter.post("/register",async(req,res)=>{
    const {name,email, password} = req.body
    try{
        bcrypt.hash(password, 5 , async(err, hash)=>{
            if(err){
                console.log({"msg":"Error Occured","error":err.message})
            }else{
                let user = new DealerModel({name,email,password:hash})
                await user.save()
                res.send({"msg":"New user registered successfull"})
            }
            
        });
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
dealerRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    console.log('email,password:', email,password)
    try{
        const user = await DealerModel.findOne({email})
        console.log('user:', user)
        let token = jwt.sign({dealerid:user._id},"cars") 
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    res.status(200).send({"msg":"Login Successfull","token":token})
                }else{
                    res.status(400).send({"msg":"login failed plz try again"})
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials check it"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    dealerRouter
}