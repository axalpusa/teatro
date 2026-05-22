/**
 * COMPONENTE: VIDEO
 * Reproductor de video con thumbnail y overlay
 */
class VideoComponent {
    constructor() {
      this.container = document.querySelector('.video-container');
      this.thumbnail = document.querySelector('.video-thumbnail');
      this.caption = document.querySelector('.video-caption');
      this.title = document.querySelector('.video-section-title');
    }
  
    init() {
      this.render();
      this.setupClickHandler();
    }
  
    render() {
      if (this.title) {
        this.title.textContent = CONFIG.sectionTitles.video;
      }
      
      if (this.thumbnail) {
        this.thumbnail.src = CONFIG.video.thumbnail;
        this.thumbnail.alt = 'Thumbnail del documental';
        this.thumbnail.addEventListener('error', () => {
          Utils.handleImageError(this.thumbnail);
        });
      }
      
      if (this.caption) {
        this.caption.textContent = CONFIG.video.caption;
      }
    }
  
    setupClickHandler() {
      if (!this.container) return;
      
      this.container.addEventListener('click', () => {
        window.open(CONFIG.video.youtubeUrl, '_blank', 'noopener,noreferrer');
      });
  
      // Accesibilidad: permitir abrir con teclado
      this.container.setAttribute('tabindex', '0');
      this.container.setAttribute('role', 'button');
      this.container.setAttribute('aria-label', 'Reproducir documental en YouTube');
      
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(CONFIG.video.youtubeUrl, '_blank', 'noopener,noreferrer');
        }
      });
    }
  }
  
  window.VideoComponent = VideoComponent;