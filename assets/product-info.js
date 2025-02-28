if (!customElements.get('product-info')) {
  customElements.define(
    'product-info',
    class ProductInfo extends HTMLElement {
      constructor() {
        super();
        this.input          = this.querySelector('.quantity__input');
        this.currentVariant = this.querySelector('.product-variant-id');
        this.variantSelects = this.querySelector('variant-radios');
        this.submitButton   = this.querySelector('[type="submit"]');
      }

      cartUpdateUnsubscriber    = undefined;
      variantChangeUnsubscriber = undefined;

      connectedCallback() {
        if (!this.input) {
          return;
        }
        this.quantityForm = this.querySelector('.product-form__quantity');
        if (!this.quantityForm) {
          return;
        }
        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(
            PUB_SUB_EVENTS.cartUpdate,
            this.fetchQuantityRules.bind(this)
          );
        }
        this.variantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.variantChange,
          (event) => {
            const sectionId = this.dataset.originalSection
                              ? this.dataset.originalSection
                              : this.dataset.section;
            if (event.data.sectionId !== sectionId) {
              return;
            }
            this.updateQuantityRules(event.data.sectionId, event.data.html);
            this.setQuantityBoundries();
          }
        );

        this.button          = document.getElementById(`ProductSubmitButton-${this.dataset.section}`);

        if (this.button) {
          this.buttonText      = this.button.querySelector('.js-cart-update-button-text');
          this.buttonTextPipe  = this.button.querySelector('.js-product-form__submit-pipe');
          this.buttonTextPrice = this.button.querySelector('.js-cart-update-price');
        }

        if (this.buttonTextPrice.innerText === '0' || this.buttonTextPrice.innerText === 'N.A' || this.buttonTextPrice.innerText === '') {
          this.disableBuyButton();
        }

        this.qtyRules        = document.getElementById(`Quantity-Rules-Buy-Buttons-${this.dataset.section}`);

        if (this.currentVariant.dataset.stock === '0') {
          this.disableBuyButton();
        }

        let variantLabels = '';

        if(this.variantSelects) {
           variantLabels = this.variantSelects.querySelectorAll('label');
        }

        if(variantLabels) {
        variantLabels.forEach((label) => {
          let _this = this;
          label.addEventListener('click', function () {
            let varStock   = label.dataset.stock;
            let stockBadge = document.querySelector('.js-stock-badge');

            if (varStock > 0) {
              stockBadge.innerHTML = `${varStock} ${window.variantStrings.inStock}`;
              stockBadge.classList.add('badge--green');
              stockBadge.classList.remove('badge--red');
            } else {
              stockBadge.innerHTML = `${window.variantStrings.outOfStock}`;
              stockBadge.classList.add('badge--red');
              stockBadge.classList.remove('badge--green');
            }

            if (varStock < 1) {
              _this.disableBuyButton();
            } else {
              _this.enableBuyButton();
            }
          });
        });
        }
      }

      disableBuyButton() {
        if (!this.button) {
          return;
        }

        this.button.disabled = true;
        this.button.classList.add('disabled');
        this.buttonText.textContent = window.variantStrings.soldOut;

        if (this.buttonTextPipe) {
          this.buttonTextPipe.classList.add('hidden');
        }

        if (this.buttonTextPrice) {
          this.buttonTextPrice.classList.add('hidden');
        }

        if (this.qtyRules) {
          const elements = this.qtyRules.querySelectorAll('button, input');

          elements.forEach((element) => {
            element.classList.add('disabled');
            element.disabled = true;
          });
        }
      }

      enableBuyButton() {
        if (!this.button) {
          return;
        }

        this.button.removeAttribute('disabled');
        this.button.classList.remove('disabled');
        this.buttonText.textContent = window.variantStrings.addToCart;

        if (this.buttonTextPipe) {
          this.buttonTextPipe.classList.remove('hidden');
        }

        if (this.buttonTextPrice) {
          this.buttonTextPrice.classList.remove('hidden');
        }

        if (this.qtyRules) {
          const elements = this.qtyRules.querySelectorAll('button, input');

          elements.forEach((element) => {
            element.classList.remove('disabled');
            element.disabled = false;
          });
        }
      }

      disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
      }

      setQuantityBoundries() {
        const data = {
          cartQuantity: this.input.dataset.cartQuantity
                        ? parseInt(this.input.dataset.cartQuantity)
                        : 0,
          min         : this.input.dataset.min ? parseInt(this.input.dataset.min) : 1,
          max         : this.input.dataset.max ? parseInt(this.input.dataset.max) : null,
          step        : this.input.step ? parseInt(this.input.step) : 1,
        };

        let min   = data.min;
        const max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) {
          min = Math.min(min, max);
        }
        if (data.cartQuantity >= data.min) {
          min = Math.min(min, data.step);
        }

        this.input.min   = min;
        this.input.max   = max;
        this.input.value = min;
        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      }

      fetchQuantityRules() {
        if (!this.currentVariant || !this.currentVariant.value) {
          return;
        }
        this.querySelector('.quantity__rules-cart .loading__spinner').classList.remove('hidden');
        fetch(
          `${this.dataset.url}?variant=${this.currentVariant.value}&section_id=${this.dataset.section}`
        )
          .then((response) => {
            return response.text();
          })
          .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            this.updateQuantityRules(this.dataset.section, html);
            this.setQuantityBoundries();
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.querySelector('.quantity__rules-cart .loading__spinner').classList.add('hidden');
          });
      }

      updateQuantityRules(sectionId, html) {
        const quantityFormUpdated = html.getElementById(`Quantity-Form-${sectionId}`);
        const selectors           = ['.quantity__input', '.quantity__rules', '.quantity__label'];
        for (let selector of selectors) {
          const current = this.quantityForm.querySelector(selector);
          let updated = null;

          if (quantityFormUpdated) {
            updated = quantityFormUpdated.querySelector(selector);
          }

          if (!current || !updated) {
            continue;
          }

          if (selector === '.quantity__input') {
            const attributes = ['data-cart-quantity', 'data-min', 'data-max', 'step'];
            for (let attribute of attributes) {
              const valueUpdated = updated.getAttribute(attribute);
              if (valueUpdated !== null) {
                current.setAttribute(attribute, valueUpdated);
              }
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      }
    }
  );
}
