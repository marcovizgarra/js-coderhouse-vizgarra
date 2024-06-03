let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

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