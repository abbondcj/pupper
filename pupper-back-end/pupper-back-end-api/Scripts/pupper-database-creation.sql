CREATE DATABASE [Pupper];
GO

USE [Pupper];
Go

CREATE TABLE [dbo].[User] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [firebaseId] varchar(28) NOT NULL,
  [email] varchar(254) NOT NULL,
  [firstName] varchar(40),
  [lastName] varchar(40),
  [username] varchar(40),
  [primaryHouseId] int
)
GO


CREATE TABLE [dbo].[House] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [houseOwnerId] int NOT NULL,
  [name] varchar(40) NOT NULL,
  [joinCode] int NOT NULL,
  [address1] varchar(254),
  [address2] varchar(254),
  [city] varchar(40),
  [state] varchar(2),
  [zip] varchar(10)
)
GO

CREATE TABLE [dbo].[houseMember] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [userId] int NOT NULL,
  [houseId] int NOT NULL
)
GO

CREATE TABLE [dbo].[Pup] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [ownerId] int NOT NULL,
  [houseId] int NOT NULL,
  [name] varchar(40) NOT NULL,
  [breed] varchar(40) NOT NULL,
  [gender] int,
  [ageYears] int,
  [ageMonths] int
)
GO

CREATE TABLE [dbo].[Activity] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [pupId] int NOT NULL,
  [activityTypeId] int NOT NULL,
  [date] date NOT NULL,
  [time] time NOT NULL,
  [description] varchar(254)
)
GO

CREATE TABLE [dbo].[ActivityType] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [type] varchar(40) NOT NULL
)
GO

CREATE TABLE [dbo].[Note] (
	[id] int PRIMARY KEY IDENTITY(1, 1),
	[userId] int NOT NULL,
	[pupId] int NOT NULL,
	[date] date NOT NULL,
	[time] time NOT NULL,
	[title] varchar(100) NOT NULL,
	[details] varchar(240)
)
GO

CREATE TABLE [dbo].[Rule] (
	[id] int PRIMARY KEY IDENTITY(1, 1),
	[pupId] int NOT NULL,
	[title] varchar(100) NOT NULL,
	[details] varchar(254)
)
GO


--INSERT BASE USER
INSERT INTO [dbo].[User] VALUES ('qM2rsLoxGaevTioXrv87YE21ScE3','abbondcj@gmail.com', 'Christopher', 'Abbondandelo', 'abbondcj', '1')
GO
--INSERT BASE HOUSE
INSERT INTO [dbo].[House] VALUES ('1', 'IMT Apt', '196732', '201 Gillespie Drive', 'Apt 9303','Nashville', 'TN', '37067')
GO
--INSERT BASE PUP
INSERT INTO [dbo].[Pup] VALUES ('1', '1', 'Daisy', 'Pembroke Welsh Corgi', '2', '1', '0')
GO
--INSERT BASE HOUSE MEMBER
INSERT INTO [dbo].[houseMember] VALUES ('1','1')
GO
--INSERT BASE ACTIVITY
INSERT INTO [dbo].[Activity] VALUES ('1', '1', '2022-11-8', '8:12:34', 'Ate all her food')
GO
--INSERT BASE ACTIVITY TYPE
INSERT INTO [dbo].[ActivityType] VALUES ('Breakfast')
GO
--INSERT BASE NOTE
INSERT INTO [dbo].[Note] VALUES ('1', '1', '2022-11-8', '15:00:45', 'Would not come up stairs', 'Sniffing a lot right before having to come up the stairs')
GO
--INSERT BASE RULE
INSERT INTO [dbo].[Rule] VALUES ('1', 'Breakfast at 6-8am', '2 scoops of big yellow food bag - tell her wait then point at food and say eat')



