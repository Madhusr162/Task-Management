const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const bcryptjs = require('bcryptjs');

// register route to make the registration for the user
router.post("/register", function (req, res) {
    const { name, username, password } = req.body;
    if (!name || !username || !password)
        return res.status(400).json({ error: "One or more mandatory field is missing" });
    User.findOne({ username: username })
        .then((userInDB) => {//add user in db
            if (userInDB)
                return res.status(500).json({ error: "User with this username already registered" });
            bcryptjs.hash(password, 16)//bcrypt the password
                .then((hashedPassword) => {
                    // save the user
                    const user = new User({ name, username, password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User signed up successfully" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

// login route to make the user login with the particular username and password which is already registered
router.post("/login", function (req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "One or more mandatory field is missing" });
    User.findOne({ username: username })//find if the user exist
        .then((userInDB) => {
            if (!userInDB)
                return res.status(401).json({ error: "Invalid Credentials" });
            bcryptjs.compare(password, userInDB.password)//bcrypt password
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "username": userInDB.username, "name": userInDB.name, "id": userInDB._id, "admin":userInDB.admin }
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports=router;