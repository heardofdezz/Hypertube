const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = new express.Router();
const uuid = require('uuid');
const { sendConfirmation, ResetPassword } = require('../emails/account');

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        user.codeEmail = uuid();
        user.codePassword = uuid();
        await user.save();
        const token = await user.generateAuthToken();
        try {
            await sendConfirmation(user._id, user.email, user.codeEmail);
        } catch(e) {
        }
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            error : 'This email is already being used'
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(500).send({
            error: 'An error has occured tying to login'
        })
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

/*router.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['lname', 'fname','email', 'password', 'birthdate', 'sex', 'type'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid_updates' });
        }

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});*/

/*router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});*/

router.get('/users/confirmEmail/:id/:code', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, codeEmail: req.params.code });
        user.emailConfirmed = true;
        await user.save();
    } catch(e) {
        res.status(400).send();
    }
});

router.post('/users/reset-password/:email', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(400).send();
        }
        await ResetPassword(user._id, req.params.email, user.codePassword);
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.put('/users/reset-password/:code', async(req, res) => {
    try {
        const _id = req.body.id;
        const password = req.body.password;
        if (!_id || !password) {
            return res.status(400).send();
        }
        const user = await User.findOne({ _id, codePassword: req.params.code });
        if (!user) {
            res.status(400).send();
        }
        user.password = password;
        user.codePassword = uuid();
        await user.save();
        res.send();
    } catch(e) {
        res.status(400).send();
    }
});

module.exports = router;
