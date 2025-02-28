if (!customElements.get("vertical-slider")) {
  class verticalSlider extends HTMLElement {
    constructor() {
      super();
      // Initialize properties
      if (!this.classList.contains('faqs-verticle-slider')) {
        return;
      }
      if(window.matchMedia("(max-width: 989px)").matches){
        return;
      }
      this.innerDiv = this.querySelector(".faq-accordions");
      this.height = 0;
      const thisElement = this;
      setTimeout(function(){
        thisElement.elements = thisElement.querySelectorAll(".auto-scrolling-height");
        thisElement.elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          thisElement.height += rect.height;
        });
        thisElement.finalHeight = parseFloat(thisElement.height).toFixed(2);;
        thisElement.style.setProperty("--element-height", `${thisElement.finalHeight}px`);
        thisElement.classList.add("active-vertical");
      },10);
      
      // Variables for auto-scrolling
      var elemenHeight = parseInt(this.height);
      var container = this;
      var scrollSpeed = 1;
      var index = 1;
      var myInterval = "";
      // Event listener for window resize
      window.addEventListener("resize", this.onResize.bind(this));
      // Start auto-scrolling after a delay
      myInterval = setInterval(autoScroll, 25);
      // Auto-scrolling function
      function autoScroll() {
        var scrollHeight = elemenHeight;
        if (container.classList.contains('bottom-to-top')) {
          container.scrollTop -= scrollSpeed;
        }else{
          container.scrollTop += scrollSpeed;
        }
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
          container.classList.remove('top-to-bottom');
          container.classList.add('bottom-to-top')
        }else if(container.scrollTop == 0){
          container.classList.add('top-to-bottom');
          container.classList.remove('bottom-to-top')
        }
      }
      // Event listener for mouse enter
      this.addEventListener("mouseenter", function() {
        clearInterval(myInterval); // Stop auto-scrolling on hover
      });

      // Event listener for mouse leave
      this.addEventListener("mouseleave", function() {
        myInterval = setInterval(autoScroll, 25); // Resume auto-scrolling on mouse leave
      });
    }
    // Resize event handler
    onResize = () => {
      this.classList.remove("active-vertical");
      const rect = this.innerDiv.getBoundingClientRect();
      this.elements = this.querySelectorAll(".auto-scrolling-height");
      this.height = 0;
      this.elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        this.height += rect.height;
      });
      this.finalHeight = parseFloat(this.height).toFixed(2);;
      this.style.setProperty("--element-height", `${this.finalHeight}px`);
      this.classList.add("active-vertical");
    };
  }
  // Define the custom element
  customElements.define("vertical-slider", verticalSlider);
}
