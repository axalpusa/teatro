/**
 * APLICACIÓN PRINCIPAL
 * Inicializa todos los componentes y configura la aplicación
 */
class App {
    constructor() {
      this.components = {};
      this.initialized = false;
      this.escapeHandler = null;
    }
  
    async init() {
      if (this.initialized) {
        console.warn('La aplicación ya está inicializada');
        return;
      }
  
      try {
        console.log('🚀 Inicializando Eón - Documental Interactivo...');
  
        // 1. Aplicar colores y tema
        this.applyTheme();
  
        // 2. Inicializar componentes en orden
        await this.initComponents();
  
        // 3. Configurar listeners globales
        this.setupGlobalListeners();
  
        // 4. Asegurar que el modal genérico funcione correctamente
        this.ensureGenericModalWorks();
  
        // 5. Marcar como inicializado
        this.initialized = true;
  
        // 6. Evento de aplicación lista
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
        { name: 'comic', class: ComicComponent },      // NUEVO
        { name: 'countdown', class: CountdownComponent },
        { name: 'gallery', class: GalleryComponent },
        { name: 'social', class: SocialComponent },
        { name: 'credits', class: CreditsComponent },
        { name: 'contact', class: ContactComponent },  // NUEVO
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
            <h2 style="color: #c87a5c; margin-bottom: 1rem;">⚠️ Error al cargar</h2>
            <p style="color: #2c2b2b; margin-bottom: 2rem;">
              Ha ocurrido un error al inicializar la aplicación.<br>
              Por favor, verifica tu conexión e intenta recargar.
            </p>
            <button 
              onclick="location.reload()"
              style="
                padding: 1rem 2rem;
                background: #1e3b4a;
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