
const jsonUrl = "https://github.com/MatildaLi-Hga/MatildaLi-Hga.github.io/blob/main/data.json"; 

// Haetaan JSON-data
fetch(jsonUrl)
    .then(response => response.json()) // Muunnetaan JSON-muotoon
    .then(data => kerro(data)) // Kutsutaan funktiota kerro()
    .catch(error => {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
        console.error("Virhe haettaessa JSON-dataa:", error);
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
