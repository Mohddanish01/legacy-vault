import * as nomineeService from "../services/nominee.service.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {
    createNomineeSchema,
    updateNomineeSchema,
} from "../validators/nominee.validator.js";

export const createNominee = asyncHandler(
    async (req, res) => {
        const nomineeData =
            createNomineeSchema.parse(req.body);

        const nominee =
            await nomineeService.createNominee(
                req.user._id,
                nomineeData
            );

        res.status(201).json({
            success: true,
            message: "Nominee created successfully",
            data: nominee,
        });
    }
);

export const getNominees = asyncHandler(
    async (req, res) => {
        const nominees =
            await nomineeService.getNominees(
                req.user._id
            );

        res.status(200).json({
            success: true,
            data: nominees,
        });
    }
);

export const getNomineeById =
    asyncHandler(async (req, res) => {
        const nominee =
            await nomineeService.getNomineeById(
                req.user._id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: nominee,
        });
    }
);

export const updateNominee =
    asyncHandler(async (req, res) => {
        const updateData =
            updateNomineeSchema.parse(req.body);

        const nominee =
            await nomineeService.updateNominee(
                req.user._id,
                req.params.id,
                updateData
            );

        res.status(200).json({
            success: true,
            message:
                "Nominee updated successfully",
            data: nominee,
        });
    }
);

export const deleteNominee =
    asyncHandler(async (req, res) => {
        const result =
            await nomineeService.deleteNominee(
                req.user._id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: result.message,
        });
    }
);