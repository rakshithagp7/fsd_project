const { response } = require('express')
const Profile = require('../models/profile')

const profilesCltr = {}

profilesCltr.create = (req, res) => {
    const body = req.body
    const userId = req.user.id
    const profile = new Profile({
        age: body.age,
        bio: body.bio,
        occupation: body.occupation,
        userId: userId
    })
    profile.save()
    .then((user) => {
        res.json(user)
    })
    .catch(err => res.json(err))
}

profilesCltr.show = (req, res) => {
    const userId = req.user.id
    Profile.findOne({userId: userId})
        .then((profile) => {
            res.json(profile)
        })
        .catch(err => res.json(err))
}

profilesCltr.update = (req, res) => {
    const userId = req.user.id
    const body = req.body
    const id = req.params.id
    Profile.findOneAndUpdate({_id: id, userId: userId}, body, {new: true, runValidate: true})
        .then((profile) => {
            res.json(profile)
        })
        .catch(err => res.json(err))
}

module.exports = profilesCltr