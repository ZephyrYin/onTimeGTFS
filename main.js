// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//    response.success("Hello world!");
//});Sp

 
Parse.Cloud.define("testQuery", function(request, response){
    var routes = Parse.Object.extend("stop_times");
    var query = new Parse.Query(routes);
    query.equalTo("trip_id", request.params.TRIP_ID);
    query.find({
        success: function(results) {
            response.success(results);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});
 
 
Parse.Cloud.define("generateUserData1", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156494" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData2", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156493" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData3", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156492" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData4", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156491" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData5", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156490" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData6", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156489" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData7", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156488" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData8", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156487" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateUserData9", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156486" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});


Parse.Cloud.define("generateUserData10", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156485" }, {
        success: function(results) {
            var cnt=0;
            for(var u=1;u<=userNumber;u++){
                var userID='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
 
                var testData=[];
 
                var arrivalTimeArray = [];
                var departureTimeArray = [];
                var stopID = []
                var delayTimeAccumulate = 0;
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    stopID.push(object.get("stop_id"));
                    var delayArrive = 0;
                    var delayDeparture = Math.floor((Math.random() * 10));
                    var probArriveDelay = Math.random();
                    var probDepartureDelay = Math.random();
                    if(probArriveDelay <= 0.4){
                        delayArrive = 0
                    }
                    else{
                        delayArrive = Math.floor((Math.random() * 10));
                    }
 
                    if(probDepartureDelay <= 0.8){
                        delayDeparture = 0
                    }
                    else{
                        delayDeparture = Math.floor((Math.random() * 10));
                    }
                    if(i == 0)
                        delayArrive = 0;
                    delayDeparture += delayArrive;
                    var curArrivalTime = object.get("arrival_time");
                    var curDepartureTime = object.get("departure_time");
                    var timeArrivalDate = new Date();
                    var timeDepartureDate = new Date();
                    timeArrivalDate.setHours(parseInt(curArrivalTime.substring(0, 2)), parseInt(curArrivalTime.substring(3, 5)) + delayArrive + delayTimeAccumulate, parseInt(curArrivalTime.substring(6, 8)));
                    timeDepartureDate.setHours(parseInt(curDepartureTime.substring(0, 2)), parseInt(curDepartureTime.substring(3, 5)) + delayDeparture + delayTimeAccumulate, parseInt(curDepartureTime.substring(6, 8)));
                    arrivalTimeArray.push(timeArrivalDate);
                    departureTimeArray.push(timeDepartureDate);
                    delayTimeAccumulate += delayDeparture;
                }
 
                for(var j=0;j<arrivalTimeArray.length;j++){
                    var userData = new UserData();
                    var speed = Math.round(Math.random());
 
                    userData.set("speed", speed);
                    userData.set("userID", userID);
                    userData.set("stopID", stopID[j]);
                    userData.set("timeArrival", arrivalTimeArray[j]);
                    userData.set("timeDeparture", departureTimeArray[j]);
                    testData.push(userData);
                }
 
                Parse.Object.saveAll(testData, {
                    success: function(userData) {
 
                    },
                    error: function(userData, error) {
 
                    }
                });
            }
            response.success(testData.length);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("testKmeans", function(request, response) {
    var kMeans = require("cloud/kMeans.js");

    //var kMeans = require('kMeans.js');
//var data = [[1, 2, 3],[41, 23, 323],[10, 25, 37],[13, 24, 30],[18, 22, 31],[1, 23, 34],[12, 24, 3],[69, 10, 25]];

    var data=[[1],[1],[20],[1],[1],[1],[1],[1],[1],[20],[20]];

    var km = new kMeans({
        K: 4
    });

    //km.cluster(data);
    //while (km.step()) {
    //    km.findClosestCentroids();
    //    km.moveCentroids();
    //
    //    console.log(km.centroids);
    //
    //    if(km.hasConverged()) break;
    //}
    //
    //console.log('Finished in:', km.currentIteration, ' iterations');
    //console.log(km.centroids, km.clusters);

    response.success(km.centroids);
});

Parse.Cloud.define("getTripDetail", function(request, response){
    var routes = Parse.Object.extend("stop_times");
    var query = new Parse.Query(routes);
    query.equalTo("trip_id", request.params.TRIP_ID);
    query.find({
        success: function(results) {
            stop_IDs = [];
            arrivel_times = [];
            departure_times = [];
            for(var i = 0;i < results.length;i++){
                var object = results[i];
                stop_IDs.push(object.get("stop_id"));
                arrivel_times.push(object.get("arrival_time"));
                departure_times.push(object.get("departure_time"));
            }

            response.success([stop_IDs, arrivel_times, departure_times]);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("getUserDetail", function(request, response){
    var users = Parse.Object.extend("userDataNew");
    var query = new Parse.Query(users);
    query.limit(1000);
    query.equalTo("stopID", request.params.STOP_ID);
    query.find({
        success: function(results) {
            arrivel_times = [];
            departure_times = [];
            for(var i = 0;i < results.length;i++){
                var object = results[i];
                var at = object.get("timeArrival");
                arrivel_times.push(at.getHours()*60+at.getMinutes());
                var dt = object.get("timeDeparture")
                departure_times.push(dt.getHours()*60+dt.getMinutes());
            }

            response.success([arrivel_times, departure_times]);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

function date_to_min(time){
    var tmp = time.split(":");
    return parseInt(tmp[0])*60+parseInt(tmp[1]);
}

function initial_centroids(centroids){
    return centroids;
}

Parse.Cloud.define("kmeans", function(request, response){
    Parse.Cloud.run("getTripDetail", { TRIP_ID: "METSGO102_156428" }, {
        success: function(results) {
            var stop_IDs = results[0];
            var standard_arrival_times = results[1];
            var standard_departure_times = results[2];
            Parse.Cloud.run("getUserDetail", { STOP_ID: "20" }, {
                success: function(results) {
                    var departure_times = results[1];

                    var index = stop_IDs.indexOf("20");
                    var standard_departure_time = standard_departure_times[index];
                    var s_d_t = date_to_min(standard_departure_time);

                    var kMeans = require("cloud/kMeans.js");

                    var d_ts = [];
                    departure_times.forEach(function(entry) {           // initialize input data for kmeans, 2-d list.
                        d_ts.push([entry]);
                    });

                    var km = new kMeans({
                        K: 1,                                           // number of centroid
                        initialize: function(X, K, m, n){               //initialize: initial_centroids
                            return [[s_d_t]];
                        }
                    });

                    km.cluster(d_ts);                                   // run k-means
                    while (km.step()) {
                        km.findClosestCentroids();
                        km.moveCentroids();

                        if(km.hasConverged()) break;
                    }

                    console.log(km.centroids, km.clusters);

                    response.success(km.centroids);
                },
                error: function(error) {
                    response.error('get user detail error');
                }
            });
            //response.sucåcess(arrival_times.length);
        },
        error: function(error) {
            response.error('get trip detail error');
        }
    });
});


//Schedule Jobs

//Parse.Cloud.job("generateDataJob", function() {
//  Parse.Cloud.useMasterKey();
//  Parse.Cloud.run("generateUserData1", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData2", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData3", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData4", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData5", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData6", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData7", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData8", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData9", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//  //Parse.Cloud.run("generateUserData10", null, {success:"Schedule successfully!", error: "Schedule fail!"});
//});