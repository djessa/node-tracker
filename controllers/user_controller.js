const User = require('../models/user');

const create = async (req, res, next) => {
     const user = await User.create(req.body);
    return res.json({...req.body, _id: user._id});
}

const addExercise = async (req, res, next) => {
    const user = await User.findOne({_id: req.params._id});
    const {description, duration, date} = req.body;
    const exercise = {description, duration, date: (new Date(date)).toDateString()};
    user.log.push(exercise);
    await User.update({_id: user._id}, {log: user.log});
    return res.json({username: user.username, _id: user._id, ...exercise});
}

const logs = async (req, res, next) => {
    const user = await User.findOne({_id: req.params._id});
    return res.json({count: user.log.length, ...user._doc});
}

module.exports = {create, addExercise, logs}