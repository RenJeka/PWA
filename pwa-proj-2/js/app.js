window.addEventListener('load', async () => {
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

// MAIN FUNCTION
function calculator(){
  const inputs = document.querySelectorAll('input');
  const priceInp = document.querySelector('#price');
  const weightInp = document.querySelector('#weight');
  const resultText = document.querySelector('#result');
  const btnCleanPrice = document.querySelector('#btn-clean-price');
  const btnCleanWeight = document.querySelector('#btn-clean-weight');
  const btnCleanAll = document.querySelector('#btn-clean-all');
  const validateErrors = document.querySelector('#validateErrors');

  function calculate() {
    let result;
    const isPriceValid = validateInputs(priceInp, validateErrors, "Enter a value in the field 'Price (grn.)'");
    const isWeightValid = validateInputs(weightInp, validateErrors, "Enter a value in the field 'Weight (g.)'");
    // IF all fields are valid
    if (isPriceValid && isWeightValid) {
      validateErrors.style.visibility = 'hidden';
      result = (1000 / +weightInp.value) * +priceInp.value;
      result = result.toFixed(2);
      resultText.innerHTML = result;
    } else {
      // IF all fields are not valid
      if (!isPriceValid && !isWeightValid) {
        validateErrors.style.visibility = 'hidden';
        resultText.innerHTML = "RESULT"
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
  btnCleanPrice.addEventListener('click', () => {
    priceInp.value = null;
    triggerInputs();
  });

  btnCleanWeight.addEventListener('click', () => {
    weightInp.value = null;
    triggerInputs();
  });

  btnCleanAll.addEventListener('click', () => {
    priceInp.value = null;
    weightInp.value = null;
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
      input.addEventListener('input', calculate);
    }
  })

}



