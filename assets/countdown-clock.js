if (!customElements.get('countdown-clock')) {
    class CountdownClock extends HTMLElement {
      constructor() {
        super();
  
        // DOM elements
        this.section = this.closest('section');
        this.display = this.querySelector('.countdown__clock');
        this.block = this.closest('.countdown__block-type-clock');
  
        // Countdown target date components
        this.targetYear = this.dataset.year;
        this.targetMonth = this.dataset.month;
        this.targetDay = this.dataset.day;
        this.targetHour = this.dataset.hour;
        this.targetMinute = this.dataset.minute;
  
        // Countdown placeholders
        this.daysPlaceholder = this.querySelector('.clock__days');
        this.hoursPlaceholder = this.querySelector('.clock__hours');
        this.minutesPlaceholder = this.querySelector('.clock__minutes');
        this.secondsPlaceholder = this.querySelector('.clock__seconds');
        this.messagePlaceholder = this.querySelector('.countdown__clock-message');
  
        // Countdown completion settings
        this.hideclockOnComplete = this.dataset.hideClock;
        this.completeMessage = this.dataset.completeMessage;
        this.clockComplete = false;
  
        // Initialize the countdown clock
        this.init();
      }
  
      init() {
        // Update the countdown every second
        setInterval(() => {
          if (!this.clockComplete) {
            this.calculateTime();
          }
        }, 1000);
      }
  
      calculateTime() {
        const targetDate = new Date(`${this.targetMonth}/${this.targetDay}/${this.targetYear} ${this.targetHour}:${this.targetMinute}:00`);
        const timeDifference = targetDate.getTime() - Date.now();
  
        if (timeDifference > 0) {
          // Calculate time intervals
          const intervals = {
            days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((timeDifference / 1000 / 60) % 60),
            seconds: Math.floor((timeDifference / 1000) % 60),
          };
  
          // Update placeholders with calculated intervals
          this.daysPlaceholder.innerHTML = intervals.days;
          this.hoursPlaceholder.innerHTML = intervals.hours;
          this.minutesPlaceholder.innerHTML = intervals.minutes;
          this.secondsPlaceholder.innerHTML = intervals.seconds;
        } else {
          // Countdown clock completed
          if (this.completeMessage && this.messagePlaceholder) {
            // Show completion message and hide the clock display
            this.messagePlaceholder.classList.remove('hidden');
          }
  
          if (this.hideclockOnComplete === 'true') {
            // Remove the entire countdown section
            this.display.classList.add('countdown__clock--hidden');
          }else{
            this.display.classList.remove('countdown__clock--hidden');
          }
  
          if (!this.completeMessage && this.hideclockOnComplete === 'true') {
            // Hide the countdown block if no completion message
            this.block.classList.add('countdown__block--hidden');
          }
  
          // Mark the clock as complete
          this.clockComplete = true;
        }
      }
    }
  
    // Define the custom countdown-clock element
    customElements.define('countdown-clock', CountdownClock);
  }
  