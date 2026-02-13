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

		### CLICKY ANTI-ADBLOCK PROXY - https://clicky.com/help/proxy
		
		# IMPORTANT NOTE: Incoming X-Forwarded-For headers are supported by default.
		# To disable this, replace all "$proxy_add_x_forwarded_for" references with "$remote_addr".
		
		# DNS RESOLVER - if already defined elsewhere, this can optionally be deleted.
		resolver 1.1.1.1;
		
		# COOKIES - override cookie header to just send the service-related first party cookies.
		set $cookie "";
		if ($cookie__cky_ignore) {
			set $cookie "_cky_ignore=$cookie__cky_ignore; _cky_osa=$cookie__cky_osa";
		}
		
		# JAVASCRIPT TRACKING CODE
		location = /49d928229b0ddb.js {
			proxy_pass https://static.getclicky.com/js?in=%2Fc93bca17921309;
			proxy_connect_timeout 10s;
			proxy_http_version 1.1;
			proxy_ssl_server_name on;
			proxy_set_header Host static.getclicky.com;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Cookie "";
		}
		
		# JAVASCRIPT BEACON
		location = /c93bca17921309 {
			proxy_pass https://in.getclicky.com/in.php;
			proxy_connect_timeout 10s;
			proxy_http_version 1.1;
			proxy_ssl_server_name on;
			proxy_set_header Host in.getclicky.com;
			proxy_set_header X-Forwarded-Proto $scheme;
			proxy_set_header X-Forwarded-Host  $host;
			proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
			proxy_set_header Cookie $cookie;
		}
		
		### / CLICKY 
      }
}
