/**
 * COMPONENTE: CONTACTO
 * Formulario de contacto con Web3Forms para envío real de correos
 * Servicio gratuito que funciona con GitHub Pages (sitios estáticos)
 * 
 * CONFIGURACIÓN:
 * 1. Ve a https://web3forms.com/ 
 * 2. Ingresa tu email: bajoeltelon26@gmail.com
 * 3. Te enviarán un Access Key a ese correo
 * 4. Reemplaza 'TU_ACCESS_KEY_AQUI' con la clave recibida
 */
class ContactComponent {
  constructor() {
    this.title = document.querySelector('.contact-title');
    this.form = document.getElementById('contactForm');
    this.submitBtn = document.querySelector('.contact-submit-btn');
    this.accessKey = 'fb48e9bd-e992-425e-afdd-1e42fc789cfd';
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
      const asunto = document.getElementById('asunto')?.value.trim() || 'Mensaje desde Bajo el Telón';
      const mensaje = document.getElementById('mensaje')?.value.trim();

      if (!nombre || !email || !mensaje) {
        Utils.showMessage('❌ Por favor, completa todos los campos obligatorios.');
        return;
      }

      if (!this.isValidEmail(email)) {
        Utils.showMessage('❌ Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Show loading state with macOS-style animation
      this.setLoadingState(true);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: this.accessKey,
            name: nombre,
            email: email,
            subject: asunto,
            message: mensaje,
            from_name: 'Bajo el Telón - Web'
          })
        });

        const result = await response.json();

        if (result.success) {
          Utils.showMessage('✅ ¡Mensaje enviado con éxito!\nTe contactaremos pronto.', 4000);
          this.form.reset();
          
          // Animación de éxito en el botón
          this.submitBtn.textContent = '✓ Enviado';
          this.submitBtn.style.background = '#2ecc71';
          setTimeout(() => {
            this.submitBtn.textContent = 'Enviar mensaje';
            this.submitBtn.style.background = '';
          }, 2500);
        } else {
          throw new Error(result.message || 'Error al enviar');
        }

      } catch (error) {
        console.error('Error al enviar correo:', error);
        
        // Fallback: abrir cliente de correo
        this.sendViaMailto(nombre, email, asunto, mensaje);
      } finally {
        this.setLoadingState(false);
      }
    });
  }

  sendViaMailto(nombre, email, asunto, mensaje) {
    const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\n${mensaje}`);
    const subject = encodeURIComponent(asunto);
    const mailtoLink = `mailto:bajoeltelon26@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    Utils.showMessage('📧 Se abrirá tu cliente de correo para enviar el mensaje.', 4000);
    this.form.reset();
  }

  setLoadingState(loading) {
    if (!this.submitBtn) return;
    
    if (loading) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '<span class="btn-spinner"></span> Enviando...';
      this.submitBtn.classList.add('is-loading');
    } else {
      this.submitBtn.disabled = false;
      if (!this.submitBtn.textContent.includes('✓')) {
        this.submitBtn.textContent = 'Enviar mensaje';
      }
      this.submitBtn.classList.remove('is-loading');
    }
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

window.ContactComponent = ContactComponent;