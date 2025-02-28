if (!customElements.get('product-tabs')) {
    class ProductTabs extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.querySelectorAll(".tab-toggle__btn").forEach(link => {
          link.addEventListener("click", this.handleTabToggle.bind(this));
        });
      }
  
      handleTabToggle(event) {
        event.preventDefault();
        const dataId = event.target.dataset.id;
        const tabElement = document.getElementById(dataId);
        const showContent = tabElement.querySelector('.showing-content');
        const hiddenContent = tabElement.querySelector('.hidden-content');
        const dataType = event.target.dataset.type;
        
        if (dataType == 'close') {
          hiddenContent.style.maxHeight = '0px'; 
          hiddenContent.style.visibility = 'hidden';
          showContent.style.maxHeight = showContent.scrollHeight + "px";
          showContent.style.visibility = 'visible';
        } else if(dataType == 'open') {
          hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
          hiddenContent.style.visibility = 'visible';
          showContent.style.maxHeight = '0px';
          showContent.style.visibility = 'hidden';
        }
      }
    }
    customElements.define('product-tabs', ProductTabs);
  }