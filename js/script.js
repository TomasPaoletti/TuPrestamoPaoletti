/* function ingresopersona() {
    for (let i = 0; i < 1; i++) {
        nombrePersona = prompt("Nombre")
        edadPersona = parseInt(prompt("Edad"));
        nacionalidad = prompt("Nacionalidad");
        razonSocial = prompt("Razon social");
    }
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

clientes.push(prestamoPersonal = new cantidadPrestada(dineroprestado, cuotasapagar, dineroconinteres, porcuota));
console.log(prestamoPersonal);

console.log(clientes);

const maxmonth = clientes.some((clientes) => clientes.cuotasapagar >= 12);
console.log(maxmonth); */

//Modal calcular prestamo

function calculoprestamo(dineroprestado, cuotasapagar, ) {
    let interes = cuotasapagar * 10;
    let dineroconinteres = Number(dineroprestado) + (dineroprestado * (interes / 100));
    let porcuota = dineroconinteres / cuotasapagar;
    return {
        montofinal: dineroconinteres,
        montoporcuota: porcuota
    }
}

function modalagregado (dineroprestado, cuotasapagar){
    const resultado = calculoprestamo(dineroprestado, cuotasapagar)
    const titulo = document.querySelector("#titulo")
    const primera = document.querySelector("#primera");
    const segunda = document.querySelector("#segunda");
    const tercera = document.querySelector("#tercera");
    const cuarta = document.querySelector("#cuarta");
    titulo.textContent = "Datos del credito calculado";
    primera.textContent = "Monto pedido: $"+ dineroprestado;
    segunda.textContent = "Cantidad de cuotas: "+ cuotasapagar;
    tercera.textContent = "Monto a devolver: $"+ resultado.montofinal;
    cuarta.textContent = "Tus cuotas seran de: $"+ resultado.montoporcuota.toFixed(2);
}

const btnabrirmodalprestamo = document.querySelector("#btn-abrir-modal-prestamo");
const btncerrarmodalprestamo = document.querySelector("#btn-cerrar-modal-prestamo");
const modalprestamo = document.querySelector("#modal-prestamo");

btnabrirmodalprestamo.addEventListener("click", () => {
    let dineroprestado = document.getElementById("inputmonto").value;
    let cuotasapagar = document.getElementById("inputcuotas").value;
    const resultado = calculoprestamo(dineroprestado, cuotasapagar);
    modalagregado(dineroprestado, cuotasapagar);
})


btnabrirmodalprestamo.addEventListener("click", () => {
    modalprestamo.showModal();
});

btncerrarmodalprestamo.addEventListener("click", () => {
    modalprestamo.close();
})