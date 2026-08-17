const API_URL = "http://localhost:5000/api/internships";

document.addEventListener("DOMContentLoaded", loadInternships);
let allInternships = [];
async function loadInternships() {
    const internshipList = document.getElementById("internshipList");

    if (!internshipList) return;

    internshipList.innerHTML = "<p>Loading internships...</p>";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allInternships = data.internships || [];
        populateCompanyFilter(allInternships);
        displayInternships(allInternships);
        return;

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch internships");
        }

        if (!data.internships || data.internships.length === 0) {
            internshipList.innerHTML = `
                <div class="empty-state">
                    <h2>No internships available</h2>
                    <p>There are currently no internship opportunities.</p>
                </div>
            `;
            return;
        }

        internshipList.innerHTML = "";

        data.internships.forEach(internship => {
            const card = document.createElement("div");
            card.className = "internship-card";

            card.innerHTML = `
                <div class="internship-top">
                    <div>
                        <h2 class="internship-title">
                            ${escapeHTML(internship.title)}
                        </h2>

                        <div class="company">
                            ${escapeHTML(internship.company)}
                        </div>
                    </div>

                    <span class="status">
                        ${escapeHTML(internship.status || "Active")}
                    </span>
                </div>

                <div class="internship-info">
                    <div>
                        <strong>Duration:</strong>
                        ${escapeHTML(internship.duration || "Not specified")}
                    </div>

                    <div>
                        <strong>Deadline:</strong>
                        ${formatDate(internship.deadline)}
                    </div>
                </div>

                <div class="actions">
                    <button
                        type="button"
                        class="action-btn view-btn"
                        onclick="viewInternship('${internship._id}')"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="action-btn"
                        onclick="applyForInternship('${internship._id}')"
                    >
                        Apply
                    </button>
                </div>
            `;

            internshipList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading internships:", error);

        internshipList.innerHTML = `
            <div class="empty-state">
                <h2>Unable to load internships</h2>
                <p>Please make sure the backend server is running.</p>
            </div>
        `;
    }
}

function displayInternships(internships) {
    const internshipList = document.getElementById("internshipList");
    const internshipCount = document.getElementById("internshipCount");

if (internshipCount) {
    internshipCount.textContent =
        `${internships.length} Opportunit${internships.length === 1 ? "y" : "ies"}`;
}
    if (internships.length === 0) {
        internshipList.innerHTML = `
            <div class="empty-state">
                <h2>No internships found</h2>
                <p>Try changing your search or company filter.</p>
            </div>
        `;
        return;
    }

    internshipList.innerHTML = "";

    internships.forEach(internship => {
        const card = document.createElement("div");
        card.className = "internship-card";

        card.innerHTML = `
            <div class="internship-top">
                <div>
                    <h2 class="internship-title">
                        ${escapeHTML(internship.title)}
                    </h2>

                    <div class="company">
                        ${escapeHTML(internship.company)}
                    </div>
                </div>

                <span class="status">
                    ${escapeHTML(internship.status || "Active")}
                </span>
            </div>

            <div class="internship-info">
                <div>
                    <strong>Duration:</strong>
                    ${escapeHTML(internship.duration || "Not specified")}
                </div>

                <div>
                    <strong>Deadline:</strong>
                    ${formatDate(internship.deadline)}
                </div>
            </div>

            <div class="actions">
                <button
                    type="button"
                    class="action-btn view-btn"
                    onclick="viewInternship('${internship._id}')">
                    View
                </button>

                <button
                    type="button"
                    class="action-btn"
                    onclick="applyForInternship('${internship._id}')">
                    Apply
                </button>
            </div>
        `;

        internshipList.appendChild(card);
    });
}


function populateCompanyFilter(internships) {
    const companyFilter = document.getElementById("companyFilter");

    if (!companyFilter) return;

    const companies = [
        ...new Set(
            internships
                .map(internship => internship.company)
                .filter(Boolean)
        )
    ];

    companyFilter.innerHTML = `<option value="">All Companies</option>`;

    companies.forEach(company => {
        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
}


function filterInternships() {
    const searchInput = document.getElementById("searchInput");
    const companyFilter = document.getElementById("companyFilter");

    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const company = companyFilter ? companyFilter.value : "";

    const filtered = allInternships.filter(internship => {

        const title = (internship.title || "").toLowerCase();
        const companyName = (internship.company || "").toLowerCase();

        const matchesSearch =
            title.includes(search) ||
            companyName.includes(search);

        const matchesCompany =
            !company || internship.company === company;

        return matchesSearch && matchesCompany;
    });

    displayInternships(filtered);
}


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const companyFilter = document.getElementById("companyFilter");

    if (searchInput) {
        searchInput.addEventListener("input", filterInternships);
    }

    if (companyFilter) {
        companyFilter.addEventListener("change", filterInternships);
    }
});

async function viewInternship(id) {
    try {
        const response = await fetch("http://localhost:5000/api/internships");
        const data = await response.json();

        if (!response.ok || !data.success) {
            alert(data.message || "Failed to load internship details.");
            return;
        }

        const internship = data.internships.find(
            internship => internship._id === id
        );

        if (!internship) {
            alert("Internship not found.");
            return;
        }

        const requirements = Array.isArray(internship.requirements)
            ? internship.requirements.join(", ")
            : internship.requirements || "N/A";

        alert(
            `INTERNSHIP DETAILS\n\n` +
            `Title: ${internship.title}\n` +
            `Company: ${internship.company}\n\n` +
            `Description:\n${internship.description}\n\n` +
            `Requirements:\n${requirements}\n\n` +
            `Duration: ${internship.duration}\n` +
            `Deadline: ${formatDate(internship.deadline)}`
        );

    } catch (error) {
        console.error("View internship error:", error);
        alert("Could not connect to the backend.");
    }
}

async function applyForInternship(internshipId) {
    const userId = prompt("Enter your User ID:");

    if (!userId) {
        return;
    }

    const coverNote = prompt(
        "Enter your cover note:",
        "I am interested in this internship and would like to apply."
    );

    if (!coverNote) {
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                internshipId: internshipId,
                userId: userId,
                coverNote: coverNote
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert("Application submitted successfully!");
            console.log("Application:", data.application);
        } else {
            alert(data.message || "Failed to submit application.");
        }

    } catch (error) {
        console.error("Application error:", error);
        alert("Could not connect to the backend.");
    }
}


function formatDate(date) {
    if (!date) return "Not specified";

    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
        return date;
    }

    return formattedDate.toLocaleDateString();
}


function escapeHTML(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}