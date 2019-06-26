//firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAH-IyPO5dmjnlRnLRK1vp9zMxwZe7Ecig",
    authDomain: "trainschedule-9e9b2.firebaseapp.com",
    databaseURL: "https://trainschedule-9e9b2.firebaseio.com",
    projectId: "trainschedule-9e9b2",
    storageBucket: "",
    messagingSenderId: "988071982552",
    appId: "1:988071982552:web:4be558d1a24516bd"
};
//initialize firebase
firebase.initializeApp(firebaseConfig);
//create a var which initialize the database
var database = firebase.database();
//capture button click
$(document).ready(function() {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val().trim();
        Frequency = $("#frequencyInput").val().trim();
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(Frequency);

        //push data to firebase database
        // trainName length > 0 AND destination length > 0 AND firstTrainTime valid AND Frequency
        if(trainName.length > 0 && destination.length > 0 && moment(firstTrainTime, "HH:mm").isValid() && !isNaN(Frequency) && parseInt(Frequency) >= 1){
            //push the data into firebase
            console.log("date is pushed");
            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime:firstTrainTime,
                Frequency: Frequency
            });
        } else {
            alert("error!");
        }
    })

    database.ref().on("child_added",function(childsnapshot){
        // childsnapshot.val()
        let trainName = childsnapshot.val().trainName;
        let destination = childsnapshot.val().destination;
        let firstTrainTime = childsnapshot.val().firstTrainTime;
        let Frequency = childsnapshot.val().Frequency;
        // append the child to the table
        let schedule = $("<tr>");
        let columns = [$("<th scope='col'>").text(trainName),
                       $("<th scope='col'>").text(destination),
                       $("<th scope='col'>").text(Frequency)];
        for (i = 0; i < columns.length; i++){
            schedule.append(columns[i]);
        }
        $("#trainList").append(schedule);
    }, function(errorObject) {
        console.log("something happened");
    })
});


