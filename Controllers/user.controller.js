const { default: mongoose } = require("mongoose");
const User = require("../Models/user.model")

exports.register = async(req ,res)=>{

    try {

    const {name,email , password }   = req.body;
    let user = await User.findOne({email})
    if(user){
        res.status(400).json({
            message:"user aready exist"
        })  
        return  
    }
    
    user = await User.create({name,email , password });
    res.status(201).json({
        sucess:true , user
    })

    
    
  
} catch (error) {
    res.status(500).json({
        succes:false,
        message:error.message
    })
}
}


exports.login= async(req, res)=>{
    try {
        const {email , password }   = req.body;
        let user = await User.findOne({email})
       if(!user){
          res.status(400).json({
               message:"user not exist"
          })  
         return  
      }
      console.log(req.header.token)
      const check_pass = await user.matchpassword(password);
      if(!check_pass){
        res.status(400).json({
            success:false,
            message:"incorrect password"
       })  
      return    
      }

      const token =await user.generateToken();
     
      res.status(200).cookie("token " , token ).json({
        success:true, user ,token
      
      })
    
    } catch (error) {
        res.status(500).json({
            succes:false,
            message:error.message
        })
    }
}
