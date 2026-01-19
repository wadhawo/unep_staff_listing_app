document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // Show login modal if not logged in
    function checkLoginStatus() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            document.getElementById('loginModal').style.display = 'block';
        } else {
            loadStaffData();
        }
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('login.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('userId', data.user_id);
                document.getElementById('loginModal').style.display = 'none';
                loadStaffData();
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    });

    // Logout function
    window.logout = function() {
        localStorage.removeItem('userId');
        document.getElementById('loginModal').style.display = 'block';
    }

    // Load staff table
    async function loadStaffData() {
        try {
            const res = await fetch('staff.php');
            const staffList = await res.json();

            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = '';

            staffList.forEach((staff, index) => {
                const row = `<tr>
                    <td>${staff.index_number}</td>
                    <td>${staff.full_names}</td>
                    <td>${staff.email}</td>
                    <td>${staff.current_location}</td>
                    <td>${staff.highest_level_of_education}</td>
                    <td>${staff.duty_station}</td>
                    <td><button onclick="editStaff(${staff.id})">Edit</button></td>
                </tr>`;
                tbody.insertAdjacentHTML('beforeend', row);
            });
        } catch (err) {
            console.error('Error fetching staff:', err);
        }
    }

});

// Function to fetch staff records and populate the table
async function loadStaffData() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    try {
        // Call the API
        const response = await fetch('server_api/get_staff.php');
        if (!response.ok) throw new Error('Network response was not ok');

        const staffData = await response.json();

        // Loop through each record and create a table row
        staffData.forEach((staff, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${staff.index_number}</td>
                <td>${staff.full_names}</td>
                <td>${staff.email}</td>
                <td>${staff.current_location}</td>
                <td>${staff.highest_level_of_education}</td>
                <td>${staff.duty_station}</td>
                <td>
                    <button class="w3-button w3-green w3-small" onclick="editStaff(${staff.id})">Edit</button>
                    <button class="w3-button w3-red w3-small" onclick="deleteStaff(${staff.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching staff data:', error);
        tableBody.innerHTML = `<tr><td colspan="7">Failed to load staff data.</td></tr>`;
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', listStaff);

function listStaff() {
    if(true){
        fetch('server_api/staff.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach((staff, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${staff.index_number}</td>
                    <td>${staff.full_names}</td>
                    <td>${staff.email}</td>
                    <td>${staff.current_location}</td>
                    <td>${staff.highest_level_of_education}</td>
                    <td>${staff.duty_station}</td>
                    <td>
                        <button class="w3-button w3-green w3-small" onclick="editStaff(${staff.id})">Edit</button>
                        <button class="w3-button w3-red w3-small" onclick="deleteStaff(${staff.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching staff data:', error);
        });
    }else{
        alert('Permission denied!');
    }
}

