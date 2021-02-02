-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Team-Stats" (
    "statID" int   NOT NULL,
    "franchiseID" varchar(3)   NOT NULL,
    "teamID" varchar(8)   NOT NULL,
    "yearID" int   NOT NULL,
    "G" int   NOT NULL,
    "W" int   NOT NULL,
    "R" int   NOT NULL,
    "H" int   NOT NULL,
    "HR" int   NOT NULL,
    "BB" int   NOT NULL,
    "SO" int   NOT NULL,
    "SB" int   NOT NULL,
    "RA" int   NOT NULL,
    "ERA" decimal   NOT NULL,
    "HA" int   NOT NULL,
    "HRA" int   NOT NULL,
    "BBA" int   NOT NULL,
    "SOA" int   NOT NULL,
    CONSTRAINT "pk_Team-Stats" PRIMARY KEY (
        "statID"
     )
);

CREATE TABLE "Batting" (
    "fpID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "stint" int   NOT NULL,
    "G" int   NOT NULL,
    "R" int   NOT NULL,
    "H" int   NOT NULL,
    "HR" int   NOT NULL,
    "BB" int   NOT NULL,
    "IBB" int   NOT NULL,
    "SO" int   NOT NULL,
    "SB" int   NOT NULL
);

CREATE TABLE "Pitching" (
    "fpID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "stint" int   NOT NULL,
    "G" int   NOT NULL,
    "H" int   NOT NULL,
    "HR" int   NOT NULL,
    "BB" int   NOT NULL,
    "SO" int   NOT NULL,
    "ERA" int   NOT NULL,
    "R" int   NOT NULL
);

CREATE TABLE "Players" (
    "playerID" varchar(30)   NOT NULL,
    "birthYear" int   NOT NULL,
    "nameFirst" varchar(30)   NOT NULL,
    "nameLast" varchar(30)   NOT NULL,
    "debut" date   NOT NULL,
    "finalGame" date   NOT NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "playerID"
     )
);

CREATE TABLE "Franchises" (
    "franchiseID" varchar(3)   NOT NULL,
    "FranchiseName" varchar(60)   NOT NULL,
    CONSTRAINT "pk_Franchises" PRIMARY KEY (
        "franchiseID"
     )
);

CREATE TABLE "Salaries" (
    "salaryID" int   NOT NULL,
    "fpID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "salary" decimal   NOT NULL,
    CONSTRAINT "pk_Salaries" PRIMARY KEY (
        "salaryID"
     )
);

CREATE TABLE "PlayerPredictions" (
    "ID" int   NOT NULL,
    "fpID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "actual_bb" decimal   NOT NULL,
    "model_bb" decimal   NOT NULL,
    "actual_h" decimal   NOT NULL,
    "model_h" decimal   NOT NULL,
    "actual_r" decimal   NOT NULL,
    "model_r" decimal   NOT NULL,
    "actual_hr" decimal   NOT NULL,
    "model_hr" decimal   NOT NULL,
    "modelType" varchar(11)   NOT NULL,
    CONSTRAINT "pk_PlayerPredictions" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "TeamPredictions" (
    "ID" int   NOT NULL,
    "teamID" varchar(8)   NOT NULL,
    "yearID" int   NOT NULL,
    "actual" decimal   NOT NULL,
    "model" decimal   NOT NULL,
    "modelType" varchar(11)   NOT NULL,
    CONSTRAINT "pk_TeamPredictions" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "FranchisePlayers" (
    "fpID" int   NOT NULL,
    "franchiseID" varchar(3)   NOT NULL,
    "teamID" varchar(8)   NOT NULL,
    "playerID" varchar(30)   NOT NULL,
    CONSTRAINT "pk_FranchisePlayers" PRIMARY KEY (
        "fpID"
     )
);

CREATE TABLE "Teams" (
    "teamID" varchar(8)   NOT NULL,
    "TeamName" varchar(60)   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "teamID"
     )
);

ALTER TABLE "Team-Stats" ADD CONSTRAINT "fk_Team-Stats_franchiseID" FOREIGN KEY("franchiseID")
REFERENCES "Franchises" ("franchiseID");

ALTER TABLE "Team-Stats" ADD CONSTRAINT "fk_Team-Stats_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Batting" ADD CONSTRAINT "fk_Batting_fpID" FOREIGN KEY("fpID")
REFERENCES "FranchisePlayers" ("fpID");

ALTER TABLE "Pitching" ADD CONSTRAINT "fk_Pitching_fpID" FOREIGN KEY("fpID")
REFERENCES "FranchisePlayers" ("fpID");

ALTER TABLE "Salaries" ADD CONSTRAINT "fk_Salaries_fpID" FOREIGN KEY("fpID")
REFERENCES "FranchisePlayers" ("fpID");

ALTER TABLE "PlayerPredictions" ADD CONSTRAINT "fk_PlayerPredictions_fpID" FOREIGN KEY("fpID")
REFERENCES "FranchisePlayers" ("fpID");

ALTER TABLE "TeamPredictions" ADD CONSTRAINT "fk_TeamPredictions_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

ALTER TABLE "FranchisePlayers" ADD CONSTRAINT "fk_FranchisePlayers_franchiseID" FOREIGN KEY("franchiseID")
REFERENCES "Franchises" ("franchiseID");

ALTER TABLE "FranchisePlayers" ADD CONSTRAINT "fk_FranchisePlayers_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

ALTER TABLE "FranchisePlayers" ADD CONSTRAINT "fk_FranchisePlayers_playerID" FOREIGN KEY("playerID")
REFERENCES "Players" ("playerID");

