/**
 * COMPONENTE: COUNTDOWN
 * Contador regresivo para el próximo evento
 */
class CountdownComponent {
    constructor() {
      this.title = document.querySelector('.countdown-title');
      this.eventText = document.querySelector('.countdown-event');
      this.targetDate = new Date(CONFIG.countdown.targetDate);
      this.interval = null;
    }
  
    init() {
      this.render();
      this.startCountdown();
    }
  
    render() {
      if (this.title) {
        this.title.textContent = CONFIG.countdown.title;
      }
      
      if (this.eventText) {
        this.eventText.textContent = CONFIG.countdown.eventText;
      }
    }
  
    startCountdown() {
      this.updateDisplay();
      this.interval = setInterval(() => this.updateDisplay(), 1000);
    }
  
    updateDisplay() {
      const now = new Date();
      const diff = this.targetDate - now;
  
      if (diff <= 0) {
        this.handleCountdownEnd();
        return;
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
      this.animateNumber('days', days);
      this.animateNumber('hours', hours);
      this.animateNumber('minutes', minutes);
      this.animateNumber('seconds', seconds);
    }
  
    animateNumber(id, value) {
      const element = document.getElementById(id);
      if (!element) return;
      
      const formattedValue = Utils.padNumber(value);
      
      // Solo animar si el valor cambió
      if (element.textContent !== formattedValue) {
        element.style.transform = 'scale(1.1)';
        element.textContent = formattedValue;
        
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 200);
      }
    }
  
    handleCountdownEnd() {
      // Detener el intervalo
      if (this.interval) {
        clearInterval(this.interval);
      }
  
      // Mostrar todos en 00
      ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '00';
      });
  
      // Mostrar mensaje de evento iniciado
      if (this.eventText) {
        this.eventText.textContent = '🎉 ¡El evento ha comenzado!';
        this.eventText.style.animation = 'pulse 1s infinite';
      }
    }
  
    destroy() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }
  
  window.CountdownComponent = CountdownComponent;