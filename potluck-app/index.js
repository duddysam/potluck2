const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});

const {Client} = require('pg');

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});


async function connectDB(){
    try {
        await client.connect();
        console.log('Connected to postgres DB!')
    } catch (err) {
         console.error('Error connecting', err)       
    }
}

module.exports = {
    client: client,
    connectDB, connectDB
}


// const res = await client.query('SELECT * FROM appuser')
// console.log(res)



// (async () => {
//     const client = await pool.connect();
//     try {
//         const {rows} = await client.query('SELECT current_user');
//         const currentUser = rows[0]['current_user']
//         console.log({rows})
//         console.log(currentUser);
//     } catch (err){
//         console.error(err)
//     } finally {
//         client.release();
//     }
    
// })();