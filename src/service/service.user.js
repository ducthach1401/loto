const mqtt = require('mqtt');
const { Room } = require('../model/model');
const client  = mqtt.connect('mqtt://test.mosquitto.org');

module.exports.createRoom = async (name) => {
    try {
        const newRoom = new Room(name);
        await newRoom.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getRoom = async (room) => {
    try {
        const data = await Room.findOne(room);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports.addRoom = async (name, room) => {
    try {
        const result = await Room.findOne(room);
        result.person.push({
            name: name,
            active: Date.now()
        });
        if (!result.host) {
            result.host = name;
        }
        await result.save();
        return {
            message: 'Success'
        }
    } catch (error) {
        throw error;
    }
}
module.exports.pickedLottery = async (room) => {
    try {
        let result = {};
        const check = await Room.findOne(room);
        let temp = [];
        for (let person of check.people){
            temp.push(...person.lottery);
        }
        tempRemain = [];
        for (let i of number){
            if (!temp.includes(i)){
                tempRemain.push(i);
            }
        }
        return {
            picked: temp,
            remain: tempRemain,
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}
module.exports.pickLottery = async (name, roomID ,number) => {
    try {
        const room = await Room.findOne(roomID);
        for (let person of room.people){
            if (person.name == name){
                person.lottery = [...number];
            }
        }
        await room.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.readyRoom = async (name,room) => {
    try {
        const result = await Room.findOne(room);
        for (let person of result.people){
            if (person.name == name){
                person.ready = true;
            }
        }
        await result.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.resetMatch = async (room) => {
    try {
        const result = await Room.findOne(room);
        result.numberLoto = [];
        start();
        for (let person of result.people){
            person.ready = false;
            person.win = false;
        }
        await result.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.winner = async (room, list) => {
    try {
        const result = await Room.findOne(room);
        const total = 0;
        for (let person of result.people){
            total += person.lottery.length;
        }
        total = total / list.length;
        for (let person of result.people){
            if (list.includes(person.name)){
                person.point += total;
            }
        }
        await result.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.turnWin = async (name,room) => {
    try {
        const result = await Room.findOne(room);
        for (let person of result.people){
            if (person.name == name){
                person.win = !person.win;
            }
        }
        await result.save();
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}

module.exports.spin1 = async (room) => {
    number = shuffle(number);
    let temp = number[0];
    number.splice(0,1);
    loto.push(number[0]);
    let result = await Room.updateOne(room, {
        numberLoto: loto
    });
    return {
        number: temp,
        message: 'success'
    }
}

module.exports.checkNumber = async (name, room) => {
    try {
        const result = await Room.findOne(room);
        for (let person of result.people){
            if (person.name == name){
                person.active = Date.now();
            }
        }
        for (let person of result.people){
            if (Date.now() - person.active > 60) {
                const index = result.people.indexOf(person);
                result.people.splice(index, 1);
                if (person.name == result.host){
                    result.host = '';
                }
            }
        }
        if (!result.host) {
            result.host = result.people[0];
        }
        await result.save();
        return {
            message: 'success',
            number: person.numberLoto
        }
    } catch (error) {
        throw error;
    }
}

module.exports.changeHost = async (name, room) => {
    try {
        const result = await Room.updateOne(room, {
            host: name
        });
        return {
            message: 'success'
        }
    } catch (error) {
        throw error;
    }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

var number = [];
var loto = [];
var temp = -1;

module.exports.reset = async () =>{
    for (let i = 1; i <= 90; i++){
        number.push(i);
    }
    temp = -1;
    loto = [];
    return {
        message: 'success'
    }
}

module.exports.spin = async () => {
    number = shuffle(number);
    temp = number[0];
    number.splice(0,1);
    loto.push(temp);
    return {
        loto: loto,
        number: temp
    }
}

module.exports.getNumber = async() => {
    return {
        loto: loto,
        number: temp
    }
}