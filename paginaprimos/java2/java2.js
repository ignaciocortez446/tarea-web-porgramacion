window.onload = function() {
    let formSeguridad = document.getElementById("formSeguridad");
    formSeguridad.onsubmit = function(e) {
        e.preventDefault();
        let nodoCodigo = document.getElementById("inputCodigo");
        let valorCodigo = parseInt(nodoCodigo.value);
        if (isNaN(valorCodigo) || valorCodigo < 1) return;
        verificarClaveSegura(valorCodigo);
    };
};
function verificarClaveSegura(codigoEvaluado) {
    let panelResultados = document.getElementById("panelResultados");
    let tarjetaResumen = document.getElementById("tarjetaResumen");
    let tablaCuerpoFilas = document.getElementById("tablaCuerpoFilas");
    tablaCuerpoFilas.innerHTML = "";
    let acumuladorDivisoresExactos = 0, textoRespuesta = "";
    for (let eslabon = 1; eslabon <= codigoEvaluado; eslabon++) {
        if (codigoEvaluado % eslabon === 0) acumuladorDivisoresExactos++;
    }
    if (acumuladorDivisoresExactos === 2) {
        textoRespuesta = "CÓDIGO SEGURO (Primo)";
        tarjetaResumen.innerHTML = "<p>El código " + codigoEvaluado + " es seguro.</p>";
    } else {
        textoRespuesta = "VULNERABLE (No Primo)";
        tarjetaResumen.innerHTML = "<p>El código " + codigoEvaluado + " es vulnerable.</p>";
    }
    tablaCuerpoFilas.innerHTML = "<tr><td>Divisores hallados</td><td>" + acumuladorDivisoresExactos + "</td></tr><tr><td>Filtro</td><td>" + textoRespuesta + "</td></tr>";
    panelResultados.classList.remove("vision-oculta");
}