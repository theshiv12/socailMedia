
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
   
  },
   posts:[
    {
      type:mongoose.Types.ObjectId,
      ref:"Post"
  }

],

followers:[
  {
    type:mongoose.Types.ObjectId,
    ref:"User"
}
]
,
following:[
  {
    type:mongoose.Types.ObjectId,
    ref:"User"
}
],
avtar:{
  public_id:String,
  url:String
}

});


//hook for chanege normal password to hashed password
userSchema.pre("save" ,async function(next){
  if(this.isModified('password'))
  this.password = await bcrypt.hash(this.password , 10);
 console.log(this.password)
  next();
});


//convert hash password and validate password

userSchema.methods.matchpassword = async function(password){
  
  return await bcrypt.compare(password, this.password)
};


userSchema.methods.generateToken = async function(){
    return jwt.sign({_id:this._id} , "shivam"  )
}


module.exports = mongoose.model("User", userSchema);

