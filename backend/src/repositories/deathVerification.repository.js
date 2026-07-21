import DeathVerification from "../models/DeathVerification.js";
import { VERIFICATION_STATUS } from "../constants/deathVerification.js";

export const createRequest = async (data) => {
    return DeathVerification.create(data);
};

export const getPendingRequest = async (userId) => {
    return DeathVerification.findOne({
        userId,
        status: VERIFICATION_STATUS.PENDING,
    });
};

export const getRequestById = async (id) => {
    return DeathVerification.findById(id);
};

export const getUserRequests = async (userId) => {
    return DeathVerification.find({
        userId,
    }).sort({
        createdAt: -1,
    });
};

export const getNomineeRequests = async (nomineeId) => {
    return DeathVerification.find({
        nomineeId,
    }).sort({
        createdAt: -1,
    });
};

export const getPendingRequests = async () => {
    return DeathVerification.find({
        status: "PENDING",
    }).sort({
        createdAt: 1,
    });
};

export const getLatestRequest = async (
    userId
) => {
    return DeathVerification
        .findOne({
            userId,
        })
        .sort({
            attempt: -1,
        });
};

export const updateRequest = async (
    id,
    data
) => {
    return DeathVerification.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
        }
    );
};
