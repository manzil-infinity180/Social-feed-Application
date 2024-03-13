const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const followController = require("../controller/followController");

// api/user
router.post('/create',userController.createProfile);
router.post('/login',userController.login);
router.get('/profile/:username',userController.otherProfile);
// authenicated 
router.use(userController.isAuthenicated);

router.get('/profile',userController.viewProfile);
router.patch('/update',userController.updateProfile);
router.delete('/delete',userController.deleteProfile);

// follow 
router.get('/follow/:id',followController.followOthers);
router.get('/unfollow/:id',followController.unfollowOthers);
router.get('/list',followController.yourFollowingList);
router.get('/other/:id',followController.allOthersFollowList);

module.exports = router;