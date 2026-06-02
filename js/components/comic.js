/**
 * COMPONENTE: COMIC
 * Galería de cómic con modal de lectura
 */
class ComicComponent {
  constructor() {
    this.title = document.querySelector('.comic-section-title');
    this.coverImg = document.querySelector('.comic-cover-img');
    this.comicTitle = document.querySelector('.comic-title');
    this.comicDescription = document.querySelector('.comic-description');
    this.previewContainer = document.querySelector('.comic-pages-preview');
    this.readButton = document.querySelector('.comic-btn');
    this.modal = document.getElementById('comicModal');
    this.modalBody = document.querySelector('.comic-modal-body');
    this.modalTitle = document.querySelector('.comic-modal-title');
    this.closeButton = document.querySelector('#comicModal .modal-close');
  }

  init() {
    this.render();
    this.setupModal();
    this.setupEventListeners();
  }

  render() {
    const { comic, sectionTitles } = CONFIG;
    
    if (this.title) this.title.textContent = sectionTitles.comic;
    if (this.comicTitle) this.comicTitle.textContent = comic.title;
    if (this.comicDescription) this.comicDescription.textContent = comic.description;
    if (this.readButton) this.readButton.textContent = comic.buttonText;
    
    if (this.coverImg) {
      this.coverImg.src = comic.coverImage;
      this.coverImg.alt = `Portada de ${comic.title}`;
      this.coverImg.addEventListener('error', () => Utils.handleImageError(this.coverImg));
    }

    // Previsualización de páginas
    if (this.previewContainer && comic.pages) {
      const previewPages = comic.pages.slice(0, 3);
      this.previewContainer.innerHTML = previewPages.map((page, idx) => `
        <div class="comic-page-preview">
          <img src="${page.image}" alt="Página ${idx + 1}" loading="lazy">
          <span>Pág. ${idx + 1}</span>
        </div>
      `).join('');
    }
  }

  setupModal() {
    if (!this.modalBody) return;
    
    const { comic } = CONFIG;
    
    if (this.modalTitle) this.modalTitle.textContent = comic.title;
    
    let content = `<div class="comic-viewer">`;
    comic.pages.forEach((page, index) => {
      content += `
        <div class="comic-page">
          <img src="${page.image}" alt="Página ${index + 1}: ${page.caption}" loading="lazy">
          <p class="comic-page-caption">${page.caption}</p>
        </div>
      `;
    });
    content += `</div>`;
    
    this.modalBody.innerHTML = content;
  }

  setupEventListeners() {
    this.readButton?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
    });

    this.closeButton?.addEventListener('click', () => this.closeModal());
    
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (this.modalBody) this.modalBody.scrollTop = 0;
  }

  closeModal() {
    this.modal?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.ComicComponent = ComicComponent;