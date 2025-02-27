const jsonUrl = "https://raw.githubusercontent.com/MatildaLi-Hga/json/main/data.json";  // Nykyinen JSON-tiedosto
const toteutusUrl = "https://raw.githubusercontent.com/MatildaLi-Hga/json/main/toteutus.json";  // Uusi JSON-tiedosto toteutusta varten

// Haetaan JSON-data
fetch(jsonUrl)
    .then(response => response.json()) // Muunnetaan JSON-muotoon
    .then(data => kerro(data)) // Kutsutaan funktiota kerro()
    .catch(error => {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
        console.error("Virhe haettaessa JSON-dataa:", error);
    });

// Haetaan toteutuksen tiedot
fetch(toteutusUrl)
    .then(response => response.json()) // Muunnetaan JSON-muotoon
    .then(toteutusData => naytaToteutus(toteutusData)) // Kutsutaan funktiota naytaToteutus()
    .catch(error => {
        console.error("Virhe haettaessa toteutuksen tietoja:", error);
    });

// Funktio JSON-datan näyttämiseen sivulla
function kerro(data) {
    let html = `
        <h2>${data.otsikko}</h2>
        <p>${data.kuvaus}</p>
        <img src="${data.kuva}" alt="Kuva">
        <h3>Opintojakso: ${data.opintojakso.nimi} (${data.opintojakso.tunnus})</h3>
        <p>Opintopisteet: ${data.opintojakso.opintopisteet}</p>
        <h4>Sisältö:</h4>
        <ul>
    `;

    data.sisalto.forEach(item => {
        html += `<li>${item}</li>`;
    });

    html += `</ul><h4>Tekniikat:</h4><ul>`;

    data.tekniikat.forEach(tech => {
        html += `<li><a href="${tech.linkki}" target="_blank">${tech.aihe}</a></li>`;
    });

    html += `</ul>`;

    document.getElementById("vastaus").innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    // Haetaan toteutuksen tiedot
    fetch(toteutusUrl)
        .then(response => response.json()) // Muunnetaan JSON-muotoon
        .then(toteutusData => naytaToteutus(toteutusData)) // Kutsutaan funktiota naytaToteutus()
        .catch(error => {
            console.error("Virhe haettaessa toteutuksen tietoja:", error);
        });

    // Funktio toteutuksen tietojen näyttämiseen
    function naytaToteutus(toteutus) {
        // Varmista, että HTML-elementit ovat olemassa
        const toteutusNimi = document.getElementById("toteutus-nimi");
        const osallistujienLkm = document.getElementById("osallistujien-lkm");
        const toteutusAika = document.getElementById("toteutus-aika");
        const toteutusKesto = document.getElementById("toteutus-kesto");
        const osallistujatList = document.getElementById("osallistujat");
        const toteutusKuva = document.getElementById("toteutus-kuva");

        // Jos elementit löytyvät, lisätään sisältö
        if (toteutusNimi && osallistujienLkm && toteutusAika && toteutusKesto && osallistujatList && toteutusKuva) {
            toteutusNimi.innerText = toteutus.nimi;
            osallistujienLkm.innerText = toteutus.osallistujat.length;
            toteutusAika.innerText = `${toteutus.alkamisPvm} - ${toteutus.loppumisPvm}`;
            toteutusKesto.innerText = toteutus.kesto;

            // Osallistujat listassa
            toteutus.osallistujat.forEach(osallistuja => {
                const li = document.createElement("li");
                li.innerText = osallistuja;
                osallistujatList.appendChild(li);
            });

            // Kuva
            toteutusKuva.src = toteutus.kuva;
        } else {
            console.error("HTML-elementtejä puuttuu.");
        }
    }
});
