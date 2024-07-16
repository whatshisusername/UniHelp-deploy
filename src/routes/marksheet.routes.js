import { Router } from 'express';
import { createmarksheet, getallapplicantmarksheets, getallmarksheets, marksheetexists } from '../controllers/marksheet.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer2.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file













// testing individual functions
router.route("/createmarksheet/:ownerid").post(
    upload.single('marksheet'),
    createmarksheet
    )
router.route("/getallmarksheets").get(getallmarksheets)

router.route("/getallapplicantmarksheets/:ownerid").get(getallapplicantmarksheets)

router.route("/marksheetexists/:ownerid/:semester").get(marksheetexists)

export default router