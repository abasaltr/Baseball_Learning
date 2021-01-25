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

class TeamPredict(db.Model):
    __tablename__ = 'TeamPredictions'

    ID = db.Column(db.Integer, primary_key=True)
    teamID = db.Column(db.String(8))
    yearID = db.Column(db.Integer)
    actual = db.Column(db.Float)
    model = db.Column(db.Float)
    modelType = db.Column(db.String(11))

    def __repr__(self):
        return '<ID %r>' % (self.ID)
# end TeamPredict() class

class FranchisePlayers(db.Model):
    __tablename__ = 'FranchisePlayers'

    fpID = db.Column(db.Integer, primary_key=True)
    franchiseID = db.Column(db.String(3))
    teamID = db.Column(db.String(8))
    playerID = db.Column(db.String(30))

    def __repr__(self):
        return '<fpID %r>' % (self.fpID)
# end FranchisePlayers() class

class Players(db.Model):
    __tablename__ = 'Players'
    
    playerID = db.Column(db.String(30), primary_key=True)
    birthYear = db.Column(db.Integer)
    nameFirst = db.Column(db.String(30))
    nameLast = db.Column(db.String(30))
    debut = db.Column(db.Date)
    finalGame = db.Column(db.Date)

    def __repr__(self):
        return '<playerID %r>' % (self.playerID)
# end Players() class

class PlayerPredictH(db.Model):
    __tablename__ = 'PlayerPredictions-BaseHits'

    ID = db.Column(db.Integer, primary_key=True)
    fpID = db.Column(db.Integer)
    yearID = db.Column(db.Integer)
    actual = db.Column(db.Float)
    model = db.Column(db.Float)
    modelType = db.Column(db.String(11))

    def __repr__(self):
        return '<ID %r>' % (self.ID)
# end PlayerPredictH() 

class PlayerPredictHR(db.Model):
    __tablename__ = 'PlayerPredictions-HomeRuns'

    ID = db.Column(db.Integer, primary_key=True)
    fpID = db.Column(db.Integer)
    yearID = db.Column(db.Integer)
    actual = db.Column(db.Float)
    model = db.Column(db.Float)
    modelType = db.Column(db.String(11))

    def __repr__(self):
        return '<ID %r>' % (self.ID)
# end PlayerPredictHR() class

class PlayerPredictR(db.Model):
    __tablename__ = 'PlayerPredictions-RunsScore'

    ID = db.Column(db.Integer, primary_key=True)
    fpID = db.Column(db.Integer)
    yearID = db.Column(db.Integer)
    actual = db.Column(db.Float)
    model = db.Column(db.Float)
    modelType = db.Column(db.String(11))

    def __repr__(self):
        return '<ID %r>' % (self.ID)
# end PlayerPredictR() class

class PlayerPredictBB(db.Model):
    __tablename__ = 'PlayerPredictions-Walks'

    ID = db.Column(db.Integer, primary_key=True)
    fpID = db.Column(db.Integer)
    yearID = db.Column(db.Integer)
    actual = db.Column(db.Float)
    model = db.Column(db.Float)
    modelType = db.Column(db.String(11))

    def __repr__(self):
        return '<ID %r>' % (self.ID)
# end PlayerPredictBB() class

class Salaries(db.Model):
    __tablename__ = 'Salaries'

    salaryID = db.Column(db.Integer, primary_key=True)
    fpID = db.Column(db.Integer)
    yearID = db.Column(db.Integer)
    salary = db.Column(db.Float)

    def __repr__(self):
        return '<salaryID %r>' % (self.salaryID)
# end Salaries() class

class Batting(db.Model):
    __tablename__ = 'Batting'

    fpID = db.Column(db.Integer, primary_key=True)
    yearID = db.Column(db.Integer)
    stint = db.Column(db.Integer)
    G = db.Column(db.Integer)
    R = db.Column(db.Integer)
    H = db.Column(db.Integer)
    HR = db.Column(db.Integer)
    BB = db.Column(db.Integer)
    IBB = db.Column(db.Integer)
    SO = db.Column(db.Integer)
    SB = db.Column(db.Integer)
    
    def __repr__(self):
        return '<fpID %r>' % (self.fpID)
# end Batting() class

class Pitching(db.Model):
    __tablename__ = 'Pitching'

    fpID = db.Column(db.Integer, primary_key=True)
    yearID = db.Column(db.Integer)
    stint = db.Column(db.Integer)
    G = db.Column(db.Integer)
    H = db.Column(db.Integer)
    HR = db.Column(db.Integer)
    BB = db.Column(db.Integer)
    SO = db.Column(db.Integer)
    ERA = db.Column(db.Integer)
    R = db.Column(db.Integer)

    def __repr__(self):
        return '<fpID %r>' % (self.fpID)
# end Pitching() class

#################################################

#################################################
# Create routes to render HTML
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
# end home() route

# create route that renders ERD.html template
@app.route("/html/erd")
def erd():
    return render_template("erd.html")
# end home() route

# create route that renders .html template
@app.route("/html/source")
def source():
    return render_template("source.html")
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

# create route that renders team stats JSON data
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

# create route that renders team predictions JSON data
@app.route("/api/team-predictions")
def teamPredict():
    results = db.session.query(TeamPredict.ID, TeamPredict.teamID, TeamPredict.yearID, 
                        TeamPredict.actual, 
                        TeamPredict.model, 
                        TeamPredict.modelType).all()

    p_id = [result[0] for result in results]
    t_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    actual = [result[3] for result in results]
    model = [result[4] for result in results]
    modelType = [result[5] for result in results]

    predict_data = [{
        "prediction_id": p_id,
        "team_id": t_id,
        "year_id": y_id,
        "actual" : actual, 
        "model" : model, 
        "modelType" : modelType
    }]
    return jsonify(predict_data)
# end teamPredict() route

# create route that renders franchise players JSON data
@app.route("/api/franchise-players")
def franchisePlayers():
    results = db.session.query(FranchisePlayers.fpID, FranchisePlayers.franchiseID, 
                        FranchisePlayers.teamID, FranchisePlayers.playerID).all()

    fp_id = [result[0] for result in results]
    f_id = [result[1] for result in results]
    t_id = [result[2] for result in results]
    p_id = [result[3] for result in results]
    
    fp_data = [{
        "fp_id": fp_id,
        "franchise_id": f_id,
        "team_id": t_id,
        "player_id" : p_id
    }]
    return jsonify(fp_data)
# end franchisePlayers() route

# create route that renders players JSON data
@app.route("/api/players")
def players():
    results = db.session.query(Players.playerID, Players.birthYear, 
                        Players.nameFirst, Players.nameLast,
                        Players.debut, Players.finalGame).all()

    player_id = [result[0] for result in results]
    birth = [result[1] for result in results]
    first = [result[2] for result in results]
    last = [result[3] for result in results]
    debut_g = [result[4] for result in results]
    final_g = [result[5] for result in results]

    players_data = [{
        "player_id": player_id,
        "birth_year": birth,
        "first_name": first,
        "last_name" : last,
        "debut_date" : debut_g,
        "final_date" : final_g
    }]
    return jsonify(players_data)
# end players() route

# create route that renders player predictions on Base Hits JSON data
@app.route("/api/player-predictions-basehits")
def playerPredictH():
    results = db.session.query(PlayerPredictH.ID, PlayerPredictH.fpID, PlayerPredictH.yearID, 
                        PlayerPredictH.actual, 
                        PlayerPredictH.model, 
                        PlayerPredictH.modelType).all()

    p_id = [result[0] for result in results]
    fp_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    actual = [result[3] for result in results]
    model = [result[4] for result in results]
    modelType = [result[5] for result in results]

    predict_data = [{
        "prediction_id": p_id,
        "fp_id": fp_id,
        "year_id": y_id,
        "actual" : actual, 
        "model" : model, 
        "modelType" : modelType
    }]
    return jsonify(predict_data)
# end playerPredictH() route

# create route that renders player predictions on Home Runs JSON data
@app.route("/api/player-predictions-homeruns")
def playerPredictHR():
    results = db.session.query(PlayerPredictHR.ID, PlayerPredictHR.fpID, PlayerPredictHR.yearID, 
                        PlayerPredictHR.actual, 
                        PlayerPredictHR.model, 
                        PlayerPredictHR.modelType).all()

    p_id = [result[0] for result in results]
    fp_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    actual = [result[3] for result in results]
    model = [result[4] for result in results]
    modelType = [result[5] for result in results]

    predict_data = [{
        "prediction_id": p_id,
        "fp_id": fp_id,
        "year_id": y_id,
        "actual" : actual, 
        "model" : model, 
        "modelType" : modelType
    }]
    return jsonify(predict_data)
# end playerPredictHR() route

# create route that renders player predictions on Runs Score JSON data
@app.route("/api/player-predictions-runsscore")
def playerPredictR():
    results = db.session.query(PlayerPredictR.ID, PlayerPredictR.fpID, PlayerPredictR.yearID, 
                        PlayerPredictR.actual, 
                        PlayerPredictR.model, 
                        PlayerPredictR.modelType).all()

    p_id = [result[0] for result in results]
    fp_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    actual = [result[3] for result in results]
    model = [result[4] for result in results]
    modelType = [result[5] for result in results]

    predict_data = [{
        "prediction_id": p_id,
        "fp_id": fp_id,
        "year_id": y_id,
        "actual" : actual, 
        "model" : model, 
        "modelType" : modelType
    }]
    return jsonify(predict_data)
# end playerPredictR() route

# create route that renders player predictions on Walks JSON data
@app.route("/api/player-predictions-walks")
def playerPredictBB():
    results = db.session.query(PlayerPredictBB.ID, PlayerPredictBB.fpID, PlayerPredictBB.yearID, 
                        PlayerPredictBB.actual, 
                        PlayerPredictBB.model, 
                        PlayerPredictBB.modelType).all()

    p_id = [result[0] for result in results]
    fp_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    actual = [result[3] for result in results]
    model = [result[4] for result in results]
    modelType = [result[5] for result in results]

    predict_data = [{
        "prediction_id": p_id,
        "fp_id": fp_id,
        "year_id": y_id,
        "actual" : actual, 
        "model" : model, 
        "modelType" : modelType
    }]
    return jsonify(predict_data)
# end playerPredictBB() route

# create route that renders player predictions JSON data
@app.route("/api/salaries")
def salaries():
    results = db.session.query(Salaries.salaryID, Salaries.fpID, Salaries.yearID, 
                        Salaries.salary).all()

    salary_id = [result[0] for result in results]
    fp_id = [result[1] for result in results]
    y_id = [result[2] for result in results]
    salary = [result[3] for result in results]
   
    salary_data = [{
        "salary_id": salary_id,
        "fp_id": fp_id,
        "year_id": y_id,
        "salary" : salary
    }]
    return jsonify(salary_data)
# end salaries() route

# create route that renders pitching stats JSON data
@app.route("/api/pitching-stats")
def pitchingStats():
    results = db.session.query(Pitching.fpID, Pitching.yearID, Pitching.stint,
                        Pitching.G,
                        Pitching.H,
                        Pitching.HR,
                        Pitching.BB,
                        Pitching.SO,
                        Pitching.ERA,
                        Pitching.R).all()

    fp_id = [result[0] for result in results]
    y_id = [result[1] for result in results]
    stint = [result[2] for result in results]
    G = [result[3] for result in results]
    H = [result[4] for result in results]
    HR = [result[5] for result in results]
    BB = [result[6] for result in results]
    SO = [result[7] for result in results]
    ERA = [result[8] for result in results]
    R = [result[9] for result in results]

    pitching_data = [{
        "fp_id": fp_id,
        "year_id": y_id,
        "stint": stint,
        "G": G,
        "H": H,
        "HR": HR,
        "BB": BB,
        "SO": SO,
        "ERA": ERA,
        "R" : R
    }]

    return jsonify(pitching_data)
# end pitchingStats() route

# create route that renders batting stats JSON data
@app.route("/api/batting-stats")
def battingStats():
    results = db.session.query(Batting.fpID, Batting.yearID, Batting.stint,
                        Batting.G,
                        Batting.R,
                        Batting.H,
                        Batting.HR,
                        Batting.BB,
                        Batting.IBB,
                        Batting.SO,
                        Batting.SB).all()

    fp_id = [result[0] for result in results]
    y_id = [result[1] for result in results]
    stint = [result[2] for result in results]
    G = [result[3] for result in results]
    R = [result[4] for result in results]
    H = [result[5] for result in results]
    HR = [result[6] for result in results]
    BB = [result[7] for result in results]
    IBB = [result[8] for result in results]
    SO = [result[9] for result in results]
    SB = [result[10] for result in results]

    batting_data = [{
        "fp_id": fp_id,
        "year_id": y_id,
        "stint": stint,
        "G": G,
        "R": R,
        "H": H,
        "HR": HR,
        "BB": BB,
        "IBB": IBB,
        "SO": SO,
        "SB": SB
    }]

    return jsonify(batting_data)
# end battingStats() route

#################################################

#################################################
if __name__ == "__main__":
    app.run()
#################################################