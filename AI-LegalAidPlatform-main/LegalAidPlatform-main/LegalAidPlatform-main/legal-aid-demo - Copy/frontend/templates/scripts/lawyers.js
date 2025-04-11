const lawyers = [
    { name: "Adv. Dr Diraviam Dinesh", specialty: "Criminal Law", language: " Tamil, English", location: "Chennai", img: "lawyers/lawyer1.jpg" },
    { name: "Adv. Priya Sharma", specialty: "Family Law", language: "Tamil, English", location: "Dindigul", img: "lawyers/lawyer2.jpg" },
    { name: "Adv. Vikram Patel", specialty: "Corporate Law", language: "Tamil, English", location: "Madurai", img: "lawyers/lawyer3.jpg" },
    { name: "Adv. Anjali Verma", specialty: "Immigration Law", language: "Tamil, English", location: "Coimbatore", img: "lawyers/lawyer4.jpg" },
    { name: "Adv. Sunil Menon", specialty: "Property Law", language: "Tamil, English", location: "Trichy", img: "lawyers/lawyer5.jpg" }
];

function loadLawyers() {
let lawyerList = document.getElementById("lawyer-list");
lawyerList.innerHTML = "";

lawyers.forEach(lawyer => {
let card = document.createElement("div");
card.classList.add("lawyer-card");

card.innerHTML = `
    <img src="${lawyer.img}" class="lawyer-img" alt="${lawyer.name}">
    <div class="lawyer-details">
        <h3>${lawyer.name}</h3>
        <p><span>Specialty:</span> ${lawyer.specialty}</p>
        <p><span>Languages:</span> ${lawyer.language}</p>
        <p><span>Location:</span> ${lawyer.location}</p>
        <button class="btn-appointment" onclick="bookAppointment('${lawyer.name}')">Book Appointment</button>
    </div>
`;

lawyerList.appendChild(card);
});
}


function searchLawyers() {
    let input = document.getElementById("search").value.toLowerCase();
    let filteredLawyers = lawyers.filter(lawyer =>
        lawyer.name.toLowerCase().includes(input) ||
        lawyer.specialty.toLowerCase().includes(input) ||
        lawyer.location.toLowerCase().includes(input)
    );

    let lawyerList = document.getElementById("lawyer-list");
    lawyerList.innerHTML = "";

    filteredLawyers.forEach(lawyer => {
        let card = document.createElement("div");
        card.classList.add("lawyer-card");
        card.innerHTML = `
            <img src="${lawyer.img}" class="lawyer-img" alt="${lawyer.name}">
            <div class="lawyer-details">
                <h3>${lawyer.name}</h3>
                <p><span>Specialty:</span> ${lawyer.specialty}</p>
                <p><span>Languages:</span> ${lawyer.language}</p>
                <p><span>Location:</span> ${lawyer.location}</p>
            </div>
            <button class="btn-appointment" onclick="bookAppointment('${lawyer.name}')">Book Appointment</button>
        `;
        lawyerList.appendChild(card);
    });
}

function bookAppointment(lawyerName) {
    alert(`Booking appointment with ${lawyerName}. Feature coming soon!`);
}

function viewcases(lawyerName) {
    alert(`Previous cases of ${lawyerName}. Feature coming soon!`);
}

// Load lawyers on page load
window.onload = loadLawyers;