const api_url = 'http://localhost:3001/car-info/cars';

async function getApi(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    show(data);
}
getApi(api_url);

function show(data) {
    let tab =
        `<tr>
          <th>Plate Number</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Engine</th>
          <th>Production Year</th>
         </tr>`;

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


// function appendData(data) {
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


