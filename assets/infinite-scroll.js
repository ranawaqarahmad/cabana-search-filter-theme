class InfiniteScroll extends HTMLElement {
    constructor() {
      super();

      this.pagination = this.querySelector('pagination-wrapper');
      this.containerID = this.getAttribute('data-container');
      this.pageID = this.getAttribute('data-page');
      this.nextPageID = this.getAttribute('data-next-page');
      this.containerElem = this.querySelector(this.containerID);
      this.pageElem = this.querySelector(this.pageID);
      this.loadingElem = this.querySelector('.loading-product__wrapper');

      if (!this.containerElem || !this.pageElem) {
        return;
      }

      try {
        this.observer = this.registerObserver(this.loadNextPage.bind(this));
        this.observer.observe(this.pageElem);
        this.pageElem.classList.add('hidden-collection__pagination');
      } catch (error) {}
    }

    registerObserver(callback) {
      let inProgress = false;
      return new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !inProgress) {
          inProgress = true;
          callback()
            .then(_ => inProgress = false)
            .catch(_ => inProgress = false);
        }
      });
    }

    loadNextPage() {
      const nextPageElem = this.pageElem.querySelector(this.nextPageID);

      if (!nextPageElem) {
        this.pagination.classList.add('hidden');
        this.observer.disconnect();
        return Promise.resolve();
      }
      const nextPageURL = nextPageElem.getAttribute('href');
      this.loadingElem.classList.remove('hidden');
      return fetch(nextPageURL)
        .then(result => {
          if (!result.ok) {
            throw(result.statusText);
          }
          return result.text();
        })
        .then(this.handleNextPage.bind(this));
    }

    handleNextPage(nextPageContent) {
      this.loadingElem.classList.add('hidden');
      const nextPageHTML = new DOMParser().parseFromString(nextPageContent, 'text/html');
      const nextPageContainer = nextPageHTML.querySelector(this.containerID);
      if (!nextPageContainer) {
        console.warn('No content found in the next page', nextPageHTML);
        return;
      }
      this.containerElem.insertAdjacentHTML('beforeend', nextPageContainer.innerHTML);
      const nextPageNav = nextPageHTML.querySelector(this.pageID);
      if (!nextPageNav) {
        console.warn('No navigation found in the next page');
        return;
      }
      this.pageElem.innerHTML = nextPageNav.innerHTML;
      const productGrid = document.getElementById('product-grid');
      if(productGrid){
        productGrid.classList.add('grid-animation-false');
        const checkMarquee = productGrid.querySelectorAll('.marquee3k');
        if (checkMarquee.length > 0) {
          Marquee3k.init(productGrid);
        }
      }
    }
  }

  customElements.define('infinite-scroll', InfiniteScroll);
