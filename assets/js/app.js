
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCWQpkUJhjAK5ZussMozua81jYWJ2DfuRs",
    authDomain: "trainscheduler-56ef9.firebaseapp.com",
    databaseURL: "https://trainscheduler-56ef9.firebaseio.com",
    projectId: "trainscheduler-56ef9",
    storageBucket: "trainscheduler-56ef9.appspot.com",
    messagingSenderId: "192774209474"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(){
  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var first = $("#first-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    first: first,
    frequency: frequency


});

});

database.ref().on("child_added", function(snapshot) {

  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
/*  console.log(sv);
  console.log('<tr>');
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.first);
  console.log(sv.frequency);.subtract(1, "years")*/

  var startTime = moment(sv.first, "hh:mm").subtract(1, "years").format("hh:mm");
  console.log("FIRST TRAIN AT: " + startTime);
 

 var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(startTime, 'hh:mm'), 'minutes');
    console.log("TIME DIFFERENCE: " + timeDifference);

    var tRemainder = timeDifference % sv.frequency;
    console.log("REMAINDER: " + tRemainder);

    var minutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    var nextTrain = currentTime.add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





var newRow = $('<tr>');

  var newCell = $('<td>');
  newCell.text(sv.name);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(sv.destination);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(sv.frequency);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(moment(nextTrain).format("hh:mm"));
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(minutesTillTrain);
  newRow.append(newCell);



//this needs to be "next"
  /*  var newCell = $('<td>');
  newCell.text(months);
  newRow.append(newCell);*/

//this needs to be "minutes away"
  /*var newCell = $('<td>');
  newCell.text(months * sv.rate);
  newRow.append(newCell);*/

  $('tbody').append(newRow);
});