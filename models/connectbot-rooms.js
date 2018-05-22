const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    uid1: {
        type: String,
        required: true,
        unique: true
    },
    uid2: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model('Room', RoomSchema);