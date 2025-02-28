function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', (event) => {
  if(event.target.classList.contains('section-header')){
    document.getElementById(event.target.id).classList.add('section-header-loaded');
  }
  const checkMarquee = event.target.querySelectorAll('.marquee3k');
  const checkMarqueeElement = event.target.querySelector('.marquee-scrolling__option');
  if (checkMarquee.length > 0) {
    Marquee3k.init(checkMarqueeElement);
  }
  customJavascript();
  hideProductModal();
  const checkVerticalSlider = event.target.querySelector('.thumbnail-vertical-scrollbar');
  if(checkVerticalSlider){
    setTimeout(function(){
      const firstElement = checkVerticalSlider.querySelector('.product__media-list .product__media-item.is-active');
      const clientHeight = firstElement.clientHeight;
      if(checkVerticalSlider.querySelector('.thumbnail-slider')){
        checkVerticalSlider.querySelector('.thumbnail-slider').style.setProperty('--slider-height', `${clientHeight}px`);
      }
    });
  }
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', (event) => {
  if(event.target.classList.contains('section-theme-modal__popup')){
    let modalPopup = event.target.querySelector('.theme-modal-popup');
    modalPopup.classList.add("active");
    document.querySelector("body").classList.add("overflow-hidden");
    document.querySelector(".theme-modal-popup__overlay").classList.add("active");
  }
  if(event.target.classList.contains('cart-reminder')){
    let checkReminder = document.querySelector('.cart-count-reminder');
    if(checkReminder){
      document.querySelector('.cart-count-reminder').classList.remove('hidden');
    }
  }
  if(event.target.classList.contains('cart-drawer')){
    let checkReminder = document.querySelector('cart-drawer.drawer');
    if(checkReminder){
      checkReminder.classList.add('active');
      document.querySelector("body").classList.add("overflow-hidden");
    }
  }
  const navigationHub = event.target.classList.contains('section-navigation-hub');
  if(navigationHub){
    const navigationHubId = document.getElementById('modal-navigation-hub');
    navigationHubId.style.display = 'block';
    navigationHubId.offsetWidth;
    navigationHubId.style.opacity = '1';
    document.body.classList.add('overflow-hidden');
  }
  
  hideProductModal();
});

document.addEventListener('shopify:section:deselect', (event) => { 
  if(event.target.classList.contains('section-theme-modal__popup')){
    let modalPopup = event.target.querySelector('.theme-modal-popup');
    modalPopup.classList.remove("active");
    document.querySelector("body").classList.remove("overflow-hidden");
    document.querySelector(".theme-modal-popup__overlay").classList.remove("active");
  }
  if(event.target.classList.contains('cart-reminder')){
    let checkReminder = document.querySelector('.cart-count-reminder');
    if(checkReminder){
      document.querySelector('.cart-count-reminder').classList.add('hidden');
    }
  }
  if(event.target.classList.contains('cart-drawer')){
    let checkReminder = document.querySelector('cart-drawer.drawer');
    if(checkReminder){
      checkReminder.classList.remove('active');
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
  const navigationHub = event.target.classList.contains('section-navigation-hub');
  if(navigationHub){
    const navigationHubId = document.getElementById('modal-navigation-hub');
    navigationHubId.style.display = 'none';
    navigationHubId.offsetWidth;
    navigationHubId.style.opacity = '0';
    document.body.classList.remove('overflow-hidden');
  }
  hideProductModal()
});

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());
