
document.addEventListener('DOMContentLoaded', function () {
    initMap()
    getGeo()
});

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
        zoom: 15,
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
        { position: miscoordenadas, setpov: { heading: 90, pitch: 5 } })
    //mapa en street view
    map.setStreetView(panorama)
    //recargo el mapa por ultima vez
    window.initMap = initMap;
}

