const { client, connectDB } = require('./index')
const yargs = require('yargs')
const appUser = require('./appuser.js')

yargs.version('1.1.0')

// function for verification purposes only
async function runApp(){
    await connectDB();

    try {
        const res = await client.query('SELECT * FROM appuser')
        console.log(res['rows'])
    } catch (err){
        console.error('Error executing query', err);
    } finally {
        await client.end();
        console.log('Disconnecting from postgreSQL database');
    }
}

// add a new user
yargs.command({
    command: 'add_user',
    describe: 'adding a new potluck app user',
    builder: {
        f_name: {
            describe: 'first name',
            demandOption: true,
            type: 'string'
        },
        l_name: {
            describe: 'last name',
            demandOption: true,
            type: 'string'
        },
        user_name:{
            describe: 'unique username',
            demandOption: true,
            type: 'string'
        },
        password:{
            describe: 'password',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'email',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        appUser.addUser(argv.f_name, argv.l_name, argv.user_name, argv.password, argv.email)
    }
})

// delete a user
yargs.command({
    command: 'delete_user',
    describe: 'deleting user by username',
    builder:{
        username: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        appUser.deleteUser(argv.username)
    }
})

yargs.command({
    command: 'get_users',
    describe: 'see all users',
    handler: (argv) => {
        appUser.getUsers()
    }
})

yargs.parse()