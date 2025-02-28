document.addEventListener('DOMContentLoaded', function () {
  const animatedCountElements = document.querySelectorAll('.enable-animated-counting .metric');

  const startCounting = (metricElement) => {
    const targetNumber = parseFloat(metricElement.getAttribute('data-target'));
    const isInteger    = Number.isInteger(targetNumber);
    const duration     = 2000;
    const increment    = targetNumber / (duration / 16);

    let currentNumber = 0;

    function updateCounter() {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
      }

      metricElement.textContent = isInteger ? Math.floor(currentNumber) : currentNumber.toFixed(1);

      if (currentNumber < targetNumber) {
        requestAnimationFrame(updateCounter);
      }
    }

    metricElement.textContent = '0';
    updateCounter();
  };

  const observerOptions = {
    root      : null,
    rootMargin: '0px',
    threshold : 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
      } else {
        entry.target.textContent = '0';
      }
    });
  }, observerOptions);

  animatedCountElements.forEach(metricElement => {
    metricElement.setAttribute('data-target', metricElement.textContent);
    observer.observe(metricElement);
  });
});
