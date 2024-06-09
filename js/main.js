let formularioFecha = document.getElementById("form_fechas");
formularioFecha.onsubmit = validarFormulario;

let btnCleanInputs = document.getElementById("clean_inputs");
btnCleanInputs.onclick = cleanInputs;

let btnSave = document.getElementById("save_btn");
btnSave.onclick = save;

let btnClear = document.getElementById("clear_btn");
btnClear.onclick = clear;

let btnSearchStorage = document.getElementById("search_btn");
btnSearchStorage.onclick = searchStorage;

let btnExampleList = document.getElementById("example_btn");
btnExampleList.onclick = exampleList;

let btnViewDatesArray = document.getElementById("view_dates_array");
btnViewDatesArray.onclick = viewDatesArray;

let btnCleanView = document.getElementById("clean_view");
btnCleanView.onclick = cleanView;
