window.onload = () => {
  const provinceStorage = localStorage.getItem('global_province');
  if(provinceStorage == 'British Columbia')
  {
    const notBC = document.querySelectorAll(".not-bc")
    notBC.forEach((ele)=>{
      ele.innerHTML = '';
    })
  }
  if(provinceStorage == 'Alberta'){

    const notBC = document.querySelectorAll(".not-abb")
    notBC.forEach((ele)=>{
      ele.innerHTML = '';
    })
     
  }
  else{
    document.querySelectorAll(".only-on").forEach((ele)=>{
      ele.style.display = 'none';
    })
    document.querySelectorAll(".not-on").forEach((ele)=>{
      ele.style.display = 'block';
    })
  }
 
  if (!provinceStorage) {
    return;
  }

  document.querySelectorAll('.js-hide-by-province').forEach(element => {
    const hideProvinces = element.getAttribute('data-hide-province');

    if (!hideProvinces) {
      element.classList.remove('hidden');

      return;
    }

    const provincesToHide = hideProvinces.split(',').map(p => p.trim());
    if (provincesToHide.includes(provinceStorage) ||
        (provinceStorage !== 'British Columbia' && provinceStorage !== 'Alberta' && provincesToHide.includes('Other'))) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
  });

  document.querySelectorAll('.js-hide-by-province-placeholder').forEach(element => {
    if (element) {
      element.classList.add('hidden');
    }
  });
};
