class themeLoader extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const elapsedTime = new Date().getTime() / 1000;
    const thisElement = this;
    const progressBar = this.querySelector('.loader-progress-bar');
    const progress = 10;
    let currentProgress = progress;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 2;
      this.classList.add('active');
      progressBar.style.setProperty('--progress', currentProgress + '%');
      if (currentProgress >= 100) {
        clearInterval(interval);
        currentProgress = 100;
        progressBar.style.setProperty('--progress', currentProgress + '%');
      }
    }, 10);
    window.addEventListener("load", () => {
      const currentSeconds = new Date().getTime() / 1000;
      const checkDistance = currentSeconds - elapsedTime;
      const toFixedSeconds = checkDistance.toFixed(2);
      if(toFixedSeconds >= 1.5){
        this.classList.add('animate-top');
        if(document.querySelector('[data-popup-type="age-verification"]') && document.querySelector('[data-popup-type="age-verification"]').classList.contains('active')){
        }else{
          document.body.classList.remove('overflow-hidden');
        }
      }else{
        const requiredSeconds = 1.5 - toFixedSeconds;
        const multiplySeconds = (requiredSeconds*1000).toFixed();
        setTimeout(function(){
          thisElement.classList.add('animate-top');
          if(document.querySelector('[data-popup-type="age-verification"]') && document.querySelector('[data-popup-type="age-verification"]').classList.contains('active')){
          }else{
            document.body.classList.remove('overflow-hidden');
          }
        },multiplySeconds);
      }
    });
  }
}

customElements.define('theme-loader', themeLoader);