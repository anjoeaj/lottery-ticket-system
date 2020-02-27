var express = require('express');
var router = express.Router();

var ticketController = require('../controllers/ticket');

router.get('/', (req, res, next) => {
    res.send("Welcome to Simple Lottery Ticket Web Service");
});

router.post('/ticket', ticketController.generateTicket);
router.get('/ticket', ticketController.ticketList);
router.get('/ticket/:id', ticketController.getTicket);
router.put('/ticket/:id',ticketController.amendTicket);
router.put('/status/:id', ticketController.ticketStatus);

module.exports = router;