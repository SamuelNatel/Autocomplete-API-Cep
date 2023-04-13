const addresForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const adressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelector("[data-input]");

const closeButton = document.querySelector("#close-message");

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});