// When the html page elements are loaded, run the following javascript
$(document).ready(function() {
    // listen for save button clicks
    $(".saveBtn").on("click", function() {
        // Get the sibling element's text input value
        var value = $(this).siblings(".description").val();
        // Get the parent element's id value
        var time = $(this).parent().attr("id");
        // Save both values in local storage
        localStorage.setItem(time, value);
        // Update the add to calendar feature
        updateAddCalendar();
    });
  
    // hourUpdater function to set up the planner's current time and style the page depending on what time it is
    function hourUpdater() {
        // Get the current hour
            var currentHour = moment().hours();

        // Loop over each hour section
        $(".time-block").each(function() {
            
            // Get the hour of the current section
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            // Check if we have moved past this time
            if (blockHour < currentHour) {
                // If we have, add the "past" class to the element
                $(this).addClass("past");
            } 
            // Check if we are on the current hour of the day
            else if (blockHour === currentHour) {
                // If we are, remove the "past" class and add the "present" class
                $(this).removeClass("past");
                $(this).addClass("present");
            } 
            else {
                // Otherwise, remove the "past" and the "present" classes and add the "future" class
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }
  
    // Run the hourUpdater function on load
    hourUpdater();
  
    // Keep the page updated by running the hourUpdate function every 15 seconds
    setInterval(hourUpdater, 15000);
  
    // Load any saved data from localstorage into the value of each hour element's text area
    var hourNine = $("#hour-9 .description");
    hourNine.val(localStorage.getItem("hour-9"));
    var hourTen = $("#hour-10 .description");
    hourTen.val(localStorage.getItem("hour-10"));
    var hourEleven = $("#hour-11 .description");
    hourEleven.val(localStorage.getItem("hour-11"));
    var hourTwelve = $("#hour-12 .description");
    hourTwelve.val(localStorage.getItem("hour-12"));
    var hourThirteen = $("#hour-13 .description");
    hourThirteen.val(localStorage.getItem("hour-13"));
    var hourFourteen = $("#hour-14 .description");
    hourFourteen.val(localStorage.getItem("hour-14"));
    var hourFifteen = $("#hour-15 .description");
    hourFifteen.val(localStorage.getItem("hour-15"));
    var hourSixteen = $("#hour-16 .description");
    hourSixteen.val(localStorage.getItem("hour-16"));
    var hourSeventeen = $("#hour-17 .description")
    hourSeventeen.val(localStorage.getItem("hour-17"));
  
    // Display the current time at the bottom of the jumbotron/header
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // CALENDARCEPTION
    // ADDED FEATURE: I have added a "add to calendar" feature to allow the user to add this workday to another calendar
    function updateAddCalendar() {
        // Clear the add to calendar div children if there are any
        $('.new-cal').empty();
        
        // Add text sections to the add to calendar feature description
        var descriptionTwo = '';
        // Loop through as many hour blocks as there are
        for (i = 0; i< 9; i++) {
            // set the hour block's text to a textValue variable
            var textValue = localStorage.getItem("hour-" + (9+i).toString());
            // If there is some text, and the time is before noon, add it to the description variable
            if (textValue !== null && i < 3){
                descriptionTwo += (i+9).toString() + "am: " + textValue + "\n";
            }
            // If there is some text, and the time is noon, add it to the description variable
            else if (textValue !== null && i === 3){
                descriptionTwo += (i+9).toString() + "pm: " + textValue + "\n";
            }
            // If there is some text, and the time is after noon, add it to the description variable
            else if (textValue !== null && i > 3){
                descriptionTwo += (i-3).toString() + "pm: " + textValue + "\n";
            }
        }

        // Create a calendar object for adding the workday schedule to another calendar
        var myCalendar = createCalendar({
            // Create a data object
            data: {
                // Static title
                title: 'Workday Schedule',
                // Dynamic start of day
                start: new Date(moment().format('ll') + " 9:00"),
                // Dynamic end of day
                end: new Date(moment().format('ll') + " 17:00"),
                // Add description that was created above
                description: descriptionTwo
            }
        });
        
        // Add the calendar options to the new-cal div in the jumbotron/header
        document.querySelector('.new-cal').appendChild(myCalendar);
    }
    // Update the add to calendar feature once on page load
    updateAddCalendar();
});
  
