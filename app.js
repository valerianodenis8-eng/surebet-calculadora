// SureBet Pro v3.0

const casas = [
    "Bet365",
    "Betano",
    "Inkabet",
    "Doradobet",
    "Stake"
];

window.onload = function () {
    cargarTabla();
};

function cargarTabla() {

    const tabla = document.getElementById("tablaCasas");

    tabla.innerHTML = "";

    casas.forEach(casa => {

        tabla.innerHTML += `
        <tr>
            <td>${casa}</td>

            <td>
                <input type="number"
                step="0.01"
                class="l">
            </td>

            <td>
                <input type="number"
                step="0.01"
                class="e">
            </td>

            <td>
                <input type="number"
                step="0.01"
                class="v">
            </td>

        </tr>
        `;

    });

}

function calcularSurebet(){

let monto=parseFloat(document.getElementById("monto").value);

let local=parseFloat(document.getElementById("local").value);

let empate=parseFloat(document.getElementById("empate").value);

let visitante=parseFloat(document.getElementById("visitante").value);

if(isNaN(monto)||isNaN(local)||isNaN(empate)||isNaN(visitante)){

alert("Completa todos los campos");

return;

}

let inv=(1/local)+(1/empate)+(1/visitante);

let apuestaLocal=monto*((1/local)/inv);

let apuestaEmpate=monto*((1/empate)/inv);

let apuestaVisitante=monto*((1/visitante)/inv);

let retorno=Math.min(

apuestaLocal*local,

apuestaEmpate*empate,

apuestaVisitante*visitante

);

let ganancia=retorno-monto;

let resultado=document.getElementById("resultado");

if(inv<1){

resultado.className="resultado ok";

}else{

resultado.className="resultado error";

}

resultado.innerHTML=`

<h2>${inv<1?"✅ HAY SUREBET":"❌ NO HAY SUREBET"}</h2>

<p><b>Arbitraje:</b> ${(inv*100).toFixed(2)}%</p>

<hr>

<p>🏠 Local: S/ ${apuestaLocal.toFixed(2)}</p>

<p>🤝 Empate: S/ ${apuestaEmpate.toFixed(2)}</p>

<p>🚩 Visitante: S/ ${apuestaVisitante.toFixed(2)}</p>

<hr>

<p><b>Retorno:</b> S/ ${retorno.toFixed(2)}</p>

<p><b>Ganancia:</b> S/ ${ganancia.toFixed(2)}</p>

`;

}

function limpiar(){

document.getElementById("monto").value="";

document.getElementById("local").value="";

document.getElementById("empate").value="";

document.getElementById("visitante").value="";

document.getElementById("resultado").innerHTML="<h2>Esperando cálculo...</h2>";

}

function copiarResultado(){

const texto=document.getElementById("resultado").innerText;

navigator.clipboard.writeText(texto);

alert("Resultado copiado");

}
function buscarMejoresCuotas(){

const locales=document.querySelectorAll(".l");
const empates=document.querySelectorAll(".e");
const visitantes=document.querySelectorAll(".v");

let mejorLocal=0;
let mejorEmpate=0;
let mejorVisitante=0;

let casaLocal="";
let casaEmpate="";
let casaVisitante="";

locales.forEach((item,index)=>{

const valor=parseFloat(item.value);

if(!isNaN(valor) && valor>mejorLocal){

mejorLocal=valor;
casaLocal=casas[index];

}

});

empates.forEach((item,index)=>{

const valor=parseFloat(item.value);

if(!isNaN(valor) && valor>mejorEmpate){

mejorEmpate=valor;
casaEmpate=casas[index];

}

});

visitantes.forEach((item,index)=>{

const valor=parseFloat(item.value);

if(!isNaN(valor) && valor>mejorVisitante){

mejorVisitante=valor;
casaVisitante=casas[index];

}

});

document.getElementById("local").value=mejorLocal;
document.getElementById("empate").value=mejorEmpate;
document.getElementById("visitante").value=mejorVisitante;

alert(
`Mejores cuotas encontradas

🏠 Local: ${mejorLocal} (${casaLocal})

🤝 Empate: ${mejorEmpate} (${casaEmpate})

🚩 Visitante: ${mejorVisitante} (${casaVisitante})`
);

}
