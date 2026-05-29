window.onload = function() {
    let formFinanciero = document.getElementById("formFinanzas");
    formFinanciero.onsubmit = function(e) {
        e.preventDefault();
        let nodoMeses = document.getElementById("inputMeses");
        let valorMeses = parseInt(nodoMeses.value);
        if (isNaN(valorMeses) || valorMeses < 1) return;
        ejecutarCoreFinanciero(valorMeses);
    };
};

function ejecutarCoreFinanciero(mesesTotales) {
    let panelResultados = document.getElementById("panelResultados");
    let tarjetaResumen = document.getElementById("tarjetaResumen");
    let tablaCuerpoFilas = document.getElementById("tablaCuerpoFilas");
    tablaCuerpoFilas.innerHTML = "";
    
    let penultimo = 0, ultimo = 1, cuotaMesActual = 0, dineroAcumuladoTotal = 0, bufferFilas = "";
    
    for (let paso = 1; paso <= mesesTotales; paso++) {
        if (paso === 1) cuotaMesActual = 1;
        else if (paso === 2) { cuotaMesActual = 1; penultimo = 1; ultimo = 1; }
        else { cuotaMesActual = penultimo + ultimo; penultimo = ultimo; ultimo = cuotaMesActual; }
        
        dineroAcumuladoTotal += cuotaMesActual;
        bufferFilas += "<tr><td><strong>Mes " + paso + "</strong></td><td>" + cuotaMesActual.toLocaleString() + " Bs.</td><td>" + dineroAcumuladoTotal.toLocaleString() + " Bs.</td></tr>";
    }
    
    tablaCuerpoFilas.innerHTML = bufferFilas;
    tarjetaResumen.innerHTML = "💰 Monto Total Acumulado Final: " + dineroAcumuladoTotal.toLocaleString() + " Bs.";
    panelResultados.classList.remove("vision-oculta");
}