console.log("Hola desde miScript.js")
var posible = false
var esMayor = false
var titulo, icono, msg;



function validarFecha() {
    //no se puede reservar antes de la fecha actual 
    var mifecha = document.getElementById("contact_fecha");
    var now = new Date(Date.now())
    var dia = now.getDate();
    var mes = now.getMonth() + 1;
    var anio = now.getFullYear();
    mes = mes < 10 ? "0" + mes : mes;
    dia = dia < 10 ? "0" + dia : dia;
    var fechaFormatted = anio + "-" + mes + "-" + dia;
    console.log(mifecha.value + " fechaaaaaaaa " + fechaFormatted)
    if (mifecha.value < fechaFormatted) {
        console.log("si entra al if")
        //Sweet Alert
        icono = "warning"
        titulo = "Algo salio mal"
        msg = "no se puede reservar antes de la fecha actual "
        posible = false

    } else {
        console.log("no entra al if")
        esMayor = (mifecha.value > fechaFormatted) ? true : false
        posible = true
    }


}
function ValidarHora() {
    var now = new Date(Date.now());
    var timecontrol = document.getElementById('contact_hora')
    var horas = now.getHours() + 2;
    var minutos = now.getMinutes();
    var apertura = "08:00"
    var cierre = "19:00"

    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    var formatted = horas + ":" + minutos;
    console.log("formated: " + formatted);

    if (esMayor) {
        //el dia es mayor a hoy por lo tanto  solo se valida la apertura y cierre 
        if (timecontrol.value > apertura && timecontrol.value < cierre) {
            posible = true
        }
    } else {

        if (timecontrol.value > apertura && timecontrol.value < cierre) {
            if (timecontrol.value < formatted) {
                icono = "warning"
                titulo = "Ops..."
                msg = "Una reservacion debe tener 2 horas de antelacion"
                posible = false
            } else {
                posible = true
            }
        } else {
            icono = "warning"
            titulo = "Ops..."
            msg = "Resaturante cerrado"
            posible = false
        }
        //posible = (timecontrol.value < formatted) ? false : true
    }

}

function ValidarNombre() {
    var valor = document.getElementById("contact_name").value
    if (valor === '') {
        posible = false
        icono = "warning"
        titulo = "Vacio"
        msg = "el nombre esta vacio"
    }

}
function ValidarCorreo() {
    var correo = document.getElementById("contact_email")
    var valor = correo.value

    // Expresión regular para validar correo electrónico
    //A-Za-z@A-Za-z.a-z
    var expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === '') {
        posible = false;
        icono = "warning"
        titulo = "Vacio"
        msg = "el correo está vacío"

    } else if (!expresionRegularCorreo.test(valor)) {
        posible = false;
        icono = "info"
        titulo = "Formato"
        console.log(correo)
        msg = "el correo no tiene el formato correcto"
    }
}
function Sumar() {
    var personas = document.getElementById("contact_people")
    var personas_add = document.getElementById("contact_add")

    var a = parseInt(personas.value)
    var b = parseInt(personas_add.value)

    if (a <= 0 || b < 0) {
        posible = false
        icono = "warning"
        titulo = "Algo Salio Mal"
        msg = "no se puede colocar numeros negativos"
        personas.value = 1
        personas_add.value = 0
        a = 1
        b = 0
    }
    total.value = a + b
}
function validar() {
    var personas = document.getElementById('contact_people')
    var personas_add = document.getElementById('contact_add')
    var timeControl = document.getElementById('contact_hora')
    var mifecha = document.getElementById('contact_fecha')

    personas.addEventListener('blur', validar)
    personas_add.addEventListener('blur', validar)
    timeControl.addEventListener('blur', ValidarHora)
    mifecha.addEventListener('blur', validarFecha)

    var a = parseInt(personas.value)
    var b = parseInt(personas_add.value)

    if (a >= 8 || b >= 4) {
        icono = "warning"
        titulo = "Limite Alcanzado"
        msg = "La reservacion solo puede hacerse para un maximo de 12 ersonas (8 + 4)"
        personas.value = 1
        personas_add = 0
        posible = false
    } else {
        posible = true
    }

    Sumar()
    validarFecha()
    ValidarHora()
}

function enviar_formulario() {
    ValidarNombre()
    ValidarCorreo()
    if (posible) {
        mostrar("success", "Listo", "Su reservacion fue realizada con exito")
    } else {
        mostrar(icono, titulo, msg)
    }
}
function mostrar(icono, titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,

    })
}

//Google Maps

function getGeo() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoOK, geoERROR)
    }
}

function geoOK(position) {
    console.log(position)
    showLatLong(position.coords.latitude, position.coords.longitude)
    initMap2(position.coords.latitude, position.coords.longitude)

}
function geoERROR(error) {
    if (error.code == 1) {
        console.log("el usuario nego el perimso")
        alert("El usuario nego el permiso")
    } else if (error.code == 2) {
        console.log("No se puede recuperar la ubicacion")
        alert("No se puede recuperar la ubicacion")
    } else if (error.code == 3) {
        console.log("Expiro el tiempo de respuesta")
        alert("Expiro el tiempo de respuesta")
    } else {
        console.log("Error: " + error.code)
        alert("Error: " + error.code)
    }

}

function showLatLong(lat, long) {
   
    //para el street view
    var geocoder = new google.maps.Geocoder();
    var milocalizacion = new google.maps.LatLng(lat, long)
    console.log(milocalizacion)
    geocoder.geocode({ 'latLng': milocalizacion }, processGeocoder)
}


function processGeocoder(result, status) {
    console.log(result)
    console.log(status)
    if (status == google.maps.GeocoderStatus.OK) {
        //esperamos los resultados de google para obtener una direccion real en lugar de solo cordenadas
        if (result[0]) {
            var direccion = result[0].formatted_addres
            //buscamos (usandoJquery) el elemento direccion y colocamos la direccion que nos respondio google
            $("direccion").html(direccion)
        }
        else {
            error("Google no retorno ningun resultado")
        }
    }
    else {
        error("Google marco un Error")
    }
}

let map;

async function initMap() {

    const { map } = await google.maps.importLibrary("maps")
}

function initMap2(lat, lng) {
    //genero la informacion para obtener un mapa desde Google
    var miscoordenadas = new google.maps.LatLng(lat, lng)
    //opciones para el mapa

    var mapoptions = {
        zoom: 15 ,
        center: miscoordenadas,
        mapTypedId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map"), mapoptions)
    //Configuro un marcador de osicion para mi mapa
    new google.maps.Marker({
        position: miscoordenadas,
        map,
        title: " Hello World!"
    })

    $('#street').css("height", 300)
    //creo y configuro el streetview
    var panorama = new google.maps.StreetViewPanorama(document.getElementById("street"),
        { position: miscoordenadas, setpov: { heading: 90, pitch: 5 }})
    //mapa en street view
    map.setStreetView(panorama)
    //recargo el mapa por ultima vez
    window.initMap = initMap;
}