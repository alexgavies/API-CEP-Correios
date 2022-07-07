const addressForm=document.querySelector('#addressForm');
const cepInput=document.querySelector('#cep');
const addressInput=document.querySelector('#addres');
const cityInput=document.querySelector('#city');
const neighborhoodInput=document.querySelector('#neighborhood');
const regionInput=document.querySelector('#region');
const formInputs=document.querySelector('[data-input]');
const closeButton=document.querySelector('#close-message');
const fadeElement=document.querySelector('#fade');

//validação do imput de cep
cepInput.addEventListener('keypress', (e)=>{
    const onlyNumbers=/[0-9]/;
    const key=String.fromCharCode(e.keyCode);

    //premitir apenas numeros
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

//obter o valor do cep
cepInput.addEventListener('keyup',(e)=>{
    const inputValue = e.target.value;

    //verificação se ha 8 dig no imput cep
    if (inputValue.length === 8) {
        getAddress(inputValue)
    };
});

//obter o endereço da api
const getAddress= async(cep) =>{
    console.log(cep);
    toggleLoader();
    togglemessage();
    cepInput.blur();

    const apiUrl=`https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl)
    const data = await response.json();

    console.log(data);

    //mostra caso cep estiver errado/invalido
    if (data.erro === "true") {
        if (!addressInput.hasAttribute("disabled")) {
          toggleDisabled();
        }
    
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP Inválido, tente novamente.");
        return;
      }
    
      toggleDisabled();
      // Activate disabled attribute if form is empty
      if (addressInput.value === "") {
        toggleDisabled();
      }
    
      addressInput.value = data.logradouro;
      cityInput.value = data.localidade;
      neighborhoodInput.value = data.bairro;
      regionInput.value = data.uf;
      toggleLoader();
    };
    // Add or remove disable attribute
    const toggleDisabled = () => {
      if (regionInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
          input.removeAttribute("disabled");
        });
      } else {
        formInputs.forEach((input) => {
          input.setAttribute("disabled", "disabled");
        });
      }
    };
    // Show or hide loader
    const toggleLoader = () => {
      const fadeElement = document.querySelector("#fade");
      const loaderElement = document.querySelector("#loader");
      fadeElement.classList.toggle("hide");
      loaderElement.classList.toggle("hide");
    };
    // Show or hide message
    const toggleMessage = (msg) => {
      const fadeElement = document.querySelector("#fade");
      const messageElement = document.querySelector("#message");
    
      const messageTextElement = document.querySelector("#message p");
    
      console.log(msg);
    
      messageTextElement.innerText = msg;
    
      fadeElement.classList.toggle("hide");
      messageElement.classList.toggle("hide");
    };