let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;


function fechaFormateada (inputDate) {
    let newDate = new Date(inputDate + "T00:00:00");
    let day = newDate.getDate(); 
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();

    if (day < 10) {
        day = '0' + String(day);
    }

    if (month < 10) {
        month = '0' + String(month);
    }

    return day + "/" + month + "/" + year;
};

function validarFormulario(e) {
    e.preventDefault();
    
    let yearBegin = (new Date(formularioFecha.children[1].value + "T00:00:00")).getFullYear();
    let yearEnd = (new Date(formularioFecha.children[3].value + "T00:00:00")).getFullYear();

    let dateBeginInserted = (formularioFecha.children[1].value);
    let dateEndInserted = (formularioFecha.children[3].value);

    // let yearBeginValidated = null;
    // let yearEndValidated = null;

    if (isNaN(yearBegin) || String(yearBegin).length > 4) {
        alert("La fecha ingresada en el campo de INICIO no es válida");
    } else if (isNaN(yearEnd) || String(yearEnd).length > 4) {
        alert("La fecha ingresada en el campo de FIN no es válida");
    } else if (dateBeginInserted > dateEndInserted) {
        alert("El campo FIN no puede ser una fecha anterior a la de INICIO.");
        formularioFecha.children[3].value = null; 
    } else {
        yearBeginValidated = true;
        yearEndValidated = true;
    };

    // Calcular la fecha de reintegro y cargarla en el input REINTEGRO:
    // year = (new Date(formularioFecha.children[3].value)).getFullYear();
    // month =  (new Date(formularioFecha.children[3].value)).getMonth();
    // day =  (new Date(formularioFecha.children[3].value)).getDate();

    // let fechaInputReintegro = (new Date(parseInt(year), parseInt(month), parseInt(day+2))).toISOString().slice(0, 10);

    // formularioFecha.children[5].value = fechaInputReintegro;   
};

// localStorage.setItem('fecha_inicio', formularioFecha.children[1].value);
// localStorage.setItem('fecha_fin', formularioFecha.children[3].value);
// localStorage.setItem('fecha_reintegro', formularioFecha.children[5].value);

// EJEMPLOS:
// const div = document.createElement("div");
// const p = document.createElement("p")

// let videoJuegos = [
//     {
//         id: 1,
//         nombre: "Assassin's Creed",
//         plataforma: "PS3",
//         publicacion: 2007,
//         genero: "Aventura", 
//     },
//     {
//         id: 2,
//         nombre: "Assassin's Creed II",
//         pataforma: [
//             "PS3", "PS4"
//         ],
//         publicacion: 2009,
//         genero: "Aventura",
//     }
// ];

// for (const juego of videoJuegos) {
//     let contenedor = document.createElement("div");
//     contenedor.innerHTML = `<h3> ID: ${juego.nombre}</h3>`

//     document.body.appendChild(contenedor);
// }




// MODIFICAR LAS CLASES DE ELEMENTOS EN JS
    // const divPrueba = document.getElementById("div-prueba-15-05");
    // divPrueba.className += "formato-prueba";
    // alert(divPrueba.className);

// GET ELEMENT BY ID - INNER TEXT
    // const titulo  = document.getElementById("titulo");
    // titulo.innerText = "Licencias Anuales";