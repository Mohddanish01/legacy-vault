import Session from "../models/Session.js";

export const createSession = async (sessionData) => {
    return await Session.create(sessionData);
};

export const findSessionByTokenId = async (tokenId) => {
    return await Session.findOne({ tokenId });
};

export const findSessionsByUser = async (userId) => {
    return await Session.find({ userId });
};

export const deleteSessionById = async (sessionId) => {
    return await Session.findByIdAndDelete(sessionId);
};

export const deleteAllSessions = async (userId) => {
    return await Session.deleteMany({ userId });
};

export const updateLastActive = async (sessionId) => {
    return await Session.findByIdAndUpdate(
        sessionId,
        {
            lastActive: new Date(),
        },
        {
            new: true,
        }
    );
};