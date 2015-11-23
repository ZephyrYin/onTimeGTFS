// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//    response.success("Hello world!");
//});Sp

 
Parse.Cloud.define("testQuery", function(request, response){
    var routes = Parse.Object.extend("stop_times");
    var query = new Parse.Query(routes);
    query.equalTo("trip_id", request.params.TRIP_ID);
    query.forEach()
    query.find({
        success: function(results) {
            response.success(results);
        },
        error: function(error) {
            response.error('some error happens');
        }
    });
});

Parse.Cloud.define("generateStopGraph", function(request, response){
    var routes = Parse.Object.extend("stops");
    var get_records_cnt = 0;
    var limit_param = 100;
    var query = new Parse.Query(routes);
    query.limit(limit_param);

    //for(var i=0;i<2;i++){

        query.skip(200);
        query.find({
            success: function(results){
                get_records_cnt = get_records_cnt + results.length;
                //console.log(get_records_cnt);
                response.success(results.length);
            },
            error: function(err){
                response.error('some err happens');
            }
        });
    //}
    //response.success(get_records_cnt);
});
 
 
Parse.Cloud.define("generateUserData1", function(request, response){
    var userNumber = 9;
    var UserData = Parse.Object.extend("userDataNew");
 
 	//{“METSGO102_156494”， “METSGO102_156493”, "METSGO102_156492", "METSGO102_156491", "METSGO102_156490", "METSGO102_156489", "METSGO102_156488",
 	//"METSGO102_156487", "METSGO102_156486", "METSGO102_156485", "METSGO102_156484", "METSGO102_156483", "METSGO102_156482", "METSGO102_156481", 
 	//"METSGO102_156480", "METSGO102_156479", "METSGO102_156478", "METSGO102_156428"}
    Parse.Cloud.run('testQuery', { TRIP_ID: "METSGO102_156426" }, {
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

Parse.Cloud.afterSave("userData", function(request){                      // update stream after save a record in user data
    Parse.Cloud.run("setUserToTrip", { STOP_ID: request.object.get("stopID"), USER_ID: request.object.get("userID")}, {
        success: function(results) {
            response.success(results);
        },
        error: function(error) {
            response.error(error);
        }
    });
});

function str_to_min(time){             // string to min
    var tmp = time.split(":");
    return parseInt(tmp[0])*60+parseInt(tmp[1]);
}

function min_to_date(time){
    var date = new Date();
    var t = Math.round(time);
    date.setHours(t/60);
    date.setMinutes(t%60);
    return date;
}

Parse.Cloud.define("setUserToTrip", function(request, response){
    var StopTimes = Parse.Object.extend("stop_times");
    var query = new Parse.Query(StopTimes);

    query.equalTo("stop_id", request.params.STOP_ID);
    var time = request.params.DEPARTURE_TIME;
    query.lessThanOrEqualTo("departure_time", time.toLocaleTimeString());
    time.setMinutes(time.getMinutes()-20);                                      // trips 20 min earlier
    query.greaterThanOrEqualTo("departure_time", time.toLocaleTimeString());

    query.find().then(function(results){
        for(var i = 0; i< results.length; i++){
            console.log(request.params.STOP_ID);
            Parse.Cloud.run("updateStream", {TRIP_ID: results[i].get("trip_id"), USER_ID: request.params.USER_ID, STOP_ID: request.params.STOP_ID});
        }
        response.success(results);
    });
});

Parse.Cloud.define("updateStream", function(request, response){
    var Stream = Parse.Object.extend("stream");

    var query = new Parse.Query(Stream);
    query.equalTo("trip_id", request.params.TRIP_ID);
    query.equalTo("userID", request.params.USER_ID);

    query.find({
        success: function(results) {
            if(results.length==0){                              // no record
                var stream = new Stream()
                stream.set("trip_id", request.params.TRIP_ID);
                stream.set("userID", request.params.USER_ID);
                var stops = new Array();
                stream.set("stops", stops);
                stream.save(null, {
                    success : function(stream){
                        response.success(stream);
                    },
                    error : function(err){
                        response.error(err);
                    }
                });
            }else if(results.length == 1){                                              // update record
                var tmp_stops = results[0].get("stops");
                var current_stop = request.params.STOP_ID.toString();

                var index;
                do{
                    index = tmp_stops.indexOf(current_stop);
                    if(index > -1){                                                     // found duplicate
                        tmp_stops.splice(index, 1);                                      // delete
                    }
                }while(index > -1);

                tmp_stops.push(current_stop);

                results[0].set("stops", tmp_stops);
                results[0].save(null, {
                    success : function(stream){
                        response.success(stream);
                    },
                    error : function(err){
                        response.error(err);
                    }
                });
            }else{
                response.error("fatal error, shouldn't have two same records");
            }
        },
        error: function(error) {
            response.error("Error: " + error.code + " " + error.message);
        }
    });
});

//Parse.Cloud.define("cleanStream", function(request, response){      // clean stream table
//
//});

Parse.Cloud.define("main", function(request, response){
    var dt = new Date();
    dt.setHours(23);
    dt.setMinutes(40);
    dt.setSeconds(0);
    Parse.Cloud.run("setUserToTrip", { USER_ID: "Viola", STOP_ID: "28", DEPARTURE_TIME: dt, TRIP_ID: "METSGO102_156497"}, {
        success: function(results) {
            response.success(results);
        },
        error: function(error) {
            response.error(error);
        }
    });


    //var Stream = Parse.Object.extend("stream");
    //var query = new Parse.Query(Stream);
    //query.equalTo("objectId", "C4zfemb9hi");
    //query.find({
    //    success: function(results) {
    //        for (var i = 0; i < results.length; i++) {
    //            var object = results[i];
    //            var stops = object.get("stops");
    //            stops.push("c");
    //            response.success(stops);
    //        }
    //    },
    //    error: function(error) {
    //        response.error(error);
    //    }
    //});

    //var Stream = Parse.Object.extend("stream");
    //var stream = new Stream()
    //stream.set("trip_id", "456");
    //stream.set("userID", "jack");
    //stream.save(null, {
    //    success : function(stream){
    //        response.success(stream);
    //    },
    //    error : function(err){
    //        response.error(err);
    //    }
    //});
});

Parse.Cloud.define("kmeans", function(request, response){
    Parse.Cloud.run("getTripDetail", { TRIP_ID: "METSGO102_156426" }, {
        success: function(results) {
            var stop_IDs = results[0];
            var standard_arrival_times = results[1];
            var standard_departure_times = results[2];
            Parse.Cloud.run("getUserDetail", { STOP_ID: "20" }, {
                success: function(results) {
                    var departure_times = results[1];

                    var index = stop_IDs.indexOf("20");
                    var standard_departure_time = standard_departure_times[index];
                    var s_d_t = str_to_min(standard_departure_time);

                    var kMeans = require("cloud/kMeans.js");

                    var d_ts = [];
                    departure_times.forEach(function(entry) {           // initialize input data for kmeans, 2-d list.
                        d_ts.push([entry]);
                    });

                    var km = new kMeans({
                        K: 2,                                           // number of centroid
                        //initialize: function(X, K, m, n){               //initialize: initial_centroids
                        //    return [[s_d_t]];
                        //}
                    });

                    km.cluster(d_ts);                                   // run k-means
                    while (km.step()) {
                        km.findClosestCentroids();
                        km.moveCentroids();

                        if(km.hasConverged()) break;
                    }

                    departure_time_centroid = [];
                    km.centroids.forEach(function(entry){
                        departure_time_centroid.push(min_to_date(entry[0]));
                    });
                   // console.log(km.centroids, km.clusters);

                    response.success(departure_time_centroid);
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
