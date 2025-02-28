if (!customElements.get("auto-slide-text")) {
  class AutoSlideText extends HTMLElement {
    constructor() {
      super();
      this.innerDiv = this.querySelector(".auto-slide-text-inner");
      this.innerItems = Array.from(this.innerDiv.children);
      this.currentIndex = 1;
      setInterval(() => {
        this.innerItems.forEach((item, index) => {
          if (index === this.currentIndex) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        this.currentIndex = (this.currentIndex + 1) % this.innerItems.length;
      }, 3500);
    }
  }
  customElements.define("auto-slide-text", AutoSlideText);
}
  