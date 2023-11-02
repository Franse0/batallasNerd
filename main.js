const {log}=console;

// llamo a todos los elementos que necesito 
const bars = document.querySelector(".fa-bars");
const nav  = document.getElementById("nav");

const form = document.getElementById("form");
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");

const checkedList = document.querySelectorAll("input[type='checkbox']");
const radioList = document.querySelectorAll("input[type='radio']");

const resultado = document.getElementById("resultado");
const imgInicio = document.getElementById("img-inicio")


// Funcion del nav
function despliegueNav(){
    nav.classList.toggle("visible")
}

function closeNav(e){
    if(!e.target.classList.contains("nav-item"))return;
    else{
        despliegueNav();
    }
}

function cambiarimagen(){
    if(imgInicio.getAttribute('src')==="./assets/avatarA.png"){
        imgInicio.setAttribute("src","./assets/avatarB.png")
    } else if (imgInicio.getAttribute('src')=="./assets/avatarB.png"){
        imgInicio.setAttribute("src","./assets/avatarC.png")
        
    }  else if(imgInicio.getAttribute("src")==="./assets/avatarC.png"){
        imgInicio.setAttribute("src", "./assets/avatarA.png")
    }
}

function cambioTemporal (){
    setInterval(cambiarimagen, 3000)
}

let programadores=[];

function radioValue(){
    let radioSeleccionado ="";
    let valido = false;
    radioList.forEach(radio=>{
        if(radio.checked){
            radioSeleccionado = radio.value
            valido=true
        } 
    });
    if(!valido){
        alert("Selecciona un tipo de programador");
    }
    return radioSeleccionado;
}

function tipoImg(valor){
    switch (valor){
        case "frontend":
            return "avatarA";
            break;
        case "backend":
            return "avatarB";
            break;
        case "fullstack":
            return "avatarC"
            break;        
    }
}


function skillsSeleccionados(){
    const skillesSelecionados =[];
    checkedList.forEach(checkbox=>{
        if(checkbox.checked ){
           skillesSelecionados.push(checkbox.id);
        }
    });
    return skillesSelecionados;
}


function crearHtmlImganen(skill){
    return `<img src="./assets/logos/${skill}.png">`
}

function selectedImg(skills){
    const contentImgHtml =  skills.flat().map(skill=>crearHtmlImganen(skill)).join("")
    console.log(contentImgHtml)
    return contentImgHtml;
}

class Personaje {
    constructor(nombre, edad, skill, tipo ){
            this.nombre=nombre;
            this.edad=edad;
            this.skill=skill;
            this.tipo= tipo;
    }
};

function crearPersonajeHtml(programador){
    return`
    <div class="card">
    <img src="./assets/${tipoImg(programador.tipo)}.png" alt="Avatar" width="500px">
    <h2>${programador.nombre}</h2>
    <span>${programador.tipo}</span>
    <div class="habilidades">
        ${selectedImg(programador.skill)}
    </div>
</div>
    `
};


function mostrarEnPantalla (programadorList){
    console.log("hola")
    if(programadorList.length>=0){
    resultado.innerHTML=crearPersonajeHtml(programadorList[0])
    }
}

function mostrarSeccionResultadoResponsive (programadores){
        const resultadoContainer = document.getElementById("resultado-container");
        log(resultadoContainer.style.display)
    if(programadores.length >= 1){
        if(resultadoContainer.classList.contains("no-mostrar")){
            resultadoContainer.classList.remove("no-mostrar")
        }
    };
};
function crearPersonaje(e){
    e.preventDefault();
    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const skills = skillsSeleccionados();
    const tipo = radioValue();
    programadores.unshift(new Personaje(nombre, edad, [skills], tipo ));
    form.reset();
    log(programadores.length)
    mostrarSeccionResultadoResponsive(programadores);
    console.log(programadores)
    mostrarEnPantalla(programadores);
}


function init(){
    bars.addEventListener("click", despliegueNav)
    nav.addEventListener("click", closeNav)
    form.addEventListener("submit", crearPersonaje);
    window.addEventListener("DOMContentLoaded", cambioTemporal);
}



init()