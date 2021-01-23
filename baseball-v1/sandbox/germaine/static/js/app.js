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
  //   franchisesIn = addFranchises(data[0]);
  //   teamsIn = addTeams(data[1]);
  //   team_statsIn = addTeamStats(data[2]);
  //   team_predictsIn = addTeamPredicts(data[3]);
  //   buildPlot(team_predictsIn);

  buildPlot(data[3][0], "ATL");
} //end init() function

// function buildPlot
function buildPlot(predictData, teamId) {
  console.log(predictData);

  predictData.actual = predictData.actual.map((data) => {
    return data * 100;
  });

  predictData.model = predictData.model.map((data) => {
    return data * 100;
  });

  predictData.team_id = predictData.team_id.map((data) => {
    return data.split("-")[0];
  });

  var actualvalues = predictData.actual.filter((data, index) => {
    return (
      predictData.team_id[index] === teamId &&
      predictData.year_id[index] >= 2010
    );
  });

  var modelvalues = predictData.model.filter((data, index) => {
    return (
      predictData.team_id[index] === teamId &&
      predictData.year_id[index] >= 2010
    );
  });

  var years = predictData.year_id.filter((data, index) => {
    return (
      predictData.team_id[index] === teamId &&
      predictData.year_id[index] >= 2010
    );
  });

  console.log(predictData);
  var trace1 = {
    x: years,
    y: actualvalues,
    name: "Actual",
    marker: { color: "rgb(247, 175, 7)" },
    type: "bar",
  };

  var trace2 = {
    x: years,
    y: modelvalues,
    name: "Model",
    marker: { color: "rgb(247, 240, 7)" },
    type: "bar",
  };

  var data = [trace1, trace2];

  var layout = {
    title: "Baseball Team Predictions",
    xaxis: {
      title: "Year",
      tickfont: {
        size: 18,
        color: "rgb(107, 107, 107)",
      },
    },
    yaxis: {
      title: "Win Percentage",
      titlefont: {
        size: 16,
        color: "rgb(107, 107, 107)",
      },
      tickfont: {
        size: 14,
        color: "rgb(107, 107, 107)",
      },
    },
    legend: {
      x: 0,
      y: 1.0,
      bgcolor: "rgba(255, 255, 255, 0)",
      bordercolor: "rgba(255, 255, 255, 0)",
    },
    barmode: "group",
    bargap: 0.15,
    bargroupgap: 0.1,
  };

  Plotly.newPlot("teamPredict1", data, layout);
} //end buildPlot function

// function buildPlot - Line Chart
function buildPlot(predictData, teamId) {
  console.log(predictData);

  trace1 = {
    type: "scatter",
    x: years,
    y: actualvalues,
    mode: "lines",
    name: "Actual",
    line: {
      color: "rgb(247, 175, 7)",
      width: 3,
    },
  };

  trace2 = {
    type: "scatter",
    x: years,
    y: modelvalues,
    mode: "lines",
    name: "Model",
    line: {
      color: "rgb(247, 240, 7)",
      width: 1,
    },
  };

  var data = [trace1, trace2];

  var layout = {
    width: 500,
    height: 500,
  };

  Plotly.newPlot("teamPredict2", data, layout);
} //end buildLinePlot function
