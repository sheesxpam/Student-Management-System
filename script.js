
let students = [];

let records = document.getElementById("studentRecords");

function displayStudents(data) {
    records.innerHTML = "";

    if (data.length === 0) {
        records.innerHTML = "No student records found.";
        return;
    }

    data.forEach(function(student) {
        records.innerHTML += `
            <div class="student">
                <p><b>ID:</b> ${student.id}</p>
                <p><b>Name:</b> ${student.name}</p>
                <p><b>Age:</b> ${student.age}</p>
                <p><b>Department:</b> ${student.department}</p>
                <p><b>Email:</b> ${student.email}</p>
            </div>
        `;
    });
}

document.getElementById("xmlBtn").addEventListener("click", function() {

    fetch("students.xml")
        .then(response => response.text())
        .then(data => {

            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "text/xml");

            let studentList = xml.getElementsByTagName("student");

            students = [];

            for (let i = 0; i < studentList.length; i++) {

                let student = studentList[i];

                students.push({
                    id: student.getElementsByTagName("id")[0].textContent,
                    name: student.getElementsByTagName("name")[0].textContent,
                    age: student.getElementsByTagName("age")[0].textContent,
                    department: student.getElementsByTagName("department")[0].textContent,
                    email: student.getElementsByTagName("email")[0].textContent
                });
            }

            displayStudents(students);
        });
});

document.getElementById("jsonBtn").addEventListener("click", function() {

    fetch("students.json")
        .then(response => response.json())
        .then(data => {
            students = data.students;
            displayStudents(students);
        });
});

document.getElementById("searchInput").addEventListener("input", function() {

    let search = this.value.toLowerCase();

    let result = students.filter(function(student) {
        return student.name.toLowerCase().includes(search);
    });

    displayStudents(result);
});

document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => Number(student.id))) + 1
            : 1,

        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value
    };

    students.push(newStudent);

    displayStudents(students);

    this.reset();
});
