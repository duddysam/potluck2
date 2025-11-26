/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Functions to perform CRUD operations on Invitee Table
********************************************************************************/

const { client, connectDB } = require('./index')

async function inviteUser(eventID, userID) {
    await connectDB();

    try {
        const res = await client.query(`INSERT INTO invitee VALUES (null, null, '${eventID}', '${userID}')`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function rsvp(eventID, userID, response, dish) {
    await connectDB();

    try {
        const res = await client.query(`UPDATE invitee SET response = '${response}', dish = '${dish}' WHERE eventID = '${eventID}' and inviteeID = '${userID}'`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getInvitees(eventID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT a.firstName, a.lastName, a.userID, i.response, i.dish FROM invitee i JOIN appuser a ON i.inviteeID = a.userID WHERE eventID = '${eventID}'`)
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function deleteInvitee(eventID, userID) {
    await connectDB();

    try {
        const res = await client.query(`DELETE FROM invitee WHERE inviteeID = '${userID}' AND eventID = '${eventID}'`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

module.exports = {
    inviteUser: inviteUser,
    rsvp: rsvp,
    getInvitees: getInvitees,
    deleteInvitee: deleteInvitee
}