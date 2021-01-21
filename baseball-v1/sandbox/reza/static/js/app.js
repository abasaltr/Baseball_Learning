// PROJECT CODE HERE!
console.log('This is the Baseball-v1 dashboard js file');

// Fetch the JSON data and call function init()
var url_franchises = "/api/franchises";
var url_teams = "/api/teams";
var url_team_stats = "/api/team-stats";
// .
// ..
// ...
var urls = [url_franchises, url_teams, url_team_stats]

var promises = [];
urls.forEach(function (url) { promises.push(d3.json(url)) });
console.log(promises);
Promise.all(promises).then(data => init(data));
// end JSON Fetch

// function addFranchises
function addFranchises(response) {
    var franchises = response;
    return franchises;
}//end addFranchises() function

// function addTeams
function addTeams(response) {
    var teams = response;
    return teams;
}//end addTeams() function

// function addTeamStats
function addTeamStats(response) {
    var team_stats = response;
    return team_stats;
}//end addTeamStats() function


// function init
function init(data) {

    // initialize the data for the elements
    franchisesIn = addFranchises(data[0]);
    teamsIn = addTeams(data[1]);
    team_statsIn = addTeamStats(data[2]);

}//end init() function