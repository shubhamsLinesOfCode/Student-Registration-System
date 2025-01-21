// Get form elements and table body
const registrationForm = document.getElementById("registrationForm");
const studentsTableBody = document.querySelector("#studentsTable tbody");
const addStudentButton = document.getElementById("addStudent");

// Function to get students from local storage
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Function to save students to local storage
function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to render students in the table
function renderStudents() {
  const students = getStudents();
  studentsTableBody.innerHTML = ""; // Clear table body

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                <div>
                    <button class="edit inline text-sm" data-index="${index}">Edit
                     <img class="w-5 h-5 mr-2 inline edit cursor-pointer" data-index="${index}" src="./images&icons/user-avatar.png" alt="user-edit-icon"/>
                    </button>
                    </div>
                    <div class="text-nowrap">
                    <button class="delete inline text-sm" data-index="${index}">Delete
                    <img class="w-4 h-4 inline delete cursor-pointer" data-index="${index}" src="./images&icons/delete-friend.png" alt="user-edit-icon"/></button>
                    </div>
                </td>
            `;
    studentsTableBody.appendChild(row);
  });
}

// Function to validate input fields
function validateInputs(name, id, email, contact) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const idRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
  const contactRegex = /^[0-9]+$/;

  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return false;
  }
  if (!nameRegex.test(name)) {
    alert("Student name must contain only letters.");
    return false;
  }
  if (!idRegex.test(id)) {
    alert("Student ID must contain only numbers.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!contactRegex.test(contact)) {
    alert("Contact number must contain only numbers.");
    return false;
  }
  if (contact.length < 10) {
    alert("Contact number can't be less than a 10-digit number");
    return false;
  }
  return true;
}

// Edit or Delete student record
studentsTableBody.addEventListener("click", (e) => {
  const target = e.target;
  const index = target.dataset.index;
  const students = getStudents();

  if (target.classList.contains("edit")) {
    // Edit functionality
    const student = students[index];
    registrationForm.studentName.value = student.name;
    registrationForm.studentID.value = student.id;
    registrationForm.email.value = student.email;
    registrationForm.contactNumber.value = student.contact;

    // Update record on re-submission
    addStudentButton.textContent = "Update Student";

    // Store the index for updating
    addStudentButton.dataset.index = index; // Store index in button's dataset
  } else if (target.classList.contains("delete")) {
    // Delete functionality
    students.splice(index, 1);
    saveStudents(students);
    renderStudents();
  }
});

//This function to ensure that the contact no. the id and the email address remain unique always
function checkUniqueness(students, newStudent) {
  if (students.some((student) => student.email === newStudent.email)) {
    return "Email address is already registered";
  }
  if (students.some((student) => student.id === newStudent.id)) {
    return "A student with this particular ID is already registered";
  }
  if (students.some((student) => student.contact === newStudent.contact)) {
    return "This contact number is already associated with a student";
  }
  return null; // All fields are unique
}

// Update student record when button is clicked
addStudentButton.addEventListener("click", () => {
  const index = addStudentButton.dataset.index; // Get the stored index
  const name = registrationForm.studentName.value.trim();
  const id = registrationForm.studentID.value.trim();
  const email = registrationForm.email.value.trim();
  const contact = registrationForm.contactNumber.value.trim();

  if (!validateInputs(name, id, email, contact)) return;

  const students = getStudents();
  const newStudent = { name, id, email, contact };

  const uniquenessMessage = checkUniqueness(students, newStudent);
  if (uniquenessMessage) {
    alert(uniquenessMessage);
    return;
  }

  if (index !== undefined) {
    // Update existing student
    students[index] = newStudent;
  } else {
    // Add new student
    students.push(newStudent);
  }

  saveStudents(students);
  renderStudents();
  registrationForm.reset();
  addStudentButton.textContent = "Add Student";
  delete addStudentButton.dataset.index; // Clear the index after updating
});

// Initial render
renderStudents();
