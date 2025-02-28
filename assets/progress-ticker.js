if (!customElements.get('progress-bar-container')) {
    class ProgressBarContainer extends HTMLElement {
        constructor() {
          super();
    
          // Initialize Intersection Observer
          const observer = new IntersectionObserver(this.animateProgressBars.bind(this), {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
          });
          observer.observe(this);
        }
    
        // Intersection Observer callback to animate progress bars
        animateProgressBars(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const progressBars = this.querySelectorAll('number-progress-bar');
    
              progressBars.forEach(progressBar => {
                const targetProgress = parseFloat(progressBar.getAttribute('data-progress'));
                let currentProgress = 0;
                const increment = targetProgress / 100;
    
                const interval = setInterval(() => {
                  currentProgress += increment;
                  progressBar.style.setProperty('--progress', currentProgress + '%');
                  progressBar.querySelector('.progress__count').textContent = Math.round(currentProgress) + '%';
                  if (currentProgress >= targetProgress) {
                    clearInterval(interval);
                  }
                }, 30); // Adjust the interval duration as needed
              });
    
              observer.unobserve(this);
            }
          });
        }
      }
      // Define the custom element tag
      customElements.define('progress-bar-container', ProgressBarContainer);
    }