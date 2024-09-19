//let cart;  // Declaramos la variable 'cart'

// Verificamos si ya se ha guardado cart
if (localStorage.getItem('cart')) {

    // Si existe, convertimos el string en un array de objetos
    cart = JSON.parse(localStorage.getItem('cart'));

} else {
    // Si no existe lo asignamos a una lista vacia
    cart = [];
}


// Función para agregar un producto al carrito
function addToCart(productId, productName, productPrice) {
    let precioInt = parseInt(productPrice)
    console.log(productId, productName, precioInt)
        const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };
    console.log(product)
    // Verificar si el producto ya está en el carrito

    let existingProductIndex = -1;  // Suponemos inicialmente que el producto no está en el carrito

    // verificamos si el producto ya se ha agregado 
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.id === productId) {
            existingProductIndex = i;
            break;
        }
    }

    if (existingProductIndex > -1) {
        // si existe se agrega uno mas al producto
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no existe, agregar el nuevo producto
        cart.push(product);
    }

    // actualizamos nuestro carrito en local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar un mensaje de confirmación usando SweetAlert
    mostrar("success", "Listo", `${productName} agregado al carrito`);

    //  Actualizamos el dom
    updateCartUI();
}


function updateCartUI() {

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(cartItem);
    });

    // Mostrar el total del carrito

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = `Total: ${totalPrice}`;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
    //updateCartCount(); // También aquí actualiza el contador del carrito
}



//SweetAlert
function mostrar(icono, titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
    });
}


document.addEventListener('DOMContentLoaded', function () {
    updateCartUI();

});

