/**
 * COMPONENTE: FOOTER
 * Pie de página con información de contacto y botón volver arriba
 */
class FooterComponent {
    constructor() {
      this.email = document.querySelector('.footer-email');
      this.copyright = document.querySelector('.footer-copyright');
      this.backToTop = document.querySelector('.back-to-top');
    }
  
    init() {
      this.render();
      this.setupBackToTop();
    }
  
    render() {
      if (this.email) {
        this.email.innerHTML = `
          <i class="fas fa-envelope"></i> 
          <a href="mailto:${CONFIG.footer.email}" style="color: #f0e9df;">
            ${CONFIG.footer.email}
          </a>
        `;
      }
      
      if (this.copyright) {
        this.copyright.textContent = CONFIG.footer.copyright;
      }
    }
  
    setupBackToTop() {
      if (!this.backToTop) return;
  
      // Mostrar/ocultar botón según scroll
      window.addEventListener('scroll', Utils.throttle(() => {
        if (window.scrollY > 500) {
          this.backToTop.style.opacity = '1';
        } else {
          this.backToTop.style.opacity = '0.5';
        }
      }, 200));
  
      // Scroll suave al inicio
      this.backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  window.FooterComponent = FooterComponent;