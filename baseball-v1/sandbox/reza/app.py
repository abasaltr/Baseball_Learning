# import necessary libraries
import os
import glob
import numpy as np

from flask import (
    Flask,
    flash,
    render_template,
    jsonify,
    request,
    url_for,
    redirect)

from flask_sqlalchemy import SQLAlchemy

# Postgres database user and password import
from db_key import user, password

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
try:
    db_uri = os.environ['DATABASE_URL']
except KeyError:
    db_uri = f'postgres://{user}:{password}@localhost:5432/baseball_db'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
db = SQLAlchemy(app)

#################################################
# Create classes to frame database table instance
#################################################

class Franchises(db.Model):
    __tablename__ = 'Franchises'

    franchiseID = db.Column(db.String(3), primary_key=True)
    FranchiseName = db.Column(db.String(64))

    def __repr__(self):
        return '<franchiseID %r>' % (self.franchiseID)
# end Franchises() class

class Teams(db.Model):
    __tablename__ = 'Teams'

    teamID = db.Column(db.String(8), primary_key=True)
    TeamName = db.Column(db.String(64))

    def __repr__(self):
        return '<teamID %r>' % (self.teamID)
# end Teams() class

class TeamStats(db.Model):
    __tablename__ = 'Team-Stats'

    statID = db.Column(db.Integer, primary_key=True)
    franchiseID = db.Column(db.String(3))
    teamID = db.Column(db.String(8))
    yearID = db.Column(db.Integer)
    G = db.Column(db.Integer)
    W = db.Column(db.Integer)
    R = db.Column(db.Integer)
    H = db.Column(db.Integer)
    HR = db.Column(db.Integer)
    BB = db.Column(db.Integer)
    SO = db.Column(db.Integer)
    SB = db.Column(db.Integer)
    RA = db.Column(db.Integer)
    ERA = db.Column(db.Float)
    HA = db.Column(db.Integer)
    HRA = db.Column(db.Integer)
    BBA = db.Column(db.Integer)
    SOA = db.Column(db.Integer)

    def __repr__(self):
        return '<statID %r>' % (self.statID)
# end Team-Stats() class



#################################################

#################################################
# Create routes to render HTML
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
# end home() route

# create route that renders franchises JSON data
@app.route("/api/franchises")
def franchises():
    results = db.session.query(Franchises.franchiseID, Franchises.FranchiseName).all()

    f_id = [result[0] for result in results]
    f_name = [result[1] for result in results]

    franchise_data = [{
        "franchise_id": f_id,
        "franchise_name": f_name
    }]
    return jsonify(franchise_data)
# end franchises() route

# create route that renders teams JSON data
@app.route("/api/teams")
def teams():
    results = db.session.query(Teams.teamID, Teams.TeamName).all()

    t_id = [result[0] for result in results]
    t_name = [result[1] for result in results]

    team_data = [{
        "team_id": t_id,
        "team_name": t_name
    }]
    return jsonify(team_data)
# end franchises() route

# create route that renders teams JSON data
@app.route("/api/team-stats")
def team_stats():
    results = db.session.query(TeamStats.statID, TeamStats.franchiseID, TeamStats.teamID, TeamStats.yearID,
                        TeamStats.G,
                        TeamStats.W,
                        TeamStats.R,
                        TeamStats.H,
                        TeamStats.HR,
                        TeamStats.BB,
                        TeamStats.SO,
                        TeamStats.SB,
                        TeamStats.RA,
                        TeamStats.ERA,
                        TeamStats.HA,
                        TeamStats.HRA,
                        TeamStats.BBA,
                        TeamStats.SOA).all()

    s_id = [result[0] for result in results]
    f_id = [result[1] for result in results]
    t_id = [result[2] for result in results]
    y_id = [result[3] for result in results]
    G = [result[4] for result in results]
    W = [result[5] for result in results]
    R = [result[6] for result in results]
    H = [result[7] for result in results]
    HR = [result[8] for result in results]
    BB = [result[9] for result in results]
    SO = [result[10] for result in results]
    SB = [result[11] for result in results]
    RA = [result[12] for result in results]
    ERA = [result[13] for result in results]
    HA = [result[14] for result in results]
    HRA = [result[15] for result in results]
    BBA = [result[16] for result in results]
    SOA = [result[17] for result in results]

    team_stats_data = [{
        "stat_id": s_id,
        "franchise_id": f_id,
        "team_id": t_id, 
        "year_id": y_id,
        "G": G,
        "W": W,
        "R": R,
        "H": H,
        "HR": HR,
        "BB": BB,
        "SO": SO,
        "SB": SB,
        "RA": RA,
        "ERA": ERA,
        "HA": HA,
        "HRA": HRA,
        "BBA": BBA,
        "SOA": SOA
    }]

    return jsonify(team_stats_data)
# end team_stats() route



#################################################

#################################################
if __name__ == "__main__":
    app.run()
#################################################