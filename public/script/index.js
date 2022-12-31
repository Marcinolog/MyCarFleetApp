
// (async () => {      //TODO zrobić reszte fetchy do pobierania danych z bazy do delegacji itp
//     fetch('http://localhost:3001/car-info/cars')
//         .then(function (response) {
//             return response.json();
//
//         })
//         .then(function (data) {
//             console.log(data)
//             appendData(data);
//
//         })
//         .catch(function (err) {
//             console.log(err);
//         })
//
// })();

// api url
const api_url = 'http://localhost:3001/car-info/cars';

// Defining async function
async function getApi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    const data = await response.json();
    console.log(data);

    show(data);
}
// Calling that async function
getApi(api_url);
// (async () => {
//     const cars = await (await fetch("http://localhost:3001/car-info/cars")).json()
//     // addElement(cars[0]);
//     appendData(cars)
// })();git push
function show(data) {
    let tab =
        `<tr>
          <th>Plate Number</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Engine</th>
          <th>Production Year</th>
         </tr>`;

    // Loop to access all rows
    for (let i = 0; i < data.length; i++) {
        tab += `<tr> 
    <td>${data[i].plateNumber}</td>
    <td>${data[i].brand}</td>
    <td>${data[i].model}</td>
    <td>${data[i].engine}</td>
    <td>${data[i].productionYear}</td>     
</tr>`
        document.getElementById("carsList").innerHTML = tab;
    }
};


// function appendData(data) {         //TODO stworzyć funkcję która będzie dodawała osobnego diva na każdą rubrykę z bazy danych
//     let mainContainer = document.getElementById("myData");
//     for (let i = 0; i < data.length; i++) {
//         let div = document.createElement("div");
//         div.innerHTML =
//             '<p>' + 'Plate number: ' + data[i].plateNumber + '</p>' +
//             '<p>' + 'Brand: ' + data[i].brand + '</p>' +
//             '<p>' + 'Model: ' + data[i].model + '</p>' +
//             '<p>' + 'Engine: ' + data[i].engine + '</p>' +
//             '<p>' + 'Production year: ' + data[i].productionYear + '</p>' ;
//
//         mainContainer.appendChild(div);
//     };
// };


