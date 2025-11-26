/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Functions to perform CRUD operations on Event Table
********************************************************************************/

const { client, connectDB } = require('./index')
const appUser = require('./appuser.js')


async function createEvent(name, address, date, theme, description, photo, hostID) {
    await connectDB();
    
    try {
        const res = await client.query(`INSERT INTO event VALUES (default, '${name}', '${address}', '${date}', '${theme}', '${description}', '${photo}', '${hostID}')`)
    } catch (err) {
        console.error ('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function updateEventDate(eventID, date) {
    await connectDB();
    
    try {
        const res = await client.query(`UPDATE event SET date = '${date}' WHERE eventID = '${eventID}'`)
    } catch (err) {
        console.error ('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function deleteEvent(name) {
    await connectDB();

    try {
        const res = await client.query(`DELETE FROM event WHERE eventname = '${name}'`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getHostEvents(userID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT * FROM event WHERE host = '${userID}'`)
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getUpcomingEvents(userID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT DISTINCT eventname, date, location FROM event JOIN invitee using(eventid) WHERE host = '${userID}' OR invitee.inviteeid = '${userID}' AND date >= now()`)
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getPastEvents(userID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT DISTINCT eventname, date, location FROM event JOIN invitee using(eventid) WHERE host = '${userID}' OR invitee.inviteeid = '${userID}' AND date < now()`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

module.exports = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    getHostEvents: getHostEvents,
    getUpcomingEvents: getUpcomingEvents,
    getPastEvents: getPastEvents,
    updateEventDate: updateEventDate
}

