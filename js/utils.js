/**
 * UTILIDADES COMPARTIDAS
 * Funciones helper usadas por todos los componentes
 */
const Utils = {
    /**
     * Aplica los colores de la configuración a las variables CSS
     */
    applyColors(colors) {
      const root = document.documentElement.style;
      root.setProperty('--color-primary', colors.primary);
      root.setProperty('--color-accent', colors.accent);
      root.setProperty('--color-accent-hover', colors.accentHover);
      root.setProperty('--color-background', colors.background);
      root.setProperty('--color-surface', colors.surface);
      document.body.style.backgroundColor = colors.background;
    },
  
    /**
     * Crea un IntersectionObserver para animar elementos al hacer scroll
     */
    createScrollObserver(callback, options = {}) {
      const defaultOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      };
      
      return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target);
          }
        });
      }, { ...defaultOptions, ...options });
    },
  
    /**
     * Maneja errores de carga de imágenes
     */
    handleImageError(img, fallbackColor = '#d9cdb8') {
      img.style.backgroundColor = fallbackColor;
      img.style.minHeight = '200px';
      img.style.display = 'flex';
      img.style.alItems = 'center';
      img.style.justifyContent = 'center';
      
      const fallbackText = document.createElement('span');
      fallbackText.textContent = '📷 Imagen no disponible';
      fallbackText.style.cssText = 'color: #666; font-size: 1rem;';
      
      img.parentNode.insertBefore(fallbackText, img);
      img.style.display = 'none';
    },
  
    /**
     * Formatea un número para que siempre tenga 2 dígitos
     */
    padNumber(number) {
      return String(Math.floor(number)).padStart(2, '0');
    },
  
    /**
     * Muestra un modal genérico con un mensaje
     */
    showMessage(message, duration = null) {
      const modal = document.getElementById('genericModal');
      const messageEl = document.getElementById('modalMessage');
      const closeBtn = modal?.querySelector('.generic-modal-close');
      
      if (!modal || !messageEl) {
        console.error('Modal genérico no encontrado');
        return;
      }
      
      // Limpiar timeouts anteriores
      if (modal._timeout) {
        clearTimeout(modal._timeout);
      }
      
      // Establecer mensaje
      messageEl.textContent = message;
      
      // Mostrar modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Asegurar que el botón de cierre funcione
      if (closeBtn) {
        // Remover listeners anteriores para evitar duplicados
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        
        // Agregar nuevo listener
        newCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeGenericModal();
        });
      }
      
      // Cerrar al hacer clic fuera del modal
      modal.onclick = (e) => {
        if (e.target === modal) {
          this.closeGenericModal();
        }
      };
      
      // Auto-cierre si se especifica duración
      if (duration) {
        modal._timeout = setTimeout(() => {
          this.closeGenericModal();
        }, duration);
      }
    },
  
    /**
     * Cierra el modal genérico
     */
    closeGenericModal() {
      const modal = document.getElementById('genericModal');
      if (!modal) return;
      
      // Limpiar timeout
      if (modal._timeout) {
        clearTimeout(modal._timeout);
        modal._timeout = null;
      }
      
      // Ocultar modal
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Limpiar onclick para evitar memory leaks
      modal.onclick = null;
    },
  
    /**
     * Debounce para optimizar eventos frecuentes
     */
    debounce(func, wait = 100) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  
    /**
     * Throttle para limitar la frecuencia de ejecución
     */
    throttle(func, limit = 100) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
  
    /**
     * Obtiene un elemento del DOM de forma segura
     */
    getElement(selector) {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn(`Elemento no encontrado: ${selector}`);
      }
      return element;
    },
  
    /**
     * Añade event listener con soporte para limpieza
     */
    addEventListener(element, event, handler, options = {}) {
      if (!element) return null;
      element.addEventListener(event, handler, options);
      return () => element.removeEventListener(event, handler, options);
    }
  };
  
  // Exportar para uso global
  window.Utils = Utils;