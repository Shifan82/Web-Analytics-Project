// ---------- DEFAULT 100 RECORDS ----------
const defaultRecords = [];

for (let i = 1; i <= 100; i++) {
    defaultRecords.push({
        name: "Student " + i,
        email: "student" + i + "@gmail.com",
        feedback: "Feedback record " + i
    });
}

// ---------- INITIALIZE ----------
if (!localStorage.getItem("feedbackRecords")) {
    localStorage.setItem("feedbackRecords", JSON.stringify(defaultRecords));
}

// ---------- SUBMIT FEEDBACK ----------
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector("input[type='text']").value;
        const email = document.querySelector("input[type='email']").value;
        const feedback = document.querySelector("textarea").value;

        let records = JSON.parse(localStorage.getItem("feedbackRecords"));

        records.push({ name, email, feedback });

        localStorage.setItem("feedbackRecords", JSON.stringify(records));

        alert("Feedback added successfully!");

        form.reset();
    });
}

// ---------- DISPLAY RECORDS ----------
const table = document.getElementById("recordsTable");

if (table) {
    const records = JSON.parse(localStorage.getItem("feedbackRecords"));

    records.forEach((item, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = item.name;
        row.insertCell(2).innerText = item.email;
        row.insertCell(3).innerText = item.feedback;
    });
}

		
