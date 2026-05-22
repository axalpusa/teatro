/**
 * COMPONENTE: SOCIAL
 * Enlaces a redes sociales
 */
class SocialComponent {
    constructor() {
      this.container = document.querySelector('.social-icons');
      this.title = document.querySelector('.social-title');
    }
  
    init() {
      this.render();
    }
  
    render() {
      if (this.title) {
        this.title.textContent = CONFIG.sectionTitles.social;
      }
  
      if (!this.container) return;
  
      this.container.innerHTML = CONFIG.socialLinks
        .map(social => `
          <a 
            href="${social.url}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-icon-link"
            aria-label="Síguenos en ${social.platform}"
          >
            <i class="${social.icon}"></i>
            <span>${social.platform}</span>
          </a>
        `)
        .join('');
    }
  }
  
  window.SocialComponent = SocialComponent;