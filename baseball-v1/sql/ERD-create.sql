-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Teams" (
    "yearID" int   NOT NULL,
    "teamID" int   NOT NULL,
    "franchiseID" int   NOT NULL,
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
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "teamID"
     )
);

CREATE TABLE "Batting" (
    "playerID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "teamID" int   NOT NULL,
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
    "playerID" int   NOT NULL,
    "yearID" int   NOT NULL,
    "teamID" int   NOT NULL,
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
    "playerID" int   NOT NULL,
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
    "franchiseID" int   NOT NULL,
    "FranchiseName" varchar(30)   NOT NULL,
    CONSTRAINT "pk_Franchises" PRIMARY KEY (
        "franchiseID"
     )
);

CREATE TABLE "Salaries" (
    "yearID" int   NOT NULL,
    "teamID" int   NOT NULL,
    "playerID" int   NOT NULL,
    "salary" money   NOT NULL
);

CREATE TABLE "Tableau" (
    "playerID" int   NOT NULL,
    "teamID" int   NOT NULL,
    "winPct" decimal   NOT NULL
);

ALTER TABLE "Teams" ADD CONSTRAINT "fk_Teams_franchiseID" FOREIGN KEY("franchiseID")
REFERENCES "Franchises" ("franchiseID");

ALTER TABLE "Batting" ADD CONSTRAINT "fk_Batting_playerID" FOREIGN KEY("playerID")
REFERENCES "Players" ("playerID");

ALTER TABLE "Batting" ADD CONSTRAINT "fk_Batting_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Pitching" ADD CONSTRAINT "fk_Pitching_playerID" FOREIGN KEY("playerID")
REFERENCES "Players" ("playerID");

ALTER TABLE "Pitching" ADD CONSTRAINT "fk_Pitching_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Salaries" ADD CONSTRAINT "fk_Salaries_playerID" FOREIGN KEY("playerID")
REFERENCES "Players" ("playerID");

ALTER TABLE "Tableau" ADD CONSTRAINT "fk_Tableau_playerID" FOREIGN KEY("playerID")
REFERENCES "Players" ("playerID");

ALTER TABLE "Tableau" ADD CONSTRAINT "fk_Tableau_teamID" FOREIGN KEY("teamID")
REFERENCES "Teams" ("teamID");

