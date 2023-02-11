const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const usersRoutes = require('./routes/user-routes');


const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });
app.use(bodyParser.json());

app.use('/api/user', usersRoutes);

app.get('/', (req, res, next) => {
    res.send("You've reached the betterus backend server");
});

console.log("Connected");
app.listen(5000);