var express = require('express');
var router = express.Router();

//Require controller modules
// delete require.cache[require.resolve('../controllers/ticket')]
var ticket_controller = require('../controllers/ticket');

router.get('/', (req, res, next) => {
    res.send("Welcome to Simple Lottery Ticket Web Service");
});

router.post('/ticket', ticket_controller.generate_ticket);
router.get('/ticket', ticket_controller.ticket_list);
router.get('/ticket/:id', ticket_controller.get_ticket);
router.patch('/ticket/:id',ticket_controller.amend_ticket);
router.patch('/status/:id', ticket_controller.ticket_status);

module.exports = router;