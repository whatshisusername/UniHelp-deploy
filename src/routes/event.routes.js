import { Router } from 'express';
import {createEvent,
    updateEventDetails,
    updateEventThumbnail,
    deleteEvent,
    getAllEvents,
    getTodayEvents,
    getOtherEvents,
    getEventById,
    getmyevents,
    searchbytitle

   
} from "../controllers/event.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file





router.route("/create-event").post(
        upload.single('thumbnail'),
         createEvent
        )
    










router.route("/update-thumbnail/:eventId").patch(upload.single("thumbnail"),updateEventThumbnail);
router.route("/update-event/:eventId").patch(updateEventDetails);
router.route("/delete-event/:eventId").delete(deleteEvent);

router.route("/get-event/:eventId").get(getEventById);


router.route("/all-events").get(getAllEvents);
router.route("/today-events").get(getTodayEvents);
router.route("/other-events").get(getOtherEvents);
router.route("/my-events").get(getmyevents);

router.route("/searchbytitle").get(searchbytitle);


export default router