const express = require("express");
const passport = require("passport");

const {
  adminLogin,
  addFaculty,
  addStudent,
  addSubject,
  getAllFaculty,
  getAllStudents,
  getAllSubjects,
  addAdmin,
  getAllStudent,
  getAllSubject,
  getTotalAdmins,
} = require("../controller/adminController");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/addAdmin", addAdmin);

router.get("/data/totalAdmins", getTotalAdmins);

router.post(
  "/getAllFaculty",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);
router.post(
  "/getAllStudent",
  passport.authenticate("jwt", { session: false }),
  getAllStudent
);
router.post(
  "/getAllSubject",
  passport.authenticate("jwt", { session: false }),
  getAllSubject
);
router.post(
  "/addFaculty",
  passport.authenticate("jwt", { session: false }),
  addFaculty
);
router.get(
  "/getFaculties",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);
router.post(
  "/addStudent",
  passport.authenticate("jwt", { session: false }),
  addStudent
);
router.get(
  "/getStudents",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);
router.post(
  "/addSubject",
  passport.authenticate("jwt", { session: false }),
  addSubject
);
router.get(
  "/getSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);

module.exports = router;
