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
var rowNum = 0;

function readSchedulesFromStorage() {
  var schedules = localStorage.getItem('schedules');
  if (schedules) {
    schedules = JSON.parse(schedules);
  } else {
    schedules = [];
  }
  return schedules;
}

function printCalEvents() {
  timeSlotEl.empty();
  var schedules = readSchedulesFromStorage();

  for(i = 9; i <= 17; i++, rowNum++) {
    var rowHour = (dayjs().set('hour', i).set('minute', 0)).format("hh:mm A");
    if (i < hourNow) {
      rowEl.addClass('past');
    } else if (i === hourNow) {
      rowEl.addClass('present');
    } else if (i > hourNow) {
      rowEl.addClass('future');
    };

    timeSlotEl.append(rowEl.clone());
    document.getElementById('rowtime').setAttribute('id','hour-'+i);
    timeSlotEl.children('div').children('div').eq(rowNum).text(rowHour);

    let obj = schedules.find(o => o.timeID ==='hour-'+i);
    if (typeof obj !== 'undefined') {
      timeSlotEl.children('div').children('textarea').eq(rowNum).text(obj.description);
    } 
  }

  function saveSchedulesToStorage(schedules) {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }

  function handleSaveSchedule() {
    var scheduleIndex = $(this).parent().attr('id');
    var scheduleDescription = $(this).prev().val();
    var scheduleDetails = {
      timeID: scheduleIndex,
      description: scheduleDescription,
    };

    var schedules = readSchedulesFromStorage();

    var index = schedules.findIndex(schedules => schedules.timeID === scheduleIndex);
    console.log(index);
    if (index > -1) {
      schedules.splice(index, 1);
    }
   
    console.log(scheduleIndex);
    schedules.push(scheduleDetails);
    saveSchedulesToStorage(schedules);

    
    }
  
  timeSlotEl.on('click', '.saveBtn', handleSaveSchedule);

}


