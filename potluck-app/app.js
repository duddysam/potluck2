const yargs = require('yargs')
const appUser = require('./appuser.js')
const events = require('./events.js')
const invitee = require('./invitee.js')
const post = require('./post')
const announcement = require('./announcement')
const comment = require('./comment')


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
yargs.command({
    command: 'get_past_events',
    describe: 'gets all past events for a user - both hosting and invited to',
    builder: {
        userID: {
            describe: 'user id number',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        events.getPastEvents(argv.userID)
    }
})

// invite a user to an event
yargs.command({
    command: 'invite',
    describe: 'command to invite a user to and event',
    builder: {
        eventID: {
            describe: 'event id for event that user will be invited to',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user to be invited to event',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        invitee.inviteUser(argv.eventID, argv.userID)
    }
})

yargs.command({
    command: 'rsvp',
    describe: 'command that allows someone to rsvp to an event',
    builder: {
        eventID: {
            describe: 'event id for event that user is responding to',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user who is responding to event',
            demandOption: true,
            type: 'string'
        },
        response: {
            describe: 'User response. Must be "Y", "N", or "M"',
            demandOption: true,
            type: 'string'
        },
        dish: {
            describe: 'Dish that user plans to bring to the event',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler: (argv) => {
        invitee.rsvp(argv.eventID, argv.userID, argv.response, argv.dish)
    }
})

yargs.command({
    command: 'get_responses',
    descbribe: 'get all of the invitees and their responses to an event',
    builder: {
        eventID: {
            describe: 'event id for event in question',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        invitee.getInvitees(argv.eventID)
    }
})

yargs.command({
    command: 'post',
    describe: 'write a post on an event wall',
    builder: {
        eventID: {
            describe: 'event id for event in question',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user who is posting',
            demandOption: true,
            type: 'string'
        },
        text: {
            describe: 'actual text of the post',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.createPost(argv.eventID, argv.userID, argv.text)
    }
})

yargs.command({
    command: 'get_posts',
    describe: 'get all posts for an event',
    builder: {
        eventID: {
            describe: 'event id for event in question',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.getPosts(argv.eventID)
    }
})


// create a comment on a post
yargs.command({
    command: 'comment',
    describe: 'create a comment on a preexisting post',
    builder: {
        postID: {
            describe: 'post id for post we are commenting on',
            demandOption: true,
            type: 'string'
        },
        text: {
            describe: 'text of comment body',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user who is commenting',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        comment.comment(argv.text, argv.postID, argv.userID)
    }
})

// get comments on a given post
yargs.command ({
    command: 'get_comments',
    describe: 'get comments on a specified post',
    builder: {
        postID: {
            describe: 'id for post that is we are retreiving comments for',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        comment.getComments(argv.postID)
    }
})

// send announcement
yargs.command({
    command: 'sent_announcement',
    describe: 'send announcement for an event to a user',
    builder: {
        eventID: {
            describe: 'event id for event in question',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user who will receive announcement',
            demandOption: true,
            type: 'string'
        },
        text: {
            describe: 'actual text of the announcement',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        announcement.sendAnnouncement(argv.eventID, argv.text, argv.userID)
    }
})

// get announcements for user
yargs.command ({
    command: 'get_announcements',
    describe: 'get announcements for a specified user',
    builder: {
        userID: {
            describe: 'id for user are retreiving comments for',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        announcement.getAnnouncement(argv.userID)
    }
})


yargs.parse()