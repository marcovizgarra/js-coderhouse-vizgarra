// let formularioFecha = document.getElementById("form_fechas");
// formularioFecha.onsubmit = validarFormulario;

// let yearBeginValidated = null;
// let yearEndValidated = null;

// const dates = {};

// function fechaFormateada (inputDate) {
//     let newDate = new Date(inputDate + "T00:00:00");
//     let day = newDate.getDate(); 
//     let month = newDate.getMonth()+1;
//     let year = newDate.getFullYear();

//     if (day < 10) {
//         day = '0' + String(day);
//     }

//     if (month < 10) {
//         month = '0' + String(month);
//     }

//     return day + "/" + month + "/" + year;
// };

// function reinstatementDate (inputDate) {

//         inputDate = (new Date(inputDate))
//         year = inputDate.getFullYear();
//         month = inputDate.getMonth();
//         day = inputDate.getDate();
    
//         let reinstatement = (new Date(parseInt(year), parseInt(month), parseInt(day+2))).toISOString().slice(0, 10);
//         return reinstatement;
//     };

// function validarFormulario(e) {
//     e.preventDefault();
    
//     let yearBegin = (new Date(formularioFecha.children[1].value + "T00:00:00")).getFullYear();
//     let yearEnd = (new Date(formularioFecha.children[3].value + "T00:00:00")).getFullYear();

//     let dateBeginInserted = (formularioFecha.children[1].value);
//     let dateEndInserted = (formularioFecha.children[3].value);

//     if (isNaN(yearBegin) || String(yearBegin).length > 4) {
//         alert("La fecha ingresada en el campo de INICIO no es válida");
//     } else if (isNaN(yearEnd) || String(yearEnd).length > 4) {
//         alert("La fecha ingresada en el campo de FIN no es válida");
//     } else if (dateBeginInserted > dateEndInserted) {
//         alert("El campo FIN no puede ser una fecha anterior a la de INICIO.");
//         formularioFecha.children[3].value = null; 
//     } else {
//         yearBeginValidated = true;
//         yearEndValidated = true;
//     };   

//     if (yearBeginValidated === true && yearEndValidated === true) {
//         let reinstatement = reinstatementDate(formularioFecha.children[3].value);
//         formularioFecha.children[5].value = reinstatement;
    
//         let dateBegin = new Date(formularioFecha.children[1].value + "T00:00:00");
//         let dateEnd = new Date(formularioFecha.children[3].value + "T00:00:00");
//         let dateReinstatament = new Date (formularioFecha.children[5].value + "T00:00:00");
    
//         dates.begin = (dateBegin.toString());
//         dates.end = (dateEnd.toString());
//         dates.reinstatement = (dateReinstatament.toString());

//         const datesString = JSON.stringify(dates);
//         localStorage.setItem("datesObject", datesString);

//         for (const element in dates) {
//             const div_fechas = document.getElementById("fecha");
//             div_fechas.innerHTML = ` <p class="fechas">INICIO: ${dates[element]}</p>
//                                     <p class"fechas">FIN: ${dates[element]}</p>
//                                     <p class"fechas">REINTEGRO: ${dates[element]}</p>
//                                   `
//             document.body.appendChild(div_fechas);
//         }
//     };  
// };





let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

let yearBeginValidated = null;
let yearEndValidated = null;

const dates = {};

function fechaFormateada(inputDate) {
    let newDate = new Date(inputDate + "T00:00:00");
    let day = newDate.getDate(); 
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if (day < 10) {
        day = '0' + String(day);
    }

    if (month < 10) {
        month = '0' + String(month);
    }

    return day + "/" + month + "/" + year;
}

function reinstatementDate(inputDate) {
    inputDate = new Date(inputDate);
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth();
    let day = inputDate.getDate();
    
    let reinstatement = new Date(year, month, day + 2).toISOString().slice(0, 10);
    return reinstatement;
}

function validarFormulario(e) {
    e.preventDefault();
    
    let yearBegin = new Date(formularioFecha.children[1].value + "T00:00:00").getFullYear();
    let yearEnd = new Date(formularioFecha.children[3].value + "T00:00:00").getFullYear();

    let dateBeginInserted = formularioFecha.children[1].value;
    let dateEndInserted = formularioFecha.children[3].value;

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
    }

    if (yearBeginValidated === true && yearEndValidated === true) {
        let reinstatement = reinstatementDate(formularioFecha.children[3].value);
        formularioFecha.children[5].value = reinstatement;
    
        let dateBegin = new Date(formularioFecha.children[1].value + "T00:00:00");
        let dateEnd = new Date(formularioFecha.children[3].value + "T00:00:00");
        let dateReinstatement = new Date(formularioFecha.children[5].value + "T00:00:00");
    
        dates.inicio = fechaFormateada(dateBegin.toISOString().slice(0, 10));
        dates.fin = fechaFormateada(dateEnd.toISOString().slice(0, 10));
        dates.reintegro = fechaFormateada(dateReinstatement.toISOString().slice(0, 10));

        const datesString = JSON.stringify(dates);
        localStorage.setItem("datesObject", datesString);

        const div_fechas = document.getElementById("fecha");
        div_fechas.innerHTML = ""; // Limpiar contenido previo

        for (const key in dates) {
            const p = document.createElement("p");
            p.classList.add("fechas");
            p.innerHTML = `<br>${key.toUpperCase()}: ${dates[key]}`;
            div_fechas.appendChild(p);
        }
    }  
}





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