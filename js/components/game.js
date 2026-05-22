/**
 * COMPONENTE: JUEGO
 * Preview del juego interactivo con mockup y botón de acción
 */
class GameComponent {
    constructor() {
      this.title = document.querySelector('.game-section-title');
      this.gameTitle = document.querySelector('.game-title');
      this.description = document.querySelector('.game-description');
      this.button = document.querySelector('.game-btn');
      this.mockup = document.querySelector('.game-mockup');
      this.buttonClickHandler = null;
    }
  
    init() {
      this.render();
      this.setupButtonHandler();
    }
  
    render() {
      const { game, sectionTitles } = CONFIG;
      
      if (this.title) this.title.textContent = sectionTitles.game;
      if (this.gameTitle) this.gameTitle.textContent = game.title;
      if (this.description) this.description.textContent = game.description;
      if (this.button) this.button.textContent = game.buttonText;
      
      if (this.mockup) {
        this.mockup.style.backgroundImage = `url('${game.image}')`;
      }
    }
  
    setupButtonHandler() {
      if (!this.button) return;
      
      // Remover handler anterior si existe
      if (this.buttonClickHandler) {
        this.button.removeEventListener('click', this.buttonClickHandler);
      }
      
      // Crear nuevo handler
      this.buttonClickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Mostrar mensaje inmediatamente
        Utils.showMessage(
          '🎮 La demo interactiva estará disponible próximamente.\n\n¡Estamos trabajando en una experiencia increíble!',
          5000 // Se cierra automáticamente en 5 segundos
        );
      };
      
      // Agregar event listener
      this.button.addEventListener('click', this.buttonClickHandler);
    }
  
    destroy() {
      if (this.button && this.buttonClickHandler) {
        this.button.removeEventListener('click', this.buttonClickHandler);
      }
    }
  }
  
  window.GameComponent = GameComponent;