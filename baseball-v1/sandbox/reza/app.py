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
# from db_key import user, password

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
#try:
#    db_uri = os.environ['DATABASE_URL']
#except KeyError:
#    db_uri = f'postgres://{user}:{password}@localhost:5432/baseball_db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://ixbwbsencscmco:807508d2ad05f66baef146ce2093825585bc717e57a18029860b9e3b8d19fee7@ec2-54-162-207-150.compute-1.amazonaws.com:5432/ddl0bkhoute3sn'

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

#################################################


#################################################
# Create routes to render HTML
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
# end home() route

#################################################
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



#################################################
if __name__ == "__main__":
    app.run()
#################################################