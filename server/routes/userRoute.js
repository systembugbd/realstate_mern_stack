import express from "express";
import {
    bookVisit,
    createUser,
    getAllBookingResidency,
    cancellResidencyById
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.post("/allBooking/", getAllBookingResidency);
router.post("/cancelBooking/:id", cancellResidencyById);

export { router as userRoute };
