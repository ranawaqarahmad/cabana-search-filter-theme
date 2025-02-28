if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        if (this.form) {
          this.form.querySelector('[name=id]').disabled = false;
          this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        }
        //this.cart = document.querySelector('cart-drawer');
        this.cart = document.querySelector('.js-atc-success');
        this.submitButton = this.querySelector('[type="submit"]');

        //if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
        if (document.querySelector('.js-atc-success')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.input = document.querySelector('.quantity__input');
        if (this.input) {
          this.input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          });
        }

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      showToast() {
        var toast      = document.querySelector('.js-atc-toast'),
            toastInner = toast.querySelector('.js-toast');

        toast.style.display      = 'block';
        toastInner.style.display = 'flex';
      }

      showErrorToast() {
        var toastError = document.querySelector('.js-atc-error-toast'),
            toastInner = toastError.querySelector('.js-toast');

        toastError.style.display = 'block';
        toastInner.style.display = 'flex';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);

        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }

        const purchasePrice = formData.get('purchase_price');
        if (purchasePrice) {
          formData.append('properties[price]', formData.get(purchasePrice));
        }

        const marketPrice = formData.get('market_price');
        if (marketPrice) {
          formData.append('properties[market_price]', marketPrice);
        }

        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
             // window.location = window.routes.cart_url;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            this.showErrorToast();
            console.error(e);
          })
          .finally(() => {
            this.showToast();
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}
if (!customElements.get('discount-code')) {
  class DiscountCodeBar extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const discountField = this.querySelector('.discount-field__input');
      const copyButton = this.querySelector('.button-copy__discount');
      const primaryLabel = copyButton.dataset.primaryLabel;
      const secondaryLabel = copyButton.dataset.secondaryLabel;

      copyButton.addEventListener('click', () => {
        discountField.select();
        discountField.setSelectionRange(0, 99999);
        document.execCommand('copy');
        discountField.setSelectionRange(0, 0);
        copyButton.textContent = secondaryLabel;
        setTimeout(() => {
          copyButton.textContent = primaryLabel;
        }, 2000);
      });
    }
  }
  customElements.define('discount-code', DiscountCodeBar);
}
