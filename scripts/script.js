var intervalId;

function startTimer(duration, display) {
    var timer = 0, minutes, seconds;
    intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (++timer > duration) {
            timer = 0;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
}

function resumeTimer(duration, display) {
    startTimer(duration, display);
}

function stopTimer() {
    clearInterval(intervalId);
    var display = document.querySelector('#timer');
    var duration = display.textContent;
    var timeEntries = JSON.parse(localStorage.getItem("timeEntries")) || [];
    timeEntries.push({ duration: duration });
    localStorage.setItem("timeEntries", JSON.stringify(timeEntries));
    display.textContent = "00:00";
    updateTable(duration);
}

function updateTable(time) {
    var table = document.querySelector("#time-table");
    if (!table) {
        table = document.createElement("table");
        table.id = "time-table";
        table.style.margin = "20px auto";
        table.innerHTML = "<tr><th>Fecha</th><th>Hora</th><th>Tiempo</th></tr>";
        document.body.appendChild(table);
    }
    var date = new Date();
    var dateStr = date.toLocaleDateString();
    var timeStr = date.toLocaleTimeString();
    var row = document.createElement("tr");
    var dateCell = document.createElement("td");
    dateCell.textContent = dateStr;
    var timeCell = document.createElement("td");
    timeCell.textContent = timeStr;
    var durationCell = document.createElement("td");
    durationCell.textContent = time;
    row.appendChild(dateCell);
    row.appendChild(timeCell);
    row.appendChild(durationCell);

    // Ordenar de mayor a menor tiempo
    var rows = table.querySelectorAll("tr");
    if (rows.length > 1) {
        var inserted = false;
        for (var i = 1; i < rows.length; i++) {
            var otherTime = rows[i].querySelector("td:last-child").textContent;
            if (time > otherTime) {
                table.insertBefore(row, rows[i]);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            table.appendChild(row);
        }
    } else {
        table.appendChild(row);
    }
}


window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#timer');
    document.querySelector('#startBtn').addEventListener("click", function () {
        startTimer(fiveMinutes, display);
    });
    document.querySelector('#pauseBtn').addEventListener("click", function () {
        pauseTimer();
    });
    document.querySelector('#resumeBtn').addEventListener("click", function () {
        resumeTimer(fiveMinutes, display);
    });
    document.querySelector('#stopBtn').addEventListener("click", function () {
        stopTimer();
    });
};