/**
 * COMPONENTE: REPORTAJE
 * Revista digital con modal de lectura completa
 */
class ReportajeComponent {
    constructor() {
      this.title = document.querySelector('.reportaje-section-title');
      this.reportajeTitle = document.querySelector('.reportaje-title');
      this.preview = document.querySelector('.reportaje-preview');
      this.readMore = document.querySelector('.leer-mas');
      this.coverImage = document.querySelector('.reportaje-hero-img');
      this.openButton = document.getElementById('openReportajeModal');
      this.modal = document.getElementById('reportajeModal');
      this.modalBody = document.querySelector('#reportajeModal .modal-body');
      this.closeButton = document.querySelector('#reportajeModal .modal-close');
    }
  
    init() {
      this.render();
      this.setupModal();
      this.setupEventListeners();
    }
  
    render() {
      const { reportaje, sectionTitles } = CONFIG;
      
      if (this.title) this.title.textContent = sectionTitles.reportaje;
      if (this.reportajeTitle) this.reportajeTitle.textContent = reportaje.title;
      if (this.preview) this.preview.textContent = reportaje.preview;
      if (this.readMore) this.readMore.innerHTML = reportaje.readMoreText;
      
      if (this.coverImage) {
        this.coverImage.src = reportaje.coverImage;
        this.coverImage.alt = reportaje.title;
        this.coverImage.addEventListener('error', () => Utils.handleImageError(this.coverImage));
      }
    }
  
    setupModal() {
      if (!this.modalBody) return;
      
      const { modalImages, modalTexts, finalQuote, title } = CONFIG.reportaje;
      
      let content = `
        <img src="${modalImages[0]}" alt="${title}" onerror="Utils.handleImageError(this)">
        <h3>${title}</h3>
      `;
      
      modalTexts.forEach((text, index) => {
        if (index > 0) {
          content += `<img src="${modalImages[index]}" alt="Imagen del reportaje ${index + 1}" onerror="Utils.handleImageError(this)">`;
        }
        content += `<p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">${text}</p>`;
      });
      
      content += `
        <blockquote style="font-style: italic; border-left: 4px solid var(--color-accent); padding-left: 1.5rem; margin-top: 2rem; font-size: 1.2rem; color: var(--color-primary);">
          ${finalQuote}
        </blockquote>
      `;
      
      this.modalBody.innerHTML = content;
    }
  
    setupEventListeners() {
      // Abrir modal
      this.openButton?.addEventListener('click', () => this.openModal());
      
      // Cerrar modal
      this.closeButton?.addEventListener('click', () => this.closeModal());
      
      // Cerrar al hacer clic fuera
      this.modal?.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
  
      // Cerrar con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
          this.closeModal();
        }
      });
    }
  
    openModal() {
      this.modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Scroll al inicio del modal
      const modalContainer = this.modal?.querySelector('.modal-container');
      if (modalContainer) {
        modalContainer.scrollTop = 0;
      }
    }
  
    closeModal() {
      this.modal?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  window.ReportajeComponent = ReportajeComponent;