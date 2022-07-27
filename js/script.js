function ingresopersona() {
    for (let i = 0; i < 1; i++) {
        nombrePersona = prompt("Nombre")
        edadPersona = parseInt(prompt("Edad"));
        nacionalidad = prompt("Nacionalidad");
        razonSocial = prompt("Razon social");
    }
}

function ingresardinero(dineroprestado) {
    alert("Te prestaremos $" + dineroprestado);
    return dineroprestado
}

function cuotas(cuotasapagar) {
    while (cuotasapagar > 12) {
        alert("Error. Solo puedes elegir hasta 12 cuotas");
        cuotasapagar = parseInt(prompt("¿En cuantas cuotas quieres devolver el dinero? Puede hasta 12 meses"));
    }
    alert("Elegiste devolver el dinero en " + cuotasapagar + " meses. El interes es de 10% por cuota");
    return cuotasapagar
}

function devolucion(dineroconinteres, porcuota) {
    alert("Tendras que devolver $" + dineroconinteres + " en total.");
    alert("Tu cuota mensual es de $" + porcuota.toFixed(2));
}
class PersonaSolicitante {
    constructor(nombre, edad, nacionalidad, razonSocial) {
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
        this.razonSocial = razonSocial;
    }
}

class cantidadPrestada {
    constructor(dineroprestado, cuotasapagar, dineroconinteres, porcuota) {
        this.dineroprestado = dineroprestado;
        this.cuotasapagar = cuotasapagar;
        this.dineroconinteres = dineroconinteres;
        this.porcuota = porcuota;
    }
}

ingresopersona();
const clientes = [];
clientes.push(personaIngresada = new PersonaSolicitante(nombrePersona, edadPersona, nacionalidad, razonSocial));
console.log(personaIngresada);

let dineroprestado = parseInt(prompt("Cuanto dinero quieres?"));
ingresardinero(dineroprestado);

let cuotasapagar = parseInt(prompt("¿En cuantas cuotas quieres devolver el dinero? Puede hasta 12 meses"));
cuotas(cuotasapagar);

const interes = cuotasapagar * 10;
let dineroconinteres = dineroprestado + (dineroprestado * (interes / 100));
let porcuota = dineroconinteres / cuotasapagar;
devolucion(dineroconinteres, porcuota);

clientes.push(prestamoPersonal = new cantidadPrestada(dineroprestado, cuotasapagar, dineroconinteres, porcuota));
console.log(prestamoPersonal);

console.log(clientes);

const maxmonth = clientes.some((clientes) => clientes.cuotasapagar >= 12);
console.log(maxmonth);

// desafio complementario

let seccion_calcular_prestamo = document.createElement("section");
document.body.append(seccion_calcular_prestamo);

let datoscredito = document.createElement("div");
datoscredito.innerHTML = `<h2>Tus datos son</h2>
<p>Nombre: ${nombrePersona}</p>
<p>Edad: ${edadPersona}</p>
<p>Nacionalidad: ${nacionalidad}</p>
<p>Razon social: ${razonSocial}</p>`

seccion_calcular_prestamo.append(datoscredito);

let seccionModificada = document.querySelector("#seccion-requisitos h2");
seccionModificada.innerText = "Los datos de tu credito son";

let listamodificada = document.querySelector(".mod1");
listamodificada.innerText = "La cantidad de dinero que te daremos es: " + dineroprestado;
let listamodificada2 = document.querySelector(".mod2");
listamodificada2.innerText = "Lo vas a pagar en: " + cuotasapagar + " meses";
let listamodificada3 = document.querySelector(".mod3");
listamodificada3.innerText = "Devolveras la cantidad total de: " + dineroconinteres;
let listamodificada4 = document.querySelector(".mod4");
listamodificada4.innerText = "Tendras que pagar: " + porcuota.toFixed(2) + " por mes";

let lieliminado = document.querySelector(".mod5");
lieliminado.remove();