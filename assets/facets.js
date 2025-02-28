class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();

    if (this.classList.contains('facet-filters-form__header')) {
      const filterToggle = this.querySelector('.facet--button-toggle');
      const closeButton  = document.querySelector('.filter-drawer__close');
      const applyButton  = document.querySelector('.filter-apply__btn');
      const target       = document.getElementById('main-collection-filters') || document.getElementById('main-search-filters');
      const toggleDrawer = () => {
        if (target) {
          document.body.classList.toggle('overflow-hidden');
          document.body.classList.toggle('filter-drawer__open');
          target.classList.toggle('is-active');
        }
      };

      if (filterToggle) {
        filterToggle.addEventListener('click', () => {
          if (window.matchMedia('(max-width: 989px)').matches) {
            toggleDrawer();
          }
        });
      }
      if (closeButton || applyButton) {
        const closeHandler = () => {
          if (window.matchMedia('(max-width: 989px)').matches) {
            toggleDrawer();
          }
        };
        closeButton && closeButton.addEventListener('click', closeHandler);
        applyButton && applyButton.addEventListener('click', closeHandler);
      }
    }
    window.addEventListener('resize', function (event) {
      if (window.matchMedia('(min-width: 990px)').matches) {
        const target = document.getElementById('main-collection-filters') || document.getElementById('main-search-filters');
        if (target) {
          document.body.classList.remove('overflow-hidden');
          document.body.classList.remove('filter-drawer__open');
          target.classList.remove('is-active');
        }
      }
    });

    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    const facetForm = this.querySelector('form');
    facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) {
      facetWrapper.addEventListener('keyup', onKeyUpEscape);
    }
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) {
        return;
      }
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    // console.log(searchParams)
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections                    = FacetFiltersForm.getSections();
    const loadingSpinners             = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
    loadingSpinners.forEach((spinner) => spinner.classList.remove('hidden'));
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');


    if (searchParams === '' || searchParams.includes('sID') === false ) {
      const storeId = localStorage.getItem('global_store_id');
      if (storeId) {
        searchParams += searchParams ? '&' : '?';
        searchParams += `sID=${encodeURIComponent(storeId)}`;
      }
    } 

    sections.forEach((section) => {
      const url           = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl)
      ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
      : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) {
      FacetFiltersForm.updateURLHash(searchParams);
    }
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html                  = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, {html, url}];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderActiveFacets(html);
        if (typeof initializeScrollAnimationTrigger === 'function') {
          initializeScrollAnimationTrigger(html.innerHTML);
        }
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderActiveFacets(html);
    if (typeof initializeScrollAnimationTrigger === 'function') {
      initializeScrollAnimationTrigger(html.innerHTML);
    }
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;


    document.querySelectorAll('#ProductGridContainer .remove-p').forEach(rem_itm => rem_itm.closest('.grid__item').remove() )


    if(window.location.href.includes('/elite')) document.querySelectorAll('.no_elite').forEach(p => p.parentElement.remove())
    
    if(document.querySelectorAll('#ProductGridContainer .new-product-wrapper').length == 0 ) {
      document.querySelector('#ProductGridContainer .collection--empty').innerHTML = `<div class="title-wrapper center sp-small">
              <h2 class="title title--primary">
                Sorry
              </h2>
              <p>There are no products in this collection.</p>
              <a href="https://cannacabana.com" class="button">
                Go to home
              </a>
            </div>`
    }

    document.querySelectorAll('.new-product-wrapper').forEach(card => {
      card.querySelector('.card-information').addEventListener('click',function(){
        window.location.href = card.dataset.ref
      })
    })

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach((element) => {
        element.classList.add('scroll-trigger--cancel');
      });

    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.classList.add('grid-animation-false');
      const checkMarquee = productGrid.querySelectorAll('.marquee3k');
      if (checkMarquee.length > 0) {
        Marquee3k.init(productGrid);
      }
    }
  }

  static renderActiveFacets(html) {
    document.getElementById('ActiveFacets').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ActiveFacets').innerHTML;
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    const priceRange = parsedHTML.querySelector('price-range');
    if (priceRange) {
      const rangeGroupSliderLabel = priceRange.querySelector('.range-group__slider-label-price');
      if (rangeGroupSliderLabel) {
        document.querySelector('.js-price-facet .range-group__slider-label-price').innerHTML = rangeGroupSliderLabel.innerHTML;
      }
    }

    const mpRange = parsedHTML.querySelector('mp-range');
    if (mpRange) {
      const existingMpRange = document.querySelector('mp-range')

      if (existingMpRange) {
        existingMpRange.innerHTML = mpRange.innerHTML;
        existingMpRange.init();
      }
    }

    const cbdRange = parsedHTML.querySelector('cbd-range');
    if (cbdRange) {
      const rangeGroupSliderLabelCBD = cbdRange.querySelector('.range-group__slider-label-cbd');
      if (rangeGroupSliderLabelCBD) {
        document.querySelector('.js-cbd-facet .range-group__slider-label-cbd').innerHTML = rangeGroupSliderLabelCBD.innerHTML;
      }
    }

    const thcRange = parsedHTML.querySelector('thc-range');
    if (thcRange) {
      const rangeGroupSliderLabelTHC = thcRange.querySelector('.range-group__slider-label-thc');
      if (rangeGroupSliderLabelTHC) {
        document.querySelector('.js-thc-facet .range-group__slider-label-thc').innerHTML = rangeGroupSliderLabelTHC.innerHTML;
      }
    }
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) {
        return;
      }
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });
  }

  static renderCounts(source, target) {
    const targetSummary = target.querySelector('.facets__summary');
    const sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    const targetHeaderElement = target.querySelector('.facets__header');
    const sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    const targetWrapElement = target.querySelector('.facets-wrap');
    const sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      const isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach((hiddenItem) => hiddenItem.classList.replace('hidden', 'show-more-item'));
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  }

  static renderMobileCounts(source, target) {
    const targetFacetsList = target.querySelector('.mobile-facets__list');
    const sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({searchParams}, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      },
    ];
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  onSubmitForm(searchParams, event) {
    
    // console.log('submitForm',searchParams)
    if (this.querySelector('price-range')) {
      var getPriceRange  = this.querySelector('mp-range').getAttribute('style');
      const numericRegex = /\d+(\.\d+)?/;
      const rangeMin     = parseFloat((getComputedStyle(this.querySelector('price-range')).getPropertyValue('--filter-range-min')).match(numericRegex)[0]);
      const rangeMax     = parseFloat((getComputedStyle(this.querySelector('price-range')).getPropertyValue('--filter-range-max')).match(numericRegex)[0]);
      if (rangeMin == 0 && rangeMax == 100) {
        searchParams = removeQueryParam(searchParams, 'filter.v.price.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.price.lte');
      }
    }

    if (this.querySelector('mp-range')) {
      var getPriceRangeMP  = this.querySelector('mp-range').getAttribute('style');
      const numericRegex = /\d+(\.\d+)?/;
      
      // console.log(getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-min'));
      // console.log(getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-max'));

      let rangeMin, rangeMax;
      if(getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-min') == '-Infinity%'){ 
         rangeMin     = 0;
      }else{
         rangeMin     = parseFloat((getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-min')).match(numericRegex)[0]);
      }

      if(getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-max') == 'NaN%'){
         rangeMax     = 100;
      }else{
         rangeMax     = parseFloat((getComputedStyle(this.querySelector('mp-range')).getPropertyValue('--filter-range-max')).match(numericRegex)[0]);
      }
      
      
      if (rangeMin == 0 && rangeMax == 100) {
        searchParams = removeQueryParam(searchParams, 'filter.v.mp.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.mp.lte');
      }
    }

    if (this.querySelector('cbd-range')) {
      var getCBDRange = this.querySelector('cbd-range').getAttribute('style');

      const numericRegex = /\d+(\.\d+)?/;
      const rangeMin     = parseFloat((getComputedStyle(this.querySelector('cbd-range')).getPropertyValue('--filter-range-min')).match(numericRegex)[0]);
      const rangeMax     = parseFloat((getComputedStyle(this.querySelector('cbd-range')).getPropertyValue('--filter-range-max')).match(numericRegex)[0]);
      if (rangeMin == 0 && rangeMax == 100) {
        searchParams = removeQueryParam(searchParams, 'filter.v.cbd.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.cbd.lte');
      }
    }

    if (this.querySelector('thc-range')) {
      var getTHCRange = this.querySelector('thc-range').getAttribute('style');

      const numericRegex = /\d+(\.\d+)?/;
      const rangeMin     = parseFloat((getComputedStyle(this.querySelector('thc-range')).getPropertyValue('--filter-range-min')).match(numericRegex)[0]);
      const rangeMax     = parseFloat((getComputedStyle(this.querySelector('thc-range')).getPropertyValue('--filter-range-max')).match(numericRegex)[0]);
      if (rangeMin == 0 && rangeMax == 100) {
        searchParams = removeQueryParam(searchParams, 'filter.v.thc.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.thc.lte');
      }
    }

    searchParams = addQueryParam(searchParams, 'sID', localStorage.getItem('global_store_id'));

    // new search code
    let new_custom_cbd = document.querySelector('.new_custom_cbd') || null
    if(new_custom_cbd){ 
      let cbd__max = document.querySelector('[data-cbd-max]').getAttribute('data-cbd-max')
      let cbd__min = document.querySelector('[data-cbd-min]').getAttribute('data-cbd-min')

      let cbd__min_selected = document.querySelector('[data-cbd-min-range]').value
      let cbd__max_selected = document.querySelector('[data-cbd-max-range]').value

      if(cbd__min != cbd__min_selected || cbd__max != cbd__max_selected){
        // console.log(cbd__min,cbd__max)
        // console.log(cbd__min_selected,cbd__max_selected)
      }else{
        searchParams = removeQueryParam(searchParams, 'filter.v.cbd.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.cbd.lte');
      }
    }else{
      searchParams = removeQueryParam(searchParams, 'filter.v.cbd.gte');
      searchParams = removeQueryParam(searchParams, 'filter.v.cbd.lte');
    }


    let new_custom_thc = document.querySelector('.new_custom_thc') || null
    if(new_custom_thc){ 
      let thc__max = document.querySelector('[data-thc-max]').getAttribute('data-thc-max')
      let thc__min = document.querySelector('[data-thc-min]').getAttribute('data-thc-min')

      let thc__min_selected = document.querySelector('[data-thc-min-range]').value
      let thc__max_selected = document.querySelector('[data-thc-max-range]').value

      if(thc__min != thc__min_selected || thc__max != thc__max_selected){
        // console.log(thc__min,thc__max)
        // console.log(thc__min_selected,thc__max_selected)
      }else{
        searchParams = removeQueryParam(searchParams, 'filter.v.thc.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.thc.lte');
      }
    }else{
      searchParams = removeQueryParam(searchParams, 'filter.v.thc.gte');
      searchParams = removeQueryParam(searchParams, 'filter.v.thc.lte');
    }

    let new_custom_mp = document.querySelector('.new_custom_mp') || null
    if(new_custom_mp){ 
      let mp__max = document.querySelector('[data-mp-max]').getAttribute('data-mp-max')
      let mp__min = document.querySelector('[data-mp-min]').getAttribute('data-mp-min')

      let mp__min_selected = document.querySelector('[data-mp-min-range]').value
      let mp__max_selected = document.querySelector('[data-mp-max-range]').value

      if(mp__min != mp__min_selected || mp__max != mp__max_selected){
        console.log(mp__min,mp__max)
        console.log(mp__min_selected,mp__max_selected)
      }else{
        console.log('mp__min,mp__max')
        searchParams = removeQueryParam(searchParams, 'filter.v.mp.gte');
        searchParams = removeQueryParam(searchParams, 'filter.v.mp.lte');
      }
    }else{
      searchParams = removeQueryParam(searchParams, 'filter.v.mp.gte');
      searchParams = removeQueryParam(searchParams, 'filter.v.mp.lte');
    }

    // console.log(searchParams)
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event) {
    event.preventDefault();

    // console.log(event)
    
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'));
      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [];

      sortFilterForms.forEach((form) => {
        if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
          const noJsElements = document.querySelectorAll('.no-js-list');
          noJsElements.forEach((el) => el.remove());
          forms.push(this.createSearchParams(form));
        }
      });
      // console.log(forms.join('&'))
      this.onSubmitForm(forms.join('&'), event);
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url =
            event.currentTarget.href.indexOf('?') == -1
            ? ''
            : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }
}

FacetFiltersForm.filterData          = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev    = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

class PriceRange extends HTMLElement {
  constructor() {
    super();
    document.querySelectorAll('.js-price-facet input').forEach(element => element.addEventListener('input', this.onRangeChange.bind(this)));
    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    var inputEvent = event.target.dataset.type;

    this.adjustToValidValues(event.currentTarget);

    this.setMinAndMaxValues(inputEvent);
  }

  setMinAndMaxValues(inputEvent) {
    const inputs = this.querySelectorAll('input');
    const minInput    = inputs[0];
    const maxInput    = inputs[1];
    const maxPrice    = inputs[0].getAttribute('max');
    var priceGap      = 1;
    var minInputPrice = parseInt(minInput.value);
    var maxInputPrice = parseInt(maxInput.value);

    if (inputEvent != 'high') {
      if (minInputPrice >= maxInputPrice) {
        minInput.value = maxInputPrice - priceGap;
        minInputPrice  = maxInputPrice - priceGap;
      }
    }
    if (inputEvent == 'high') {
      if (maxInputPrice <= minInputPrice) {
        maxInput.value = minInputPrice + priceGap;
        maxInputPrice  = minInputPrice + priceGap;
      }
    }

    const sliderMinimumValue = (minInputPrice / parseInt(maxPrice) * 100).toFixed(2);
    const sliderMaximumValue = (maxInputPrice / parseInt(maxPrice) * 100).toFixed(2);

    this.style.setProperty('--filter-range-min', sliderMinimumValue + '%');
    this.style.setProperty('--filter-range-max', sliderMaximumValue + '%');

  }

  adjustToValidValues(input) {
    return false;
    const value = Number(input.value);
    const min   = Number(input.getAttribute('min'));
    const max   = Number(input.getAttribute('max'));

    if (value < min) {
      input.value = min;
    }
    if (value > max) {
      input.value = max;
    }
  }
}

customElements.define('price-range', PriceRange);

class MPRange extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.querySelectorAll('.js-mp-facet input').forEach(element => element.addEventListener('input', this.onRangeChangeMP.bind(this)));
    this.setMinAndMaxValuesMP();
  }

  onRangeChangeMP(event) {
    var inputEvent = event.target.dataset.type;
    this.setMinAndMaxValuesMP(inputEvent);
  }

  setMinAndMaxValuesMP(inputEvent) {
    const inputs = document.querySelectorAll('.js-mp-facet input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    const maxPrice = inputs[0].getAttribute('max');

    var priceGap      = 1;
    var minInputPrice = parseInt(minInput.value);
    var maxInputPrice = parseInt(maxInput.value);

    if (inputEvent != 'highMP') {
      if (minInputPrice >= maxInputPrice) {
        minInput.value = maxInputPrice - priceGap;
        minInputPrice  = maxInputPrice - priceGap;
      }
    }
    if (inputEvent == 'highMP') {
      if (maxInputPrice <= minInputPrice) {
        maxInput.value = minInputPrice + priceGap;
        maxInputPrice  = minInputPrice + priceGap;
      }
    }

    const sliderMinimumValue = (minInputPrice / parseInt(maxPrice) * 100).toFixed(2);
    const sliderMaximumValue = (maxInputPrice / parseInt(maxPrice) * 100).toFixed(2);

    this.style.setProperty('--filter-range-min', sliderMinimumValue + '%');
    this.style.setProperty('--filter-range-max', sliderMaximumValue + '%');
  }
}

customElements.define('mp-range', MPRange);

class CBDRange extends HTMLElement {
  constructor() {
    super();
    document.querySelectorAll('.js-cbd-facet input').forEach(element => element.addEventListener('input', this.onRangeChangeCBD.bind(this)));
    this.setMinAndMaxValuesCBD();
  }

  onRangeChangeCBD(event) {
    var inputEvent = event.target.dataset.type;
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValuesCBD(inputEvent);
  }

  setMinAndMaxValuesCBD(inputEvent) {
    const inputs = document.querySelectorAll('.js-cbd-facet input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    const maxPrice = inputs[0].getAttribute('max');

    var priceGap      = 1;
    var minInputPrice = parseInt(minInput.value);
    var maxInputPrice = parseInt(maxInput.value);

    if (inputEvent != 'highCBD') {
      if (minInputPrice >= maxInputPrice) {
        minInput.value = maxInputPrice - priceGap;
        minInputPrice  = maxInputPrice - priceGap;
      }
    }
    if (inputEvent == 'highCBD') {
      if (maxInputPrice <= minInputPrice) {
        maxInput.value = minInputPrice + priceGap;
        maxInputPrice  = minInputPrice + priceGap;
      }
    }

    const sliderMinimumValue = (minInputPrice / parseInt(maxPrice) * 100).toFixed(2);
    const sliderMaximumValue = (maxInputPrice / parseInt(maxPrice) * 100).toFixed(2);

    this.style.setProperty('--filter-range-min', sliderMinimumValue + '%');
    this.style.setProperty('--filter-range-max', sliderMaximumValue + '%');

  }

  adjustToValidValues(input) {
    return false;
    const value = Number(input.value);
    const min   = Number(input.getAttribute('min'));
    const max   = Number(input.getAttribute('max'));

    if (value < min) {
      input.value = min;
    }
    if (value > max) {
      input.value = max;
    }
  }
}

customElements.define('cbd-range', CBDRange);

class THCRange extends HTMLElement {
  constructor() {
    super();
    document.querySelectorAll('.js-thc-facet input').forEach(element => element.addEventListener('input', this.onRangeChangeTHC.bind(this)));
    this.setMinAndMaxValuesTHC();
  }

  onRangeChangeTHC(event) {
    var inputEvent = event.target.dataset.type;
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValuesTHC(inputEvent);
  }

  setMinAndMaxValuesTHC(inputEvent) {
    const inputs = document.querySelectorAll('.js-thc-facet input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    const maxPrice = inputs[0].getAttribute('max');

    var priceGap      = 1;
    var minInputPrice = parseInt(minInput.value);
    var maxInputPrice = parseInt(maxInput.value);

    if (inputEvent != 'highTHC') {
      if (minInputPrice >= maxInputPrice) {
        minInput.value = maxInputPrice - priceGap;
        minInputPrice  = maxInputPrice - priceGap;
      }
    }
    if (inputEvent == 'highTHC') {
      if (maxInputPrice <= minInputPrice) {
        maxInput.value = minInputPrice + priceGap;
        maxInputPrice  = minInputPrice + priceGap;
      }
    }

    const sliderMinimumValue = (minInputPrice / parseInt(maxPrice) * 100).toFixed(2);
    const sliderMaximumValue = (maxInputPrice / parseInt(maxPrice) * 100).toFixed(2);

    this.style.setProperty('--filter-range-min', sliderMinimumValue + '%');
    this.style.setProperty('--filter-range-max', sliderMaximumValue + '%');

  }

  adjustToValidValues(input) {
    return false;
    const value = Number(input.value);
    const min   = Number(input.getAttribute('min'));
    const max   = Number(input.getAttribute('max'));

    if (value < min) {
      input.value = min;
    }
    if (value > max) {
      input.value = max;
    }
  }
}

customElements.define('thc-range', THCRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') {
        this.closeFilter(event);
      }
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  }
}

customElements.define('facet-remove', FacetRemove);

function removeQueryParam(url, paramKey) {
  const urlSearchParams = new URLSearchParams(url);
  urlSearchParams.delete(paramKey);
  return urlSearchParams.toString();
}

function addQueryParam(url, key, value) {
  const urlSearchParams = new URLSearchParams(url);

  if (urlSearchParams.has(key)) {
    return urlSearchParams.toString();
  }

  urlSearchParams.append(key, value);

  return urlSearchParams.toString();
}
