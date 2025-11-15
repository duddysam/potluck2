const { client, connectDB } = require('./index')

async function runApp(){
    await connectDB();

    try {
        const res = await client.query('SELECT * FROM appuser')
        console.log(res)
    } catch (err){
        console.error('Error executing query', err);
    } finally {
        await client.end();
        console.log('Disconnecting from postgreSQL database');
    }
}

runApp();