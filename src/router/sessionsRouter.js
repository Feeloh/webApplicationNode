const express = require('express');
const sessions = require('../data/sessions.json');

const sessionRouter = express.Router();

sessionRouter.route('/').get((req, res)=> {
    res.render('sessions', {
        sessions
    });
})

sessionRouter.route('/:id').get((req, res)=> {
    const id = req.params.id;
    res.render('session', {
        session: sessions[id]
    });
})

module.exports = sessionRouter;