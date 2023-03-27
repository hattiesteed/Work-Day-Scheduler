$(function () {

  // created forloop for the description in each hour

  for (let index = 0; index < 9; index++) {
    var timeOfDay = 8 + index;
    var now = dayjs();
    // test for
    // now.$H = 12
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

});
