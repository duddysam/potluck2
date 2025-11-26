/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: This file is used to establish connection with the database.
   We use the module.exports (bottom of file) to export the functions and 
   reuse them in the individual entity .js files
********************************************************************************/

const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});

// the npm module for connecting with PostgreSQL is 'pg'
const {Client} = require('pg');

// setting postgres credentials to environment variables
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});


async function connectDB(){
    try {
        await client.connect();
        console.log('Connected to postgres DB!')
    } catch (err) {
         console.error('Error connecting', err)       
    }
}

module.exports = {
    client: client,
    connectDB, connectDB
}
