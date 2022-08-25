
const btnAbrirModalPrestamo = document.querySelector("#btn-abrir-modal-prestamo");
const btnCerrarModalPrestamo = document.querySelector("#btn-cerrar-modal-prestamo");
const btnAbirModalAplicar = document.querySelector("#btn-abrir-modal-aplicar");
const btnCerrarModalAplicar = document.querySelector("#btn-cerrar-modal-aplicar");
const btnMisCreditos = document.querySelector("#mis-creditos");
const btnCerrarMisCreditos = document.querySelector("#btn-cerrar-mis-creditos");
const modalCreditos = document.querySelector("#modal-creditos");
const modalCreditosAMostrar = document.querySelector("#modal-credito-mostrar");
const verCredito = document.querySelector("#ver-credito");
const modalAplicar = document.querySelector("#modal-aplicar");
const modalPrestamo = document.querySelector("#modal-prestamo");
const btnEnviarLink = document.querySelector("#btn-enviar-link");
const flexSwitch = document.querySelector("#flexSwitchCheckDefault");
const divAgregado = document.querySelector("#datosCalculados");
const formularioAplicar = document.querySelector("#formulario-aplicar");
const formularioCreditos = document.querySelector("#formulario-creditos");
const dineroQuieres = document.getElementById("inputmonto");
const nombreEnableButton = document.querySelector("#inputnombre");
const apellidoEnableButton =document.querySelector("#inputapellido");
const emailEnableButton = document.querySelector("#inputemail");
const creditos = [{
    "nombre": "JUAN",
    "apellido": "PEPE",
    "email": "juanpepe@hotmail.com",
    "montoPrestado": 850000,
    "cuotasElegidas": 5
}];

function calculoPrestamo(dineroPrestado, cuotasApagar) {
    let interes = cuotasApagar * 10;
    let dineroConInteres = Number(dineroPrestado) + (dineroPrestado * (interes / 100));
    let porCuota = dineroConInteres / cuotasApagar;
    return {
        montoFinal: dineroConInteres,
        montoPorCuota: porCuota
    }
};

function datosParaCalcular() {
    let dineroPrestado = document.getElementById("inputmonto").value;
    let cuotasApagar = document.getElementById("inputcuotas").value;
    const resultado = calculoPrestamo(dineroPrestado, cuotasApagar);
    modalAgregado(resultado, dineroPrestado, cuotasApagar);
    const datosCalculo = {
        "montoPrestado": dineroPrestado,
        "cuotasElegidas": cuotasApagar
    }
    sessionStorage.setItem("datosCalculo", JSON.stringify(datosCalculo));
};

function tomaDeDatos() {
    let nombreSolicitante = document.getElementById("inputnombre").value.toUpperCase();
    let apellidoSolicitante = document.getElementById("inputapellido").value.toUpperCase();
    let emailSolicitante = document.getElementById("inputemail").value;
    const datosSolicitante = {
        "nombre": nombreSolicitante,
        "apellido": apellidoSolicitante,
        "email": emailSolicitante
    }
    localStorage.setItem("datosSolicitante", JSON.stringify(datosSolicitante));
    verificarEmail(emailSolicitante);
};

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
};

function mostrarDatos() {
    const datosRecuperados = JSON.parse(sessionStorage.getItem("datosCalculo"));
    if (datosRecuperados) {
        let htmlagregado = `<ul class="remove">
   <li>Dinero solicitado: $${datosRecuperados.montoPrestado}</li>
   <li>Cuotas elegidas : $${datosRecuperados.cuotasElegidas}</li>
   </ul>`;
        divAgregado.innerHTML = htmlagregado;
    } else {
        let noDatos = `<p class="no-datos remove">No calculaste ningun prestamo todavia.</p>`
        divAgregado.innerHTML = noDatos;
    }
};

function ocultarDatos() {
    const divRemove = document.querySelector(".remove");
    if (divRemove) {
        divRemove.remove();
    }
};

function recuperacionObjetos() {
    let objetoRecuperado = JSON.parse(localStorage.getItem("datosSolicitante"));
    let objetoRecuperado2 = JSON.parse(sessionStorage.getItem("datosCalculo"));
    let objetoFinal = { ...objetoRecuperado, ...objetoRecuperado2 };
    creditos.push(objetoFinal);
};

function htmlNoCreditos() {
    let liCreditos = `<div class="col-10 remove">
    <p class="no-datos remove">No existe ningun credito al nombre seleccionado.</p>
    </div>`
    modalCreditosAMostrar.innerHTML = liCreditos;
};

function htmlCreditosCalculados(creditosAMostrar) {
    creditosAMostrar.forEach(element => {
        let liCreditos = `<div class="remove">
            <ul>
            <li>Nombre: ${element.nombre}</li>
            <li>Apellido: ${element.apellido}</li>
            <li>Email: ${element.email}</li>
            <li>Monto prestado: $${element.montoPrestado}</li>
            <li>Cuotas elegidas: ${element.cuotasElegidas}</li>
            </ul>
            </div>`
        modalCreditosAMostrar.innerHTML = liCreditos;
    })
};

function buscarObj() {
    let nombreFiltrado = document.getElementById("nombre-filtrado").value.toUpperCase();
    let apellidoFiltrado = document.getElementById("apellido-filtrado").value.toUpperCase();
    const creditosAMostrar = creditos.filter((object) => {
        return (
            object.nombre === nombreFiltrado && object.apellido === apellidoFiltrado
        );
    })
    creditosAMostrar.length > 0 ? htmlCreditosCalculados(creditosAMostrar) : htmlNoCreditos();
};

async function verificarEmail(emailSolicitante) {
    let API = `https://www.disify.com/api/email/${emailSolicitante}`;
    const resp = await fetch(API);
    const dataJson = await resp.json();
    console.log(dataJson);
};

function disableButton() {
    let cuotasAprobar = document.getElementById("inputcuotas");
    dineroQuieres.value && cuotasAprobar ? btnAbrirModalPrestamo.removeAttribute("disabled") : btnAbrirModalPrestamo.setAttribute("disabled", "");
};

function disableButtonLoQuiero (){
    nombreEnableButton.value && apellidoEnableButton.value && emailEnableButton.value ? btnEnviarLink.removeAttribute("disabled") : btnEnviarLink.setAttribute("disabled", ""); 
};

dineroQuieres.addEventListener("change", () => {
    disableButton()
});

btnAbrirModalPrestamo.addEventListener("click", () => {
    datosParaCalcular();
});

nombreEnableButton.addEventListener("change", () =>{
    disableButtonLoQuiero()
});

apellidoEnableButton.addEventListener("change", () =>{
    disableButtonLoQuiero()
});

emailEnableButton.addEventListener("change", () =>{
    disableButtonLoQuiero()
});

btnEnviarLink.addEventListener("click", () => {
    tomaDeDatos()
    Swal.fire({
        icon: 'success',
        title: 'Tus datos se registraron correctamente',
        text: 'En los siguientes minutos te llegara un mail',
        showConfirmButton: false,
        timer: 2500
    })
    recuperacionObjetos();
    modalAplicar.close();
    formularioAplicar.reset();
    flexSwitch.checked = false;
});

flexSwitch.addEventListener("click", (event) => {
    const checkboxtrue = event.currentTarget.checked;
    checkboxtrue ? mostrarDatos() : ocultarDatos();
});

verCredito.addEventListener("click", () => {
    buscarObj();
});

btnAbrirModalPrestamo.onclick = () => {
    modalPrestamo.showModal();
};

btnCerrarModalPrestamo.onclick = () => {
    modalPrestamo.close();
};

btnAbirModalAplicar.onclick = () => {
    modalAplicar.showModal();
};

btnCerrarModalAplicar.onclick = () => {
    modalAplicar.close();
    formularioAplicar.reset();
    flexSwitch.checked = false;
    ocultarDatos();
};

btnMisCreditos.onclick = () => {
    modalCreditos.showModal();
};

btnCerrarMisCreditos.addEventListener("click", () => {
    modalCreditos.close();
    formularioCreditos.reset()
    ocultarDatos();
});