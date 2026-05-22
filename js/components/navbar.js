/**
 * COMPONENTE: NAVBAR
 * Maneja la navegación, menú móvil y indicador de sección activa
 */
class NavbarComponent {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.navLinks = document.querySelector('.nav-links');
      this.menuToggle = document.querySelector('.menu-toggle');
      this.isMenuOpen = false;
    }
  
    init() {
      this.renderNavLinks();
      this.setupEventListeners();
      this.setupScrollDetection();
    }
  
    renderNavLinks() {
      if (!this.navLinks) return;
      
      this.navLinks.innerHTML = CONFIG.navLinks
        .map(link => `
          <li>
            <a href="#${link.id}" data-section="${link.id}">
              ${link.name}
            </a>
          </li>
        `)
        .join('');
    }
  
    setupEventListeners() {
      // Toggle menú móvil
      if (this.menuToggle) {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
      }
  
      // Cerrar menú al hacer clic en un enlace
      const allLinks = this.navLinks?.querySelectorAll('a');
      allLinks?.forEach(link => {
        link.addEventListener('click', (e) => {
          this.closeMenu();
          this.smoothScroll(e, link);
        });
      });
  
      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (this.isMenuOpen && !e.target.closest('.navbar')) {
          this.closeMenu();
        }
      });
  
      // Cerrar menú con tecla Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isMenuOpen) {
          this.closeMenu();
        }
      });
    }
  
    toggleMenu() {
      if (this.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
  
    openMenu() {
      this.navLinks?.classList.add('active');
      this.isMenuOpen = true;
      document.body.style.overflow = 'hidden';
      
      // Cambiar icono a X
      const icon = this.menuToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    }
  
    closeMenu() {
      this.navLinks?.classList.remove('active');
      this.isMenuOpen = false;
      document.body.style.overflow = '';
      
      // Restaurar icono
      const icon = this.menuToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  
    smoothScroll(e, link) {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  
    setupScrollDetection() {
      // Detectar sección activa para resaltar en el menú
      const setActiveLink = Utils.throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = this.navLinks?.querySelectorAll('a');
        
        if (!navAnchors) return;
        
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });
        
        navAnchors.forEach(anchor => {
          anchor.classList.remove('active');
          if (anchor.getAttribute('href') === `#${current}`) {
            anchor.classList.add('active');
          }
        });
      }, 100);
  
      window.addEventListener('scroll', setActiveLink);
      setActiveLink(); // Ejecutar al cargar
  
      // Efecto de scroll en navbar
      window.addEventListener('scroll', Utils.throttle(() => {
        if (window.scrollY > 50) {
          this.navbar?.classList.add('scrolled');
        } else {
          this.navbar?.classList.remove('scrolled');
        }
      }, 50));
    }
  }
  
  // Exportar
  window.NavbarComponent = NavbarComponent;