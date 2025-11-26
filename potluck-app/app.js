/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Main application file used to aggregate and define user commands to 
   interact with different database entities
********************************************************************************/

// linking functions for each of the entities, as defined in their own .js files
const appUser = require('./appuser.js')
const events = require('./events.js')
const invitee = require('./invitee.js')
const post = require('./post')
const announcement = require('./announcement')
const comment = require('./comment')

// using the yargs nmp module for command line argumemt definition and execution
const yargs = require('yargs')
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

// update username
yargs.command({
    command: 'update_username',
    describe: 'update a username based on the userID',
    builder: {
        userID: {
            demandOption: true,
            type: 'string'
        },
        username: {
            describe: 'new username for user',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        appUser.updateUsername(argv.userID, argv.username)
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

// update event date
yargs.command({
    command: 'update_event_date',
    describe: 'update an event date',
    builder: {
        eventID: {
            demandOption: true,
            type: 'string'
        },
        event_date: {
            describe: 'new event date',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        events.updateEventDate(argv.eventID, argv.event_date)
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

// uninvite a user from an event
yargs.command({
    command: 'uninvite',
    describe: 'remove invitee from event',
    builder: {
        eventID: {
            describe: 'event id for event that user will be uninvited from',
            demandOption: true,
            type: 'string'
        },
        userID: {
            describe: 'user id for user to be uninvited from event',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        invitee.deleteInvitee(argv.eventID, argv.userID)
    }
})

// rsvp to an event
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

// get all invitee responses for an event
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


// write a post on an event
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

// delete a post
yargs.command({
    command: 'delete_post',
    describe: 'delete post for an event',
    builder: {
        postID: {
            describe: 'post id for post to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.deletePost(argv.postID)
    }
})

// update a post
yargs.command({
    command: 'update_post',
    describe: 'update a post message',
    builder: {
        postID: {
            describe: 'post id for post to be updated',
            demandOption: true,
            type: 'string'
        },
        message: {
            describe: 'new message',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.updatePost(argv.postID, argv.message)
    }
})

// get all posts for an event
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

// update comment
yargs.command({
    command: 'update_comment',
    describe: 'update a comment message',
    builder: {
        commentID: {
            describe: 'comment id for comment to be updated',
            demandOption: true,
            type: 'string'
        },
        comment: {
            describe: 'new comment',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.updateComment(argv.commentID, argv.comment)
    }
})

// delete comment
yargs.command({
    command: 'delete_comment',
    describe: 'delete comment for an event',
    builder: {
        commentID: {
            describe: 'comment id for comment to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.deleteComment(argv.commentID)
    }
})

// send announcement
yargs.command({
    command: 'send_announcement',
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

// update announcement
yargs.command({
    command: 'update_announcement',
    describe: 'update a announcement message',
    builder: {
        announcementID: {
            describe: 'announcement id for announcement to be updated',
            demandOption: true,
            type: 'string'
        },
        comment: {
            describe: 'new announcement',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.updateAnnouncement(argv.announcementID, argv.comment)
    }
})

// delete announcement
yargs.command({
    command: 'delete_announcement',
    describe: 'delete announcement for an event',
    builder: {
        announcementID: {
            describe: 'announcement id for announcement to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        post.deleteAnnouncement(argv.announcementID)
    }
})


yargs.parse()