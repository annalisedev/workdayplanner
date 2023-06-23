// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeSlotEl = $('#timeslots');

$(document).ready(function () {

  //clear timeslots on page
  
  printCalEvents();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
  // Code to display the current date in the header of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D, YYYY'));
});

var hourNow = dayjs().hour();
var rowEl = $('#rowtime');
var headerEl = $('col-2 col-md-1 hour text-center py-3');

console.log(hourNow);

function printCalEvents() {
  timeSlotEl.empty();
  for(i = 9; i <= 17; i++) {
    if (i < hourNow) {
      console.log("grey")
      rowEl.addClass('past');
    } else if (i = hourNow) {
      console.log("red")
      rowEl.addClass('present');
    } else {
      console.log("green")
      rowEl.addClass('future');
    };
    var timeEl =  $('<div>').text((dayjs().set('hour', i).set('minute', 0)).format("hh:mm A"));
    //headerEl.addClass('col-2 col-md-1 hour text-center py-3');
    headerEl.append(timeEl);
    timeSlotEl.append(rowEl.clone());
    console.log((dayjs().set('hour', i).set('minute', 0)).format("hh:mm A"));
    document.getElementById('rowtime').setAttribute('id','hour-'+i);
  }

  //get events from local storage
  

}
"<div id=\"hour-9\" class=\"row time-block past\">\n        <div class=\"col-2 col-md-1 hour text-center py-3\">9am</div>\n        <textarea class=\"col-8 col-md-10 description\" rows=\"3\"> </textarea>\n        <button class=\"btn saveBtn col-2 col-md-1\" aria-label=\"save\">\n          <i class=\"fas fa-save\" aria-hidden=\"true\"></i>\n        </button>\n      </div>"

