const service = require('../service/service.user');


module.exports.addRoom = async (req, res) => {
    const name = res.locals.token;
    const room = {
        name: req.params.id
    }
    const result = await service.addRoom(name, room);
    res.json(result);
}

module.exports.createRoom = async (req, res) => {
    const room = {
        name: req.body.name
    }
    const result = await service.createRoom(room);
    res.json(result);
}

module.exports.getRoom = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const result = await service.getRoom(room);
    res.json(result);
}

module.exports.pickLottery = async (req, res) => {
    const name = res.locals.token;
    const room = {
        name: req.params.id
    }
    const number = req.body.number;
    const result = await service.pickLottery(name, room ,number);
    res.json(result);
}

module.exports.readyRoom = async (req, res) => {
    const room = res.params.id;
    const name = res.locals.token;
    const result = await service.readyRoom(name, room);
    res.json(result);
}

module.exports.resetMatch = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const result = await service.resetMatch(room);
    res.json(result);
}

module.exports.winner = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const list = req.body.list;
    const result = await service.winner(room, list);
    res.json(result);
}

module.exports.turnWin = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const name = res.locals.token;
    const result = await service.turnWin(name, room);
    res.json(result);
}
module.exports.spin = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const result = await service.spin(room);
    res.json(result);
}

module.exports.checkNumber = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const name = res.locals.token;
    const result = await service.checkNumber(name,room);
    res.json(result);
}

module.exports.changeHost = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const name = res.locals.token;
    const result = await service.changeHost(name,room);
    res.json(result);
}

module.exports.pickedLottery = async (req, res) => {
    const room = {
        name: req.params.id
    }
    const result = await service.pickedLottery(room);
    res.json(result);
}

module.exports.reset = async (req, res) => {
    const result = await service.reset();
    res.json(result);
}

module.exports.spin = async (req, res) => {
    const result = await service.spin();
    res.json(result);
}

module.exports.getNumber = async (req, res) => {
    const result = await service.getNumber();
    res.json(result);
}

module.exports.checkPerson = async (req, res) => {
    const data = {
        name: res.locals.username,
        paper: req.body.paper
    }
    const result = await service.checkPerson(data);
    res.json(result);
}