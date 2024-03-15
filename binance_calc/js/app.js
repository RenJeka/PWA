window.addEventListener('load', async () => {
    activateprice1Input();
    // Check for supporting browser a ServiceWorker
    if ('serviceWorker' in navigator) {
        // If ServiceWorker is supported by browser — then register it (show message in error case)
        try {
            await navigator.serviceWorker.register('/service-worker.js');
        } catch (e) {
          console.error(e)
        }
    }
  calculator();
});

const inputsConfig = {
  input1: {
    idSelector: '#price_1',
    clearBtnSelector: '#btn-clean-price-1',
    validateErrorMessage: "Введите значение в поле 'Цена 1'"
  },
  input2: {
    idSelector: '#summ_1',
    clearBtnSelector: '#btn-clean-summ-1',
    validateErrorMessage: "Введите значение в поле 'Сумма 1'"
  },
  input3: {
    idSelector: '#income',
    clearBtnSelector: '#btn-clean-income',
    validateErrorMessage: "Введите значение в поле 'Доход'"
  },
  result: {
    idSelector: '#result',
    clearBtnSelector: '#btn-clean-all',
    validateErrorMessage: ""
  }
}

// MAIN FUNCTION
function calculator(){
  const inputs = document.querySelectorAll('input');
  const price1Inp = document.querySelector(inputsConfig.input1.idSelector);
  const summ1Inp = document.querySelector(inputsConfig.input2.idSelector);
  const incomeInp = document.querySelector(inputsConfig.input3.idSelector);
  const resultText = document.querySelector(inputsConfig.result.idSelector);
  const btnCleanPrice1 = document.querySelector(inputsConfig.input1.clearBtnSelector);
  const btnCleanSumm1 = document.querySelector(inputsConfig.input2.clearBtnSelector);
  const btnCleanIncome = document.querySelector(inputsConfig.input3.clearBtnSelector);
  const btnCleanAll = document.querySelector(inputsConfig.result.clearBtnSelector);
  const validateErrors = document.querySelector('#validateErrors');

  function calculate(event) {
    let result;
    const isPriceValid = validateInputs(price1Inp, validateErrors, inputsConfig.input1.validateErrorMessage);
    const isWeightValid = validateInputs(summ1Inp, validateErrors, inputsConfig.input2.validateErrorMessage);
    const isIncomeValid = validateInputs(incomeInp, validateErrors, inputsConfig.input3.validateErrorMessage);

    // IF all fields are valid
    // if (isPriceValid && isWeightValid) {
    if (isPriceValid && isWeightValid && isIncomeValid) {
      validateErrors.style.visibility = 'hidden';
      result = (+price1Inp.value * (+summ1Inp.value + +incomeInp.value)) / +summ1Inp.value;
      result = result.toFixed(2);
      resultText.innerHTML = result;
    } else {
      // IF all fields are not valid
      if (!isPriceValid && !isWeightValid) {
        validateErrors.style.visibility = 'hidden';
        resultText.innerHTML = "Цена 2"
      } else {
        validateErrors.style.visibility = 'visible';
        resultText.innerHTML = "0"
      }
    }
  }

  /**
   *
   * @param validateInput {HTMLInputElement} Input Input, that will be validate
   * @param output {HTMLElement} HTML element to which the error will be output
   * @param errorText {string} error text
   * @return true — if "validateInput" is valid,  false — if "validateInput" is invalid
   */
  function validateInputs(validateInput, output, errorText) {
    if (validateInput.value.toString().trim().length === 0) {
      output.innerHTML = errorText;
      return false
    } else {
      return true
    }
  }

  /**
   * call 'input' for input element
   */
  function triggerInputs() {
    const inputEvent = new InputEvent('input')
    inputs.forEach((input) => {
      if (
        input.type ==='text' ||
        input.type ==='number' ||
        input.type ==='checkbox' ||
        input.type ==='radio' ||
        input.type ==='range' ||
        input.type ==='password' ||
        input.type ==='search'
      ) {
        input.dispatchEvent(inputEvent);
      }
    })
  }

  // BTN CLEAN — Handlers
  btnCleanPrice1.addEventListener('click', () => {
    price1Inp.value = null;
    triggerInputs();
  });

  btnCleanSumm1.addEventListener('click', () => {
    summ1Inp.value = null;
    triggerInputs();
  });

  btnCleanIncome.addEventListener('click', () => {
    incomeInp.value = null;
    triggerInputs();
  });

  btnCleanAll.addEventListener('click', () => {
    price1Inp.value = null;
    summ1Inp.value = null;
    incomeInp.value = null;
    triggerInputs();
  });

  inputs.forEach((input) => {
    if (
      input.type ==='text' ||
      input.type ==='number' ||
      input.type ==='checkbox' ||
      input.type ==='radio' ||
      input.type ==='range' ||
      input.type ==='password' ||
      input.type ==='search'
    ) {
      input.addEventListener('beforeinput', (event) => {
        if (event.data === '-' || event.data === '+') {
          event.preventDefault();
        }
      });
      input.addEventListener('input', calculate);
    }
  })
}

function activateprice1Input() {
  let price1Inp = document.querySelector(inputsConfig.input1.idSelector);
  let focusEvent = new Event('focus');
  let clickEvent = new Event('click');
  let touchEStartEvent = new Event('touchstart');
  let touchEndEvent = new Event('touchend');

  // Dispatch touch event
  // price1Inp.click();
  // price1Inp.focus();
  price1Inp.dispatchEvent(clickEvent);
  // price1Inp.dispatchEvent(focusEvent);
  // price1Inp.dispatchEvent(touchEStartEvent);
  // price1Inp.dispatchEvent(touchEndEvent);
  // alert('focusEvent → clickEvent → touchEStartEvent → touchEndEvent')
}



