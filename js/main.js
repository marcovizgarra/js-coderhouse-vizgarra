let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;


let yearBeginValidated = null;
let yearEndValidated = null;

const dates = [];
const header = [
    {
        "ord": "ORD",
        "last_name": "APELLIDO",
        "name": "NOMBRE",
        "dni": "DNI",
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

function capitalizeString(string) {
    string = string.split(" ");

    let stringUpperCase = string.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    });

    let newString = stringUpperCase.join(" ");
    return newString
};

function addDays (date, add) {
    let newDate = new Date(date + "T00:00:00");
    newDate.setDate(newDate.getDate() + add);
    
    let formattedDate = "";
    let day = newDate.getDate(); 
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if (day < 10) {
        day = '0' + String(day);
    }

    if (month < 10) {
        month = '0' + String(month);
    }

    formattedDate = year + "-" + month + "-" + day
    return formattedDate;
};

function objectDuplicated(array) {

    let dateBegin = fechaFormateada(formularioFecha.children[7].value);
    let dateEnd = fechaFormateada(formularioFecha.children[7].value+quantity);
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

    //Variables - datos personales
    let last_name = (formularioFecha.children[1].value).toUpperCase();
    let name = capitalizeString(formularioFecha.children[3].value);
    let dni = (parseInt(formularioFecha.children[5].value)).toLocaleString('es-ES');

    //Variables - fechas
    let inputBegin = formularioFecha.children[7].value;
    let quantity = parseInt(formularioFecha.children[9].value);
    let yearBegin = (new Date(inputBegin + "T00:00:00")).getFullYear();
    let dateBegin = fechaFormateada(inputBegin);
    let dateEnd = addDays(inputBegin, quantity - 1);
    let dateReinstatament = fechaFormateada(addDays(dateEnd, 1));
    let idFile = dates.length + 1;
    dateEnd = fechaFormateada(dateEnd);

    if (isNaN(yearBegin) || String(yearBegin).length > 4) {
        alert("La fecha ingresada en el campo de INICIO no es válida");
        yearBeginValidated = false;
    } else {
        yearBeginValidated = true;
    };   

    if (yearBeginValidated === true && dates.length === 0) { 
        dates.push(
            {
                "fila": idFile,
                "apellido": last_name,
                "nombre": name,
                "dni": dni,
                "inicio": dateBegin,
                "fin": dateEnd,
                "reintegro": dateReinstatament,
            }
        );
        arrayDOM(dates, header);
    } else if (yearBeginValidated === true && dates.length > 0) { // && objectDuplicated(dates) === true
        dates.push(
            {
                "fila": idFile,
                "apellido": last_name,
                "nombre": name,
                "dni": dni,
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