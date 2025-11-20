const yargs = require('yargs')
const appUser = require('./appuser.js')
const events = require('./events.js')

yargs.version('1.1.0')

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

// get all users
yargs.command({
    command: 'get_users',
    describe: 'see all users',
    handler: (argv) => {
        appUser.getUsers()
    }
})


// create an event
yargs.command({
    command: 'create_event',
    describe: 'create a new event',
    builder: {
        name: {
            describe: 'event name',
            demandOption: true,
            type: 'string'
        },
        address: {
            describe: 'event address',
            demandOption: true,
            type: 'string',
        },
        date: {
            describe: 'event date',
            demandOption: true,
            type: 'string'
        },
        theme: {
            describe: 'event theme',
            type: 'string'
        },
        description: {
            describe: 'event description',
            type: 'string'
        },
        photo: {
            describe: 'event image',
            type: 'string'
        },
        host: {
            describe: 'event host id',
            demandOption: true,
            type: 'string'
        }

    },
    handler: (argv) => {
        events.createEvent(argv.name, argv.address, argv.date, argv.theme, argv.description, argv.photo, argv.host)
    }

})

// delete an event
yargs.command({
    command: 'delete_event',
    describe: 'deletes an event',
    builder: {
        name: {
            describe: 'event name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        events.deleteEvent(argv.name)
    }
})

// get all events for a hostID
yargs.command({
    command: 'get_host_events',
    describe: 'retrieves all events for a hostID',
    builder: {
        hostID: {
            describe: 'host id number',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        events.getHostEvents(argv.hostID)
    }
})

// get upcoming events for a user
yargs.command({
    command: 'get_upcoming_events',
    describe: 'gets all upcoming events for a user - both hosting and invited to',
    builder: {
        userID: {
            describe: 'user id number',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        events.getUpcomingEvents(argv.userID)
    }
})

// get past events


yargs.parse()