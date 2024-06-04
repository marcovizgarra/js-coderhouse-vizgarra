let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

let btnSave = document.getElementById("save_form");
btnSave.onsubmit = save;

let btnClear = document.getElementById("clear_local_storage");
btnClear.onsubmit = clear;


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