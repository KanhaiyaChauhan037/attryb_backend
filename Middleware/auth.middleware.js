const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
  // const token=req.headers.authorization
  // if(token){
  //   const decoded=jwt.verify(token,'cars_irn')
  //   if(decoded){
  //     console.log("decoded:",decoded);
  //       req.body.dealer=decoded.dealerid
  //       next()
  //   }else{
  //       res.status(400).send({"msg":"Please login First"})
  //   }
  // }else{
  //   res.status(400).send({"msg":" sdf"})

  // }

  const token = req.headers.authorization
  if (token) {
    const decoded = jwt.verify(token, 'cars')
    if (decoded) {
      console.log("decoded:", decoded);
      req.body.dealer = decoded.dealerid
      next()
    } else {
      res.status(400).send({ "msg": "Please login First" })
    }
  } else {
    res.status(400).send({ "msg": "Please login First" })

  }
}

module.exports={auth}