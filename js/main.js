let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

let yearBeginValidated = null;
let yearEndValidated = null;

const dates = [];
const header = [
    {
        "ord": "ORD",
        "begin": "INICIO",
        "end": "FIN",
        "reinstatement": "REINTEGRO",
    }
]

function arrayDOM(array, headerArray) {
    const div_fecha = document.getElementById("fecha");
    div_fecha.innerHTML="";

    const header_div = document.createElement("div");
    header_div.classList.add("encabezado");

    // Encabezado
    headerArray.forEach(object => {
        for (const key in object) {
            const p_header = document.createElement("p");
            p_header.classList.add("header_object");
            p_header.textContent = `${object[key]}`

            header_div.appendChild(p_header);
        }
    });

    //Contendio del objeto con fechas ingresadas
    div_fecha.appendChild(header_div);

    array.forEach(object => {
        const div_contenedor = document.createElement("div");
        div_contenedor.classList.add("contenedor_objeto");

        for (const key in object) {
            const p = document.createElement("p");
            p.classList.add("item_object")
            p.textContent = `${object[key]}`;
        
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

function objectDuplicated(array) {

    let dateBegin = fechaFormateada(formularioFecha.children[1].value);
    let dateEnd = fechaFormateada(formularioFecha.children[3].value);
    let dateReinstatament = fechaFormateada(formularioFecha.children[5].value);
    let validatedObject = true;

    for (let i = 0; i < array.length; i ++) {
        if (array[i].inicio === dateBegin   &&   array[i].fin === dateEnd   &&  array[i].reintegro === dateReinstatament) {
            validatedObject = false;
            break;
        };
    };
    return validatedObject;
};

function validarFormulario(e) {
    e.preventDefault();
    
    let yearBegin = (new Date(formularioFecha.children[1].value + "T00:00:00")).getFullYear();
    let yearEnd = (new Date(formularioFecha.children[3].value + "T00:00:00")).getFullYear();

    let dateBeginInserted = (formularioFecha.children[1].value);
    let dateEndInserted = (formularioFecha.children[3].value);

    if (isNaN(yearBegin) || String(yearBegin).length > 4) {
        alert("La fecha ingresada en el campo de INICIO no es válida");
        yearBeginValidated = false;
    } else if (isNaN(yearEnd) || String(yearEnd).length > 4) {
        alert("La fecha ingresada en el campo de FIN no es válida");
        yearEndValidated = false;
    } else if (dateBeginInserted > dateEndInserted) {
        alert("El campo FIN no puede ser una fecha anterior a la de INICIO.");
        formularioFecha.children[3].value = null;
        yearBeginValidated = false; 
    } else {
        yearBeginValidated = true;
        yearEndValidated = true;
    };   

    let reinstatement = reinstatementDate(formularioFecha.children[3].value);
    formularioFecha.children[5].value = reinstatement;

    let dateBegin = fechaFormateada(formularioFecha.children[1].value);
    let dateEnd = fechaFormateada(formularioFecha.children[3].value);
    let dateReinstatament = fechaFormateada(formularioFecha.children[5].value);
    let idFile = dates.length + 1;

    if (yearBeginValidated === true && yearEndValidated === true && dates.length === 0) { 
        dates.push(
            {
                "fila": idFile,
                "inicio": dateBegin,
                "fin": dateEnd,
                "reintegro": dateReinstatament,
            }
        );
        arrayDOM(dates, header);
    } else if (yearBeginValidated === true && yearEndValidated === true && dates.length > 0 && objectDuplicated(dates) === true) {
        dates.push(
            {
                "fila": idFile,
                "inicio": dateBegin,
                "fin": dateEnd,
                "reintegro": dateReinstatament,
            }
        );
        arrayDOM(dates, header);
    } else {
        alert("No se pueden ingresar filas exactamente iguales");
    };  
};