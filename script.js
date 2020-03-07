var date = new Date();
var hours = date.getHours();
var childElement = 0;
var comment;
var valueEntered;
var yesterday;
var today;

function displayTimeTable(time, ele) {
    $(".container").append(
        $('<div/>', { 'class': 'row' }).append(
            $('<div/>', { 'class': 'col-2 hour' }).append($(
                '<span/>', { 'class': '', text: time + ":00" }))
        ).append($('<textarea/>', { 'class': 'col-7', 'id': ele })).append($('<div/>', { 'class': 'col-2 saveBtn' }).append($(
            '<i/>', { 'class': 'fa fa-save' }))));
}

$("#currentDay").text(moment().format('dddd MMMM, Do'));

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

$(document).ready(function () {
    var dateArray = [];
    for (var i = 9; i < 22; i++) {
        displayTimeTable(i, childElement)
        if (i < hours) {
            $(".col-7").eq(childElement).addClass("past");
        } else if (i === hours) {
            $(".col-7").eq(childElement).addClass("present");
        } else {
            $(".col-7").eq(childElement).addClass("future");
        }
        childElement++;
    }

    $('.saveBtn').on('click', function (event) {
        event.preventDefault()
        const value = $(this).siblings("textarea").val();
        const id = $(this).siblings("textarea").attr("id")
        saveValue({ id, value })
    });

    var day = JSON.stringify(moment().format('Do MMMM YYYY'));

    localStorage.setItem(day, day);

    for (var i = 0; i < localStorage.length; i++) {
        var itemKey = localStorage.key(i);
        var values = localStorage.getItem(itemKey);
        if (values.includes("2020")) {
            dateArray.push(values);
        }
    }

    //Check if there are 2 dates stored in localStorage, then clear localStorage if there's a new date
    if (dateArray.length == 2) {
        localStorage.clear();
    }

    for (var i = 0; i < 12; i++) {
        document.getElementById(i).value = getSavedValue(i);
    }
});