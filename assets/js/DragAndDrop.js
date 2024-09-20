var contador = 0
var elemArrastrable = ""
var contadorA = 0

function start(e) {
    //Funcion que se eja=ecuta con el evento 'ondragstart', recibe como parametro el event propio

    console.log("start")
    e.dataTransfer.effectAllowed = "move"//el movimiento del elemento
    e.dataTransfer.setData("Data", e.target.id)//guarda en cache la info del elemento
    $("#" + e.target.id).css("opacity", "0.4")//cambia el css 
    console.log(e.target.id)
    elemArrastrable = e.target.id

}

function end(e) {
    console.log("end")
    e.target.style.opacity = ''//restablece la propiedad de opacidad a su valor por defecto
    e.dataTransfer.clearData("Data") //lipia cache 
    elemArrastrable = ""
    console.log(e.target)
}
function enter(e) {
    console.log("enter")

}
function leave(e) {
    console.log("leave");
    
}
function over(e) {
    console.log("Over")
    var id = e.target.id

    return true

}

function drop(e) {
    console.log("drop");
    var elementoArrastrado = e.dataTransfer.getData("Data")
    e.target.appendChild(document.getElementById(elementoArrastrado));
    
}

function remove(e) {
    console.log("delete")
    var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data"))
    elementoArrastrado.parentNode.removeChild(elementoArrastrado)
    

}

function clone(e) {
    console.log("clone")
    var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data"))
    elementoArrastrado.style.opacity = ""

    var elementoClonado = elementoArrastrado.cloneNode(true)
    elementoClonado.id = "ClonedNode" + contador

    elementoClonado.style.position = "static"
    e.target.appendChild(elementoClonado)

    
}
