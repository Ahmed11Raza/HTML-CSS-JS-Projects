// Zoo Management System State
let zooData = {
    animals: [],
    caretakers: [],
    exhibits: [],
    healthRecords: {}
};

// Utility Functions
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update dashboard metrics
    if (sectionId === 'dashboard') {
        updateDashboardMetrics();
    }
}

function updateDashboardMetrics() {
    document.getElementById('total-animals').textContent = zooData.animals.length;
    document.getElementById('total-caretakers').textContent = zooData.caretakers.length;
    document.getElementById('total-exhibits').textContent = zooData.exhibits.length;
}

// Animal Management
document.getElementById('animal-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const animal = {
        id: generateUUID(),
        name: document.getElementById('animal-name').value,
        species: document.getElementById('animal-species').value,
        age: document.getElementById('animal-age').value,
        habitat: document.getElementById('animal-habitat').value,
        diet: document.getElementById('animal-diet').value
    };

    zooData.animals.push(animal);
    renderAnimalList();
    updateHealthTrackingSelect();
    this.reset();
});

function renderAnimalList() {
    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = '';
    zooData.animals.forEach(animal => {
        const row = `
            <tr>
                <td>${animal.name}</td>
                <td>${animal.species}</td>
                <td>${animal.age}</td>
                <td>${animal.habitat}</td>
                <td>${animal.diet}</td>
            </tr>
        `;
        animalList.innerHTML += row;
    });
}

// Caretaker Management
document.getElementById('caretaker-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const caretaker = {
        id: generateUUID(),
        name: document.getElementById('caretaker-name').value,
        specialization: document.getElementById('caretaker-specialization').value,
        contact: document.getElementById('caretaker-contact').value
    };

    zooData.caretakers.push(caretaker);
    renderCaretakerList();
    this.reset();
});

function renderCaretakerList() {
    const caretakerList = document.getElementById('caretaker-list');
    caretakerList.innerHTML = '';
    zooData.caretakers.forEach(caretaker => {
        const row = `
            <tr>
                <td>${caretaker.name}</td>
                <td>${caretaker.specialization}</td>
                <td>${caretaker.contact}</td>
            </tr>
        `;
        caretakerList.innerHTML += row;
    });
}

// Exhibit Management
document.getElementById('exhibit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const exhibit = {
        id: generateUUID(),
        name: document.getElementById('exhibit-name').value,
        capacity: document.getElementById('exhibit-capacity').value,
        habitatType: document.getElementById('exhibit-habitat').value
    };

    zooData.exhibits.push(exhibit);
    renderExhibitList();
    this.reset();
});

function renderExhibitList() {
    const exhibitList = document.getElementById('exhibit-list');
    exhibitList.innerHTML = '';
    zooData.exhibits.forEach(exhibit => {
        const row = `
            <tr>
                <td>${exhibit.name}</td>
                <td>${exhibit.capacity}</td>
                <td>${exhibit.habitatType}</td>
            </tr>
        `;
        exhibitList.innerHTML += row;
    });
}

// Health Tracking
function updateHealthTrackingSelect() {
    const select = document.getElementById('health-animal-select');
    select.innerHTML = '<option value="">Select an Animal</option>';
    zooData.animals.forEach(animal => {
        const option = `<option value="${animal.id}">${animal.name}</option>`;
        select.innerHTML += option;
    });
}

document.getElementById('health-animal-select').addEventListener('change', function() {
    const healthDetails = document.getElementById('health-details');
    const selectedAnimalId = this.value;

    if (selectedAnimalId) {
        const animal = zooData.animals.find(a => a.id === selectedAnimalId);
        const healthRecord = zooData.healthRecords[selectedAnimalId] || 
            { status: 'Healthy', history: [] };

        document.getElementById('current-health-status').value = healthRecord.status;
        healthDetails.style.display = 'block';
    } else {
        healthDetails.style.display = 'none';
    }
});

document.getElementById('health-update-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedAnimalId = document.getElementById('health-animal-select').value;
    const newStatus = document.getElementById('new-health-status').value;
    const medicalNotes = document.getElementById('medical-notes').value;

    if (!zooData.healthRecords[selectedAnimalId]) {
        zooData.healthRecords[selectedAnimalId] = { 
            status: newStatus, 
            history: [] 
        };
    }

    zooData.healthRecords[selectedAnimalId].status = newStatus;
    zooData.healthRecords[selectedAnimalId].history.push({
        date: new Date().toLocaleString(),
        notes: medicalNotes
    });

    document.getElementById('current-health-status').value = newStatus;
    this.reset();
});