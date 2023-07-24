import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

/**
 * Create a User Post Request
 */
export const createUser = asyncHandler(async (req, res) => {
    //extract email from body
    const { email } = req.body;

    //Check user exists or not
    const isUserExists = await prisma.user.findUnique({ where: { email } });

    //if not exists create a user
    if (!isUserExists) {
        //Creating a user collection and keep data to User variable
        const User = await prisma.user.create({ data: req.body });

        //send success message to the client with user data
        res.send({
            message: "User successfully created",
            User,
        });
    } else {
        //if user already exists send user already exists message
        res.status(201).send({
            message: "User already exists, Please try with another email",
        });
    }
});

/**
 * Booked the visit in a residency
 */
export const bookVisit = asyncHandler(async (req, res) => {
    //extract email date and id from body and params
    const { email, date } = req.body;
    const { id } = req.params;

    try {
        //check already booked or not and select specific column bookedVisits
        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true },
        });

        //check which booking id and residency id is matched if match sending message to client already booked
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(409).json({
                message: "You already booked the requested residency.",
            });
        } else {
            /** Updating or Pushing new data to a document specific fields bookedVisits
             * if not booked yet or id not exists in bookedVisits object then update it accordingly
             */
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: { push: { id, date } }, //pushing data to bookedVisits fields
                },
            });
            //after that send successfull message to the client if booking successfull
            res.status(200).send("Successfully booked a residency for you");
        }
    } catch (error) {
        //send error message
        res.status(404).json({ message: error.message });
    }
});

/**
 * Get all booking data for a user
 */
export const getAllBookingResidency = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        //find unique data using email and select one specific fields bookedVisits
        const bookedResidency = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true },
        });
        //Send response
        res.status(200).send(bookedResidency);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * Cancelled Booking by residency id Post Requrest
 */
export const cancellResidencyById = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params; //residency id

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true },
        });

        const index = user.bookedVisits.some((visit) => visit.id === id);

        if (index === -1) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            const cancelled = user.bookedVisits.splice(index, 1);

            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: user.bookedVisits,
                },
            });
            res.status(200).send({
                message: "Booking cancelled successfully",
                cancelled,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
