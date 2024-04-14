alert("Bienvenido a el juego del número secreto!\n\nPara jugar, ingresá el rango entre el que queres que se encuentre el número \n\nTenés 5 intentos para advinar el número\n\nSi estas listo presioná aceptar para ingresar el rango en el que estará el número secreto");

let min = 0;
let max = 0;
let tryX = null;
let win = false;
let tryCount = 0;

//Función para crear un número aleatorio
function createRandomNum(minValue, maxValue) {
    let randomNumber = Math.random();
    let randomNumberRange = Math.floor(randomNumber * (maxValue - minValue +1)) +minValue;

    return randomNumberRange;
}

min = parseInt(prompt("Ingresá el mínimo del número secreto"));

// Solicitar el número mínimo
do {
    if (min <=0) {
        alert("El número ingresado tiene que ser mayor que 0");
        min = parseInt(prompt("Ingresá el mínimo del número secreto"));
    }else if (isNaN(min)) {
        alert("Solamente se pueden ingresar numeros");
        min = parseInt(prompt("Ingresá el mínimo del número secreto"));
    }
}while (isNaN(min) || min <= 0);

// Solicitar el número máximo
max = parseInt(prompt("Ingresá el máximo del número secreto"));

do {
    if (max <=0) {
        alert("El número ingresado tiene que ser mayor que 0 (cero)")
        max = parseInt(prompt("Ingresá el máximo del número secreto"))
    }else if (max <= min) {
        alert("El número ingresado no puede ser el menor, o el mismo que el mínimo");
        max = parseInt(prompt("Ingresá el máximo del número secreto"));
    }else if (isNaN(max)) {
        alert("Solamente se pueden ingresar números");
        max = parseInt(prompt("Ingresá el máximo del número secreto"));
    }
}while (isNaN(max) || max <=0 || max <= min);

if (min != 0 & max != 0) {
    //Creación del número secreto
    let secretNumber = createRandomNum(min, max);

    alert("Todo listo para jugar, suerte!!");

    do {
        tryX = parseInt(prompt("Ingresá el número secreto"));

        if (tryX <min) {
            alert("No podes ingresar números menores al minimo establecido, que es: " + min);
        }else if (tryX > max) {
            alert("No podes ingresar números mayores que el máximo establecido, que es: " + max);
        }else if (isNaN(tryX)) {
            alert("Solamente se pueden ingresar números");
        }else if (tryCount == 4) {
            alert("Agotaste todos tus intentos, recarga la página para volver a intentarlo, que tengas suerte");
            win = true;
        }else if (tryX != secretNumber) {
            alert("No adivinaste, intentá de nuevo\n\nTe quedan " + (4 - tryCount) + " intentos");
            tryCount++;
        }else if (tryX == secretNumber) {
            alert("Felicidades!!, adivinaste el número secreto");
            win = true;
            let message = "Hace clic en aceptar para celebrar";
            message;
            if (confirm(message)) {
                window.location.href = "https://www.youtube.com/watch?v=skVg5FlVKS0";
            }
        }
    }while (win == false & tryCount <5);
}
