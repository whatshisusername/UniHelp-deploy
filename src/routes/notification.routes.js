import { Router } from 'express';
import {
fetchnotification,
readnotification

   
} from "../controllers/notification.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file













// testing individual functions
router.route("/getnotification").get(fetchnotification);

router.route("/readnotification/:notificationId").patch(readnotification);


export default router