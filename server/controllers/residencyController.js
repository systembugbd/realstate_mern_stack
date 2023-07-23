import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//Create a residency post Request
export const createResidency = asyncHandler(async (req, res) => {
    //Extract data from req.body for residency collection

    const {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        userEmail,
    } = req.body.data;

    try {
        //Creating a residency collection and keep data to residency variable
        const data = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                city,
                country,
                image,
                facilities,
                owner: { connect: { email: userEmail } }, //connecting with the both email of two collection
            },
        });
        //send response if residency collection successfully created

        res.send({ message: "Residency successfully created", data });
    } catch (error) {
        //Throw an error if error occured with the error.code match (its related to unique address)
        if (error.code == "P2002") {
            // throw new Error("A residency with address already there");
            res.status(409).json({
                message: "A residency with address already there",
            });
        }
        res.status(404).json({ message: error.message });
        // throw new Error(error.message);
    }
});

//Get all residencies get Request
export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        //find all data from residency collection order by createdAt and desc
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        //sending response to the client with residencies data
        res.status(200).send(residencies);
    } catch (error) {
        res.status(404).json({message:error.message});
        // throw new Error(error.message);
    }
});

//Get single residency get Request
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: { id },
        });
        res.status(200).send(residency);
    } catch (error) {
        res.status(404).json({ message: error.message });
        // throw new Error(error.message);
    }
});
