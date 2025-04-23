let vehicles = [
    { id: 'VH-001', make: 'Toyota', model: 'Camry', year: 2023, owner: 'John Smith', status: 'Active', lastUpdate: 'Today' },
    { id: 'VH-002', make: 'Honda', model: 'Civic', year: 2022, owner: 'Jane Doe', status: 'Maintenance', lastUpdate: 'Yesterday' }
];
let owners = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Robert Davis'];

function showSection(section) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    // In a real app, this would switch between different views
    alert(`Switching to ${section} view`);
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openEditModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        document.getElementById('edit-vehicle-id').value = vehicle.id;
        document.getElementById('edit-make').value = vehicle.make;
        document.getElementById('edit-model').value = vehicle.model;
        document.getElementById('edit-year').value = vehicle.year;
        document.getElementById('edit-owner').value = owners.indexOf(vehicle.owner) + 1;
        document.getElementById('edit-status').value = vehicle.status.toLowerCase();
        openModal('edit-vehicle-modal');
    }
}

function openDeleteModal(vehicleId) {
    if (confirm(`Are you sure you want to delete vehicle ${vehicleId}?`)) {
        vehicles = vehicles.filter(v => v.id !== vehicleId);
        updateVehicleTable();
        updateDashboardStats();
        addActivity(`Vehicle ${vehicleId} deleted`);
    }
}

function searchVehicles() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const rows = document.querySelectorAll('#vehicle-table-body tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function addVehicle(event) {
    event.preventDefault();
    const newVehicle = {
        id: `VH-${String(vehicles.length + 1).padStart(3, '0')}`,
        make: document.getElementById('vehicle-make').value,
        model: document.getElementById('vehicle-model').value,
        year: document.getElementById('vehicle-year').value,
        owner: document.getElementById('vehicle-owner').options[document.getElementById('vehicle-owner').selectedIndex].text,
        status: document.getElementById('vehicle-status').value,
        lastUpdate: 'Today'
    };
    vehicles.push(newVehicle);
    updateVehicleTable();
    updateDashboardStats();
    addActivity(`New vehicle added: ${newVehicle.make} ${newVehicle.model}`);
    closeModal('add-vehicle-modal');
    document.getElementById('add-vehicle-form').reset();
}

function editVehicle(event) {
    event.preventDefault();
    const vehicleId = document.getElementById('edit-vehicle-id').value;
    const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
    if (vehicleIndex !== -1) {
        vehicles[vehicleIndex] = {
            ...vehicles[vehicleIndex],
            make: document.getElementById('edit-make').value,
            model: document.getElementById('edit-model').value,
            year: document.getElementById('edit-year').value,
            owner: document.getElementById('edit-owner').options[document.getElementById('edit-owner').selectedIndex].text,
            status: document.getElementById('edit-status').value,
            lastUpdate: 'Today'
        };
        updateVehicleTable();
        updateDashboardStats();
        addActivity(`Vehicle ${vehicleId} updated`);
        closeModal('edit-vehicle-modal');
    }
}

function updateVehicleTable() {
    const tbody = document.getElementById('vehicle-table-body');
    tbody.innerHTML = '';
    vehicles.forEach(v => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${v.id}</td>
            <td>${v.make} ${v.model} (${v.year})</td>
            <td>${v.owner}</td>
            <td>${v.status}</td>
            <td>${v.lastUpdate}</td>
            <td class="actions">
                <button class="action-btn edit" onclick="openEditModal('${v.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="openDeleteModal('${v.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateDashboardStats() {
    document.getElementById('total-vehicles').textContent = vehicles.length;
    document.getElementById('total-owners').textContent = new Set(vehicles.map(v => v.owner)).size;
    document.getElementById('pending-maintenance').textContent = vehicles.filter(v => v.status === 'Maintenance').length;
    document.getElementById('total-alerts').textContent = vehicles.filter(v => v.status === 'Inactive').length;
}

function addActivity(message) {
    const activityDiv = document.getElementById('recent-activity');
    const activity = document.createElement('div');
    activity.className = 'activity-item';
    const time = new Date().toLocaleTimeString();
    activity.innerHTML = `
        <div class="activity-icon">
            <i class="fas fa-car"></i>
        </div>
        <div class="activity-details">
            <p>${message}</p>
            <span class="activity-time">Today, ${time}</span>
        </div>
    `;
    activityDiv.appendChild(activity);
    if (activityDiv.children.length > 5) {
        activityDiv.removeChild(activityDiv.children[1]);
    }
}

function showDashboardDetail(type) {
    alert(`Showing detailed ${type} view\nVehicles: ${vehicles.length}\nOwners: ${new Set(vehicles.map(v => v.owner)).size}`);
}

function scheduleMaintenance() {
    const vehicleId = prompt('Enter vehicle ID to schedule maintenance:');
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        vehicle.status = 'Maintenance';
        updateVehicleTable();
        updateDashboardStats();
        addActivity(`Maintenance scheduled for ${vehicle.make} ${vehicle.model}`);
    }
}

function addOwner() {
    const newOwner = prompt('Enter new owner name:');
    if (newOwner) {
        owners.push(newOwner);
        updateDashboardStats();
        addActivity(`New owner registered: ${newOwner}`);
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            const option = document.createElement('option');
            option.value = owners.length;
            option.text = newOwner;
            select.appendChild(option);
        });
    }
}

function generateReport() {
    const report = `Vehicle Report (${new Date().toLocaleDateString()}):
Total Vehicles: ${vehicles.length}
Active: ${vehicles.filter(v => v.status === 'Active').length}
Maintenance: ${vehicles.filter(v => v.status === 'Maintenance').length}
Inactive: ${vehicles.filter(v => v.status === 'Inactive').length}
Owners: ${new Set(vehicles.map(v => v.owner)).size}`;
    alert(report);
    addActivity('Vehicle report generated');
}

function setAlerts() {
    const vehicleId = prompt('Enter vehicle ID to set alert:');
    if (vehicles.find(v => v.id === vehicleId)) {
        document.getElementById('total-alerts').textContent = parseInt(document.getElementById('total-alerts').textContent) + 1;
        addActivity(`Alert set for vehicle ${vehicleId}`);
    }
}