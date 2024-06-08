import { Router } from 'express';
import { createnotes,notesofcourse } from '../controllers/notes.controller.js';

import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer2.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// do it
router.route("/create-notes/:courseId").post(
    upload.single('notesfile'),
    createnotes
    )

router.route("/notesofcourse/:courseId").get(notesofcourse);

export default router
