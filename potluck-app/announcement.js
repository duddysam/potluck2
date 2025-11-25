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
        const res = await client.query(`SELECT date, message FROM announcement WHERE inviteeid = '${userID}'`)
        console.log(res['rows'])
    } catch(err) {
        console.error('Error Executing Query', err) 
    } finally {
        await client.end()
    }
}

module.exports = {
    sendAnnouncement: sendAnnouncement,
    getAnnouncement: getAnnouncement
}