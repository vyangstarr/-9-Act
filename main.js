
let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

// Display records automatically
function displayRecords() {
    let table = document.getElementById("records");

    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.firstname}</td>
                <td>${student.middlename}</td>
                <td>${student.lastname}</td>
                <td>${student.age}</td>
                <td>
                    <button class="edit" onclick="editRecord(${index})">
                        Edit
                    </button>

                    <button class="delete" onclick="deleteRecord(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Save new record
function saveRecord() {
    let firstname = document.getElementById("firstname").value.trim();
    let middlename = document.getElementById("middlename").value.trim();
    let lastname = document.getElementById("lastname").value.trim();
    let age = document.getElementById("age").value;

    if (!firstname || !middlename || !lastname || !age || Number(age) < 1) {
        alert("Please complete all fields with a valid age!");
        return;
    }

    let student = {
        firstname,
        middlename,
        lastname,
        age
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    clearInputs();
    displayRecords();
}

// Edit record
function editRecord(index) {
    let student = students[index];

    document.getElementById("firstname").value = student.firstname;
    document.getElementById("middlename").value = student.middlename;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("age").value = student.age;

    editIndex = index;
}

// Delete record
function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayRecords();
    }
}

// Clear input fields
function clearInputs() {
    document.getElementById("firstname").value = "";
    document.getElementById("middlename").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
}

// Display saved records when page loads
displayRecords();
