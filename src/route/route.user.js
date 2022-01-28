const controller = require('../controller/controller.user')
const express = require('express');
const authenUser = require('../middleware/authen.user');
const router = express.Router();

// router.route('/')
//     .post(controller.createRoom);

// router.route('/:id')
//     .all(authenUser)
//     .get(controller.getRoom)
//     .put(controller.addRoom)
//     .post(controller.readyRoom)
//     .delete(controller.resetMatch);

// router.route('/:id/pick')
//     .all(authenUser)    
//     .post(controller.pickLottery)
//     .get(controller.pickedLottery);

// router.route('/:id/win')
//     .all(authenUser)
//     .post(controller.winner)
//     .get(controller.turnWin);

// router.route('/:id/play')
//     .all(authenUser)
//     .get(controller.spin)
//     .post(controller.checkNumber)
//     .put(controller.changeHost);

router.route('/spin')
    .get(controller.spin);

router.route('/reset')
    .get(controller.reset);

router.route('/number')
    .get(controller.getNumber);

module.exports = router;