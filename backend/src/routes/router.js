const router = require('express').Router();
const {addUser, userExists} = require('../database/User')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/userExists', (req, res) => {
    userExists(req.query.login).then(result => {
        res.send(result)
    });
})

router.post('/addUser', jsonParser, (req, res) => {
    addUser(req.body.login, req.body.password).then(result => {
        res.send(result)
    })
})

module.exports = router;

