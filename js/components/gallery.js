/**
 * COMPONENTE: GALERÍA
 * Grid de imágenes con lightbox
 */
class GalleryComponent {
    constructor() {
      this.grid = document.querySelector('.gallery-grid');
      this.title = document.querySelector('.gallery-title');
      this.lightbox = document.getElementById('lightboxModal');
      this.lightboxImg = document.querySelector('.lightbox-img');
      this.closeButton = document.querySelector('.lightbox-close');
    }
  
    init() {
      this.render();
      this.setupLightbox();
      this.setupLazyLoading();
    }
  
    render() {
      if (this.title) {
        this.title.textContent = CONFIG.sectionTitles.gallery;
      }
  
      if (!this.grid) return;
  
      this.grid.innerHTML = CONFIG.gallery
        .map((img, index) => `
          <div 
            class="gallery-item" 
            style="background-image: url('${img}')"
            data-fullimg="${img}"
            data-index="${index}"
            role="button"
            tabindex="0"
            aria-label="Ver imagen ${index + 1}"
          ></div>
        `)
        .join('');
    }
  
    setupLightbox() {
      const items = this.grid?.querySelectorAll('.gallery-item');
      
      items?.forEach(item => {
        const openLightbox = () => {
          const fullImg = item.getAttribute('data-fullimg');
          if (fullImg && this.lightboxImg) {
            this.lightboxImg.src = fullImg;
            this.lightbox?.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        };
  
        item.addEventListener('click', openLightbox);
        
        // Accesibilidad con teclado
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
          }
        });
      });
  
      // Cerrar lightbox
      const closeLightbox = () => {
        this.lightbox?.classList.remove('active');
        document.body.style.overflow = '';
      };
  
      this.closeButton?.addEventListener('click', closeLightbox);
      
      this.lightbox?.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          closeLightbox();
        }
      });
    }
  
    setupLazyLoading() {
      // IntersectionObserver para lazy loading de fondos
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.getAttribute('data-fullimg');
            if (img) {
              entry.target.style.backgroundImage = `url('${img}')`;
            }
            observer.unobserve(entry.target);
          }
        });
      });
  
      const items = this.grid?.querySelectorAll('.gallery-item');
      items?.forEach(item => {
        // Guardar la URL y limpiar para lazy load
        const bgImage = item.style.backgroundImage;
        item.style.backgroundImage = 'none';
        item.setAttribute('data-fullimg', bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'));
        observer.observe(item);
      });
    }
  }
  
  window.GalleryComponent = GalleryComponent;