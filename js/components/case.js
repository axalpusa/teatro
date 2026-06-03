/**
 * COMPONENTE: EL CASO
 * Sección de investigación con datos y contexto del problema
 */
class CaseComponent {
  constructor() {
    this.title = document.querySelector('.case-section-title');
    this.description = document.querySelector('.case-description');
    this.statsContainer = document.querySelector('.case-stats');
    this.caseImage = document.querySelector('.case-img');
  }

  init() {
    this.render();
  }

  render() {
    const { case: caseData, sectionTitles } = CONFIG;
    
    // Título de la sección
    if (this.title) {
      this.title.textContent = sectionTitles.case;
    }

    // Descripción general
    if (this.description) {
      this.description.textContent = caseData.description;
    }

    // Renderizar estadísticas clave
    if (this.statsContainer && caseData.stats) {
      this.statsContainer.innerHTML = caseData.stats.map((stat, index) => {
        let bgStyle = '';
        let labelStyle = '';
        
        if (index === 0) {
          bgStyle = 'background: #121212; border: 1px solid rgba(255,255,255,0.08);';
          labelStyle = 'color: rgba(255,255,255,0.75);';
        } else if (index === 1) {
          bgStyle = 'background: #8A4E23; border: 1px solid rgba(255,255,255,0.08);';
          labelStyle = 'color: rgba(255,255,255,0.75);';
        } else {
          bgStyle = 'background: #F4F1EA; border: 1px solid rgba(0,0,0,0.06);';
          labelStyle = 'color: #5A5A58;';
        }

        return `
          <div class="case-stat-card" style="${bgStyle}">
            <div class="case-stat-value" style="color: ${stat.color}; font-weight: 800;">${stat.value}</div>
            <div class="case-stat-label" style="${labelStyle}">${stat.label}</div>
          </div>
        `;
      }).join('');
    }

    // Imagen/Infografía
    if (this.caseImage && caseData.image) {
      this.caseImage.src = caseData.image;
      this.caseImage.alt = "Infografía comparativa de montos";
      this.caseImage.addEventListener('error', () => {
        Utils.handleImageError(this.caseImage);
      });
    }

    // Añadir la conclusión después de las stats si existe
    if (caseData.conclusion && this.statsContainer) {
      const conclusionParagraph = document.createElement('p');
      conclusionParagraph.className = 'case-conclusion';
      conclusionParagraph.innerHTML = `<strong>🔍 Conclusión del análisis:</strong> ${caseData.conclusion}`;
      this.statsContainer.parentNode.appendChild(conclusionParagraph);
    }
  }
}

window.CaseComponent = CaseComponent;