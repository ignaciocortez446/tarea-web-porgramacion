window.onload = function() {
    let formHibrido = document.getElementById("formHibrido");
    formHibrido.onsubmit = function(e) {
        e.preventDefault();
        let nodoIteraciones = document.getElementById("inputIteraciones");
        let valorIteraciones = parseInt(nodoIteraciones.value);
        if (isNaN(valorIteraciones) || valorIteraciones < 1) return;
        procesarLlaveSegura(valorIteraciones);
    };
};
function procesarLlaveSegura(limiteCiclos) {
    let panelResultados = document.getElementById("panelResultados");
    let tarjetaResumen = document.getElementById("tarjetaResumen");
    let tablaCuerpoFilas = document.getElementById("tablaCuerpoFilas");
    tablaCuerpoFilas.innerHTML = "";
    let semillaA = 0, semillaB = 1, valorFibonacciActual = 0, contadorPrimos = 0, bufferFilas = "";
    for (let paso = 1; paso <= limiteCiclos; paso++) {
        if (paso === 1) valorFibonacciActual = 1;
        else if (paso === 2) { valorFibonacciActual = 1; semillaA = 1; semillaB = 1; }
        else { valorFibonacciActual = semillaA + semillaB; semillaA = semillaB; semillaB = valorFibonacciActual; }
        let acumuladorDivisores = 0;
        for (let div = 1; div <= valorFibonacciActual; div++) {
            if (valorFibonacciActual % div === 0) acumuladorDivisores++;
        }
        let esPrimo = (acumuladorDivisores === 2);
        let respuestaFiltro = esPrimo ? "<span style='color:#065f46; font-weight:700;'>🟢 APROBADO (Primo)</span>" : "<span style='color:#991b1b;'>🔴 RECHAZADO</span>";
        if (esPrimo) contadorPrimos++;
        bufferFilas += "<tr><td><strong>Posición " + paso + "</strong></td><td>" + valorFibonacciActual.toLocaleString() + "</td><td>" + respuestaFiltro + "</td></tr>";
    }
    tablaCuerpoFilas.innerHTML = bufferFilas;
    tarjetaResumen.innerHTML = "🔑 Bloque Analizado: " + limiteCiclos + " elementos | Tokens válidos creados: " + contadorPrimos;
    panelResultados.classList.remove("vision-oculta");
}