const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");

const closeButton = document.querySelector("#close-message");

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

//Verifica se o cep possui 8 dígitos
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});

//Consulta o cep na API
const getAddress = async (cep) => {
    toggleLoader();
    //Quando digita os 8 dígitos ele retira o cursor do input
    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    //Mostra se o cep é inválido
    if(data.erro === true){
        if(!addressInput.hasAttribute("disabled")){
            toggleDisabled();
        }

        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente!");
        return;
    }
 
    if(addressInput.value === "") {
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

const toggleDisabled = () => {
    if(regionInput.hasAttribute("disabled")){
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};

//Mostrar ou Esconder ícone de carregamento
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

closeButton.addEventListener("click", () => toggleMessage());

addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleLoader();
    setTimeout(() => {
        toggleLoader();
        toggleMessage("Endereço salvo com sucesso!");
        addressForm.reset();
        toggleDisabled();
    }, 1500);
});