let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

let yearBeginValidated = null;
let yearEndValidated = null;

const dates = [];

function arrayDOM(array) {
    const div_fecha = document.getElementById("fecha");
    div_fecha.innerHTML="";

    array.forEach(object => {
        const div_contenedor = document.createElement("div");
        div_contenedor.classList.add("contenedor_objeto");

        for (const key in object) {
            const p = document.createElement("p");
            p.classList.add("item_object")
            p.textContent = `${key.toUpperCase()}: ${object[key]}`;
        
            div_contenedor.appendChild(p);
        }

        div_fecha.appendChild(div_contenedor);
    });
};

function fechaFormateada (inputDate) {
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
};

function reinstatementDate (inputDate) {

        inputDate = (new Date(inputDate))
        year = inputDate.getFullYear();
        month = inputDate.getMonth();
        day = inputDate.getDate();
    
        let reinstatement = new Date(year, month, day + 2).toISOString().slice(0, 10);
        return reinstatement;
};

function validarFormulario(e) {
    e.preventDefault();
    
    let yearBegin = (new Date(formularioFecha.children[1].value + "T00:00:00")).getFullYear();
    let yearEnd = (new Date(formularioFecha.children[3].value + "T00:00:00")).getFullYear();

    let dateBeginInserted = (formularioFecha.children[1].value);
    let dateEndInserted = (formularioFecha.children[3].value);

    if (isNaN(yearBegin) || String(yearBegin).length > 4) {
        alert("La fecha ingresada en el campo de INICIO no es válida");
    } else if (isNaN(yearEnd) || String(yearEnd).length > 4) {
        alert("La fecha ingresada en el campo de FIN no es válida");
    } else if (dateBeginInserted > dateEndInserted) {
        alert("El campo FIN no puede ser una fecha anterior a la de INICIO.");
        formularioFecha.children[3].value = null; 
    } 
    else {
        yearBeginValidated = true;
        yearEndValidated = true;
    };   

    if (yearBeginValidated === true && yearEndValidated === true) {
        let reinstatement = reinstatementDate(formularioFecha.children[3].value);
        formularioFecha.children[5].value = reinstatement;
    
        let dateBegin = fechaFormateada(formularioFecha.children[1].value);
        let dateEnd = fechaFormateada(formularioFecha.children[3].value);
        let dateReinstatament = fechaFormateada(formularioFecha.children[5].value);
    
        let idFila = dates.length + 1;
       
        dates.push({
            "fila": idFila,
            "inicio": dateBegin,
            "fin": dateEnd,
            "reintegro": dateReinstatament,
        });

        arrayDOM(dates);
    };  
};