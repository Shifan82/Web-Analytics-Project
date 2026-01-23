let analytics = JSON.parse(localStorage.getItem("analyticsLogs")) || [];
let pageStartTime = Date.now();

// =======================
// LOG PAGE VISIT
// =======================
logEvent("Page Visit", "Page Loaded", 0);

// =======================
// NAVBAR CLICK TRACKING
// =======================
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        logEvent(
            "Navbar Click",
            link.getAttribute("href"),
            0
        );
    });
});

// =======================
// TIME SPENT TRACKING
// =======================
window.addEventListener("beforeunload", () => {
    const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000);
    logEvent("Time Spent", "Page", timeSpent);
});

// =======================
// LOG FUNCTION
// =======================
function logEvent(action, element, time) {
    const page =
        document.title.replace(" - Analytics", "") || "Unknown";

    analytics.push({
        page: page,
        action: action,
        element: element,
        time: time,
        timestamp: new Date().toLocaleString()
    });

    localStorage.setItem("analyticsLogs", JSON.stringify(analytics));
}

// =======================
// DISPLAY TABLE
// =======================
const table = document.getElementById("analyticsTable");

analytics.forEach((log, index) => {
    const row = table.insertRow();

    row.insertCell(0).innerText = index + 1;
    row.insertCell(1).innerText = log.page;
    row.insertCell(2).innerText = log.action;
    row.insertCell(3).innerText = log.element;
    row.insertCell(4).innerText = log.time;
    row.insertCell(5).innerText = log.timestamp;
});

// =======================
// EXPORT CSV
// =======================
function exportCSV() {
    let csv = "Page,Action,Element,Time,Timestamp\n";

    analytics.forEach(log => {
        csv += `${log.page},${log.action},${log.element},${log.time},${log.timestamp}\n`;
    });

    downloadFile(csv, "analytics.csv");
}

// =======================
// EXPORT JSON
// =======================
function exportJSON() {
    downloadFile(JSON.stringify(analytics, null, 2), "analytics.json");
}

// =======================
// CLEAR DATA
// =======================
function clearAnalytics() {
    localStorage.removeItem("analyticsLogs");
    alert("Analytics data cleared");
    location.reload();
}

// =======================
// DOWNLOAD FILE
// =======================
function downloadFile(data, filename) {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

