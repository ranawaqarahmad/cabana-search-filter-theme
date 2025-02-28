function appendQueryParameterToURL(url, key, value) {
  const urlObj = new URL(url, window.location.origin);
  urlObj.searchParams.set(key, value);

  return urlObj.toString();
}

function addStoreIDToURLs(sID) {
  if (sID) {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.href;
      const targetBlank = link.getAttribute('target') === '_blank';

      if (!href.startsWith('tel:') && !href.startsWith('mailto:') && !targetBlank) {
        link.href = appendQueryParameterToURL(href, 'sID', sID);
      }
    });

    const forms = document.querySelectorAll('form[action]');
    forms.forEach(form => {
      form.action = appendQueryParameterToURL(form.action, 'sID', sID);
    });
  }
}

function setStoreIdFormValues(sID) {
  const inputs = document.querySelectorAll('input[name="sID"]');

  inputs.forEach(input => {
    input.value = sID;
  });
}

function checkAndReloadIfMissingStoreID() {
  const urlParams = new URLSearchParams(window.location.search);
  const sID       = urlParams.get('sID');

  if (!sID && !isBot()) {
    const storedStoreID = localStorage.getItem('global_store_id');

    if (storedStoreID) {
      const newUrl = appendQueryParameterToURL(window.location.href, 'sID', storedStoreID);
      const urlObj = new URL(newUrl, window.location.origin);

      history.pushState(null, '', urlObj);

      if (document.getElementById('product-grid')) {
        FacetFiltersForm.renderPage(urlObj.searchParams.toString());
      } else {
        window.location.replace(newUrl);
      }
    } else {
      console.error('sID is missing in local storage and the query parameter.');
    }
  }
}

function isBot() {
  const botUserAgents = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /slurp/i,
    /fetch/i,
    /search/i,
    /monitor/i,
    /scanner/i
  ];

  const userAgent = navigator.userAgent;

  return botUserAgents.some((bot) => bot.test(userAgent));
}

document.addEventListener('DOMContentLoaded', () => {
  checkAndReloadIfMissingStoreID();

  const sID = localStorage.getItem('global_store_id');

  addStoreIDToURLs(sID);
  setStoreIdFormValues(sID);
});
