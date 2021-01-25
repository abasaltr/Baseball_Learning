// PROJECT IV CODE HERE!
console.log('This is the Baseball-v1 dashboard js file');

//declare global variables
var franchisesIn = [];
var teamsIn = [];
var teamStatsIn = [];
var playersIn = [];
var fpIn = [];
var salariesIn = [];
var pitchingIn = [];
var battingIn = [];

var teamPredictionsIn = [];

// PlayerPredictionIn per attribute
var PPI_HR = [];
var PPI_R = [];
var PPI_H = [];
var PPI_BB = [];

// Fetch the JSON data and call function init()
var url_franchises = "/api/franchises";
var url_teams = "/api/teams";
var url_team_stats = "/api/team-stats";
var url_fp = "/api/franchise-players";
var url_players = "/api/players";
var url_salaries = "/api/salaries";
var url_pitching = "/api/pitching-stats";
var url_batting = "/api/batting-stats";

var url_team_predict = "/api/team-predictions";

var url_player_predict_HR = "/api/player-predictions-homeruns";
var url_player_predict_R = "/api/player-predictions-runsscore";
var url_player_predict_H = "/api/player-predictions-basehits";
var url_player_predict_BB = "/api/player-predictions-walks";

var urls = [url_teams, url_team_predict, url_fp, url_players, 
        url_player_predict_HR, url_player_predict_R, url_player_predict_H, url_player_predict_BB]

var promises = [];
urls.forEach(function (url) { promises.push(d3.json(url)) });
console.log(promises);
Promise.all(promises).then(data => init(data));
// end JSON Fetch

///////////////////////////////////////////////////////////////
// BEGIN FUNCTIONS DEFINITIONS                               //
///////////////////////////////////////////////////////////////

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
    var teamStats = response;
    return teamStats;
}//end addTeamStats() function

// function addFP
function addFP(response) {
    var fp = response;
    return fp;
}//end addFP() function

// function addPlayers
function addPlayers(response) {
    var players = response;
    return players;
}//end addPlayers() function

// function addPlayers
function addSalaries(response) {
    var salaries = response;
    return salaries;
}//end addSalaries() function

// function addPlayers
function addPitching(response) {
    var pitching = response;
    return pitching;
}//end addPitching() function

// function addPlayers
function addBatting(response) {
    var batting = response;
    return batting;
}//end addBatting() function

// function addTeamPredict
function addTeamPredict(response) {
    var teamPredict = response;

    initDropListTeam(teamPredict[0]);

    return teamPredict;
}//end addTeamPredict() function

// function addPlayerPredictHR
function addPlayerPredictHR(response) {
    var playerPredict = response;
    initDropListPlayer(playerPredict[0]);
    return playerPredict
}//end addPlayerPredictHR() function

// function addPlayerPredictR
function addPlayerPredictR(response) {
    var playerPredict = response;
    return playerPredict
}//end addPlayerPredictR() function

// function addPlayerPredictH
function addPlayerPredictH(response) {
    var playerPredict = response;
    return playerPredict
}//end addPlayerPredictH() function

// function addPlayerPredictBB
function addPlayerPredictBB(response) {
    var playerPredict = response;
    return playerPredict
}//end addPlayerPredictBB() function

// function init
function init(data) {

    // initialize the data for the elements
    teamsIn = addTeams(data[0]);
    teamPredictionsIn = addTeamPredict(data[1]);    
    fpIn = addFP(data[2]);
    playersIn = addPlayers(data[3]);

    PPI_HR = addPlayerPredictHR(data[4]);
    PPI_R = addPlayerPredictR(data[5]);
    PPI_H = addPlayerPredictH(data[6]);
    PPI_BB = addPlayerPredictBB(data[7]);
    
    //franchisesIn = addFranchises(data[2]);
    //teamStatsIn = addTeamStats(data[4]);
    //salariesIn = addSalaries(data[7]);
    //pitchingIn = addPitching(data[8]);
    //battingIn = addBatting(data[9]);

    // default team - Atlanta Braves, ATL
    buildBarPlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")
    buildLinePlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")
    buildHeatPlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")

    // default player - Anthony Vincent Rizzo, rizzoan01, 660799435 
    buildBarPlot_Player(PPI_HR[0], 660799435, 2010, "ML-LN-T1", "HR")
    buildLinePlot_Player(PPI_HR[0], 660799435, 2010, "ML-LN-T1", "HR")
    buildHeatPlot_Player(PPI_HR[0], 660799435, 2010, "ML-LN-T1", "HR")

}//end init() function

// initDropListTeam function
function initDropListTeam(data) {

    var team_id = [...new Set(Object.values(data['team_id']))];
    var team_name = [];
    for (var i = 0; i < team_id.length; i++) {
        team_name.push(getTeamName(team_id[i]));
    }

    var years = [...new Set(Object.values(data['year_id']))];
    var decades = [];
    for (var i = 0; i < years.length; i++) {
        var decade = parseInt(Math.floor(years[i] / 10) * 10);
        decades.push(decade);
    }

    var model = [...new Set(Object.values(data['modelType']))];

    // call function to populate the form dropdown menu options for each filter criteria in alphabetical order
    createDropList(team_name, "selTeam", "Select Team", 2);
    createDropList(decades, "selDecade-T", "Select Decade", 1);
    createDropList(model, "selModel-T", "Select Model", 2);

}//initDropList() function

// initDropListPlayer function
function initDropListPlayer(data) {

    var fp_id = [...new Set(Object.values(data['fp_id']))];

    var player_id = [];
    //fp_id.length
    for (var i = 0; i < fp_id.length; i++) {
        player_id.push(getPlayerId(fp_id[i])[0]);
    }
    
    var pid_uni = player_id.filter((e, i, a) => a.indexOf(e) === i).sort();
    
    var player_name = [];
    for (var i = 0; i < pid_uni.length; i++) {
        player_name.push(getPlayerName(pid_uni[i]));
    }

    var years = [...new Set(Object.values(data['year_id']))];

    var decades = [];
    for (var i = 0; i < years.length; i++) {
        var decade = parseInt(Math.floor(years[i] / 10) * 10);
        decades.push(decade);
    }

    var model = [...new Set(Object.values(data['modelType']))];

    // call function to populate the form dropdown menu options for each filter criteria in alphabetical order
    createDropList(player_name, "selPlayer", "Select Player", 2);
    createDropList(decades, "selDecade-P", "Select Decade", 1);
    createDropList(model, "selModel-P", "Select Model", 2);

}//initDropList() function

function createDropList(menu, selectname, idname, sType) {

    // check if option type passed is date or string as defined by its numerical value
    if (sType == 1) {
        // assigned only unique data values of the array list without any duplicates, but unsorted for date options 
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i);
    }
    else {
        // assigned only unique data values of the array list without any duplicates, 
        // and sorted alphabetically for string options 
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i).sort();
    }

    // define a constant statement to append a string at the beginning of an array list
    // do not modify this value during scripts execution
    // used for adding placeholder value on top of the menu options as default value
    // assign result to list array of data values 
    const addElementToBeginningOfArray = (a, e) => [e, ...a]
    values = addElementToBeginningOfArray(sort_values, idname);

    // createElement() method creates an Element Node with the specified name.
    // create html select tag assigning name and id to the select parameters passed
    //var select = document.createElement("select");
    var select = document.getElementById(selectname)
    //select.name = selectname;
    //select.id = idname;

    // loop through contents of data values to format how its displayed and set its placeholder values as selected
    for (const val of values) {

        // create html option tag that will be appended within the select tag
        var option = document.createElement("option");
        // assign option value to each data value iteratively
        option.value = val;

        // check if option type is date, displayed as is and 
        // option selected is set to true for placeholder text string
        if (sType == 1) {
            option.text = val;
            if (val == selectname) {
                option.selected = true;
            }
        }

        // check if option type is full text string, display initial character in upper case and 
        // option selected is set to true for placeholder text string
        if (sType == 2) {
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            if (val == selectname) {
                option.selected = true;
            }
        }

        // check if option type is partial text string abbreviation, display all characters in upper case and
        // option selected is set to true for placeholder text string
        if (sType == 3) {
            if (val == selectname) {
                option.selected = true;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
            }
            else {
                option.text = val.charAt(0).toUpperCase() + val.charAt(1).toUpperCase();
            }
        }

        // append the html option tag within the html select tag using appendChild() method
        // method to append a node as the last child of a node passing in text value assigned above
        // appendChild() moves from its current position to the new position
        select.appendChild(option);
    }
}//end createDropList() function

// getTeamName function
function getTeamName(team_id) {
    var team_name = "unknown";
    for (var i = 0; i < teamsIn[0]['team_id'].length; i++) {
        if (team_id == teamsIn[0]['team_id'][i]) {
            team_name = teamsIn[0]['team_name'][i]
            break;
        }
    }
    return team_name;
} //end getTeamName()

// checkTeam function return boolean
function checkTeam(team_id) {
    var check = false;
    for (var i = 0; i < teamPredictionsIn[0]['team_id'].length; i++) {
        if (team_id == teamPredictionsIn[0]['team_id'][i]) {
            check = true;
            break;
        }
    }
    return check;
} //end checkTeam()

// getTeamId function
function getTeamId(team_name) {
    var team_id = "UKN";
    for (var i = 0; i < teamsIn[0]['team_name'].length; i++) {
        if (team_name == teamsIn[0]['team_name'][i]) {
            team_id = teamsIn[0]['team_id'][i].split("-")[0];
            if (checkTeam(team_id) == true)
                break;
        }
    }
    return team_id;
} // end getTeamId()

// getPlayerId function
function getPlayerId(fpId){

    var playerId = fpIn[0].player_id.filter((data, index) => {
        return (
            fpIn[0].fp_id[index] === fpId
        )
    });
    return playerId;
} // end getPlayerId()

// getPlayerId1 function
function getPlayerId1(name){

    var name_split = name.split(" ")
    var playerId = playersIn[0].player_id.filter((data, index) => {
        return (
            playersIn[0].first_name[index] === name_split[0] &&
            playersIn[0].last_name[index] === name_split[1]
        )
    });
    return playerId[0];
} // end getPlayerId1()

// getFranchiseId function
function getFranchiseId(playerId){

    var franchiseId = fpIn[0].fp_id.filter((data, index) => {
        return (
            fpIn[0].player_id[index] === playerId 
        )
    });
    return franchiseId[0];
} // end getFranchiseId()

// getPlayerName function
function getPlayerName(playerId){

    var playerNameFirst = playersIn[0].first_name.filter((data, index) => {
        return (
            playersIn[0].player_id[index] == playerId
        )
    });

    var playerNameLast = playersIn[0].last_name.filter((data, index) => {
        return (
            playersIn[0].player_id[index] == playerId
        )
    });
    
    return (playerNameFirst + " " + playerNameLast);
} // end getPlayerName()

// from html 
function changeTeam(team_name) {
    removePlots("team");
    var team_id = getTeamId(team_name);

    if (d3.select('#selModel-T option:checked').text() == "Select Model")
        mt = "ML-LN-T1"
    else
        mt = d3.select('#selModel-T option:checked').text()

    if (d3.select('#selDecade-T option:checked').text() == "Select Decade")
        dec = 2010
    else
        dec = d3.select('#selDecade-T option:checked').text()

    console.log("change team name...", team_id, mt, dec);

    buildBarPlot_Team(teamPredictionsIn[0], team_id, dec, mt)
    buildLinePlot_Team(teamPredictionsIn[0], team_id, dec, mt)
    buildHeatPlot_Team(teamPredictionsIn[0], team_id, dec, mt)

    console.log("---completed---");

} // end changeTeamName()

// from html 
function changePlayer(player_name) {
    removePlots("player");
    var player_id = getPlayerId1(player_name);
    var fp_id = parseInt(getFranchiseId(player_id));

    if (d3.select('#selModel-P option:checked').text() == "Select Model")
        mt = "ML-LN-T1"
    else
        mt = d3.select('#selModel-P option:checked').text()

    if (d3.select('#selDecade-P option:checked').text() == "Select Decade")
        dec = 2010
    else
        dec = d3.select('#selDecade-P option:checked').text()

    if (d3.select('#selATB option:checked').text() == "Select Attribute")
        atb = "HR"
    else
        atb = d3.select('#selATB option:checked').property("value")        

    console.log("change player name...", fp_id, mt, dec, atb);

    switch(atb){
        case "HR":
            buildBarPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            break;
        case "R":
            buildBarPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            break;
        case "H":
            buildBarPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            break;
        case "BB":
            buildBarPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            break;
    }
    
    console.log("---completed---");

} // end changePlayer()

// from html 
function changeDecade(dec, viz) {
    removePlots(viz);
    if (viz == 'team') {
        if (d3.select('#selTeam option:checked').text() == "Select Team")
            team_id = "ATL"
        else
            team_id = getTeamId(d3.select('#selTeam option:checked').text());

        if (d3.select('#selModel-T option:checked').text() == "Select Model")
            mt = "ML-LN-T1"
        else
            mt = d3.select('#selModel-T option:checked').text()

        console.log("change team decade...", team_id, mt, dec);

        buildBarPlot_Team(teamPredictionsIn[0], team_id, dec, mt)
        buildLinePlot_Team(teamPredictionsIn[0], team_id, dec, mt)
        buildHeatPlot_Team(teamPredictionsIn[0], team_id, dec, mt)

        console.log("---completed---");
    }
    if (viz == 'player') {
        if (d3.select('#selPlayer option:checked').text() == "Select Player")
            fp_id = 660799435
        else
            fp_id = getFranchiseId(getPlayerId1(d3.select('#selPlayer option:checked').text()));

        if (d3.select('#selModel-P option:checked').text() == "Select Model")
            mt = "ML-LN-T1"
        else
            mt = d3.select('#selModel-P option:checked').text()

        if (d3.select('#selATB option:checked').text() == "Select Attribute")
            atb = "HR"
        else
            atb = d3.select('#selATB option:checked').property("value")        
        
        console.log("change player decade...", fp_id, mt, dec, atb);

        switch(atb){
            case "HR":
                buildBarPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                break;
            case "R":
                buildBarPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                break;
            case "H":
                buildBarPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                break;
            case "BB":
                buildBarPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                break;
        }

        console.log("---completed---");

    }
} // end changeDecade()

// from html 
function changeModel(mt, viz) {
    removePlots(viz);
    if (viz == 'team') {
        if (d3.select('#selTeam option:checked').text() == "Select Team")
            team_id = "ATL"
        else
            team_id = getTeamId(d3.select('#selTeam option:checked').text());

        if (d3.select('#selDecade-T option:checked').text() == "Select Decade")
            dec = 2010
        else
            dec = d3.select('#selDecade-T option:checked').text()

        console.log("change team model...", team_id, mt, dec);

        buildBarPlot_Team(teamPredictionsIn[0], team_id, dec, mt)
        buildLinePlot_Team(teamPredictionsIn[0], team_id, dec, mt)
        buildHeatPlot_Team(teamPredictionsIn[0], team_id, dec, mt)

        console.log("---completed---");
    }
    if (viz == 'player') {
        if (d3.select('#selPlayer option:checked').text() == "Select Player")
            fp_id = 660799435
        else
            fp_id = getFranchiseId(getPlayerId1(d3.select('#selPlayer option:checked').text()));

        if (d3.select('#selModel-P option:checked').text() == "Select Model")
            mt = "ML-LN-T1"
        else
            mt = d3.select('#selModel-P option:checked').text()

        if (d3.select('#selDecade-P option:checked').text() == "Select Decade")
            dec = 2010
        else
            dec = d3.select('#selDecade-P option:checked').text()

        if (d3.select('#selATB option:checked').text() == "Select Attribute")
            atb = "HR"
        else
            atb = d3.select('#selATB option:checked').property("value")        
    
        console.log("change player model...", fp_id, mt, dec, atb);
        
        switch(atb){
            case "HR":
                buildBarPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
                break;
            case "R":
                buildBarPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
                break;
            case "H":
                buildBarPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
                break;
            case "BB":
                buildBarPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                buildLinePlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                buildHeatPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
                break;
        }

        console.log("---completed---");

    }
} // end changeDecade()

// from html 
function changeATB(atb) {
    removePlots("player");

    if (d3.select('#selPlayer option:checked').text() == "Select Player")
        fp_id = 660799435
    else
        fp_id = getFranchiseId(getPlayerId1(d3.select('#selPlayer option:checked').text()));

    if (d3.select('#selModel-P option:checked').text() == "Select Model")
        mt = "ML-LN-T1"
    else
        mt = d3.select('#selModel-P option:checked').text()

    if (d3.select('#selDecade-P option:checked').text() == "Select Decade")
        dec = 2010
    else
        dec = d3.select('#selDecade-P option:checked').text()
    
    console.log("change player attribute...", fp_id, mt, dec, atb);

    switch(atb){
        case "HR":
            buildBarPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_HR[0], fp_id, dec, mt, atb);
            break;
        case "R":
            buildBarPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_R[0], fp_id, dec, mt, atb);
            break;
        case "H":
            buildBarPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_H[0], fp_id, dec, mt, atb);
            break;
        case "BB":
            buildBarPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            buildLinePlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            buildHeatPlot_Player(PPI_BB[0], fp_id, dec, mt, atb);
            break;
    }

    console.log("---completed---");

} // end changeATB()

// clear plot visualization upon user selected inputs
function removePlots(viz) {
    if (viz == 'team') {
        d3.select("teamPredict1").selectAll("div").remove();
        d3.select("teamPredict2").selectAll("div").remove();
        d3.select("teamPredict3").selectAll("div").remove();
    }
    if (viz == 'player') {
        d3.select("playerPredict1").selectAll("div").remove();
        d3.select("playerPredict2").selectAll("div").remove();
        d3.select("playerPredict3").selectAll("div").remove();
    }
} //end removePlots(()

// function buildBarPlot_Team
function buildBarPlot_Team(predictData, teamId, decade, modelType) {

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
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

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
        title: "Baseball Predictions | " + teamId + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType,
        xaxis: {
            title: "Year",
            tickfont: {
                size: 14,
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
            x: 5.0,
            y: 5.0,
            bgcolor: "rgba(255, 255, 255, 0)",
            bordercolor: "rgba(255, 255, 255, 0)",
        },
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1,
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot("teamPredict1", data, layout);

} //end buildBarPlot_Team function

// function buildLinePlot_Team
function buildLinePlot_Team(predictData, teamId, decade, modelType) {
    
    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var actualvalues = predictData.actual.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var actualValuesMinusModelValues = actualvalues.map((data, index) => {
        return Math.abs(data - modelvalues[index]);
    });

    var trace1 = {
        type: "scatter",
        x: years,
        y: actualValuesMinusModelValues,
        mode: "lines",
        name: "DeltaActual",
        line: {
            color: "rgb(247, 175, 7)",
            width: 3,
        },
    };

    var data = [trace1];

    var layout = {
        title: "Accuracy in Predictions",
        //title: "Baseball Predictions | " + teamId + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType,
        xaxis: {
            title: "Year",
            showgrid: false,
            zeroline: false,
        },
        yaxis: {
            title: "Win Percentage Difference",
            showline: false,
        },
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot("teamPredict2", data, layout);
} //end buildLinePlot_Team function

// function buildHeatPlot_Team
function buildHeatPlot_Team(predictData, teamId, decade, modelType) {   

    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var models = predictData.modelType.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var actualvalues = predictData.actual.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.team_id[index] === teamId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    //test = parseInt(modelvalues.length / 3)
    //var modelTest = []
    //for (var i = 0; i < test; i++) {
    //    modelTest.push("Ml-T1");
    //}
    //for (var i = 0; i < test; i++) {
    //    modelTest.push("Ml-T2");
    //}
    //for (var i = 0; i < test+1; i++) {
    //    modelTest.push("Ml-T3");
    //}

    var actualValuesMinusModelValues = actualvalues.map((data, index) => {
        return Math.abs(data - modelvalues[index]);
    });

    var data = [
        {
          z: actualValuesMinusModelValues,
          x: years,
          y: models,
          colorscale: 'Hot',
          type: 'heatmap',
          hoverongaps: false
        }
    ];
    
    var layout = {
        title: "Model Type Heatmap",
        //title: "Baseball Predictions | " + teamId + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType,
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot('teamPredict3', data, layout);
} //end buildHeatPlot_Team function

///////////////////////////////////////////////////////////////

// function buildBarPlot_Player
function buildBarPlot_Player(predictData, fpId, decade, modelType, ATB) {

    var textATB = "";
    if (ATB == "HR")
        textATB = "Home Runs (HR)"
    else if (ATB == "R")
        textATB = "Runs Score (R)"
    else if (ATB == "H")
        textATB = "Base Hits (H)"
    else if (ATB == "BB")
        textATB = "Walks (BB)"
    else
        textATB = "Error"

    predictData.actual = predictData.actual.map((data) => {
        return data * 100;
    });

    predictData.model = predictData.model.map((data) => {
        return data * 100;
    });

    var playerName = getPlayerName(getPlayerId(fpId));

    var actualvalues = predictData.actual.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });

    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

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
        title: "Baseball Predictions | " + playerName + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType + " | " + textATB,
        xaxis: {
            title: "Year",
            tickfont: {
                size: 14,
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
            x: 5.0,
            y: 5.0,
            bgcolor: "rgba(255, 255, 255, 0)",
            bordercolor: "rgba(255, 255, 255, 0)",
        },
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1,
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot("playerPredict1", data, layout);

} //end buildBarPlot_Player function

// function buildLinePlot_Player
function buildLinePlot_Player(predictData, fpId, decade, modelType, ATB) {
    
    var textATB = "";
    if (ATB == "HR")
        textATB = "Home Runs (HR)"
    else if (ATB == "R")
        textATB = "Runs Score (R)"
    else if (ATB == "H")
        textATB = "Base Hits (H)"
    else if (ATB == "BB")
        textATB = "Walks (BB)"
    else
        textATB = "Error"

    var playerName = getPlayerName(getPlayerId(fpId));

    var actualvalues = predictData.actual.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
        );
    });
    
    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
            );
    });
    
    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var actualValuesMinusModelValues = actualvalues.map((data, index) => {
        return Math.abs(data - modelvalues[index]);
    });

    var trace1 = {
        type: "scatter",
        x: years,
        y: actualValuesMinusModelValues,
        mode: "lines",
        name: "DeltaActual",
        line: {
            color: "rgb(247, 175, 7)",
            width: 3,
        },
    };

    var data = [trace1];

    var layout = {
        title: "Accuracy in Predictions",
        //title: "Accuracy in Predictions | " + playerName + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType + " | " + textATB,
        xaxis: {
            title: "Year",
            showgrid: false,
            zeroline: false,
        },
        yaxis: {
            title: "Win Percentage Difference",
            showline: false,
        },
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot("playerPredict2", data, layout);
} //end buildLinePlot_Player function

// function buildHeatPlot_Player
function buildHeatPlot_Player(predictData, fpId, decade, modelType, ATB) {   

    var textATB = "";
    if (ATB == "HR")
        textATB = "Home Runs (HR)"
    else if (ATB == "R")
        textATB = "Runs Score (R)"
    else if (ATB == "H")
        textATB = "Base Hits (H)"
    else if (ATB == "BB")
        textATB = "Walks (BB)"
    else
        textATB = "Error"

    var playerName = getPlayerName(getPlayerId(fpId));

    var models = predictData.modelType.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var actualvalues = predictData.actual.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
            );
    });
    
    var modelvalues = predictData.model.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
            );
    });
    
    var years = predictData.year_id.filter((data, index) => {
        return (
            predictData.fp_id[index] === fpId &&
            predictData.year_id[index] >= decade &&
            predictData.year_id[index] < parseInt(decade) + 10
        );
    });

    var actualValuesMinusModelValues = actualvalues.map((data, index) => {
        return Math.abs(data - modelvalues[index]);
    });

    var data = [
        {
          z: actualValuesMinusModelValues,
          x: years,
          y: models,
          colorscale: 'Hot',
          type: 'heatmap',
          hoverongaps: false
        }
    ];
    
    var layout = {
        title: "Model Type Heatmap",
        //title: "Model Type Heatmap | " + playerName + " | " + decade + "-" + (parseInt(decade) + 10) + " | " + modelType + " | " + textATB,
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot('playerPredict3', data, layout);
} //end buildHeatPlot_Player function


///////////////////////////////////////////////////////////////
// END FUNCTIONS DEFINITIONS ..                              //
///////////////////////////////////////////////////////////////