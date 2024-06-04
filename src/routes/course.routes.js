import { Router } from 'express';
import {
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    addstudenttocourse,
    removestudentfromcourse,
    createACourse,
    studentsofcourse,
    removestudent,
    searchbybranch,
    searchbyowner,
    searchbysemester,
    searchbystudent,
    searchbymycourses,
    searchbymycoursesteacher,
    searchbytitle,
   
} from "../controllers/course.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file





router.route("/create-course").post(
        upload.single('thumbnail'),
        createACourse
        )
    









// testing individual functions
router.route("/getcourse/:courseId").get(getCourseById);
router.route("/updatecourse/:courseId").patch(updateCourse);

router.route("/deletecourse/:courseId").delete(deleteCourse);


router.route("/allcourses").get(getAllCourses);

router.route("/addstudenttocourse/:courseId").patch(addstudenttocourse);

router.route("/removestudentfromcourse/:courseId").patch(removestudentfromcourse);

router.route("/studentsofcourse/:courseId").get(studentsofcourse);

router.route("/removestudent/:courseId/:studentId").patch(removestudent);

router.route("/searchbysemester").get(searchbysemester);

router.route("/searchbytitle").get(searchbytitle);

router.route("/searchbymycourses").get(searchbymycourses);

router.route("/searchbymycoursesteacher").get(searchbymycoursesteacher);



router.route("/searchbybranch/:branch").get(searchbybranch);



router.route("/searchbyowner").get(searchbyowner);
router.route("/searchbystudent").get(searchbystudent);

export default router