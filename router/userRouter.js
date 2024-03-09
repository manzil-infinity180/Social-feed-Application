const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const followController = require("../controller/followController");

router.post('/create',userController.createProfile);
router.post('/login',userController.login);
// authenicated 
router.use(userController.isAuthenicated);

router.get('/profile',userController.viewProfile);
router.patch('/update',userController.updateProfile);
router.delete('/delete',userController.deleteProfile);
router.get('/others-profile',userController.otherProfile);

// follow 
router.get('/follow/:id',followController.followOthers);
router.get('/unfollow/:id',followController.unfollowOthers);
router.get('/list',followController.yourFollowingList);
router.get('/other/:id',followController.allOthersFollowList);

module.exports = router;