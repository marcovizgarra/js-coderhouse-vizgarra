let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

// let btnSave = document.getElementById("save_form");
// btnSave.onsubmit = save;

let pruebaGuardar = document.getElementById("save_btn");
pruebaGuardar.onclick = save;

let btnClear = document.getElementById("clear_btn");
btnClear.onclick = clear;

let btnSearchStorage = document.getElementById("search_btn");
btnSearchStorage.onclick = searchStorage;

const dates = [];
const header = [
    {
        "ord": "ORD",
        "last_name": "APELLIDO",
        "name": "NOMBRE",
        "dni": "DNI",
        "quantity": "CANTIDAD",
        "begin": "INICIO",
        "end": "FIN",
        "reinstatement": "REINTEGRO",
    }
]