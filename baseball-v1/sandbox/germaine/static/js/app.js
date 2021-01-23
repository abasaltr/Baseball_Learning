// PROJECT CODE HERE!
console.log("This is the Baseball-v1 dashboard js file");

//declare global variables
var franchisesIn = [];
var teamsIn = [];
var team_statsIn = [];
var team_predictsIn = [];

// Fetch the JSON data and call function init()
var url_franchises = "/api/franchises";
var url_teams = "/api/teams";
var url_team_stats = "/api/team-stats";
var url_team_predicts = "/api/team-predictions";
// .
// ..
// ...
var urls = [url_franchises, url_teams, url_team_stats, url_team_predicts];

var promises = [];
urls.forEach(function (url) {
  promises.push(d3.json(url));
});
console.log(promises);
Promise.all(promises).then((data) => init(data));
// end JSON Fetch

// function addFranchises
function addFranchises(response) {
  var franchises = response;
  return franchises;
} //end addFranchises() function

// function addTeams
function addTeams(response) {
  var teams = response;
  return teams;
} //end addTeams() function

// function addTeamStats
function addTeamStats(response) {
  var team_stats = response;
  return team_stats;
} //end addTeamStats() function

// function addTeamPredicts
function addTeamPredicts(response) {
  var team_predicts = response;
  return team_predicts;
} //end addTeamPredicts() function

// function init
function init(data) {
  // initialize the data for the elements
  franchisesIn = addFranchises(data[0]);
  teamsIn = addTeams(data[1]);
  team_statsIn = addTeamStats(data[2]);
  team_predictsIn = addTeamPredicts(data[3]);

  buildPlot(team_predictsIn);
} //end init() function

// function buildPlot
function buildPlot(predictData) {
  for (i = 0; i < predictData[0]["actual"].length; i++) {
    //console.log(predictData[0]["actual"][i]);
    console.log("hello");
  }

  var trace1 = {
    x: ["year"],
    y: ["actual%*100"],
    name: "Actual",
    type: "bar",
  };

  var trace2 = {
    x: ["year"],
    y: ["modal%*100"],
    name: "Model",
    type: "bar",
  };

  var data = [trace1, trace2];

  var layout = { barmode: "group" };

  Plotly.newPlot("myDiv", data, layout);

  var data = [trace1, trace2];
  var layout = { barmode: "group" };

  Plotly.newPlot("teamPredict1", data, layout);
} //end buildPlot function
