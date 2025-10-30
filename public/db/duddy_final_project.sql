-- Duddy Final Project

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
  foreign key (host) references appUser(userID)
);

create table invitee
(
  response CHAR(1) not null,
  dish VARCHAR(25) not null,
  eventID INT not null,
  inviteeID INT not null,
  PRIMARY KEY (eventID, inviteeID),
  FOREIGN KEY (eventID) REFERENCES event(eventID),
  FOREIGN KEY (inviteeID) REFERENCES appUser(userID)
);

create table announcement
(
  date DATE NOT NULL,
  message INT NOT NULL,
  announcementID SERIAL NOT NULL,
  eventID INT NOT NULL,
  inviteeID INT NOT NULL,
  PRIMARY KEY (announcementID),
  FOREIGN KEY (eventID) REFERENCES EVENT(eventID),
  FOREIGN KEY (inviteeID) REFERENCES appUser(userID)
);

create table post
(
  postID SERIAL NOT NULL,
  date DATE NOT NULL,
  message VARCHAR(100) NOT NULL,
  eventID INT NOT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (eventID) REFERENCES EVENT(eventID),
  FOREIGN KEY (userID) REFERENCES appUser(userID)
);

create table comment
(
  commentID SERIAL NOT NULL,
  cText VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  postID INT NOT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (postID) REFERENCES POST(postID),
  FOREIGN KEY (userID) REFERENCES appUser(userID)
);