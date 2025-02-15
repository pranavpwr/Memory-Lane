const Memory = require('../models/Memory');

const getOnThisDayMemories = async (userId) => {
    const today = new Date();
    const memories = await Memory.find({
        user: userId,
        $expr: {
            $and: [
                { $eq: [{ $dayOfMonth: '$createdAt' }, today.getDate()] },
                { $eq: [{ $month: '$createdAt' }, today.getMonth() + 1] },
                { $lt: [{ $year: '$createdAt' }, today.getFullYear()] }
            ]
        }
    }).sort({ createdAt: -1 });

    return memories;
};

module.exports = { getOnThisDayMemories };
