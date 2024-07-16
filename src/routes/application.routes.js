import { Router } from 'express';
import { createapplication, semesterapplied,getallapplications ,getapplicationofuser} from '../controllers/application.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer2.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file













// testing individual functions
router.route("/createapplication").post(createapplication);

router.route("/semesterapplied").get(semesterapplied);

router.route("/allapplications").get(getallapplications);

router.route("/applicationofuser/:userid").get(getapplicationofuser);


export default router