if (!customElements.get("grid-color-swatches")) {
  class CustomGridColorSwatches extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      // Your custom JavaScript logic for grid color swatches goes here
      const radios = this.querySelectorAll(".color-swatch__radio");
      radios.forEach((radio) => {
        radio.addEventListener("change", this.onChange.bind(this, radio));
      });
    }

    disconnectedCallback() {
      const radios = this.querySelectorAll(".color-swatch__radio");
      radios.forEach((radio) => {
        radio.removeEventListener("change", this.onChange.bind(this, radio));
      });
    }

    onChange(radio) {
      // Handle change event logic here
      const variantId = radio.getAttribute("data-variant-id");
      const productHandle = radio.getAttribute("data-product-handle");
      const imageElement = radio.getAttribute("data-image-element");
      let shopUrl = window.shopUrl;
      let productUrl = shopUrl + "/products/" + productHandle+'?variant='+variantId+'&section_id=product-grid-color-swatch-image';
      fetch(`${productUrl}`)
      .then((response) => response.text())
      .then((responseText) => {
        const responseHTML = new DOMParser().parseFromString(
          responseText,
          "text/html"
        );
        
        const productImages = responseHTML.querySelector('#shopify-section-product-grid-color-swatch-image').innerHTML;
        if (productImages.trim() !== '') {
          const targetElement = document.getElementById(imageElement);
          if (targetElement) { 
            const primaryImage = targetElement.querySelector('.product-grid-primary__image');
            primaryImage.remove();
            targetElement.insertAdjacentHTML('afterbegin', productImages);
          }
        }
      });
    }
  }

  customElements.define("grid-color-swatches", CustomGridColorSwatches);
}
