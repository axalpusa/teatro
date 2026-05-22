/**
 * COMPONENTE: HERO
 * Sección principal con imagen de fondo y llamada a la acción
 */
class HeroComponent {
    constructor() {
      this.hero = document.querySelector('.hero');
      this.title = document.querySelector('.hero-title');
      this.subtitle = document.querySelector('.hero-subtitle');
      this.button = document.querySelector('.hero-btn');
    }
  
    init() {
      this.render();
      this.setupParallax();
    }
  
    render() {
      const { title, subtitle, buttonText, backgroundImage } = CONFIG.hero;
      
      // Fondo
      if (this.hero) {
        this.hero.style.backgroundImage = `url('${backgroundImage}')`;
      }
      
      // Contenido
      if (this.title) this.title.textContent = title;
      if (this.subtitle) this.subtitle.textContent = subtitle;
      if (this.button) this.button.textContent = buttonText;
    }
  
    setupParallax() {
      // Efecto parallax sutil al hacer scroll
      if (!this.hero) return;
      
      window.addEventListener('scroll', Utils.throttle(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          const speed = scrolled * 0.4;
          this.hero.style.backgroundPositionY = `${speed}px`;
        }
      }, 16));
    }
  }
  
  window.HeroComponent = HeroComponent;