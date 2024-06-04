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

function localStorageExists (key) {
    let validateFlag = null;
    
    if ((localStorage.getItem(key)) === null) {
        validateFlag = false;
    } else {
        validateFlag = true;
    };
    return validateFlag;
};

function objectDuplicated(array, obj) {
    return array.some(item => 
        item.apellido === obj.apellido &&
        item.nombre === obj.nombre &&
        item.dni === obj.dni &&
        item.inicio === obj.inicio &&
        item.fin === obj.fin &&
        item.reintegro === obj.reintegro
    );
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

    //Variable - Objeto en localStorge
    let objectLocalStorage = JSON.parse(localStorage.getItem("datesObject"));

    let inputValidated = null;
    let newEntry = {
        "fila": idFile,
        "apellido": last_name,
        "nombre": name,
        "dni": dni,
        "cantidad": quantity,
        "inicio": dateBegin,
        "fin": dateEnd,
        "reintegro": dateReinstatament,
    };

    // Validar datos ingresados
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
    } else if (inputDni <= 0) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            text: "El DNI ingresado no puede ser menor o igual que cero",
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

    //Validar que los datos ingresados no estén repetidos
    let flagDatesArray = null;
    let flagLocalStorage = null;
    
    if (inputValidated === true) {

        if (localStorageExists("datesObject") === false && dates.length === 0) {
            dates.push(newEntry);
            arrayDOM(dates, header)
        } else {
            if (dates.length >= 0) {
                flagDatesArray = objectDuplicated(dates, newEntry);
            } 
            
            if (localStorageExists("datesObject") === true) {
                flagLocalStorage = objectDuplicated(objectLocalStorage, newEntry);
            } else {
                flagLocalStorage = false;
            };
        };
    }

    if (flagDatesArray === true) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">No es posible insertar filas duplicadas</span>",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
    };

    if (flagLocalStorage === true) {
        Swal.fire({
            title: "ERROR en la carga de datos",
            html: "<span class=\"alert_span\">No es posible insertar filas duplicadas</span><br><br>Los datos ingresados ya se encuentran cargados en la base de datos",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
    };

    //Insertar filas nuevas si no hay datos repetidos
    if (flagDatesArray === false && flagLocalStorage === false) {
        dates.push(newEntry);
        arrayDOM(dates, header)
    };
};

//modificar para reducir lineas de código
function save (e) {
    e.preventDefault();

    let validateFlag = true;
    let fechasCargadas = document.getElementById("fecha");
    let localStorageString = localStorage.getItem("datesObject");
    let newObject = JSON.parse(localStorageString);
    let newString = "";

    if (dates.length === 0) {
        Swal.fire({
            title: "No ha ingresado datos",
            text: "Ingrese datos y presione enviar, luego el ícono de guardar, para cargarlo a la base de datos",
            icon: "error",
            color: "white",
            background: "#282C34",
            confirmButtonText: "Aceptar",
        });
        validateFlag = false
    } else if (validateFlag === true && localStorageExists("datesObject") === false) {
        let createObjects = []
        for (i = 0; i < dates.length; i++) {
            createObjects.push({
                "fila": dates[i].fila,
                "apellido": dates[i].apellido,
                "nombre": dates[i].nombre,
                "dni": dates[i].dni,
                "cantidad": dates[i].cantidad,
                "inicio": dates[i].inicio,
                "fin": dates[i].fin,
                "reintegro": dates[i].reintegro,
            })
        };
        newString = JSON.stringify(createObjects)
        localStorage.setItem("datesObject",newString);
        fechasCargadas.innerHTML = '';
        dates.length = 0;
    } else if (validateFlag === true && localStorageExists("datesObject") === true) {
        for (i = 0; i < dates.length; i++) {
            newObject.push({
                "fila": dates[i].fila,
                "apellido": dates[i].apellido,
                "nombre": dates[i].nombre,
                "dni": dates[i].dni,
                "cantidad": dates[i].cantidad,
                "inicio": dates[i].inicio,
                "fin": dates[i].fin,
                "reintegro": dates[i].reintegro,
            })
        };
        newString = JSON.stringify(newObject);
        localStorage.setItem("datesObject", newString);
        fechasCargadas.innerHTML = '';
        dates.length = 0;
    };
};

function clear (e) {
    e.preventDefault();

    let fechasCargadas = document.getElementById("fecha");
    localStorage.removeItem("datesObject");
    fechasCargadas.innerHTML = '';

    return dates.length = 0;
};

function searchStorage (e) {
    e.preventDefault();

    let fechasCargadas = document.getElementById("fecha");
    if (localStorageExists("datesObject") === true) {
        let objectLocalStorage = JSON.parse(localStorage.getItem("datesObject"));
        fechasCargadas.innerHTML = '';  
        arrayDOM(objectLocalStorage, header)
    }
};