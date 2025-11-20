const { client, connectDB } = require('./index')
const appUser = require('./appuser.js')


async function createEvent(name, address, date, theme, description, photo, hostID) {
    await connectDB();
    
    try {
        // const hostID = appUser.getUserID(host)
        const res = await client.query(`INSERT INTO event VALUES (default, '${name}', '${address}', '${date}', '${theme}', '${description}', '${photo}', '${hostID}')`)
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
        const res = await client.query(`SELECT DISTINCT eventname, date, location FROM event JOIN invitee using(eventid) WHERE host = '${userID}' OR invitee.inviteeid = '${userID}' AND date > now()`)
        console.log(res['rows'])
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
    getUpcomingEvents: getUpcomingEvents
}

