import express from "express";
import {
    bookVisit,
    createUser,
    getAllbookedResidencyByUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.post("/allbooked/", getAllbookedResidencyByUser);

export { router as userRoute };
