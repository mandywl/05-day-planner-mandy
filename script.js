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

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

function displayTimeTable(time) {
    $(".container").append(
        $('<div/>', { 'class': 'row' }).append(
            $('<div/>', { 'class': 'col-2 hour' }).append($(
                '<span/>', { 'class': '', text: i + ":00" }))
        ).append($('<textarea/>', { 'class': 'col-7', 'id': 'text' })).append($('<div/>', { 'class': 'col-2 saveBtn' }).append($(
            '<span/>', { 'class': 'fa fa-save' }))));
}

$("#currentDay").text(week[dayname] + " " + monthNames[month] + ", " + getOrdinalNum(day));

for (var i = 9; i < 22; i++) {
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    displayTimeTable(i)
    if (i < hours) {
        console.log("i is ", i);
        console.log("hours is ", hours)
        $(".col-7").eq(childElement).addClass("past");
    } else if (i === hours) {
        $(".col-7").eq(childElement).addClass("present");
    } else {
        $(".col-7").eq(childElement).addClass("future");
    }
    childElement++;
}


$(document).ready(function () {
    $('.saveBtn').on('click', function (event) {
        var comment = $('textarea#text').val();
        console.log("clicked on ", $(this).closest().val());
        console.log("comment is ", comment)
        if ($('textarea#text') != undefined) {
            var message = $('textarea#text').val();
            console.log("message is ", message)
        }
        localStorage.setItem("comment", JSON.stringify(comment));
    });
});