var imageAddr =
  "https://upload.wikimedia.org/wikipedia/commons/0/03/Eiche_bei_Graditz.jpg";
var downloadSize = 4995374;

function ShowProgressMessage(msg) {
  if (console) {
    if (typeof msg == "string") {
      console.log(msg);
    } else {
      for (var i = 0; i < msg.length; i++) {
        console.log(msg[i]);
      }
    }
  }

  var oProgress = document.getElementById("progress");
  if (oProgress) {
    var actualHTML = typeof msg == "string" ? msg : msg.join("<br />");
    oProgress.innerHTML = actualHTML;
  }
}

function InitiateSpeedDetection() {
  ShowProgressMessage("در حال پردازش ، لطفا صبر کنید ...");
  window.setTimeout(MeasureConnectionSpeed, 1);
}

if (window.addEventListener) {
  window.addEventListener("load", InitiateSpeedDetection, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
  var startTime, endTime;
  var download = new Image();
  download.onload = function () {
    endTime = new Date().getTime();
    showResults();
  };

  download.onerror = function (err, msg) {
    ShowProgressMessage("خطا !");
  };

  startTime = new Date().getTime();
  var cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  function showResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    ShowProgressMessage([
      "سرعت اینترنت شما :",
      speedBps + " بیت بر ثانیه ",
      speedKbps + " کیلوبیت بر ثانیه ",
      speedMbps + " مگابیت بر ثانیه ",
    ]);
  }
}
