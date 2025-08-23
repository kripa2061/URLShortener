const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }]
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
