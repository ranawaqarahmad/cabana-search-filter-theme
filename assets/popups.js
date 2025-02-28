(function () {
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R    = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a    =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function populateStores(provinceToStores, province, storeId) {
    let stores = provinceToStores[province];

    if (province !== '') {
      ageVerificationStore.parentElement.classList.remove('hidden');
    } else {
      ageVerificationStore.parentElement.classList.add('hidden');
    }

    ageVerificationStore.innerHTML = '';

    const defaultOption       = document.createElement('option');
    defaultOption.value       = '';
    defaultOption.textContent = 'Select Your Store';
    ageVerificationStore.appendChild(defaultOption);

    if (stores) {
      stores = stores.sort((a, b) => a.distance - b.distance).sort( (a, b) => {
        if (a.address.city.toLowerCase() < b.address.city.toLowerCase()) {
          return -1;
        }
        if (a.address.city.toLowerCase() > b.address.city.toLowerCase()) {
          return 1;
        }
        return 0;
      });


      const storeIds = [];

      stores.forEach(store => {
        const option       = document.createElement('option');
        option.value       = store.store_id;
        option.textContent = `${store.address.city} - ${store.address.street1} ${store.distance ? '(' + store.distance.toFixed(0) + 'km)' : ''}`;
        ageVerificationStore.appendChild(option);

        storeIds.push(store.store_id);
      });

      if ((storeId === '' && stores.length > 0) || (stores[0].distance && !storeIds.includes(storeId))) {
        ageVerificationStore.value = stores[0].store_id;
        ageVerificationStore.dispatchEvent(new Event('change', {'bubbles': true}));
      } else if (storeIds.includes(storeId)) {
        ageVerificationStore.value = storeId;
        ageVerificationStore.dispatchEvent(new Event('change', {'bubbles': true}));
      }
    }
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires     = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  let checkAgeVerified    = true;
  let checkAgePopupCookie = getCookie('age-verification');
  let storeId             = localStorage.getItem('global_store_id') ?? '';

  if (document.querySelectorAll('[data-popup-type="age-verification"]').length > 0 && (checkAgePopupCookie === '' || storeId === '') && document.querySelectorAll('.theme-modal-popup.design__mode').length === 0) {
    checkAgeVerified         = false;
    let ageVerificationPopup = document.querySelector('[data-popup-type="age-verification"]');
    ageVerificationPopup.classList.add('active');
    document.querySelector('body').classList.add('overflow-hidden');
    document.querySelector('.theme-modal-popup__overlay').classList.add('active');
    setTimeout(function () {
      trapFocus(ageVerificationPopup);
    }, 1500);
  }

  if (checkAgeVerified === true && document.querySelectorAll('.theme-modal-popup.design__mode').length === 0) {
    let checkNewsletterPopupCookie = getCookie('newsletter-popup');
    let newsletterPopup            = document.querySelector('[data-popup-type="newsletter"]');
    if (checkNewsletterPopupCookie === '' && newsletterPopup) {
      let popupDelayTime = parseInt(newsletterPopup.dataset.popupDelaySeconds);
      setTimeout(function () {
        newsletterPopup.classList.add('active');
        document.querySelector('body').classList.add('overflow-hidden');
        document.querySelector('.theme-modal-popup__overlay').classList.add('active');
        setTimeout(function () {
          trapFocus(newsletterPopup);
        }, 500);
      }, popupDelayTime);
    }
  }

  let ageVerifiedButton         = document.querySelector('.age-varified__button');
  const legalAgeInput           = document.querySelectorAll('input[name="age-verification"]');
  const ageVerificationProvince = document.querySelector('select[name="age-verification-province"]');
  const ageVerificationStore    = document.querySelector('select[name="age-verification-store"]');
  let ageVerified               = checkAgePopupCookie;
  let province                  = localStorage.getItem('global_province') ?? '';

  function getStoreSelectData() {
    const provinceToStores = {};

    Object.entries(window.stores).forEach(([key, store]) => {
      const province = store.address.province;
      if (!provinceToStores[province]) {
        provinceToStores[province] = [];
      }

      provinceToStores[province].push({id: key, ...store});
    });

    Object.keys(provinceToStores).sort().forEach(province => {
      const option       = document.createElement('option');
      option.value       = province;
      option.textContent = province;
      ageVerificationProvince.appendChild(option);
    });

    ageVerificationProvince.value = province;

    ageVerificationProvince.addEventListener('change', (event) => {
      province = event.target.value;
      populateStores(provinceToStores, province, storeId);

      if (province !== '') {
        document.querySelector('.modal-popup__province-select.hidden')?.classList.remove('hidden');
      } else {
        document.querySelector('.modal-popup__province-select.hidden')?.classList.add('hidden');
      }

      setCookie('global_province', province, 7);
      localStorage.setItem('global_province', province);
    });

    let closestStore = null;
    let minDistance  = Infinity;

    navigator.geolocation.getCurrentPosition((position) => {
      const userLatitude  = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      Object.entries(provinceToStores).forEach(([province, stores]) => {
        stores.forEach(store => {
          const distance = getDistanceFromLatLonInKm(
            userLatitude, userLongitude, store.address.latitude, store.address.longitude
          );

          store.distance = distance;

          if (distance < minDistance) {
            closestStore = store;
            minDistance  = distance;
          }
        });
      });

      if (closestStore !== null) {
        storeId = closestStore.id;
      }

      if (province === '' && closestStore !== null) {
        ageVerificationProvince.value = closestStore.address.province;
        ageVerificationProvince.dispatchEvent(new Event('change', {'bubbles': true}));
      }

      if (province !== '') {
        ageVerificationProvince.dispatchEvent(new Event('change', {'bubbles': true}));
      }
    }, (error) => {
      console.error('Error getting location', error);

      if (province !== '') {
        ageVerificationProvince.dispatchEvent(new Event('change', {'bubbles': true}));
      }
    });

    ageVerificationStore.addEventListener('change', (event) => {
      storeId             = event.target.value;
      const selectedStore = provinceToStores[province].find(store => store.store_id === storeId);

      setCookie('global_store_id', storeId, 7);
      setCookie('global_province', province, 7);
      localStorage.setItem('global_store_id', storeId);
      localStorage.setItem('global_province', province);

      updateStoreHeader(selectedStore);
    });
  }

  if (ageVerifiedButton) {
    if (!ageVerified || storeId === '') {
      getStoreSelectData();

      const errorMessage = document.querySelector('.modal-popup__age-error');
      errorMessage.classList.add('hidden');

      ageVerifiedButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (!ageVerified || ageVerified === false) {
          errorMessage.classList.remove('hidden');
          return;
        }

        if (ageVerified === true && storeId !== '') {
          let ageVerificationPopup = document.querySelector('[data-popup-type="age-verification"]');
          let showAgainAgePopup    = ageVerificationPopup.dataset.popupDelayDays;
          ageVerificationPopup.classList.remove('active');
          setCookie('age-verification', true, showAgainAgePopup);
          localStorage.setItem('global_store_id', storeId);
          localStorage.setItem('global_province', province);
          localStorage.setItem('global_age', ageVerified);
          document.querySelector('.theme-modal-popup__overlay').classList.remove('active');
          document.querySelector('body').classList.remove('overflow-hidden');

          clearCart().then(() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('sID', storeId);
            window.location.href = currentUrl.toString();
          });
        }
      });

      legalAgeInput.forEach((radio) => {
        radio.addEventListener('change', function (event) {
          ageVerified = JSON.parse(event.target.value);
          if (ageVerified === true) {
            errorMessage.classList.add('hidden');
          }

          ageVerifiedButton.classList.remove('disabled');
        });
      });
    } else {
      ageVerifiedButton.addEventListener('click', function (event) {
        event.preventDefault();

        clearCart().then(() => {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('sID', storeId);
          window.location.href = currentUrl.toString();
        });
      });
    }
  }

  const openModalButton = document.querySelectorAll('.js-header-location-data');

  openModalButton.forEach(button => {
    button.addEventListener('click', function () {
      const ageVerificationPopup = document.querySelector('[data-popup-type="age-verification"]');
      ageVerificationPopup.classList.add('active');
      document.querySelector('body').classList.add('overflow-hidden');
      document.querySelector('.theme-modal-popup__overlay').classList.add('active');

      const legalAgeConsent        = document.querySelector('.modal-popup__legal-age-consent');
      const legalAgeConsentMessage = document.querySelector('.modal-popup__legal-age-consent-message');

      if (legalAgeConsent) {
        legalAgeConsent.classList.add('hidden');
        legalAgeConsentMessage.classList.remove('hidden');
        ageVerifiedButton.classList.remove('disabled');
      }

      getStoreSelectData();
    });
  });

  function updateStoreHeader(store) {
    if (store.address.city && store.address.street1) {
      const storeNameElements    = document.querySelectorAll('.js-header-store-name');
      const storeAddressElements = document.querySelectorAll('.js-header-street');

      if (store.distance) {
        localStorage.setItem('global_store_distance', store.distance);
      }

      storeNameElements.forEach(element => {
        element.textContent = store.address.city;
      });

      storeAddressElements.forEach(element => {
        element.textContent = store.address.street1;
      });
    }
  }

  async function clearCart() {
    fetch(window.Shopify.routes.root + 'cart/clear.js', {
      method : 'POST',
      headers: {
        'Content-Type'    : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        //console.log('Cart cleared:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function setHeaderData() {
    storeId  = localStorage.getItem('global_store_id') ?? '';
    province = localStorage.getItem('global_province') ?? '';

    if (storeId && province && window.stores) {
      const provinceToStores = {};

      Object.entries(window.stores).forEach(([key, store]) => {
        const province = store.address.province;
        if (!provinceToStores[province]) {
          provinceToStores[province] = [];
        }

        provinceToStores[province].push({id: key, ...store});
      });

      const selectedStore = provinceToStores[province].find(store => store.store_id === storeId);
      if (selectedStore) {
        updateStoreHeader(selectedStore);
      }
    }
  }

  setHeaderData();

  let popupClose = document.querySelectorAll('.btn-modal-popup__trigger');
  popupClose.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      let modalId = this.getAttribute('data-modal-id');
      document.querySelector('.theme-modal-popup[data-popup-type="' + modalId + '"]').classList.remove('active');
      document.querySelector('.theme-modal-popup__overlay').classList.remove('active');
      document.querySelector('body').classList.remove('overflow-hidden');
      if (modalId == 'newsletter') {
        let showAgainPopup = document.querySelector('.theme-modal-popup[data-popup-type="' + modalId + '"]').dataset.popupDelayDays;
        setCookie('newsletter-popup', true, showAgainPopup);
      }
    });
  });
})();
