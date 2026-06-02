/**
 * COMPONENTE: CONTACTO
 * Formulario de contacto con validación
 */
class ContactComponent {
  constructor() {
    this.title = document.querySelector('.contact-title');
    this.form = document.getElementById('contactForm');
    this.submitBtn = document.querySelector('.contact-submit-btn');
  }

  init() {
    this.render();
    this.setupFormHandler();
  }

  render() {
    const { sectionTitles } = CONFIG;
    if (this.title) this.title.textContent = sectionTitles.contact;
  }

  setupFormHandler() {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const asunto = document.getElementById('asunto')?.value.trim();
      const mensaje = document.getElementById('mensaje')?.value.trim();

      if (!nombre || !email || !mensaje) {
        Utils.showMessage('❌ Por favor, completa todos los campos obligatorios.');
        return;
      }

      if (!this.isValidEmail(email)) {
        Utils.showMessage('❌ Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Simular envío (aquí conectarías con backend real)
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        Utils.showMessage('✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.', 3000);
        this.form.reset();
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = 'Enviar mensaje';
      }, 1500);
    });
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

window.ContactComponent = ContactComponent;