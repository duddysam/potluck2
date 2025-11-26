/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Functions to perform CRUD operations on Post Table
********************************************************************************/

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

async function deletePost(postID) {
    await connectDB();
    
    try {
        const res = await client.query(`DELTE FROM post WHERE postID = '${postID}'`)
    } catch (err) {
        console.error('Error Executing Query', err);
    } finally {
        await client.end()
    }
}

async function updatePost(postID, newMessage) {
    await connectDB();

    try {
        const res = await client.query(`UPDATE post SET message = '${newMessage}' WHERE postID = '${postID}'`)
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

async function getPosts(eventID) {
    await connectDB();

    try {
        const res = await client.query(`SELECT appuser.firstname, appuser.lastname, post.date, post.message, post.postID FROM post JOIN appuser ON post.userid = appuser.userid WHERE eventid = '${eventID}'`)
        console.log(res['rows'])
    } catch (err) {
        console.error('Error Executing Query', err)
    } finally {
        await client.end()
    }
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    deletePost: deletePost,
    updatePost: updatePost
}