function isPair (number) {
    return number % 2 === 0;
};

function formattedDate (inputDate) {
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
    let validatedObject = true;

    //Variables - datos personales
    let l_name = (formularioFecha.children[1].value).toUpperCase();
    let v_name = capitalizeString(formularioFecha.children[3].value);
    let dni = (parseInt(formularioFecha.children[5].value)).toLocaleString('es-ES');

    //Variables - fechas
    let inputBegin = formularioFecha.children[7].value;
    let quantity = parseInt(formularioFecha.children[9].value);
    
    let dateBegin = formattedDate(inputBegin);
    let dateEnd = addDays(inputBegin, quantity - 1);
    let dateReinstatament = formattedDate(addDays(dateEnd, 1));
    dateEnd = formattedDate(dateEnd);
    

    for (let i = 0; i < array.length; i ++) {
        if (array[i].apellido === l_name && array[i].nombre === v_name && array[i].dni === dni && array[i].inicio === dateBegin && array[i].fin === dateEnd && array[i].reintegro  === dateReinstatament) {
            validatedObject = false;
            break;
        };
    };
    return validatedObject;
};

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

    array.forEach((object, index) => {
        const div_contenedor = document.createElement("div");
        div_contenedor.classList.add("contenedor_objeto");

        for (const key in object) {
            const p = document.createElement("p");
            if (isPair(index) === true) {
                p.classList.add("item_object", "pair")
            } else {
                p.classList.add("item_object", "odds")
            }
            p.textContent = `${object[key]}`;
        
            div_contenedor.appendChild(p);
        }

        div_fecha.appendChild(div_contenedor);
    });
};

function validarFormulario(e) {
    e.preventDefault();

    //Variables - datos personales
    let inputDni = formularioFecha.children[5].value;
    let last_name = (formularioFecha.children[1].value).toUpperCase();
    let name = capitalizeString(formularioFecha.children[3].value);
    let dni = (parseInt(inputDni)).toLocaleString('es-ES');

    //Variables - fechas
    let inputBegin = formularioFecha.children[7].value;
    let quantity = parseInt(formularioFecha.children[9].value);
    let yearBegin = (new Date(inputBegin + "T00:00:00")).getFullYear();
    let dateBegin = formattedDate(inputBegin);
    let dateEnd = addDays(inputBegin, quantity - 1);
    let dateReinstatament = formattedDate(addDays(dateEnd, 1));
    let idFile = dates.length + 1;
    dateEnd = formattedDate(dateEnd);

    if (isNaN(yearBegin) || String(yearBegin).length > 4) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">Revise el año de la fecha de inicio</span><br><br>Ha ingresado datos inválidos en el campo INICIO",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        })
        inputValidated = false;
    } else if ((inputDni.toString()).length > 8) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            text: "El DNI ingresado no puede exceder los 8 caracteres",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
               
        inputValidated = false;
    } else if (quantity > 30) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">Revise el campo cantidad</span><br><br>El dato ingresado supera el máximo permitido",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
        inputValidated = false;
    } else if (quantity <= 0 ) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">Revise el campo cantidad</span><br><br>La cantidad ingresada debe ser de al menos un (1) día",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
        inputValidated = false;
    } else {
        inputValidated = true;
    };   

    if (inputValidated === true && dates.length === 0) { 
        dates.push(
            {
                "fila": idFile,
                "apellido": last_name,
                "nombre": name,
                "dni": dni,
                "cantidad": quantity,
                "inicio": dateBegin,
                "fin": dateEnd,
                "reintegro": dateReinstatament,
            }
        );
        arrayDOM(dates, header);
    } else if (objectDuplicated(dates) === false) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">No es posible insertar filas duplicadas</span><br><br>Los datos ingresados ya se encuentran cargados en la base de datos",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
    } else if (inputValidated === true && dates.length > 0 && objectDuplicated(dates) === true) {
        dates.push(
            {
                "fila": idFile,
                "apellido": last_name,
                "nombre": name,
                "dni": dni,
                "cantidad": quantity,
                "inicio": dateBegin,
                "fin": dateEnd,
                "reintegro": dateReinstatament,
            }
        );
        arrayDOM(dates, header);
    };  
};