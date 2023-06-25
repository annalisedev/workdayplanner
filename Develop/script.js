
var timeSlotEl = $('#timeslots');

$(document).ready(function () {

  printCalEvents();

  // Code to display the current date in the header of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D, YYYY'));
});

var hourNow = dayjs().hour();
var rowEl = $('#rowtime');
var rowNum = 0;

//pull any existing input from local storage
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
  //clear timeslots on page
  timeSlotEl.empty();
  var schedules = readSchedulesFromStorage();

  //add appropriate css settings based on the hour
  for(i = 9; i <= 17; i++, rowNum++) {
    var rowHour = (dayjs().set('hour', i).set('minute', 0)).format("hh:mm A");
    if (i < hourNow) {
      rowEl.addClass('past');
    } else if (i === hourNow) {
      rowEl.addClass('present');
    } else if (i > hourNow) {
      rowEl.addClass('future');
    };

    //input the time into the slot, then add an hour until 5pm
    timeSlotEl.append(rowEl.clone());
    document.getElementById('rowtime').setAttribute('id','hour-'+i);
    timeSlotEl.children('div').children('div').eq(rowNum).text(rowHour);

    //if there is content in storage then add this in the text area of the row
    let obj = schedules.find(o => o.timeID ==='hour-'+i);
    if (typeof obj !== 'undefined') {
      timeSlotEl.children('div').children('textarea').eq(rowNum).text(obj.description);
    } 
  }

  //save any input into the local storage
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

    //this function reachs any current local storage
    var schedules = readSchedulesFromStorage();

    //if an entry exists in teh text area, it will split it from the other objects and remove it, so that it can be replaced by new entries.
    var index = schedules.findIndex(schedules => schedules.timeID === scheduleIndex);
    console.log(index);
    if (index > -1) {
      schedules.splice(index, 1);
    }
   
    //push schedule descriptions to local storage and save
    schedules.push(scheduleDetails);
    saveSchedulesToStorage(schedules);
    }
  
  //event listener for the save button to trigger following functions
  timeSlotEl.on('click', '.saveBtn', handleSaveSchedule);

}


