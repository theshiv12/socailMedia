const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const Post = require("./Routes/post.route")
const User = require("./Routes/user.router")
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1" , Post)
app.use("/api/v1" , User)







let mongoDB =  'mongodb://127.0.0.1:27017/SocailApp'
mongoose.connect(
  mongoDB , 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });

 app.listen(3000 ,()=>{
  console.log("server is running on 3000")
})

