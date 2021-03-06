/*
* demo.js
* This is the backend for demo.pug
* Upon successful loading of demo.pug, this file updates the font of the entire page
* with the last pre-selected user font. This file also changes the selected font when
* the user selects a new font in demo.pug.
* This file is also capable of loading a speedreader.
* This file is also capable of setting WPM.
*/

let data = 0;
let articles = 0;
let currentArticle = 0;
let demo = 0;
let wpm = 500;
let speedreader = 0;

fonts = {
  "Helvetica Neue": 0,
  "Arial": 1,
  "Georgia": 2,
  "Verdana": 3,
  "Courier New": 4,
  "Lucida Console": 5,
  "Open Dyslexic": 6,
  "LexieReadable": 7
};

$(document).ready(function(){
  console.log("hello from demo.js");
  console.log(window.localStorage.font);
  setFont(window.localStorage.font);
});

// sets currentArticle with id (called when Read button is clicked in demo.pug)
function initReader(id) {
  console.log(id);
  currentArticle = id;
}

// Starts speedreading article content of currentArticle (called when Start button in Modal is clicked in demo.pug)
function startReader() {
  wpm = ((1/(document.getElementById("wpm").value/60))*1000);
  console.log("reading at", document.getElementById("wpm").value, "wpm");
  text = $("#demoBox").val()
  if(text == null)
    text = "Article_Text_Not_Found!";
  if (speedreader)
  closeReader();

  let words = text.toString().split(" ");
  let numWords = words.length - 1;
  let index = 0;

  if(wpm == "Infinity" || wpm == "") wpm = 500;

  speedreader = setInterval(function(){
    if (words[index] != null) {
      $("#test_area").html("<h4>"+words[index]+"</h4>");
      index+=1;
    }
  }, wpm);
}

// Closes speedreader
function closeReader() {
  $("#test_area").html("<h3></h3>");
  clearInterval(speedreader);
}

// called to change page font after document is ready
function setFont(font) {
  $('#fontSelect')[0].selectedIndex=fonts[font];
	$("*").css("font-family", font);
	console.log("font changed successful!");
}

// Changes the font throughout the website
function fontChange() {
  $(".container").css("font-family", $('#fontSelect').find(":selected").text());
  $("*").css("font-family", $('#fontSelect').find(":selected").text());
  console.log("changing font!");
  window.localStorage.font = $('#fontSelect').find(":selected").text();
  console.log(window.localStorage.font);
}
