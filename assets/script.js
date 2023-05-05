// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  const currentHour = dayjs().format("H"); // set variable for time counter
  function hourlyColor() {
    // function is to determine the states to set up color
    $(".time-block").each(function () {
      // search for time-block class and
      const blockHour = parseInt(this.id); //for each one compare to current time to set its state
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
      console.log(parseInt(this.id)); //log to check can delete
    });
  }

  // removes the classes that it is not based on its blockHour state and adds the proper one
  function refreshColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  //function for time timer
  function updateTime() {
    const dateElement = $("#currentDay"); //search for element
    const currentDate = dayjs().format("dddd, MMMM D, YYYY | hh:mm:ss A"); //instantiate timer
    dateElement.text(currentDate); //appened timer to the element
    refreshColor();
  }

  function textEntry() {
    $(".btn").on("click", function () {
      //create an event listener for my save button on click
      const hourId = $(this).parent().attr("id"); // finds the instance hours ID
      const hourText = $(this).siblings(".col-8").val(); // finds the instance of the hour that respons to the text box
      localStorage.setItem(hourId, hourText); //we're going to store the text and the ID in our local storage
      console.log(hourId); // log to confirm
      console.log(hourText);
    });
  }

  $(".time-block").each(function () {
    //searches for time-block class in HTML
    const key = $(this).attr("id"); //seaches for the current instances ID attribute and value
    const value = localStorage.getItem(key); //will grab the corresponding key from local storage that matches ID
    $(this).children(".description").val(value); //grabs value from the key we just grabbed
  });

  setInterval(updateTime, 1000); //update time every second
  textEntry();
  hourlyColor();
  updateTime();
});
