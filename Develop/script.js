// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // created forloop for the description in each hour

  for (let index = 0; index < 9; index++) {
    var timeOfDay = 8 + index;
    var now = dayjs();
    // now.$h = 10 test for
    var tense = now.$H - 1 > timeOfDay ? "past" : "future";
    tense = now.$H - 1 === timeOfDay ? "present" : tense;

    // % divides and gets remainder
    timeOfDay = timeOfDay % 12;
    timeOfDay++;
    // if time of day is greater than 8, then return AM, else return PM, store result in time period
    var timePeriod = timeOfDay > 8 ? `AM` : `PM`;
    timePeriod = timeOfDay === 12 ? `PM` : timePeriod;
    var timeblock = `<div id="hour-${timeOfDay}" class="row time-block ${tense}">
<div class="col-2 col-md-1 hour text-center py-3">${timeOfDay}${timePeriod}</div>
<textarea class="col-8 col-md-10 description" rows="3"> </textarea>
<button class="btn saveBtn col-2 col-md-1" aria-label="save">
  <i class="fas fa-save" aria-hidden="true"></i>
</button>
</div>`;
    jQuery("#time-blocks").append(timeblock);
  }

  var hours = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];

  //button on side actually saves what you put in the text boxes
  for (let index = 0; index < hours.length; index++) {
    var hour = hours[index];
    var hourI = localStorage.getItem("hour-" + hour);
    jQuery("#hour-" + hour + " .description").val(hourI);
  }

  // added listener value
  jQuery(".saveBtn").on("click", function (event) {
    var currentTarget = jQuery(event.currentTarget);
    var parent = currentTarget.parent(".time-block");
    var parentId = parent.attr("id");
    var description = parent.find(".description");
    var value = description.val();
    localStorage.setItem(parentId, value);
    return false;
  });

  // date to the top of page
  jQuery("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

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
  // TODO: Add code to display the current date in the header of the page.
});
