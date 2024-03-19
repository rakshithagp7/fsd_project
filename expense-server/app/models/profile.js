const mongoose = require('mongoose')

const { Schema } = mongoose

const profileSchema = new Schema({
    age:  String,
    bio:  String,
    occupation: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile