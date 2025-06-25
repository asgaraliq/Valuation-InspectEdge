// DOM Elements
const pages = document.querySelectorAll('.page');
const loginForm = document.getElementById('login-form');
const forgotPasswordLink = document.getElementById('forgot-password');
const forgotPasswordModal = document.getElementById('forgot-password-modal');
const closeModal = document.querySelector('.close-modal');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const logoutBtn = document.getElementById('logout-btn');
const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
const contentSections = document.querySelectorAll('.content-section');
const requestTypeTabs = document.querySelectorAll('.request-type-tabs .tab-btn');
const requestTypeSelect = document.getElementById('request-type');
const customerFields = document.getElementById('customer-fields');
const vehicleRequestForm = document.getElementById('vehicle-request-form');
const csvUpload = document.getElementById('csv-upload');
const browseBtn = document.getElementById('browse-btn');
const uploadPreview = document.getElementById('upload-preview');
const confirmUploadBtn = document.getElementById('confirm-upload');
const assignActions = document.getElementById('assign-actions');
const selectAllCheckbox = document.getElementById('select-all');
const confirmAssignBtn = document.getElementById('confirm-assign');
const assignToSelect = document.getElementById('assign-to');
const assignAgentSelect = document.getElementById('assign-agent');
const usernameInput = document.getElementById('username');
const adminUsername = document.getElementById('admin-username');
const userAvatar = document.getElementById('user-avatar');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

// Agencies Management Logic
const agenciesTableBody = document.querySelector('#agencies-table tbody');
const addAgencyBtn = document.getElementById('add-agency-btn');
const agencyModal = document.getElementById('agency-modal');
const closeAgencyModal = document.getElementById('close-agency-modal');
const agencyForm = document.getElementById('agency-form');
const agencyNameInput = document.getElementById('agency-name');
const agentsList = document.getElementById('agents-list');
const addAgentBtn = document.getElementById('add-agent-btn');
const agencyModalTitle = document.getElementById('agency-modal-title');

// New DOM elements for agency fields
const contactPersonInput = document.getElementById('contact-person');
const contactNumberInput = document.getElementById('contact-number');
const agencyAddressInput = document.getElementById('agency-address');
const agencyStateInput = document.getElementById('agency-state');
const agencyCityInput = document.getElementById('agency-city');
const supportLocationInput = document.getElementById('support-location');
const agreementStartInput = document.getElementById('agreement-start');
const agreementEndInput = document.getElementById('agreement-end');
const fieldOfficersTableBody = document.querySelector('#field-officers-table tbody');

let editAgencyIndex = null;

// Sample Data
const agencies = [
    { id: 1, name: 'AutoValuers India', agents: ['Rahul Sharma', 'Neha Gupta'] },
    { id: 2, name: 'Vehicle Assessment', agents: ['Amit Singh', 'Priya Patel'] },
    { id: 3, name: 'CarValue Experts', agents: ['Vikram Joshi', 'Ananya Reddy'] }
];

// Assign Agent Modal Logic
const assignAgentModal = document.getElementById('assign-agent-modal');
const closeAssignAgentModal = document.getElementById('close-assign-agent-modal');
const assignAgentList = document.getElementById('assign-agent-list');
const confirmAssignAgentBtn = document.getElementById('confirm-assign-agent');
let currentAssignRow = null;

// Assign Requests Filters Logic
const filterStatus = document.getElementById('filter-status');
const filterType = document.getElementById('filter-type');
const filterBank = document.getElementById('filter-bank');
const assignRequestsTable = document.getElementById('assign-requests-table');
const searchBox = document.querySelector('#assign-requests-content .search-box input');
const applyFiltersBtn = document.getElementById('apply-filters');

// --- Client Management Logic ---
const clientsTableBody = document.querySelector('#clients-table tbody');
const addClientBtn = document.getElementById('add-client-btn');
const clientModal = document.getElementById('client-modal');
const closeClientModal = document.getElementById('close-client-modal');
const clientForm = document.getElementById('client-form');
const clientNameInput = document.getElementById('client-name');
const clientContactPersonInput = document.getElementById('client-contact-person');
const clientContactNumberInput = document.getElementById('client-contact-number');
const clientAgreementStartInput = document.getElementById('client-agreement-start');
const clientAgreementEndInput = document.getElementById('client-agreement-end');
const clientStateInput = document.getElementById('client-state');
const clientCityInput = document.getElementById('client-city');
const clientStatusInput = document.getElementById('client-status');
let editClientIndex = null;

// Ensure Client section is shown by default and menu works
const clientSection = document.getElementById('client-section');
const clientMenuLink = document.querySelector('a[data-page="client-section"]');
if (clientMenuLink) {
    clientMenuLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        // Show client section
        clientSection.classList.add('active');
    });
}
// Show client section by default on page load
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    if (clientSection) clientSection.classList.add('active');
    insertSampleClients();
    renderClients();
    // Ensure Add Client button always works
    if (addClientBtn) {
        addClientBtn.onclick = () => {
            clientForm.reset();
            editClientIndex = null;
            clientModalTitle.textContent = 'Add Client';
            clientModal.style.display = 'flex';
        };
    }
});

// Initialize the app
function initApp() {
    setupEventListeners();
}

// Show specific page
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = usernameInput.value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Store username and show in dashboard
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Update UI with username
                adminUsername.textContent = username;
                userAvatar.textContent = username.charAt(0).toUpperCase() + (username.split(' ')[1] ? username.split(' ')[1].charAt(0).toUpperCase() : '');
                
                showDashboard();
            }
        });
    }
    
    // Forgot password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordModal.style.display = 'flex';
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            forgotPasswordModal.style.display = 'none';
        });
    }
    
    // Forgot password form
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            alert(`Reset link sent to ${email}`);
            forgotPasswordModal.style.display = 'none';
        });
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            showPage('login-page');
        });
    }
    
    // Sidebar navigation
    if (sidebarLinks) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                
                // Remove active class from all links and sections
                sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link and corresponding section
                this.parentElement.classList.add('active');
                document.getElementById(`${page}-content`).classList.add('active');
            });
        });
    }
    
    // Request type tabs
    if (requestTypeTabs) {
        requestTypeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                
                requestTypeTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                document.getElementById('single-request-form').style.display = type === 'single' ? 'block' : 'none';
                document.getElementById('bulk-request-form').style.display = type === 'bulk' ? 'block' : 'none';
            });
        });
    }
    
    // Request type select change
    if (requestTypeSelect) {
        requestTypeSelect.addEventListener('change', function() {
            customerFields.style.display = this.value === 'refinance' ? 'block' : 'none';
        });
    }
    
    // Vehicle request form
    if (vehicleRequestForm) {
        vehicleRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Vehicle valuation request submitted successfully!');
            this.reset();
        });
    }
    
    // CSV upload
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            csvUpload.click();
        });
    }
    
    if (csvUpload) {
        csvUpload.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                const file = this.files[0];
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const csvData = event.target.result;
                    const rows = csvData.split('\n').slice(0, 5);
                    
                    const tbody = document.querySelector('#csv-preview-table tbody');
                    tbody.innerHTML = '';
                    
                    rows.forEach(row => {
                        if (row.trim()) {
                            const cells = row.split(',');
                            const tr = document.createElement('tr');
                            
                            for (let i = 0; i < 5 && i < cells.length; i++) {
                                const td = document.createElement('td');
                                td.textContent = cells[i];
                                tr.appendChild(td);
                            }
                            
                            tbody.appendChild(tr);
                        }
                    });
                    
                    uploadPreview.style.display = 'block';
                    confirmUploadBtn.disabled = false;
                };
                
                reader.readAsText(file);
            }
        });
    }
    
    // Confirm upload
    if (confirmUploadBtn) {
        confirmUploadBtn.addEventListener('click', function() {
            alert('Bulk upload processed successfully!');
            uploadPreview.style.display = 'none';
            csvUpload.value = '';
        });
    }
    
    // Select all checkbox
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.request-checkbox:checked');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            
            updateAssignActions();
        });
    }
    
    // Individual request checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('request-checkbox')) {
            updateAssignActions();
        }
    });
    
    // Agency select change
    if (assignToSelect) {
        assignToSelect.addEventListener('change', function() {
            const agencyId = parseInt(this.value);
            const agency = agencies.find(a => a.id === agencyId);
            
            assignAgentSelect.innerHTML = '<option value="">Select agent</option>';
            assignAgentSelect.disabled = !agency;
            
            if (agency) {
                agency.agents.forEach(agent => {
                    const option = document.createElement('option');
                    option.value = agent;
                    option.textContent = agent;
                    assignAgentSelect.appendChild(option);
                });
            }
        });
    }
    
    // Confirm assign
    if (confirmAssignBtn) {
        confirmAssignBtn.addEventListener('click', function() {
            const agencyId = assignToSelect.value;
            const agentName = assignAgentSelect.value;
            
            if (!agencyId) {
                alert('Please select an agency');
                return;
            }
            
            if (!agentName) {
                alert('Please select an agent');
                return;
            }
            
            const selectedRequests = [];
            document.querySelectorAll('.request-checkbox:checked').forEach(checkbox => {
                selectedRequests.push(checkbox.getAttribute('data-id'));
            });
            
            alert(`Assigned ${selectedRequests.length} requests to ${agentName} at ${agencies.find(a => a.id == agencyId).name}`);
            
            // Reset selection
            selectAllCheckbox.checked = false;
            document.querySelectorAll('.request-checkbox').forEach(cb => cb.checked = false);
            assignActions.style.display = 'none';
        });
    }
    
    // Sidebar toggle
    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-angle-double-left');
                icon.classList.add('fa-angle-double-right');
            } else {
                icon.classList.remove('fa-angle-double-right');
                icon.classList.add('fa-angle-double-left');
            }
        });
    }
}

// Show dashboard
function showDashboard() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn) {
        showPage('admin-dashboard');
        
        // Set username if available
        const username = localStorage.getItem('username');
        if (username) {
            adminUsername.textContent = username;
            userAvatar.textContent = username.charAt(0).toUpperCase() + (username.split(' ')[1] ? username.split(' ')[1].charAt(0).toUpperCase() : '');
        }
    } else {
        showPage('login-page');
    }
}

// Update assign actions visibility
function updateAssignActions() {
    const anyChecked = document.querySelectorAll('.request-checkbox:checked').length > 0;
    assignActions.style.display = anyChecked ? 'flex' : 'none';
    
    // Update confirm button text
    if (anyChecked) {
        const count = document.querySelectorAll('.request-checkbox:checked').length;
        confirmAssignBtn.textContent = `Assign Selected (${count})`;
    }
    
    // Update select all checkbox
    selectAllCheckbox.checked = anyChecked && 
        document.querySelectorAll('.request-checkbox:checked').length === 
        document.querySelectorAll('.request-checkbox').length;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showDashboard();
    }
});

function getAgencies() {
    return JSON.parse(localStorage.getItem('agenciesData') || '[]');
}
function saveAgencies(data) {
    localStorage.setItem('agenciesData', JSON.stringify(data));
}
function renderAgencies() {
    const agencies = getAgencies();
    agenciesTableBody.innerHTML = '';
    agencies.forEach((agency, idx) => {
        const tr = document.createElement('tr');
        const agentsHtml = (agency.agents || []).map(agent =>
            `<span class="agent-badge agent-status-${agent.status}">${agent.name} <span>(${agent.status.charAt(0).toUpperCase() + agent.status.slice(1)})</span></span>`
        ).join(' ');
        tr.innerHTML = `
            <td>${agency.name}</td>
            <td>${agency.contactPerson || ''}</td>
            <td>${agency.contactNumber || ''}</td>
            <td>${agency.state || ''}</td>
            <td>${agency.supportLocation || ''}</td>
            <td>${agency.agreementStart || ''}</td>
            <td>${agency.agreementEnd || ''}</td>
            <td>${agentsHtml}</td>
            <td>
                <button class="btn btn-outline btn-sm edit-agency-btn" data-idx="${idx}"><i class="fas fa-edit"></i> Edit</button>
            </td>
        `;
        agenciesTableBody.appendChild(tr);
    });
    document.querySelectorAll('.edit-agency-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            openAgencyModal(idx);
        });
    });
}
function renderFieldOfficers() {
    const agencies = getAgencies();
    fieldOfficersTableBody.innerHTML = '';
    agencies.forEach(agency => {
        (agency.agents || []).forEach(agent => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${agent.name}</td>
                <td>${agency.name}</td>
                <td>${agent.state || ''}</td>
                <td>${agent.city || ''}</td>
                <td class="agent-service-location">${agent.serviceLocation || ''}</td>
                <td><span class="agent-badge agent-status-${agent.status}">${agent.status ? agent.status.charAt(0).toUpperCase() + agent.status.slice(1) : ''}</span></td>
                <td><span class="rating-stars">${'★'.repeat(agent.rating || 5)}${'☆'.repeat(5 - (agent.rating || 5))}</span></td>
            `;
            fieldOfficersTableBody.appendChild(tr);
        });
    });
}
function openAgencyModal(idx = null) {
    editAgencyIndex = idx;
    agencyModalTitle.textContent = idx === null ? 'Add Agency' : 'Edit Agency';
    agencyForm.reset();
    agentsList.innerHTML = '';
    if (idx !== null) {
        const agencies = getAgencies();
        const agency = agencies[idx];
        agencyNameInput.value = agency.name;
        contactPersonInput.value = agency.contactPerson || '';
        contactNumberInput.value = agency.contactNumber || '';
        agencyAddressInput.value = agency.address || '';
        agencyStateInput.value = agency.state || '';
        agencyCityInput.value = agency.city || '';
        supportLocationInput.value = agency.supportLocation || '';
        agreementStartInput.value = agency.agreementStart || '';
        agreementEndInput.value = agency.agreementEnd || '';
        (agency.agents || []).forEach(agent => addAgentField(agent));
    } else {
        addAgentField();
    }
    agencyModal.style.display = 'flex';
}
function closeAgencyModalFunc() {
    agencyModal.style.display = 'none';
}
function addAgentField(agent = {}) {
    const row = document.createElement('div');
    row.className = 'form-row';
    row.innerHTML = `
        <input type="text" class="agent-name-input" placeholder="Agent Name" value="${agent.name || ''}" required>
        <input type="text" class="agent-state-input" placeholder="State" value="${agent.state || ''}" required>
        <input type="text" class="agent-city-input" placeholder="City" value="${agent.city || ''}" required>
        <input type="text" class="agent-service-location-input" placeholder="Service Location" value="${agent.serviceLocation || ''}" required>
        <select class="agent-status-select">
            <option value="available" ${agent.status === 'available' ? 'selected' : ''}>Available</option>
            <option value="busy" ${agent.status === 'busy' ? 'selected' : ''}>Busy</option>
            <option value="inactive" ${agent.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        </select>
        <input type="number" class="agent-rating-input" placeholder="Rating (1-5)" min="1" max="5" value="${agent.rating || 5}" required style="width:60px;">
        <button type="button" class="btn btn-icon remove-agent-btn" title="Remove Agent"><i class="fas fa-trash"></i></button>
    `;
    row.querySelector('.remove-agent-btn').onclick = () => row.remove();
    agentsList.appendChild(row);
}
if (addAgencyBtn) {
    addAgencyBtn.onclick = () => openAgencyModal();
}
if (closeAgencyModal) {
    closeAgencyModal.onclick = closeAgencyModalFunc;
}
if (addAgentBtn) {
    addAgentBtn.onclick = () => addAgentField();
}
if (agencyForm) {
    agencyForm.onsubmit = function(e) {
        e.preventDefault();
        const name = agencyNameInput.value.trim();
        const contactPerson = contactPersonInput.value.trim();
        const contactNumber = contactNumberInput.value.trim();
        const address = agencyAddressInput.value.trim();
        const state = agencyStateInput.value.trim();
        const city = agencyCityInput.value.trim();
        const supportLocation = supportLocationInput.value.trim();
        const agreementStart = agreementStartInput.value;
        const agreementEnd = agreementEndInput.value;
        const agentNames = Array.from(agentsList.querySelectorAll('.agent-name-input')).map(input => input.value.trim());
        const agentStates = Array.from(agentsList.querySelectorAll('.agent-state-input')).map(input => input.value.trim());
        const agentCities = Array.from(agentsList.querySelectorAll('.agent-city-input')).map(input => input.value.trim());
        const agentServiceLocations = Array.from(agentsList.querySelectorAll('.agent-service-location-input')).map(input => input.value.trim());
        const agentStatuses = Array.from(agentsList.querySelectorAll('.agent-status-select')).map(select => select.value);
        const agentRatings = Array.from(agentsList.querySelectorAll('.agent-rating-input')).map(input => parseInt(input.value) || 5);
        if (!name || !contactPerson || !contactNumber || !address || !state || !city || !supportLocation || !agreementStart || !agreementEnd || agentNames.some(n => !n)) {
            alert('Please fill all fields');
            return;
        }
        const agents = agentNames.map((n, i) => ({
            name: n,
            state: agentStates[i],
            city: agentCities[i],
            serviceLocation: agentServiceLocations[i],
            status: agentStatuses[i],
            rating: agentRatings[i]
        }));
        let agencies = getAgencies();
        const agencyData = { name, contactPerson, contactNumber, address, state, city, supportLocation, agreementStart, agreementEnd, agents };
        if (editAgencyIndex === null) {
            agencies.push(agencyData);
        } else {
            agencies[editAgencyIndex] = agencyData;
        }
        saveAgencies(agencies);
        closeAgencyModalFunc();
        renderAgencies();
        renderFieldOfficers();
    };
}
window.onclick = function(event) {
    if (event.target === agencyModal) closeAgencyModalFunc();
};
renderAgencies();
renderFieldOfficers();

function getAllAgentsByState(state) {
    const agencies = getAgencies();
    let agents = [];
    agencies.forEach(agency => {
        (agency.agents || []).forEach(agent => {
            if (agent.state && agent.state.toLowerCase() === state.toLowerCase() && agent.status === 'available') {
                agents.push({
                    name: agent.name,
                    agency: agency.name,
                    id: `${agency.name}__${agent.name}`,
                    ...agent
                });
            }
        });
    });
    return agents;
}

function normalizeBankName(name) {
    return (name || '').toLowerCase().replace(/ bank$/, '').trim();
}

function getAllAgentsByCity(city) {
    const agencies = getAgencies();
    let agentsByAgency = {};
    agencies.forEach(agency => {
        (agency.agents || []).forEach(agent => {
            if (agent.city && agent.city.toLowerCase() === city.toLowerCase() && agent.status === 'available') {
                if (!agentsByAgency[agency.name]) agentsByAgency[agency.name] = [];
                agentsByAgency[agency.name].push(agent);
            }
        });
    });
    return agentsByAgency;
}

function openAssignAgentModal(row, city) {
    currentAssignRow = row;
    assignAgentList.innerHTML = '';
    const agentsByAgency = getAllAgentsByCity(city);
    let options = '';
    Object.keys(agentsByAgency).forEach(agencyName => {
        options += `<optgroup label="${agencyName}">`;
        agentsByAgency[agencyName].forEach(agent => {
            options += `<option value="${agencyName}__${agent.name}">${agent.name}</option>`;
        });
        options += '</optgroup>';
    });
    if (!options) {
        assignAgentList.innerHTML = '<option value="">No available agents for this city</option>';
    } else {
        assignAgentList.innerHTML = options;
    }
    assignAgentModal.style.display = 'flex';
}
if (closeAssignAgentModal) {
    closeAssignAgentModal.onclick = () => assignAgentModal.style.display = 'none';
}
if (confirmAssignAgentBtn) {
    confirmAssignAgentBtn.onclick = function() {
        if (!currentAssignRow) return;
        const selected = assignAgentList.value;
        if (!selected) {
            alert('Please select an agent');
            return;
        }
        // Extract agency and agent name from value
        const [agencyName, agentName] = selected.split('__');
        // Set agent name in the table row
        const agentCell = currentAssignRow.querySelector('td:nth-child(9)');
        if (agentCell) agentCell.textContent = agentName;
        // Set agency name in the table row
        const agencyCell = currentAssignRow.querySelector('td:nth-child(8)');
        if (agencyCell) agencyCell.textContent = agencyName;
        // Set status to Assigned
        const statusCell = currentAssignRow.querySelector('td:nth-child(10) .badge');
        if (statusCell) {
            statusCell.className = 'badge badge-primary';
            statusCell.textContent = 'Assigned';
        }
        assignAgentModal.style.display = 'none';
    };
}
function setupAssignAgentButtons() {
    const assignRequestsTable = document.getElementById('assign-requests-table');
    if (!assignRequestsTable) return;
    assignRequestsTable.querySelectorAll('tbody tr').forEach(row => {
        const assignBtn = row.querySelector('button[title="Assign"]');
        if (assignBtn) {
            assignBtn.onclick = function() {
                // Get city from the row (6th cell: City)
                const city = row.querySelector('td:nth-child(6)')?.textContent?.trim() || '';
                openAssignAgentModal(row, city);
            };
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    setupAssignAgentButtons();
});

function filterAssignRequestsTable() {
    const statusVal = filterStatus.value;
    const typeVal = filterType.value;
    const bankVal = filterBank.value;
    const searchVal = (searchBox.value || '').toLowerCase();
    assignRequestsTable.querySelectorAll('tbody tr').forEach(row => {
        let show = true;
        // Status
        if (statusVal !== 'all') {
            const statusCell = row.querySelector('td:nth-child(10) .badge');
            if (!statusCell || statusCell.textContent.trim().toLowerCase() !== statusVal) show = false;
        }
        // Type
        if (typeVal !== 'all') {
            const typeCell = row.querySelector('td:nth-child(7) .badge');
            if (!typeCell || typeCell.textContent.trim().toLowerCase() !== typeVal) show = false;
        }
        // Bank
        if (bankVal !== 'all') {
            const bankCell = row.querySelector('td:nth-child(4)');
            if (!bankCell || normalizeBankName(bankCell.textContent) !== normalizeBankName(bankVal)) show = false;
        }
        // Search (matches any cell)
        if (searchVal) {
            const rowText = row.textContent.toLowerCase();
            if (!rowText.includes(searchVal)) show = false;
        }
        row.style.display = show ? '' : 'none';
    });
}
if (filterStatus) filterStatus.onchange = filterAssignRequestsTable;
if (filterType) filterType.onchange = filterAssignRequestsTable;
if (filterBank) filterBank.onchange = filterAssignRequestsTable;
if (searchBox) searchBox.oninput = filterAssignRequestsTable;
if (applyFiltersBtn) applyFiltersBtn.onclick = filterAssignRequestsTable;

function getClients() {
    return JSON.parse(localStorage.getItem('clientsData') || '[]');
}
function saveClients(data) {
    localStorage.setItem('clientsData', JSON.stringify(data));
}
function generateClientCode() {
    // Simple unique code: CLT + timestamp + random 2 digits
    return 'CLT' + Date.now() + Math.floor(Math.random() * 90 + 10);
}
function renderClients() {
    const clients = getClients();
    clientsTableBody.innerHTML = '';
    clients.forEach((client, idx) => {
        const isActive = client.status === 'active';
        const statusToggle = `<button class="status-toggle-btn" data-idx="${idx}" title="Toggle Status" style="background:none;border:none;cursor:pointer;outline:none;"><i class="fas fa-toggle-${isActive ? 'on' : 'off'}" style="color:${isActive ? 'green' : 'red'};font-size:1.5em;"></i></button>`;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.code || ''}</td>
            <td>${client.name}</td>
            <td>${client.contactPerson}</td>
            <td>${client.contactNumber}</td>
            <td>${client.city || ''}</td>
            <td>${statusToggle}</td>
            <td>
                <button class="btn btn-outline btn-sm edit-client-btn" data-idx="${idx}" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline btn-sm fees-client-btn" data-idx="${idx}" title="Fees"><i class="fas fa-rupee-sign"></i></button>
                <button class="btn btn-outline btn-sm delete-client-btn" data-idx="${idx}" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        clientsTableBody.appendChild(tr);
    });
    document.querySelectorAll('.edit-client-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            openClientModal(idx);
        });
    });
    document.querySelectorAll('.delete-client-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            if (confirm('Are you sure you want to delete this client?')) {
                let clients = getClients();
                clients.splice(idx, 1);
                saveClients(clients);
                renderClients();
            }
        });
    });
    document.querySelectorAll('.fees-client-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const clients = getClients();
            currentFeeClientIdx = idx;
            // Load values into modal
            document.querySelectorAll('.modal-refinance-fee-input').forEach(input => {
                const type = input.getAttribute('data-type');
                input.value = clients[idx].fees && clients[idx].fees.refinance && clients[idx].fees.refinance[type] !== undefined ? clients[idx].fees.refinance[type] : '';
            });
            document.querySelectorAll('.modal-repo-fee-input').forEach(input => {
                const type = input.getAttribute('data-type');
                input.value = clients[idx].fees && clients[idx].fees.repo && clients[idx].fees.repo[type] !== undefined ? clients[idx].fees.repo[type] : '';
            });
            feeModal.style.display = 'flex';
        });
    });
    // Status toggle functionality
    document.querySelectorAll('.status-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const clients = getClients();
            clients[idx].status = clients[idx].status === 'active' ? 'inactive' : 'active';
            saveClients(clients);
            renderClients();
        });
    });
}
function openClientModal(idx = null) {
    editClientIndex = idx;
    clientModalTitle.textContent = idx === null ? 'Add Client' : 'Edit Client';
    clientForm.reset();
    // Clear all fee inputs
    document.querySelectorAll('.refinance-fee-input').forEach(input => input.value = '');
    document.querySelectorAll('.repo-fee-input').forEach(input => input.value = '');
    if (idx !== null) {
        const clients = getClients();
        const client = clients[idx];
        clientNameInput.value = client.name;
        clientContactPersonInput.value = client.contactPerson;
        clientContactNumberInput.value = client.contactNumber;
        clientCityInput.value = client.city || '';
        clientStatusInput.value = client.status || 'active';
        // Load fee fields
        if (client.fees && client.fees.refinance) {
            document.querySelectorAll('.refinance-fee-input').forEach(input => {
                const type = input.getAttribute('data-type');
                input.value = client.fees.refinance[type] !== undefined ? client.fees.refinance[type] : '';
            });
        }
        if (client.fees && client.fees.repo) {
            document.querySelectorAll('.repo-fee-input').forEach(input => {
                const type = input.getAttribute('data-type');
                input.value = client.fees.repo[type] !== undefined ? client.fees.repo[type] : '';
            });
        }
    }
    clientModal.style.display = 'flex';
}
function closeClientModalFunc() {
    clientModal.style.display = 'none';
}
if (closeClientModal) closeClientModal.onclick = closeClientModalFunc;
if (clientForm) {
    clientForm.onsubmit = function(e) {
        e.preventDefault();
        const name = clientNameInput.value.trim();
        const contactPerson = clientContactPersonInput.value.trim();
        const contactNumber = clientContactNumberInput.value.trim();
        const city = clientCityInput.value.trim();
        const status = clientStatusInput.value;
        // Fee fields
        const refinanceFee = {};
        document.querySelectorAll('.refinance-fee-input').forEach(input => {
            const type = input.getAttribute('data-type');
            const val = parseFloat(input.value) || 0;
            refinanceFee[type] = val;
        });
        const repoFee = {};
        document.querySelectorAll('.repo-fee-input').forEach(input => {
            const type = input.getAttribute('data-type');
            const val = parseFloat(input.value) || 0;
            repoFee[type] = val;
        });
        if (!name || !contactPerson || !contactNumber || !city || !status) {
            alert('Please fill all required fields');
            return;
        }
        if (contactNumber.length !== 10) {
            alert('Mobile Number must be exactly 10 digits');
            clientContactNumberInput.focus();
            return;
        }
        // Validate fee values
        for (const t of VEHICLE_TYPES) {
            if (refinanceFee[t] < 0 || repoFee[t] < 0) {
                alert('Fee values must be non-negative');
                return;
            }
        }
        const clients = getClients();
        let clientData = { name, contactPerson, contactNumber, city, status, fees: { refinance: refinanceFee, repo: repoFee } };
        if (editClientIndex === null) {
            clientData.code = generateClientCode();
            clients.push(clientData);
        } else {
            clientData.code = clients[editClientIndex].code;
            clients[editClientIndex] = clientData;
        }
        saveClients(clients);
        closeClientModalFunc();
        renderClients();
    };
}
window.onclick = function(event) {
    if (event.target === clientModal) closeClientModalFunc();
};
renderClients();

// --- Enforce 10-digit validation for all contact/mobile number fields ---
function validateMobileInput(input) {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
    input.addEventListener('blur', function() {
        if (this.value.length > 0 && this.value.length < 10) {
            alert('Mobile/Contact Number must be exactly 10 digits');
            this.focus();
        }
    });
}
// Agency form contact number validation
if (contactNumberInput) validateMobileInput(contactNumberInput);
// Client form contact number validation
if (clientContactNumberInput) validateMobileInput(clientContactNumberInput);

function insertSampleClients() {
    if (getClients().length === 0) {
        const sampleClients = [
            {
                code: generateClientCode(),
                name: 'HDFC Bank',
                contactPerson: 'Rajesh Kumar',
                contactNumber: '9876543210',
                city: 'Mumbai',
                status: 'active'
            },
            {
                code: generateClientCode(),
                name: 'ICICI Bank',
                contactPerson: 'Priya Nair',
                contactNumber: '9123456789',
                city: 'Delhi',
                status: 'active'
            },
            {
                code: generateClientCode(),
                name: 'Axis Bank',
                contactPerson: 'Sunil Mehta',
                contactNumber: '9988776655',
                city: 'Ahmedabad',
                status: 'inactive'
            },
            {
                code: generateClientCode(),
                name: 'Bajaj Finance',
                contactPerson: 'Meena Joshi',
                contactNumber: '9001122334',
                city: 'Bangalore',
                status: 'active'
            },
            {
                code: generateClientCode(),
                name: 'Kotak Mahindra',
                contactPerson: 'Arun Kumar',
                contactNumber: '9876501234',
                city: 'Chennai',
                status: 'inactive'
            }
        ];
        saveClients(sampleClients);
    }
}

// Add Fee Modal Elements
let feeModal = document.getElementById('fee-modal');
if (feeModal) feeModal.remove();
feeModal = document.createElement('div');
feeModal.id = 'fee-modal';
feeModal.className = 'modal';
feeModal.innerHTML = `
    <div class="modal-content card" style="max-width:500px;">
        <span class="close-modal" id="close-fee-modal">&times;</span>
        <div class="modal-header">
            <h3 id="fee-modal-title">Set Client Fees</h3>
        </div>
        <form id="fee-form">
            <div class="form-group">
                <label>Refinance Fees (Flat Amount for each Vehicle Type):</label>
                <table class="fee-table" id="modal-refinance-fee-table">
                    <thead>
                        <tr>
                            <th>Vehicle Type</th>
                            <th>Fee (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${VEHICLE_TYPES.map(type => `<tr><td>${type}</td><td><input type="number" class="modal-refinance-fee-input" data-type="${type}" min="0" placeholder="0"></td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="form-group">
                <label>Repo Fees (Flat Amount for each Vehicle Type):</label>
                <table class="fee-table" id="modal-repo-fee-table">
                    <thead>
                        <tr>
                            <th>Vehicle Type</th>
                            <th>Fee (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${VEHICLE_TYPES.map(type => `<tr><td>${type}</td><td><input type="number" class="modal-repo-fee-input" data-type="${type}" min="0" placeholder="0"></td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Fees</button>
            </div>
        </form>
    </div>
`;
document.body.appendChild(feeModal);
const closeFeeModal = document.getElementById('close-fee-modal');
const feeForm = document.getElementById('fee-form');
let currentFeeClientIdx = null;
if (closeFeeModal) closeFeeModal.onclick = () => { feeModal.style.display = 'none'; };
window.onclick = function(event) {
    if (event.target === feeModal) feeModal.style.display = 'none';
    if (event.target === clientModal) closeClientModalFunc();
};
if (feeForm) {
    feeForm.onsubmit = function(e) {
        e.preventDefault();
        const refinanceFee = {};
        document.querySelectorAll('.modal-refinance-fee-input').forEach(input => {
            const type = input.getAttribute('data-type');
            const val = parseFloat(input.value) || 0;
            refinanceFee[type] = val;
        });
        const repoFee = {};
        document.querySelectorAll('.modal-repo-fee-input').forEach(input => {
            const type = input.getAttribute('data-type');
            const val = parseFloat(input.value) || 0;
            repoFee[type] = val;
        });
        // Validate fee values
        for (const t of VEHICLE_TYPES) {
            if (refinanceFee[t] < 0 || repoFee[t] < 0) {
                alert('Fee values must be non-negative');
                return;
            }
        }
        const clients = getClients();
        if (currentFeeClientIdx !== null && clients[currentFeeClientIdx]) {
            clients[currentFeeClientIdx].fees = { refinance: refinanceFee, repo: repoFee };
            saveClients(clients);
            renderClients();
        }
        feeModal.style.display = 'none';
    };
}

// Vehicle types for fees
const VEHICLE_TYPES = [
    'Two Wheeler',
    '3 Wheeler',
    '4 Wheeler',
    'Commercial Vehicle',
    'Construction Vehicle',
    'Electronic Vehicle',
    'Farm Equipment'
];
