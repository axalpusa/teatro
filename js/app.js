/**
 * APLICACIÓN PRINCIPAL
 * Inicializa todos los componentes y configura la aplicación
 * Incluye sistema de animaciones scroll-reveal estilo macOS
 */
class App {
    constructor() {
      this.components = {};
      this.initialized = false;
      this.escapeHandler = null;
      this.scrollObserver = null;
    }
  
    async init() {
      if (this.initialized) {
        console.warn('La aplicación ya está inicializada');
        return;
      }
  
      try {
        console.log('🚀 Inicializando Bajo el Telón...');
  
        // 1. Aplicar colores y tema
        this.applyTheme();
  
        // 2. Inicializar componentes en orden
        await this.initComponents();
  
        // 3. Configurar listeners globales
        this.setupGlobalListeners();
  
        // 4. Asegurar que el modal genérico funcione correctamente
        this.ensureGenericModalWorks();

        // 5. Inicializar animaciones scroll-reveal macOS-style
        this.initScrollRevealAnimations();
  
        // 6. Marcar como inicializado
        this.initialized = true;
  
        // 7. Evento de aplicación lista
        document.dispatchEvent(new CustomEvent('app:ready'));
        
        console.log('✅ Aplicación inicializada correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar la aplicación:', error);
        this.showErrorFallback();
      }
    }
  
    applyTheme() {
      Utils.applyColors(CONFIG.colors);
      document.body.style.visibility = 'visible';
    }
  
    async initComponents() {
      const componentList = [
        { name: 'navbar', class: NavbarComponent },
        { name: 'hero', class: HeroComponent },
        { name: 'timeline', class: TimelineComponent },
        { name: 'case', class: CaseComponent },
        { name: 'reportaje', class: ReportajeComponent },
        { name: 'game', class: GameComponent },
        { name: 'comic', class: ComicComponent },
        { name: 'countdown', class: CountdownComponent },
        { name: 'podcast', class: PodcastComponent },
        { name: 'gallery', class: GalleryComponent },
        { name: 'social', class: SocialComponent },
        { name: 'credits', class: CreditsComponent },
        { name: 'contact', class: ContactComponent },
        { name: 'footer', class: FooterComponent }
      ];
  
      for (const component of componentList) {
        try {
          const instance = new component.class();
          instance.init();
          this.components[component.name] = instance;
        } catch (error) {
          console.error(`Error en ${component.name}:`, error);
        }
      }
    }

    /**
     * Sistema de animaciones scroll-reveal al estilo macOS
     * Usa IntersectionObserver para activar animaciones suaves con blur
     */
    initScrollRevealAnimations() {
      // Seleccionar elementos para animar
      const revealSelectors = [
        '.section-title',
        '.timeline-card-v',
        '.case-content',
        '.reportaje-destacado',
        '.game-preview',
        '.comic-container',
        '.countdown-box',
        '.gallery-item',
        '.credit-card',
        '.contact-container',
        '.contact-info',
        '.case-stat-card',
        '.comic-page-preview',
        '.podcast-player-card',
        '.podcast-playlist-card'
      ];

      const elements = document.querySelectorAll(revealSelectors.join(', '));

      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small stagger delay based on element index within its parent
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = parent.querySelectorAll(':scope > ' + entry.target.tagName.toLowerCase() + '.' + Array.from(entry.target.classList).join('.'));
              const index = Array.from(siblings).indexOf(entry.target);
              if (index > 0) {
                entry.target.style.transitionDelay = `${index * 0.06}s`;
              }
            }
            
            entry.target.classList.add('is-visible');
            // Stop observing once visible
            this.scrollObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      elements.forEach((el) => {
        // Don't re-animate hero elements
        if (el.closest('.hero')) return;
        
        el.classList.add('scroll-reveal');
        this.scrollObserver.observe(el);
      });
    }
  
    ensureGenericModalWorks() {
      const modal = document.getElementById('genericModal');
      if (!modal) return;
  
      // Asegurar que el botón de cierre funcione
      const closeBtn = modal.querySelector('.generic-modal-close');
      if (closeBtn) {
        // Remover listeners antiguos clonando el botón
        const newBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newBtn, closeBtn);
        
        // Agregar listener fresco
        newBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          Utils.closeGenericModal();
        });
      }
  
      // Permitir cerrar haciendo clic fuera
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          Utils.closeGenericModal();
        }
      });
    }
  
    setupGlobalListeners() {
      // Manejar tecla Escape para todos los modales
      this.escapeHandler = (e) => {
        if (e.key === 'Escape') {
          // Cerrar modal genérico
          Utils.closeGenericModal();
          
          // Cerrar lightbox
          const lightbox = document.getElementById('lightboxModal');
          if (lightbox?.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
          }
          
          // Cerrar modal de reportaje
          const reportajeModal = document.getElementById('reportajeModal');
          if (reportajeModal?.classList.contains('active')) {
            reportajeModal.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      };
      
      document.addEventListener('keydown', this.escapeHandler);
    }
  
    showErrorFallback() {
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          text-align: center;
          font-family: 'Inter', sans-serif;
        ">
          <div>
            <h2 style="color: #D79A1D; margin-bottom: 1rem;">⚠️ Error al cargar</h2>
            <p style="color: #121212; margin-bottom: 2rem;">
              Ha ocurrido un error al inicializar la aplicación.<br>
              Por favor, verifica tu conexión e intenta recargar.
            </p>
            <button 
              onclick="location.reload()"
              style="
                padding: 1rem 2rem;
                background: #5B311B;
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-size: 1rem;
                font-family: 'Inter', sans-serif;
              "
            >
              Recargar página
            </button>
          </div>
        </div>
      `;
    }
  
    destroy() {
      // Remover listener de Escape
      if (this.escapeHandler) {
        document.removeEventListener('keydown', this.escapeHandler);
      }

      // Desconectar observer
      if (this.scrollObserver) {
        this.scrollObserver.disconnect();
      }
      
      // Limpiar componentes
      Object.values(this.components).forEach(component => {
        if (component.destroy) {
          component.destroy();
        }
      });
      
      this.components = {};
      this.initialized = false;
    }
  }
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'hidden';
    
    setTimeout(() => {
      const app = new App();
      app.init();
      window.eonApp = app;
    }, 100);
  });
  
  // Manejar errores no capturados
  window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
  });