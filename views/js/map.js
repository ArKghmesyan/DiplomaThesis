window.onload = function() {
    var popup = L.popup();
    var geolocationMap = L.map('map', {
        layers: MQ.mapLayer(),
         center: [40.183333, 44.516667 ],
        zoom: 14
    });

    function geolocationErrorOccurred(geolocationSupported, popup, latLng) {
        popup.setLatLng(latLng);
        popup.setContent(geolocationSupported ?
            '<b>Error:</b> The Geolocation service failed.' :
            '<b>Error:</b> This browser doesn\'t support geolocation.');
        popup.openOn(geolocationMap);

    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var redIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            L.marker([40.177498, 44.512414], {icon: redIcon}).addTo(geolocationMap);
            geolocationMap.setView(latLng);
            L.marker([40.175370, 44.508788]).addTo(geolocationMap);
            L.marker([40.181715, 44.514423]).addTo(geolocationMap);

            let cords = document.getElementById("latlng");
            cords.innerText = '40.177498, 44.512414';
        }, function() {
            geolocationErrorOccurred(true, popup, geolocationMap.getCenter());
        });
    } else {
        //No browser support geolocation service
        geolocationErrorOccurred(false, popup, geolocationMap.getCenter());
    }
};