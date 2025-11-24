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
    await connectDB();

    try {
        const res = await client.query(`SELECT appuser.firstname, appuser.lastname, post.date, post.message FROM post JOIN appuser ON post.userid = appuser.userid WHERE eventid = '${eventID}'`)
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts
}