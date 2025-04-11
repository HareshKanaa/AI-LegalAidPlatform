document.addEventListener("DOMContentLoaded", function () {
    const documentType = document.getElementById("document-type");
    const formContainer = document.getElementById("form-container");
    const downloadBtn = document.getElementById("download-btn");

    documentType.addEventListener("change", function () {
        const selectedDoc = this.value;
        formContainer.innerHTML = ""; // Clear previous form

        if (!selectedDoc) {
            downloadBtn.style.display = "none";
            return;
        }

        let formHTML = `<form id="legal-form">`;

        if (selectedDoc === "contract") {
            formHTML += `
                <label>Employer Name:</label>
                <input type="text" name="employer" required>
                <label>Employee Name:</label>
                <input type="text" name="employee" required>
                <label>Job Title:</label>
                <input type="text" name="job" required>
                <label>Salary:</label>
                <input type="text" name="salary" required>
            `;
        } else if (selectedDoc === "will") {
            formHTML += `
                <label>Full Name:</label>
                <input type="text" name="fullName" required>
                <label>Beneficiaries:</label>
                <textarea name="beneficiaries" required></textarea>
                <label>Executor Name:</label>
                <input type="text" name="executor" required>
            `;
        } else if (selectedDoc === "nda") {
            formHTML += `
                <label>Company Name:</label>
                <input type="text" name="company" required>
                <label>Recipient Name:</label>
                <input type="text" name="recipient" required>
                <label>Confidentiality Period:</label>
                <input type="text" name="period" required>
            `;
        } else if (selectedDoc === "affidavit") {
            formHTML += `
                <label>Affiant Name:</label>
                <input type="text" name="affiant" required>
                <label>Statement:</label>
                <textarea name="statement" required></textarea>
            `;
        }

        formHTML += `<button type="submit" class="btn">Generate Document</button></form>`;
        formContainer.innerHTML = formHTML;

        document.getElementById("legal-form").addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Document Generated! Downloading...");
            downloadBtn.style.display = "block";
        });
    });

    downloadBtn.addEventListener("click", function () {
        alert("Downloading Document...");
    });
});