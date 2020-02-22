exports.ticket_list = (req, res, next) => {
    console.log("get all");
    res.send("Get all tickets");
}

exports.generate_ticket = (req, res, next) => {
    
    res.send("generate a ticket");
}

exports.get_ticket = (req, res, next) => {
    console.log("get a [articular ticket");
    res.send("get a ticket");
}

exports.amend_ticket = (req, res, next) => {
    console.log("amenddd");
    
    res.send("amend a ticket");
}

exports.ticket_status = (req, res, next) => {
    
    res.send("check ticket status");
}