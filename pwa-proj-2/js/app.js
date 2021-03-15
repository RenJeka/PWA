window.addEventListener('load', async () => {
    // Проверка, поддерживает ли браузер ServiceWorker
    if ('serviceWorker' in navigator) {
        // Если ServiceWorker поддерживается браузером — тогда регистрируем его (віводим ошибки в случае ошибки)
        try {
            await navigator.serviceWorker.register('/service-worker.js');
        } catch (e) {
        }
    }
  calculator();
});

function calculator(){
  const inputs = document.querySelectorAll('input');
  const priceInp = document.querySelector('#price');
  const weightInp = document.querySelector('#weight');
  const resultText = document.querySelector('#result');
  const btnCalc = document.querySelector('#btnCalc');
  const validateErrors = document.querySelector('#validateErrors');

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

  btnCalc.addEventListener('click', calculate)

  function calculate() {
    let result;
    const isPriceValid = validateInputs(priceInp, validateErrors, "Enter a value in the field 'Price (grn.)'");
    const isWeightValid = validateInputs(weightInp, validateErrors, "Enter a value in the field 'Weight (g.)'");
    // IF all fields are valid
    if (isPriceValid && isWeightValid) {
      validateErrors.style.display = 'none';
      result = (1000 / +weightInp.value) * +priceInp.value;
      result = result.toFixed(2);
      resultText.innerHTML = result;
    } else {
      // IF all fields are not valid
      if (!isPriceValid && !isWeightValid) {
        validateErrors.style.display = 'none';
        resultText.innerHTML = "RESULT"
      } else {
        validateErrors.style.display = 'block';
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
}



