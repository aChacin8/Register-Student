class Students {
    constructor(name, lastName, age, materias = []) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.materias = materias; 
    }
};

let studentsList = JSON.parse(localStorage.getItem("list")) || [];

const registerStudent = () => {
    let submit = document.querySelector("#submit_register");

    submit.addEventListener("click", () => {
        let name = document.querySelector("#input_register").value;
        let lastName = document.querySelector("#input_register_2").value;
        let age = document.querySelector("#input_register_3").value;

        let exist = studentsList.find(student => student.name === name && student.lastName === lastName);

        if (exist) {
            alert("Estudiante existente");
        } else {
            let newStudent = new Students(name, lastName, age);
            studentsList.push(newStudent);  
            alert(`Estudiante registrado: ${name} ${lastName}`);
            localStorage.setItem("list", JSON.stringify(studentsList));
            loadStudent(); 
        }

        document.querySelector("#input_register").value = '';
        document.querySelector("#input_register_2").value = '';
        document.querySelector("#input_register_3").value = '';
    });
}

const buttonStudent = (student, index) => {
    let buttonCreate = document.createElement("button");
    buttonCreate.innerHTML = `Ver estudiante ${index + 1}`;
    buttonCreate.classList.add("student_button"); //para identificar y modificar en css

    buttonCreate.addEventListener("click", () => {
        baseStudent(student, index); 
    });

    return buttonCreate;
}

const baseStudent = (student, index) => {
    let studentsLocal = document.querySelector("#check_student");

    studentsLocal.innerHTML = `
        <div id="new_html">
            <p id="label_login">Nombre del Alumno: ${student.name} ${student.lastName}</p>
            <p id="label_login">Edad del Alumno: ${student.age} años</p>
            <p id="label_login">Materias registradas: </p>
            <ul id="materias_list">
                ${renderMaterias(student.materias)} 
            </ul>
            <div id="info_materia">
                <label for="materia_select" id="materia_label">Elige una materia:</label>
                <select id="materia_select">
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Literatura">Literatura</option>
                    <option value="Programación">Programación</option>
                    <option value="Química">Química</option>
                </select>
                <input id="calificacion_input" placeholder="Calificación" required type="number" min="1" max="10">
                <div id ="button_student">
                    <button id="add_materia_button">Agregar Materia</button>
                    <button id="add_materia_button" onclick ="window.location.reload()">Retroceder</button>

                </div>
            </div>
        </div>`;

    document.querySelector("#add_materia_button").addEventListener("click", () => {
        let calificacion = parseFloat(document.querySelector("#calificacion_input").value);
        let materia = document.querySelector("#materia_select").value;

        addMateria(student, materia, calificacion);
        
        baseStudent(student, index); 
    });
}

const loadStudent = () => {
    document.querySelector("#login_button").innerHTML = ''; 
    studentsList.forEach((student, index) => {
        const buttonCreate = buttonStudent(student, index);
        document.querySelector("#login_button").appendChild(buttonCreate);
    });
}

const addMateria = (student, materia, calificacion) => {
    if (calificacion > 0 && calificacion < 11) {
        student.materias.push({ materia, calificacion });
        localStorage.setItem("list", JSON.stringify(studentsList)); 
    } else {
        alert("Por favor, ingresa una calificación válida");
    }
}

const renderMaterias = (materias) => {
    if (!Array.isArray(materias) || materias.length === 0) { //!Array.isArray para comprobar si es un arreglo, además evita errores de condición 
        return '<li>No hay materias registradas</li>';
    }
    return materias.map(m => `<li>${m.materia}: ${m.calificacion}</li>`).join('');
};

const formHandler = () => {
    let submit = document.querySelector("#form_student");
    submit.addEventListener("submit", (event) => { event.preventDefault(); });
    registerStudent();
}


formHandler();
loadStudent(); 
