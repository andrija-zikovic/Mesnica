require('dotenv').config();
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// bulit-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));