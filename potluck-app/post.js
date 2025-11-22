const { client, connectDB } = require('./index')
const { format } = require('date-and-time')

async function createPost(eventID, userID, text) {
    await connectDB();

    try {

        const curr_date = format(new Date(), 'MM/DD/YYYY')
        const res = await client.query(`INSERT INTO post values (default, '${curr_date}', '${text}', '${eventID}', '${userID}')`)
    } catch (err) {
        console.log('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getPosts(eventID) {
    await conndectDB();

    try {
        const res = await client.query(`SELECT `)
    }
}

module.exports = {
    createPost: createPost
}