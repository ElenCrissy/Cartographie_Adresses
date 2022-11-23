const map = L.map('map').setView([48.117266, -1.6777926], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// dans terminal bash, commande /serch/csv par API BAN à partir du fichier adresses.csv
// curl -X POST -F data=@adresses.csv -o "test.csv" https://api-adresse.data.gouv.fr/search/csv/

function addAdresses(map){
    Papa.parse("./test.csv", {
        header: true,
        download:true,
        dynamicTyping: true,
        complete: function(results){
            const adresses = results.data;
            console.log(adresses)
            adresses.map(adresse => {
                if (adresse.latitude && adresse.longitude)
                addMarkerOnMap(adresse.latitude, adresse.longitude, map);
            })
        }
    })
}

function addMarkerOnMap(latitude, longitude, map){
    L.marker([latitude, longitude]).addTo(map)
}

addAdresses(map)
