const express = require('express');
const inquirer = require('inquirer');
const dbConnect = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

