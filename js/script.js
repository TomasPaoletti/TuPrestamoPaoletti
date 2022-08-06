
const btnAbrirModalPrestamo = document.querySelector("#btn-abrir-modal-prestamo");
const btnCerrarModalPrestamo = document.querySelector("#btn-cerrar-modal-prestamo");
const btnAbirModalAplicar = document.querySelector("#btn-abrir-modal-aplicar");
const btnCerrarModalAplicar = document.querySelector("#btn-cerrar-modal-aplicar");
const modalAplicar = document.querySelector("#modal-aplicar");
const modalPrestamo = document.querySelector("#modal-prestamo");
const btnEnviarLink = document.querySelector("#btn-enviar-link");
const flexSwitch = document.querySelector("#flexSwitchCheckDefault");
const divAgregado = document.querySelector("#datosCalculados");


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
    divAgregado.innerHTML = "";
    let htmlagregado = `<ul>
   <li>Dinero solicitado: ${datosRecuperados.montoPrestado}</li>
   <li>Cuotas elegidas : ${datosRecuperados.cuotasElegidas}</li>`;
    divAgregado.innerHTML = htmlagregado;
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
        "Nombre": nombreSolicitante,
        "apellido": apellidoSolicitante,
        "email": emailSolicitante
    }
    sessionStorage.setItem("datosSolicitante", JSON.stringify(datosSolicitante));
})

flexSwitch.addEventListener("click", () => {
    mostrarDatos();
})

btnAbrirModalPrestamo.addEventListener("click", () => {
    modalPrestamo.showModal();
});

btnCerrarModalPrestamo.addEventListener("click", () => {
    modalPrestamo.close();
})

btnAbirModalAplicar.addEventListener("click", () => {
    modalAplicar.showModal();
})

btnCerrarModalAplicar.addEventListener("click", () => {
    modalAplicar.close();
})