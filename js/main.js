let transferFrom = document.querySelector(".transfer-from");
let transferTo = document.querySelector(".transfer-to");
let currencyInput = document.querySelector(".currency-input");
let btn = document.querySelector(".btn");
let myH1 = document.querySelector(".myH1");
let arrowBtn = document.querySelector(".arrow-btn");
let selectFlag1 = document.querySelector(".select-flag1");
let selectFlag2 = document.querySelector(".select-flag2");

let countriesKeys = Object.keys(COUNTRY_NAMES);
// console.log(countriesKeys);

transferFrom.addEventListener("change", () => {
  let flagKey = transferFrom.value.slice(0, 2);
  // console.log(flagKey);
  let flagAPI = `https://flagsapi.com/${flagKey}/shiny/32.png`;
  let t = `<img src=${flagAPI}/>`;
  selectFlag1.innerHTML = t;
});

transferTo.addEventListener("change", () => {
  let flagKey = transferTo.value.slice(0, 2);
  // console.log(flagKey);
  let flagAPI = `https://flagsapi.com/${flagKey}/shiny/32.png`;
  let t = `<img src=${flagAPI}/>`;
  selectFlag2.innerHTML = t;
});

countriesKeys.map((key) => {
  let countryName = `<option value=${key}>${key} || ${COUNTRY_NAMES[key]}</option>`;
  transferFrom.innerHTML += countryName;
  transferTo.innerHTML += countryName;
});

arrowBtn.addEventListener("click", () => {
  let currencyFrom = transferFrom.value;
  transferFrom.value = transferTo.value;
  transferTo.value = currencyFrom;
});

btn.addEventListener("click", () => {
  fetch(
    ` https://v6.exchangerate-api.com/v6/ac633bbba2bc73a2b4e71273/latest/${transferFrom.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (currencyInput.value == "") {
        myH1.innerHTML =
          "1 " +
          transferFrom.value +
          " = " +
          data.conversion_rates[transferTo.value] +
          transferTo.value;
      } else if (isNaN(currencyInput.value)) {
        myH1.innerHTML = "";
      } else {
        let num = parseInt(currencyInput.value);
        myH1.innerHTML =
          currencyInput.value +
          transferFrom.value +
          " = " +
          num * data.conversion_rates[transferTo.value] +
          transferTo.value;
      }
    });
});
