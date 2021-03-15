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
    result = (1000 / +weightInp.value) * +priceInp.value;
    result = result.toFixed(2);
   resultText.innerHTML = result;
  }
}



