/*******************************************************************************
   Sam Duddy Final Project
   CS5200 Fall 2025
   Potluck App Database
   
   Description: Dump file for database creation and initial table population
********************************************************************************/

create table appUser
(	firstName VARCHAR(100) not null,
	lastName VARCHAR(100) not null,
	userID SERIAL not null,
	username VARCHAR(25) not null,
	password VARCHAR(25) not null,
	email VARCHAR(100) not null,
	primary key(userID),
	unique(username));

create table event
(
  eventID SERIAL not null,
  eventName VARCHAR(100) not null,
  location VARCHAR(100) not null,
  date DATE not null,
  theme VARCHAR(100),
  description VARCHAR(255) not null,
  photo VARCHAR(255),
  host INT not null,
  primary key(eventID),
  foreign key (host) references appUser(userID) ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table invitee
(
  response CHAR(1),
  dish VARCHAR(25),
  eventID INT not null,
  inviteeID INT not null,
  PRIMARY KEY (eventID, inviteeID),
  FOREIGN KEY (eventID) REFERENCES event(eventID) ON DELETE CASCADE,
  FOREIGN KEY (inviteeID) REFERENCES appUser(userID) ON DELETE CASCADE
);

create table announcement
(
  date DATE NOT NULL,
  message VARCHAR NOT NULL,
  announcementID SERIAL NOT NULL,
  eventID INT NOT NULL,
  inviteeID INT NOT NULL,
  PRIMARY KEY (announcementID),
  FOREIGN KEY (eventID) REFERENCES EVENT(eventID) ON DELETE CASCADE,
  FOREIGN KEY (inviteeID) REFERENCES appUser(userID) ON DELETE CASCADE
);

create table post
(
  postID SERIAL NOT NULL,
  date DATE NOT NULL,
  message VARCHAR(100) NOT NULL,
  eventID INT NOT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (eventID) REFERENCES EVENT(eventID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES appUser(userID) ON DELETE CASCADE
);

create table comment
(
  commentID SERIAL NOT NULL,
  cText VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  postID INT NOT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (postID) REFERENCES POST(postID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES appUser(userID) ON DELETE CASCADE
);


ALTER TABLE event ADD CONSTRAINT unq_name_date_host UNIQUE(eventName, date, host);

/*******************************************************************************
   Populate Tables
********************************************************************************/
insert into appuser values ('Sam', 'Duddy', default, 'sduddy', 'potluck123', 'sam@potluck.com');
insert into appuser values ('Cody', 'Ferguson', default, 'cferguson', ')TCmwckW$5', 'cferguson@potluck.com');
insert into appuser values ('Allison', 'Smith', default, 'asmith', '$#Bn4Gbwlv', 'asmith@potluck.com');
insert into appuser values ('Ryan', 'Cox', default, 'rcox', 'B4A_PNSu%a', 'rcox@potluck.com');
insert into appuser values ('Jennifer', 'Delgado', default, 'jdelgado', 'v#3I)afu(O', 'jdelgado@potluck.com');
insert into appuser values ('Janice', 'Hamilton', default, 'jhamilton', 'S9_lR2TkXt', 'jhamilton@potluck.com');
insert into appuser values ('Ian', 'Hill', default, 'ihill', '%nd66Z)pIq', 'ihill@potluck.com');
insert into appuser values ('Kevin', 'Griffin', default, 'kgriffin', '!WT4CaK4_Y', 'kgriffin@potluck.com');
insert into appuser values ('Jennifer', 'Fischer', default, 'jfischer', '*8z+Aafq*Z', 'jfischer@potluck.com');
insert into appuser values ('Candice', 'Gonzalez', default, 'cgonzalez', '&SVwT)a62e', 'cgonzalez@potluck.com');
insert into appuser values ('Heidi', 'Watson', default, 'hwatson', 'r_GyCA4L&7', 'hwatson@potluck.com');
insert into appuser values ('Laurie', 'Howard', default, 'lhoward', 'sb3keNOwr_', 'lhoward@potluck.com');
insert into appuser values ('Michael', 'Harris', default, 'mharris', 'm)U5LCwRIR', 'mharris@potluck.com');
insert into appuser values ('Sheila', 'Walker', default, 'swalker', '@lt4%Ak7O!', 'swalker@potluck.com');
insert into appuser values ('Jonathan', 'Rodriguez', default, 'jrodriguez', 'scIc)VUp(8', 'jrodriguez@potluck.com');
insert into appuser values ('Hannah', 'Arnold', default, 'harnold', '!jQx*BA#76', 'harnold@potluck.com');
insert into appuser values ('Lucas', 'Bradford', default, 'lbradford', 'W_V!59EkuV', 'lbradford@potluck.com');

insert into event values (default, 'First Potluck!', '74 Cumberland', '12/13/2025', null, 'first potluck on the app', null, 1);
insert into event values (default, 'Holiday Potluck', '15 Pleasant View Ave', '12/21/2025', null, 'happy holidays!', null, 3);
insert into event values (default, 'New Years Potluck', '25 Somerset Drive', '01/1/2026', null, 'happy new year!', null, 1);


insert into invitee values (null, null, 1, 2);
insert into invitee values (null, null, 1, 3);
insert into invitee values (null, null, 1, 4);
insert into invitee values (null, null, 1, 5);
insert into invitee values (null, null, 1, 6);
insert into invitee values (null, null, 1, 7);
insert into invitee values (null, null, 1, 8);
insert into invitee values (null, null, 2, 1);
insert into invitee values (null, null, 2, 2);
insert into invitee values (null, null, 2, 4);
insert into invitee values (null, null, 2, 5);
insert into invitee values (null, null, 2, 6);
insert into invitee values (null, null, 3, 2);
insert into invitee values (null, null, 3, 3);
insert into invitee values (null, null, 3, 4);
insert into invitee values (null, null, 3, 6);
insert into invitee values (null, null, 3, 7);

INSERT INTO announcement (date, message, eventID, inviteeID) VALUES
  ('11/24/2025', 'Potluck in three weeks!', 1, 2),
  ('11/24/2025', 'Potluck in three weeks!', 1, 3),
  ('11/24/2025', 'Potluck in three weeks!', 1, 4),
  ('11/24/2025', 'Potluck in three weeks!', 1, 5),
  ('11/24/2025', 'Potluck in three weeks!', 1, 6),
  ('11/24/2025', 'Potluck in three weeks!', 1, 7),
  ('11/24/2025', 'Potluck in three weeks!', 1, 8);

INSERT INTO post (date, message, eventID, userID) VALUES
  ('11/15/2025', 'Trying a new recipe!', 1, 2),
  ('11/17/2025', 'Cant wait!', 1, 3),
  ('11/21/2025', 'Happy early holidays!', 2, 4),
  ('11/23/2025', 'Getting cards sent out this week!', 2, 5);

INSERT INTO comment (cText, date, postID, userID) VALUES
  ('Cant wait to see how it turns out', '11/15/2025', 1, 4),
  ('You too!', '11/21/2025', 3, 5);