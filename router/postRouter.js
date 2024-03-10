const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const postController = require("../controller/postController");
const socialController = require("../controller/socialController");
// authenicated
router.get('/',postController.viewAllPost)
router.get('/:id',postController.viewPost);

router.use(userController.isAuthenicated);

router.post('/create',postController.createPost);
router.patch('/update/:id',postController.updatePost);
router.delete('/delete/:id',postController.deletePost);

// following & follwers list
// router.get('/following/:id',socialController.getAllPostFollowing);
router.get('/following/:id',socialController.getFollowingPost);
    
module.exports = router;