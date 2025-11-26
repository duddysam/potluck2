/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Functions to perform CRUD operations on Appuser Table
********************************************************************************/

const validator = require('validator')
const { client, connectDB } = require('./index')


async function addUser(f_name, l_name, user_name, password, email) {
    await connectDB();

    try {
        const res = await client.query(`INSERT INTO appuser VALUES ('${f_name}', '${l_name}', default, '${user_name}', '${password}', '${email}')`)
    } catch (err) {
        console.error('Error Executing query', err);
    } finally {
        await client.end();
    }
}

async function updateUsername(userID, newUsername) {
    await connectDB();

    try {
        const res = await client.query(`UPDATE appuser SET username = '${newUsername}' WHERE userid = '${userID}'`)
    } catch (err) {
        console.error('Error Executing query', err);
    } finally {
        await client.end();
    }
}


async function deleteUser(username) {
    await connectDB();

    try {
        const res = await client.query(`DELETE FROM appuser WHERE username = '${username}'`)
    } catch (err) {
        console.error('Error Executing Query', err);
    } finally {
        await client.end()
    }
}

async function getUsers() {
    await connectDB()
    try {
        const res = await client.query('SELECT * FROM appuser')
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err);
    } finally {
        await client.end()
    }
}

async function getUserID(username) {
    await connectDB()

    try {
        const res = await client.query(`SELECT userID FROM appuser WHERE username = '${username}'`)
        userid = res['rows'][0]['userid']
        console.log(userid)
        return userid
    } catch (err) {
        console.error('Error Executing Query', err);
    } finally {
        await client.end()
    }
}



module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    getUsers: getUsers,
    getUserID: getUserID,
    updateUsername: updateUsername
}