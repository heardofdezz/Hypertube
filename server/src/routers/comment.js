const express = require('express');
const router = new express.Router();
const Movie = require('../models/Movie');
const User = require('../models/User');

router.post('/comment/:id', async(req, res) => {
    try {
        const user = req.body ? req.body.user : undefined;
        const content = req.body ? req.body.content : undefined;
        if (!user || !content) {
            return res.send('error');
        }
        const userExists = await User.findById(user, '_id');
        if (!userExists) {
            return res.send('error');
        }
        const update = await Movie.updateOne({_id: req.params.id}, {$push: {'comments': {user, content}}});
        if (update.n === 0) {
            res.send('error');
        } else {
            res.send('success');
        }
    } catch(e) {
        console.error(e);
        res.send('error');
    }
})

module.exports = router;
