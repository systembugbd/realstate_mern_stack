/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       id: object
 *       required:
 *         - email         
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: The name of the user optional
 *         email:
 *           type: string
 *           description: The email of the user required
 *         image:
 *           type: string
 *           description: Image of the author
 *         bookedVisits:
 *           type: array
 *           description: keep the booking data as a object in a array 
 *         fevResidenciesID:
 *           type: array
 *           description: keep the fevorite Residency in your link 
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated
 *       example:
 *         id:              64bca154de2708802b5f76db
 *         name:            Md. Shaheb Ali
 *         email:           wwwdonus@gmail.com
 *         image:           https://media.licdn.com/dms/image/C5603AQGBGDqq8YPUBw/profile-displayphoto-shrink_200_200/0/1517583820502?e=1695859200&v=beta&t=SdWtvSkx9HL1RJFGZtRoPYGd_gaDE0CJHgonAEBsxIs
 *         bookedVisits:    [{ "id": "64bd4979ac1fdb666a5e4edc", "date": "07/23/2023" }]
 *         fevResidenciesID: [{ "id": "64bd4979ac1fdb666a5e4edc" }]
 *         createdAt:       2020-03-10T04:05:06.157Z
 *         updatedAt:       2020-03-10T04:05:06.157Z
 */
/**
 * @swagger
 * tags:
 *   name: Register User
 *   description: Register a new User
 * /api/user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */


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
