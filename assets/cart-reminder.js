(function() {
  let checkReminder = document.querySelector('.cart-count-reminder');
  if (checkReminder) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || window.pageYOffset;
      if(!checkReminder.classList.contains('active') && scrollTop > 400){
        slideRight(checkReminder.querySelector('.reminder-cart__details'), 500);
        checkReminder.classList.add('active');
      }
    });
    function slideRight(element, duration) {
      element.style.transition = `width ${duration}ms`;
      element.style.width = "100%";
    }
  }
  let closeButton = document.querySelector('.btn-cart-reminder__close');
  if(closeButton){
    closeButton.addEventListener('click', function () {
      document.querySelector('.cart-count-reminder').classList.add('hidden__reminder');
    });
  }
}());