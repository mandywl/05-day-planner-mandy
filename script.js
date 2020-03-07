var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';

var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var dayname = date.getDay();
var ampm = hours >= 12 ? 'pm' : 'am';
var childElement = 0;
var comment;
var valueEntered;
var yesterday;
var today;

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

function displayTimeTable(time, ele) {
    $(".container").append(
        $('<div/>', { 'class': 'row' }).append(
            $('<div/>', { 'class': 'col-2 hour' }).append($(
                '<span/>', { 'class': '', text: time + ":00" }))
        ).append($('<textarea/>', { 'class': 'col-7', 'id': ele })).append($('<div/>', { 'class': 'col-2 saveBtn' }).append($(
            '<i/>', { 'class': 'fa fa-save' }))));
}

$("#currentDay").text(week[dayname] + " " + monthNames[month] + ", " + getOrdinalNum(day));




$(document).ready(function () {
    var elementClicked;
    for (var i = 9; i < 22; i++) {
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        displayTimeTable(i, childElement)
        if (i < hours) {
            // console.log("i is ", i);
            // console.log("hours is ", hours)
            $(".col-7").eq(childElement).addClass("past");
        } else if (i === hours) {
            $(".col-7").eq(childElement).addClass("present");
        } else {
            $(".col-7").eq(childElement).addClass("future");
        }
        //$(".col-7").eq(childElement).attr("data-name", childElement);
        childElement++;
    }

    $('.saveBtn').on('click', function (event) {
        event.preventDefault()
        event.stopPropagation();
        const value = $(this).siblings("textarea").val();
        const id = $(this).siblings("textarea").attr("id")
        //console.log(value, id)
        saveValue({ id, value })
        elementClicked = $(this).prev().attr("data-name", "clicked");
        $(this).data('clicked', true);
    });

    for (var i = 0; i < 12; i++) {
        document.getElementById(i).value = getSavedValue(i);

    }

});

function saveValue(e) {
    var id = e.id;  // get the sender's id to save it . 
    var val = e.value; // get the value. 
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override . 
}

//get the saved value function - return the value of "v" from localStorage. 
function getSavedValue(v) {
    if (!localStorage.getItem(v)) {
        return "";
    }
    return localStorage.getItem(v);
}