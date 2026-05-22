/**
 * COMPONENTE: TIMELINE
 * Línea de tiempo vertical con animaciones al hacer scroll
 */
class TimelineComponent {
    constructor() {
      this.container = document.querySelector('#timeline .timeline-vertical');
      this.title = document.querySelector('.timeline-section-title');
      this.items = [];
      this.observer = null;
    }
  
    init() {
      this.render();
      this.setupAnimations();
      this.setupImageErrorHandling();
    }
  
    render() {
      // Título
      if (this.title) {
        this.title.textContent = CONFIG.sectionTitles.timeline;
      }
  
      // Items
      if (!this.container) return;
      
      this.container.innerHTML = CONFIG.timeline
        .map(item => this.createTimelineItem(item))
        .join('');
      
      this.items = this.container.querySelectorAll('.timeline-item-v');
    }
  
    createTimelineItem(item) {
      return `
        <div class="timeline-item-v">
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
          </div>
          <div class="timeline-card-v">
            <img 
              class="timeline-img-v" 
              src="${item.image}" 
              loading="lazy" 
              alt="${item.title}"
              onerror="Utils.handleImageError(this)"
            >
            <div class="timeline-content-v">
              <div class="timeline-date-v">${item.date}</div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        </div>
      `;
    }
  
    setupAnimations() {
      this.observer = Utils.createScrollObserver((target) => {
        target.classList.add('visible');
        this.observer.unobserve(target); // Animar solo una vez
      });
  
      this.items.forEach(item => this.observer.observe(item));
    }
  
    setupImageErrorHandling() {
      const images = this.container?.querySelectorAll('img');
      images?.forEach(img => {
        img.addEventListener('error', () => Utils.handleImageError(img));
      });
    }
  
    destroy() {
      if (this.observer) {
        this.items.forEach(item => this.observer.unobserve(item));
      }
    }
  }
  
  window.TimelineComponent = TimelineComponent;