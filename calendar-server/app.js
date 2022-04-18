const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');

const meetingRoutes = require('./components/meetings/meetingRouter');
const userRoutes = require('./components/users/usersRouter');


const { urlencoded, json } = require('body-parser');


const app = express();

const mongoDBString = 'mongodb://localhost:27017/meetings';
//const mongoDBReplicationString = 'mongodb://localhost:27017,localhost:27018,localhost:27019/store?replicaSet=rs';
mongoose
  .connect(mongoDBString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  });
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use(express.json());
  
app.use(json());
app.use(urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

app.use('/api/meetings', meetingRoutes);
app.use('/api/users', userRoutes);


app.use(function (req, res, next) {
    const error = new Error('Zahtev nije podrzan!');
    error.status = 405;
  
    next(error);
});
 
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');

    return res.status(200).json({});
  }

  next();
});

app.use(function (error, req, res, next) {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode,
      stack: error.stack,
    },
  });
});

module.exports = app;
  