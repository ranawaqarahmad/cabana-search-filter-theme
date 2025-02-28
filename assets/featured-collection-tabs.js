if (!customElements.get("collection-tabs")) {
  class collectionTabs extends HTMLElement {
    constructor() {
      super();
      const self = this;
      this.collectionTemplate = this.querySelector(".featured-collection-first");
      this.buttons = this.querySelectorAll(".collection-tab-button");
      this.sectionId = this.dataset.sectionId;
      if(this.collectionTemplate){
        var firstHandle = this.collectionTemplate.getAttribute("data-collection-handle");
        self.collection(firstHandle);
      }
      this.buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          if(this.classList.contains('active')) {
            return;
          }
          self.querySelector('.collection-tab-button.active').classList.remove('active');
          this.classList.add('active');
          var collectionHandle = button.getAttribute("data-collection-handle");
          self.collection(collectionHandle);
        });
      });
    }
    collection(handle) {
      let collectionUrl = handle;
      fetch(`${collectionUrl}/?section_id=${this.sectionId}`)
        .then((response) => response.text())
        .then((responseText) => {
          const responseHTML = new DOMParser().parseFromString(
            responseText,
            "text/html"
          );
          if(!responseHTML.querySelector(`#collection-data-${this.sectionId}`)) {
            return;
          }
          const collectionData = responseHTML.querySelector(`#collection-data-${this.sectionId}`).innerHTML;
          document.getElementById('collection-data-' + this.sectionId).innerHTML = collectionData;
          const element = document.getElementById('collection-data-' + this.sectionId);
          const checkMarquee = element.querySelectorAll('.marquee3k');
          if (checkMarquee.length > 0) {
            Marquee3k.init(element);
          }
        });
    }
  }

  customElements.define("collection-tabs", collectionTabs);
}
