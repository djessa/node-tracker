const User = require('../models/user');

const find = async (req, res, next) => {
    const users = await User.find({}, {log: 0});
    return res.json(users);
}

const create = async (req, res, next) => {
     const user = await User.create(req.body);
    return res.json({...req.body, _id: user._id});
}

const addExercise = async (req, res, next) => {
    const user = await User.findOne({_id: req.params._id});
    if(user == null) {
        return res.status(404).json({message: 'user not found'});
    }
    const {description, duration} = req.body;
    let date = req.body.date;
    if(date == undefined) {
        date = new Date();
    } else {
        date =  new Date(date);
    }
    const exercise = {description, duration: parseInt(duration), date: date.toDateString()};
    user.log.push(exercise);
    await User.update({_id: user._id}, {log: user.log});
    return res.json({_id: user._id, username: user.username, ...exercise});
}

const logs = async (req, res, next) => {
    const user = await User.findOne({_id: req.params._id});
    let count = 0;
    const logs = user.log.filter(log => {
        count++;
        let isValid = false;
        if(req.query.limit != undefined) {
            if(parseInt(req.query.limit) >= count) isValid = true;
        } else {
            isValid = true;
        }
        if(req.query.from != undefined && req.query.to != undefined) {
            const from = new Date(req.query.from);
            const to = new Date(req.query.to);
            const current = new Date(log.date);
            if(current.getTime() >= from.getTime() && current.getTime() <= to.getTime())  isValid = true;
            else isValid = false;
        }
        if(isValid) return log;
    })
    user.log = logs;
    return res.json({count: user.log.length, ...user._doc});
}

module.exports = {create, find, addExercise, logs}