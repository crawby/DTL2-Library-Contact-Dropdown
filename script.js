const sheetID = '1BI-MiIP0VEaE3W9ARvvwddaSExQHHIkJnNLpgVv5qe8';
const apiKey = 'AIzaSyDeJhACy6IFmBDFmICTYu83h6Vk9MlqPHo';
const dropdown = document.getElementById('institutionDropdown');
const contactInfoDiv = document.getElementById('contactInfo');

// URL to fetch data from the Google Sheet
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

let institutionData = {};

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.values) {
            const rows = data.values.slice(1); // Skip header row
            dropdown.innerHTML = '<option value="" disabled selected>Please select your institution</option>';

            rows.forEach(row => {
                const institutionName = row[0];
                const contactInfo = row[1];
                institutionData[institutionName] = contactInfo;

                const option = document.createElement('option');
                option.value = institutionName;
                option.text = institutionName;
                dropdown.appendChild(option);
            });
        } else {
            dropdown.innerHTML = '<option>No data found</option>';
        }
    })
    .catch(error => {
        dropdown.innerHTML = '<option>Error loading data</option>';
    });

dropdown.addEventListener('change', function() {
    const selectedInstitution = dropdown.value;
    const contactInfo = institutionData[selectedInstitution] || 'Contact info not available';
    contactInfoDiv.innerText = `Please Contact: ${contactInfo} with any questions.`;
});
