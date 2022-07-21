const  express = require("express");
const router =  express.Router();
const post_controller = require("../Controllers/post.controller");
const auth = require("../middlewear/auth");

router.post('/post/upload' ,auth.isAuthenticated, post_controller.create_post )
router.post('/post/like_dislike' ,auth.isAuthenticated, post_controller.like_dislike )
router.delete('/post/delete' ,auth.isAuthenticated, post_controller.delete_post);

module.exports = router;