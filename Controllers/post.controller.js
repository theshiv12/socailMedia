const Post = require("../Models/post.model")
const User = require("../Models/user.model")


//create post
exports.create_post = async(req, res)=>{
  try {
     const newPost = new Post({
          caption:req.body.caption,
          owner: req.user._id,

     })
    const post = await Post.create(newPost)
    const user = await User.findById(req.user._id)
    user.posts.unshift(post._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    }); 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
  })

  }
}
//delete post 
exports.delete_post = async(req,res)=>{
   try {
      const post = await Post.findById(req.query.id);  
      if(req.user._id.toString()!== post.owner.toString()){
        res.status(500).json({
          success: false,
          message: "you are not permitted",
      })
      } 
     await Post.findByIdAndDelete(req.query.id)
     const user = await User.findById(req.user._id);
  
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index , 1);
    user.save().then((doc)=>{
       res.status(200).send("post deleted")
    }).catch((err)=>{
         res.status(400).send('post not found')
    })
    
   } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
  })
   }


}

//post like and dislike 
exports.like_dislike = async(req , res)=>{
    let post = await Post.findById(req.query.id)  

    if(post && !post.like.includes(req.user._id)){
      post.like_count++; 
      post.like.push(req.user._id)
    }
    else if(post && post.like.includes(req.user._id)){
      post.like_count--;
      const index = post.like.indexOf(req.user._id);
      post.like.splice(index, 1);
    }
    post.save().then((doc)=>{
      res.send("post liked");
    }).catch((err)=>{``
      res.send(err)
    })
    
}

//post of following
exports.post_of_following = async(req,res)=>{
  try {
    const userFollow = await User.findById(req.query.id);
    const userFollowing  = await User.findById(req.user._id);
     if(!userFollow){
      res.status(500).json({
        success: false,
        message: "user not found"
    })
     }     
     
      userFollow.followers.push(userFollowing._id);
      userFollowing.following.push(userFollow._id);
      await userFollow.save();
      await userFollowing.save();

      res.send("you started follow ")



    
   
    


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
  })
  }
}