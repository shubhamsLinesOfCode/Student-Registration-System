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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  return true;
}

// Add student record
addStudentButton.addEventListener("click", () => {
  const name = registrationForm.studentName.value.trim();
  const id = registrationForm.studentID.value.trim();
  const email = registrationForm.email.value.trim();
  const contact = registrationForm.contactNumber.value.trim();

  if (!validateInputs(name, id, email, contact)) return;

  const students = getStudents();
  students.push({ name, id, email, contact });
  saveStudents(students);
  renderStudents();
  registrationForm.reset(); // Clear the form
});

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
    addStudentButton.onclick = () => {
      if (
        !validateInputs(
          registrationForm.studentName.value.trim(),
          registrationForm.studentID.value.trim(),
          registrationForm.email.value.trim(),
          registrationForm.contactNumber.value.trim()
        )
      )
        return;

      students[index] = {
        name: registrationForm.studentName.value.trim(),
        id: registrationForm.studentID.value.trim(),
        email: registrationForm.email.value.trim(),
        contact: registrationForm.contactNumber.value.trim(),
      };
      saveStudents(students);
      renderStudents();
      registrationForm.reset();
      addStudentButton.textContent = "Add Student";
    };
  } else if (target.classList.contains("delete")) {
    // Delete functionality
    students.splice(index, 1);
    saveStudents(students);
    renderStudents();
  }
});

// Initial render
renderStudents();
