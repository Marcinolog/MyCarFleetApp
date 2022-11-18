// document.body.onload = addElement;
//
// function addElement(car) {
//     const newTable = document.createElement('div')
//     newTable.textContent = car.plateNumber
//
//     const currentEl = document.getElementById('wrapper')
//
//     document.body.insertBefore(newTable, currentEl)
// }

(async () => {
    fetch('http://localhost:3000/car-info/cars')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data)
            appendData(data);

        })
        .catch(function (err) {
            console.log(err);
        })

})();
// (async () => {
//     const cars = await (await fetch("http://localhost:3000/car-info/cars")).json()
//     // addElement(cars[0]);
//     appendData(cars)
// })();git push


function appendData(data) {         //TODO stworzyć funkcję która będzie dodawała osobnego diva na każdą rubrykę z bazy danych
    let mainContainer = document.getElementById("myData");
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = 'Numer rejestracyjny: ' + data[i].plateNumber;

        mainContainer.appendChild(div);
    }
}


