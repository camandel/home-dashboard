// common scripts

function date() {
  let currentDate = new Date();
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let date = currentDate.toLocaleDateString("en-US", dateOptions);
  document.getElementById("header_date").innerHTML = date;
}

function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s;
  document.getElementById("header_clock").innerText = time;

  setTimeout(showTime, 1000);

}

function loadFunctions() {
  date();
  showTime();
}

