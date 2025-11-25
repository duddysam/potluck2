const { client, connectDB } = require('./index')
const { format } = require('date-and-time')


async function comment(text, postID, userID) {
    await connectDB();

    try {
        const curr_date = format(new Date(), 'MM/DD/YYYY')
        const res = await client.query(`INSERT INTO comment VALUES (default, '${text}', '${curr_date}', '${postID}', '${userID}')`)
    } catch (err) {
        console.error("Error Executing Query", err)
    } finally {
        await client.end()
    }
}

async function getComments(postID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT ctext, date FROM comment WHERE postid = '${postID}'`)
        console.log(res)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

module.exports = {
    comment: comment,
    getComments: getComments
}