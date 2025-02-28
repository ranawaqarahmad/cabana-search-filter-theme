if (!window.customElements.get("image-comparison")) {
    const ImageComparison = class extends HTMLElement {
      connectedCallback() {
        this.section = this.closest(".shopify-section");
        this.isPointerDown = this.isPointerMove = false;
        this.pointerStartX = this.pointerCurrentX = 0;
  
        this.pointerDownHandler = (event) => this.pointerDown(event);
        this.pointerMoveHandler = (event) => this.pointerMove(event);
        this.pointerUpHandler = () => this.pointerUp();
        this.resizeHandler = () => this.resize();
  
        this.section.addEventListener("pointerdown", this.pointerDownHandler);
        this.section.addEventListener("pointermove", this.pointerMoveHandler);
        this.section.addEventListener("pointerup", this.pointerUpHandler);
        window.addEventListener("resize", this.resizeHandler);
      }
      get offsetX() {
        return -this.offsetLeft;
      }
      get offsetWidth() {
        const offsetParent = this.offsetParent;
        return offsetParent ? offsetParent.clientWidth + this.offsetX : 0;
      }
  
      pointerDown(event) {
        if (event.target === this || this.contains(event.target)) {
          this.deltaX = event.clientX - this.pointerStartX;
          this.isPointerDown = true;
        }
      }
      pointerMove(event) {
        if (!this.isPointerDown) {
          return;
        }
        this.pointerCurrentX = Math.min(Math.max(event.clientX - this.deltaX, this.offsetX), this.offsetWidth);
        this.pointerStartX = this.pointerCurrentX;
        this.section.style.setProperty(
          "--image-comparison-offset",
          `${this.pointerCurrentX.toFixed(1)}px`
        );
      }
      pointerUp() {
        this.isPointerDown = false;
      }
      resize() {
        this.section.style.setProperty(
          "--image-comparison-offset",
          `${Math.min(Math.max(this.offsetX, this.pointerCurrentX.toFixed(1)), this.offsetWidth)}px`
        );
      }
    };
  
    window.customElements.define("image-comparison", ImageComparison);
  }
  