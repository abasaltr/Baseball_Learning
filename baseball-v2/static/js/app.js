// PROJECT IV CODE HERE!
console.log('This is the Baseball-v2 dashboard js file');

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
var PPI = [];
var PPYRS = [];
var PPMTS = [];
var PPID = [];

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

var upp = "/api/player-predictions/660799435";
var upp_yrs = "/api/player-predictions-years";
var upp_mts = "/api/player-predictions-models";
var upp_id = "/api/player-predictions-id";


var urls = [url_teams, url_team_predict, url_fp, url_players, 
        upp, upp_yrs, upp_mts, upp_id, 
        url_salaries]

var promises = [];
urls.forEach(function (url) { promises.push(d3.json(url)) });
console.log(promises);
var promise = Promise.all(promises).then(data => init(data));
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
function addPlayerPredict(response) {
    var playerPredict = response;
    return playerPredict
}//end addPlayerPredict() function

// function addPlayerPredictHR
function addPlayerPredictYRS(response) {
    var playerPredictYRS = response;
    return playerPredictYRS
}//end addPlayerPredictYRS() function

// function addPlayerPredictHR
function addPlayerPredictMTS(response) {
    var playerPredictMTS = response;
    return playerPredictMTS
}//end addPlayerPredictMTS() function

// function addPlayerPredictHR
function addPlayerPredictID(response) {
    var playerPredictID = response;
    initDropListPlayer(playerPredictID[0],PPYRS[0], PPMTS[0]);
    return playerPredictID
}//end addPlayerPredictID() function

// function init
function init(data) {

    // initialize the data for the elements
    teamsIn = addTeams(data[0]);
    teamPredictionsIn = addTeamPredict(data[1]);    
    fpIn = addFP(data[2]);
    playersIn = addPlayers(data[3]);

    PPI = addPlayerPredict(data[4]);
    PPYRS = addPlayerPredictYRS(data[5]);
    PPMTS = addPlayerPredictMTS(data[6]); 
    PPID = addPlayerPredictID(data[7]); 

    salariesIn = addSalaries(data[8]);

    //franchisesIn = addFranchises(data[0]);
    //teamStatsIn = addTeamStats(data[0]);
    //pitchingIn = addPitching(data[0]);
    //battingIn = addBatting(data[0]);

    // default team - Atlanta Braves, ATL
    buildBarPlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")
    buildLinePlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")
    buildHeatPlot_Team(teamPredictionsIn[0], "ATL", 2010, "ML-LN-T1")

    // default player - Anthony Vincent Rizzo, rizzoan01, 660799435
    displayDemo_Player(660799435)

    buildBarPlot_Player(PPI[0], 660799435, 2010, "ML-LN-T1", "HR")
    buildLinePlot_Player(PPI[0], 660799435, 2010, "ML-LN-T1", "HR")
    buildHeatPlot_Player(PPI[0], 660799435, 2010, "ML-LN-T1", "HR")

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
function initDropListPlayer(data,yrs,mts) {

    //var fp_id = [...new Set(Object.values(data['fp_id']))];

    //var player_id = [];
    //fp_id.length
    //for (var i = 0; i < fp_id.length; i++) {
    //    player_id.push(getPlayerId(fp_id[i])[0]);
    //}
    
    //var pid_uni = player_id.filter((e, i, a) => a.indexOf(e) === i).sort();
    var pid_uni = [...new Set(Object.values(data['player_id']))];
    
    var player_name = [];
    for (var i = 0; i < pid_uni.length; i++) {
        player_name.push(getPlayerName(pid_uni[i]));
    }

    var years = [...new Set(Object.values(yrs['year_id']))];
   
    var decades = [];
    for (var i = 0; i < years.length; i++) {
        var decade = parseInt(Math.floor(years[i] / 10) * 10);
        decades.push(decade);
    }

    var model = [...new Set(Object.values(mts['model_type']))];

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

// getTeamId1 function
function getTeamId1(fpId){

    var teamId = fpIn[0].team_id.filter((data, index) => {
        return (
            fpIn[0].fp_id[index] === fpId
        )
    });
    return teamId;
} // end getTeamId1()

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

// getPlayerDemo function
function getPlayerDemo(fpId, playerId){

    var playerDemo = [];

    var playerBirth = playersIn[0].birth_year.filter((data, index) => {
        return (
            playersIn[0].player_id[index] == playerId
        )
    });

    var playerDebut = playersIn[0].debut_date.filter((data, index) => {
        return (
            playersIn[0].player_id[index] == playerId
        )
    });

    playerDebut = (playerDebut.toString()).split(" ");
    playerDebut = playerDebut[2] + " " + playerDebut[1] + ", " + playerDebut[3]; 

    var playerFinal = playersIn[0].final_date.filter((data, index) => {
        return (
            playersIn[0].player_id[index] == playerId
        )
    });

    playerFinal = (playerFinal.toString()).split(" ");
    playerFinal = playerFinal[2] + " " + playerFinal[1] + ", " + playerFinal[3]; 

    var playerSalary = salariesIn[0].salary.filter((data, index) => {
        return (
            salariesIn[0].fp_id[index] == fpId
        )
    });
    
    playerDemo.push(playerBirth[0],playerDebut,playerFinal,playerSalary[0])

    return playerDemo;
} // end getPlayerDemo()

// function getActual_ATB
function getActual_ATB(predictData, fpId, decade, modelType, ATB, plot){
    if (plot == "heat"){
        switch(ATB){
            case "HR":
                predictData.actual_hr = predictData.actual_hr.map((data) => {
                    return data * 1;
                });
                var actualvalues = predictData.actual_hr.filter((data, index) => {
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
                break;
            case "R":
                predictData.actual_r = predictData.actual_r.map((data) => {
                    return data * 1;
                });
                var actualvalues = predictData.actual_r.filter((data, index) => {
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
                break;
            case "H":
                predictData.actual_h = predictData.actual_h.map((data) => {
                    return data * 1;
                });
                var actualvalues = predictData.actual_h.filter((data, index) => {
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
                break;
            case "BB":
                predictData.actual_bb = predictData.actual_bb.map((data) => {
                    return data * 1;
                });
                var actualvalues = predictData.actual_bb.filter((data, index) => {
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
                break;
            }
    }
    else{
        switch(ATB){
        case "HR":
            predictData.actual_hr = predictData.actual_hr.map((data) => {
                return data * 1;
            });
            var actualvalues = predictData.actual_hr.filter((data, index) => {
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
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "R":
            predictData.actual_r = predictData.actual_r.map((data) => {
                return data * 1;
            });
            var actualvalues = predictData.actual_r.filter((data, index) => {
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
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "H":
            predictData.actual_h = predictData.actual_h.map((data) => {
                return data * 1;
            });
            var actualvalues = predictData.actual_h.filter((data, index) => {
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
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "BB":
            predictData.actual_bb = predictData.actual_bb.map((data) => {
                return data * 1;
            });
            var actualvalues = predictData.actual_bb.filter((data, index) => {
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
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        }
    }
    return [actualvalues,years];
} // end getActual_ATB function

// function getActual_ATB
function getModel_ATB(predictData, fpId, decade, modelType, ATB, plot){
    if (plot == "heat"){
        switch(ATB){
        case "HR":
            predictData.model_hr = predictData.model_hr.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_hr.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10
                );
            });
            break;
        case "R":
            predictData.model_r = predictData.model_r.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_r.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10
                );
            });
            break;
        case "H":
            predictData.model_h = predictData.model_h.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_h.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10
                );
            });
            break;
        case "BB":
            predictData.model_bb = predictData.model_bb.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_bb.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10
                );
            });
            break;
        }
    }
    else {
        switch(ATB){
        case "HR":
            predictData.model_hr = predictData.model_hr.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_hr.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "R":
            predictData.model_r = predictData.model_r.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_r.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "H":
            predictData.model_h = predictData.model_h.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_h.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        case "BB":
            predictData.model_bb = predictData.model_bb.map((data) => {
                return data * 1;
            });
            var modelvalues = predictData.model_bb.filter((data, index) => {
                return (
                    predictData.fp_id[index] === fpId &&
                    predictData.year_id[index] >= decade &&
                    predictData.year_id[index] < parseInt(decade) + 10 &&
                    predictData.modelType[index] === modelType
                );
            });
            break;
        }
    }
    return modelvalues;
} // end getModel_ATB function

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

// function initPlayer called from changePlayer()
function initPlayer(data){
    PPI = addPlayerPredict(data[0]);

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

    fp_id = PPI[0].fp_id[0];

    console.log("change player name...", fp_id, mt, dec, atb);

    displayDemo_Player(fp_id);
 
    buildBarPlot_Player(PPI[0], fp_id, dec, mt, atb);
    buildLinePlot_Player(PPI[0], fp_id, dec, mt, atb);
    buildHeatPlot_Player(PPI[0], fp_id, dec, mt, atb);
     
    console.log("---completed---");

} //end initPlayer()

// from html 
function changePlayer(player_name) {
    removePlots("player");
    var player_id = getPlayerId1(player_name);
    var fp_id = parseInt(getFranchiseId(player_id));

    upp = "/api/player-predictions/" + fp_id
    urls = [upp]

    promises = [];    
    urls.forEach(function (url) { promises.push(d3.json(url)) });
    console.log(promises);
    promise = Promise.all(promises).then(data => initPlayer(data));

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

        displayDemo_Player(fp_id);

        buildBarPlot_Player(PPI[0], fp_id, dec, mt, atb);
        buildLinePlot_Player(PPI[0], fp_id, dec, mt, atb);
        buildHeatPlot_Player(PPI[0], fp_id, dec, mt, atb);
       
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
        
        displayDemo_Player(fp_id);
       
        buildBarPlot_Player(PPI[0], fp_id, dec, mt, atb);
        buildLinePlot_Player(PPI[0], fp_id, dec, mt, atb);
        buildHeatPlot_Player(PPI[0], fp_id, dec, mt, atb);

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

    displayDemo_Player(fp_id);

    buildBarPlot_Player(PPI[0], fp_id, dec, mt, atb);
    buildLinePlot_Player(PPI[0], fp_id, dec, mt, atb);
    buildHeatPlot_Player(PPI[0], fp_id, dec, mt, atb);

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
        d3.select(".panel-body").selectAll("div").remove();
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
            predictData.year_id[index] < parseInt(decade) + 10 &&
            predictData.modelType[index] === modelType
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

    var playerName = getPlayerName(getPlayerId(fpId));

    var actual_ATB = getActual_ATB(predictData, fpId, decade, modelType, ATB, "bar");

    var actualvalues = actual_ATB[0];
    var years = actual_ATB[1];

    var modelvalues = getModel_ATB(predictData, fpId, decade, modelType, ATB, "bar");

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

    var actual_ATB = getActual_ATB(predictData, fpId, decade, modelType, ATB, "line");

    var actualvalues = actual_ATB[0];
    var years = actual_ATB[1];

    var modelvalues = getModel_ATB(predictData, fpId, decade, modelType, ATB, "line");
    
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
            tickvals: years,
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

    var actual_ATB = getActual_ATB(predictData, fpId, decade, modelType, ATB, "heat");

    var actualvalues = actual_ATB[0];
    var years = actual_ATB[1];

    var modelvalues = getModel_ATB(predictData, fpId, decade, modelType, ATB, "heat");

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
        xaxis: {
            tickvals: years,
        },
        paper_bgcolor: "rgb(235, 235, 235)",
        plot_bgcolor: "rgb(235, 235, 235)"
    };

    Plotly.newPlot('playerPredict3', data, layout);
} //end buildHeatPlot_Player function

function displayDemo_Player(fpId) {

    var pid = getPlayerId(fpId);
    var tid = getTeamId1(fpId);
    var teamName = getTeamName(tid);
    var playerName = getPlayerName(pid);
    var playerDemo = getPlayerDemo(fpId, pid);
    playerDemo.push(playerName,teamName);

    var playerDict = {
        id : fpId,
        name : playerDemo[4],
        team : playerDemo[5],
        birth : playerDemo[0],
        debut : playerDemo[1],
        final : playerDemo[2],
        salary : numeral(parseInt(playerDemo[3])).format('$0,0')
    };

    var playerDemo2 = [];
    playerDemo2.push(playerDict);

    d3.select(".panel-body")
        .selectAll("div")
        .data(playerDemo2)
        .enter()
        .append("div")
        .classed("panel-demo", true)
        //.style("font-weight", function (d) { return "bold" })
        .html(function (d) {
            return `<h7>id:</h7><h8> ${d.id}</h8><br>
                <h7>player :</h7><h8> ${d.name}</h8><br>
                <h7>team :</h7><h8> ${d.team}</h8><br>
                <h7>birth year:</h7><h8> ${d.birth}</h8><br>
                <h7>debut game date:</h7><h8> ${d.debut}</h8><br>
                <h7>latest data date:</h7><h8> ${d.final}</h8><br>
                <h7>salary: </h7><h8>${d.salary}</h8><br>`
      });
}

///////////////////////////////////////////////////////////////
// END FUNCTIONS DEFINITIONS ..                              //
///////////////////////////////////////////////////////////////