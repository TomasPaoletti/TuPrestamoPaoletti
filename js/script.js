
const btnAbrirModalPrestamo = document.querySelector("#btn-abrir-modal-prestamo");
const btnCerrarModalPrestamo = document.querySelector("#btn-cerrar-modal-prestamo");
const btnAbirModalAplicar = document.querySelector("#btn-abrir-modal-aplicar");
const btnCerrarModalAplicar = document.querySelector("#btn-cerrar-modal-aplicar");
const misCreditos = document.querySelector("#mis-creditos");
const modalCreditos = document.querySelector("#modal-creditos");
const verCredito = document.querySelector("#ver-credito");
const modalAplicar = document.querySelector("#modal-aplicar");
const modalPrestamo = document.querySelector("#modal-prestamo");
const btnEnviarLink = document.querySelector("#btn-enviar-link");
const flexSwitch = document.querySelector("#flexSwitchCheckDefault");
const divAgregado = document.querySelector("#datosCalculados");

const creditos = [];

async function verificarEmail(emailSolicitante) {
    let API = `https://www.disify.com/api/email/${emailSolicitante}`;
    const resp = await fetch(API);
    const dataJson = await resp.json();
    console.log(dataJson);
}

function calculoPrestamo(dineroPrestado, cuotasApagar) {
    let interes = cuotasApagar * 10;
    let dineroConInteres = Number(dineroPrestado) + (dineroPrestado * (interes / 100));
    let porCuota = dineroConInteres / cuotasApagar;
    return {
        montoFinal: dineroConInteres,
        montoPorCuota: porCuota
    }
}

function modalAgregado(resultado, dineroPrestado, cuotasApagar) {
    const titulo = document.querySelector("#titulo")
    const primera = document.querySelector("#primera");
    const segunda = document.querySelector("#segunda");
    const tercera = document.querySelector("#tercera");
    const cuarta = document.querySelector("#cuarta");
    titulo.textContent = "Datos del credito calculado";
    primera.textContent = "Monto pedido: $" + dineroPrestado;
    segunda.textContent = "Cantidad de cuotas: " + cuotasApagar;
    tercera.textContent = "Monto a devolver: $" + resultado.montoFinal;
    cuarta.textContent = "Tus cuotas seran de: $" + resultado.montoPorCuota.toFixed(2);
}

function mostrarDatos() {
    const datosRecuperados = JSON.parse(sessionStorage.getItem("datosCalculo"));
    if (datosRecuperados) {
        let htmlagregado = `<ul id="remove">
   <li>Dinero solicitado: $${datosRecuperados.montoPrestado}</li>
   <li>Cuotas elegidas : $${datosRecuperados.cuotasElegidas}</li>`;
        divAgregado.innerHTML = htmlagregado;
    } else {
        let noDatos = `<p class="no-datos" id="remove">No calculaste ningun prestamo todavia.</p>`
        divAgregado.innerHTML = noDatos;
    }
}

function ocultarDatos() {
    const divRemove = document.getElementById("remove");
    divRemove.remove();
}

function recuperacionObjetos() {
    let objetoRecuperado = JSON.parse(localStorage.getItem("datosSolicitante"));
    let objetoRecuperado2 = JSON.parse(sessionStorage.getItem("datosCalculo"));
    let objetoFinal = { ...objetoRecuperado, ...objetoRecuperado2 };
    creditos.push(objetoFinal);
}

function htmlMisCreditos() {
    creditos.forEach(element => {
        let liCreditos = `<li>${element.nombre}</li>
        <li>${element.apellido}</li>
        <li>${element.email}</li>`
        modalCreditos.innerHTML += liCreditos;
    })
}

function htmlCreditosCalculados() {
    creditos.forEach(element => {
        let liCreditos = `<li>${element.nombre}</li>
        <li>${element.apellido}</li>
        <li>${element.email}</li>
        <li>${element.montoPrestado}</li>
        <li>${element.cuotasElegidas}</li>`
        modalCreditos.innerHTML += liCreditos;
    })
}

function buscarObj() {
    let nombreFiltrado = document.getElementById("nombre-filtrado").value;
    let apellidoFiltrado = document.getElementById("apellido-filtrado").value;
    creditos.find(object => {
        let queMostrar = ((object.nombre === nombreFiltrado) && (object.apellido === apellidoFiltrado)) ? htmlCreditosCalculados() : htmlMisCreditos();
    })
}

btnAbrirModalPrestamo.addEventListener("click", () => {
    let dineroPrestado = document.getElementById("inputmonto").value;
    let cuotasApagar = document.getElementById("inputcuotas").value;
    const resultado = calculoPrestamo(dineroPrestado, cuotasApagar);
    modalAgregado(resultado, dineroPrestado, cuotasApagar);
    const datosCalculo = {
        "montoPrestado": dineroPrestado,
        "cuotasElegidas": cuotasApagar
    }
    sessionStorage.setItem("datosCalculo", JSON.stringify(datosCalculo));
})

btnEnviarLink.addEventListener("click", () => {
    let nombreSolicitante = document.getElementById("inputnombre").value;
    let apellidoSolicitante = document.getElementById("inputapellido").value;
    let emailSolicitante = document.getElementById("inputemail").value;
    const datosSolicitante = {
        "nombre": nombreSolicitante,
        "apellido": apellidoSolicitante,
        "email": emailSolicitante
    }
    localStorage.setItem("datosSolicitante", JSON.stringify(datosSolicitante));
    Swal.fire({
        icon: 'success',
        title: 'Tus datos se registraron correctamente',
        text: 'En los siguientes minutos te llegara un mail',
        showConfirmButton: false,
        timer: 2500
    })
    verificarEmail(emailSolicitante);
    recuperacionObjetos();
    modalAplicar.close();
})

flexSwitch.addEventListener("click", (event) => {
    const checkboxtrue = event.currentTarget.checked;
    checkboxtrue ? mostrarDatos() : ocultarDatos();
})

misCreditos.addEventListener("click", () => {
    modalCreditos.showModal();
})

verCredito.addEventListener("click", () => {
    buscarObj();
    console.log(creditos)
})

btnAbrirModalPrestamo.addEventListener("click", () => {
    modalPrestamo.showModal();
})

btnCerrarModalPrestamo.addEventListener("click", () => {
    modalPrestamo.close();
})

btnAbirModalAplicar.addEventListener("click", () => {
    modalAplicar.showModal();
})

btnCerrarModalAplicar.addEventListener("click", () => {
    modalAplicar.close();
})





