/**
 * COMPONENTE: CRÉDITOS
 * Equipo creativo con tarjetas de perfil
 */
class CreditsComponent {
    constructor() {
      this.grid = document.querySelector('.credits-grid');
      this.title = document.querySelector('.credits-title');
    }
  
    init() {
      this.render();
    }
  
    render() {
      if (this.title) {
        this.title.textContent = CONFIG.sectionTitles.credits;
      }
  
      if (!this.grid) return;
  
      this.grid.innerHTML = CONFIG.team
        .map(member => `
          <div class="credit-card">
            <div 
              class="credit-avatar" 
              style="background-image: url('${member.avatar}')"
              role="img"
              aria-label="Foto de ${member.name}"
              onerror="this.style.backgroundColor='var(--color-accent-light)'"
            ></div>
            <h3 style="color: white;">${member.name}</h3>
            <p class="credit-role" style="color: var(--color-accent); font-weight: 600; margin-bottom: 0.5rem;">
              ${member.role}
            </p>
            <small style="color: rgba(255,255,255,0.6);">${member.bio}</small>
          </div>
        `)
        .join('');
    }
  }
  
  window.CreditsComponent = CreditsComponent;