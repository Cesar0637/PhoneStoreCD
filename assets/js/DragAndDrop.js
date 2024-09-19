var carrito = [];
let total = 0;
function start(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

function enter(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    var productoId = e.dataTransfer.getData("text/plain");
    var productoElement = document.getElementById(productoId);


    var precio = parseInt(productoElement.getAttribute("data-precio"));
    console.log(precio)


    if (!carrito.includes(productoId)) {
        carrito.push(productoId);
        var clonedProduct = productoElement.cloneNode(true);
        clonedProduct.textContent += " (en carrito)";
        e.target.appendChild(clonedProduct);



        total += precio;
        console.log("Total en carrito: " + total); // Mostrar total en la consola
        productoC = document.getElementById('carrito-Total')
        productoC.textContent = `Total: ${total}`;
    }

}

function remove(e) {
    console.log("delete")
    var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data"))
    elementoArrastrado.parentNode.removeChild(elementoArrastrado)
    e.target.style.border = ""
    contadorA--
}
//.carrito - total {
//    font - family: 'Arial', sans - serif;
//    font - size: 1.5rem;
//    color: #fff;
//    background - color: #4CAF50;
//    padding: 15px;
//    border - radius: 10px;
//    box - shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//    text - align: center;
//    width: 300px;
//    margin: 20px auto;
//    transition: all 0.3s ease -in -out;
//}

//.carrito - total:hover {
//    background - color: #45a049;
//    transform: scale(1.05);
//}