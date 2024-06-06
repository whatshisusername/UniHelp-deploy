import {Router} from 'express';
import { loginUser, registerUser ,logoutUser,refreshAccessToken,changePassword,
getCurrentUser,updateAccountDetails,updateUserAvatar,updateUserCoverImage,
getUserChannelProfile,getWatchHistory,checkuserexists} from '../controllers/user.controller.js';
// this our middleware we use to check on our image files coming from backend
import { upload } from '../middlewares/multer.middleware.js';
import  {verifyJWT}  from '../middlewares/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router()

// when control come to this file from app.js using http://localhost:8000/api/v1/users when /register added we call
// registerUser function declared in user.controllers.js
// router to register user 
// upload.files is multer middleware that will adding 2 files into our req
router.route("/register").post(
    upload.single('avatar'),
    registerUser
    )

// route to login user
router.route("/login").post(loginUser)


// secured routes

// show when user is logged in
// so first run verifyJWT middleware in that next()  that means run next function ie logoutUser
router.route("/logout").post(verifyJWT,logoutUser)

// hit when refreshing access token
router.route("/refresh-token").post(refreshAccessToken)

// hit when changing password , check user logged in middleware auth and then change password
router.route("/change-password").post(verifyJWT,changePassword)

// hit when get current user , check user logged in middleware auth and then get user
router.route("/current-user").get(verifyJWT,getCurrentUser)

// hit when update  user details fullname,email , check user logged in middleware auth and then update details
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

// hit when update  user avatar , check user logged in middleware auth and then use multer middleware to add image in req and then update avatar
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// hit when update  user details fullname,email , check user logged in middleware auth and then and then use multer middleware to add image in req then update details
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)


// hit when want to searched=someusername=yashmittal then
// /c/:username(inplace of username write the username you want to search eg yashmittal)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

// hit when want to find current logged in user=Nishant watchhistory
router.route("/history").get(verifyJWT, getWatchHistory)

// hit when want to find current logged in user=Nishant watchhistory
router.route("/checkuserexists").get(checkuserexists)

export default router;