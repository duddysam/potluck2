/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Functions to perform CRUD operations on Announcement Table
********************************************************************************/

const { client, connectDB } = require('./index')
const { format } = require('date-and-time')

async function sendAnnouncement(eventID, text, userID) {
    await connectDB();

    try {
        const curr_date = format(new Date(), 'MM/DD/YYYY')
        const res = await client.query(`INSERT INTO announcement VALUES('${curr_date}', '${text}', default, '${eventID}', '${userID}')`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getAnnouncement(userID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT date, message, announcementID FROM announcement WHERE inviteeid = '${userID}'`)
        console.log(res['rows'])
    } catch(err) {
        console.error('Error Executing Query', err) 
    } finally {
        await client.end()
    }
}

async function updateAnnouncement(announcementID, message) {
    await connectDB();

    try {
        const res = await client.query(`UPDATE announcement SET message = '${message}' WHERE announcementID = '${announcementID}'`)
    } catch(err) {
        console.error('Error Executing Query', err) 
    } finally {
        await client.end()
    }
}

async function deleteAnnouncement(announcementID) {
    await connectDB();

    try {
        const res = await client.query(`DELETE FROM announcement WHERE announcementID = '${announcementID}'`)
    } catch(err) {
        console.error('Error Executing Query', err) 
    } finally {
        await client.end()
    }
}

module.exports = {
    sendAnnouncement: sendAnnouncement,
    getAnnouncement: getAnnouncement,
    updateAnnouncement: updateAnnouncement,
    deleteAnnouncement: deleteAnnouncement
}