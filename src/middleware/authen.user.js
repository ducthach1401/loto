const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = async function authenticateToken (req, res, next) {
    const token = req.cookies.name;
    if (token){
        try {
            res.locals.name = token;
            next();
        }
        catch(err) {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
}