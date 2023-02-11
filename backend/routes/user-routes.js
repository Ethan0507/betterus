const express = require('express');
const { collection, getDocs, query, where, addDoc } = require('firebase/firestore/lite');
const bcrypt = require("bcryptjs");
// const { check } = require('express-validator');

const firebase = require('../config/firebase');
// const usersController = require('../controllers/users-controllers');
// const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// router.get('/', usersController.getUsers);

router.post(
  '/signup',
  async (req, res, next) => {
        const { name, email, password } = req.body;

        const userCollection = collection(firebase.db, "users");
        const q = query(userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.docs.length > 0) {
            res.status(422).json({
                message: "User already exists with the given email. Log in instead!",
                statusCode: 422
            });
            return;
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            res.status(500).json({
                message: "Could not create user, please try again later!",
                statusCode: 500
            });
            return;
        }

        // Create User schema

        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        };

        let addedUserDoc;
        try {
            addedUserDoc = await addDoc(userCollection, newUser);
        } catch (err) {
            res.status(500).json({
                message: "Signing up failed, please try again later!",
                statusCode: 500
            });
            return;
        }

        if (!addedUserDoc) {
            res.status(500).json({
                message: "Could not create new user, please try again later!",
                statusCode: 500
            });
            return;
        }

        res.status(201).json({
            userId: addedUserDoc.id,
            userEmail: addedUserDoc.data().email,
            userName: addedUserDoc.data().name
        });
  }
);

router.post(
    '/login',
    async (req, res, next) => {
        const { email, password } = req.body;

        const userCollection = collection(firebase.db, "users");
        const q = query(userCollection, where("email", "==", email));

        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        let user = userDoc.data();

        if (!user) {
            res.status(403).json({
                message: "Could not find user for the given email address",
                statusCode: 403
            });
            return;
        }

        let isValidPassword;
        try {
            isValidPassword = await bcrypt.compare(password, user.password);
        } catch (err) {
            res.status(500).json({
                message: "Invalid email or password, please try again later!",
                statusCode: 500
            });
            return;
        }

        if (!isValidPassword) {
            res.status(403).json({
                message: "Invalid email or password, please try again later!",
                statusCode: 403
            });
            return;
          }

        res.json({
            userId: userDoc.id,
            userEmail: user.email,
            userName: user.name
        });
    }
);

router.get(
    '/',
    async (req, res, next) => {
        const userCollection = collection(firebase.db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map((doc) => {
            return {
                "name": doc.data().name,
                "email": doc.data().email
            };
        });
        res.send(userList);
    }
)

module.exports = router;