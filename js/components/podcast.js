/**
 * COMPONENTE: PODCAST
 * Reproductor de audio interactivo con playlist para los episodios de investigación
 */
class PodcastComponent {
  constructor() {
    this.container = document.querySelector('.podcast-container');
    this.sectionTitle = document.querySelector('.podcast-title');
    this.audio = new Audio();
    this.currentEpisodeIndex = 0;
    this.isPlaying = false;
    
    // Binding events to this context
    this.togglePlay = this.togglePlay.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.seek = this.seek.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.onAudioEnded = this.onAudioEnded.bind(this);
  }

  init() {
    if (!this.container) return;
    this.render();
    this.setupAudio();
    this.setupEventListeners();
  }

  render() {
    const { podcast, sectionTitles } = CONFIG;
    
    if (this.sectionTitle) {
      this.sectionTitle.textContent = sectionTitles.podcast;
    }

    if (!podcast || !podcast.episodes || podcast.episodes.length === 0) return;

    const currentEpisode = podcast.episodes[this.currentEpisodeIndex];

    this.container.innerHTML = `
      <div class="podcast-player-layout">
        <!-- Tarjeta del Reproductor Principal -->
        <div class="podcast-player-card">
          <div class="podcast-cover-wrapper">
            <img class="podcast-player-cover" src="${currentEpisode.cover}" alt="${currentEpisode.title}">
            <div class="podcast-wave-visualizer">
              <span class="podcast-wave-bar bar-1"></span>
              <span class="podcast-wave-bar bar-2"></span>
              <span class="podcast-wave-bar bar-3"></span>
              <span class="podcast-wave-bar bar-4"></span>
              <span class="podcast-wave-bar bar-5"></span>
            </div>
          </div>
          
          <div class="podcast-player-info">
            <span class="podcast-player-tag">Reproduciendo ahora</span>
            <h3 class="podcast-player-title">${currentEpisode.title}</h3>
            <p class="podcast-player-desc">${currentEpisode.description}</p>
          </div>
          
          <!-- Controles del Reproductor -->
          <div class="podcast-player-controls">
            <!-- Barra de Progreso -->
            <div class="podcast-progress-container">
              <span class="podcast-time podcast-current-time">0:00</span>
              <input type="range" class="podcast-seek-bar" min="0" max="100" value="0">
              <span class="podcast-time podcast-duration">${currentEpisode.duration}</span>
            </div>
            
            <!-- Botones de Acción -->
            <div class="podcast-action-buttons">
              <button class="podcast-control-btn podcast-prev-btn" aria-label="Episodio anterior">
                <i class="fas fa-step-backward"></i>
              </button>
              
              <button class="podcast-play-btn" aria-label="Reproducir o pausar">
                <i class="fas fa-play"></i>
              </button>
              
              <button class="podcast-control-btn podcast-next-btn" aria-label="Siguiente episodio">
                <i class="fas fa-step-forward"></i>
              </button>
              
              <!-- Control de Volumen -->
              <div class="podcast-volume-container">
                <button class="podcast-control-btn podcast-mute-btn" aria-label="Silenciar">
                  <i class="fas fa-volume-up"></i>
                </button>
                <input type="range" class="podcast-volume-bar" min="0" max="1" step="0.05" value="0.8">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Lista de Episodios (Playlist) -->
        <div class="podcast-playlist-card">
          <div class="podcast-playlist-header">
            <h4>${podcast.title}</h4>
            <p>${podcast.subtitle}</p>
          </div>
          <div class="podcast-playlist">
            ${podcast.episodes.map((ep, index) => `
              <div class="podcast-episode-item ${index === this.currentEpisodeIndex ? 'active' : ''}" data-index="${index}">
                <div class="podcast-ep-num">${String(index + 1).padStart(2, '0')}</div>
                <div class="podcast-ep-details">
                  <h5>${ep.title}</h5>
                  <p>${ep.description.substring(0, 80)}...</p>
                  <div class="podcast-ep-meta">
                    <span><i class="far fa-calendar-alt"></i> ${ep.date}</span>
                    <span><i class="far fa-clock"></i> ${ep.duration}</span>
                  </div>
                </div>
                <button class="podcast-ep-play" aria-label="Reproducir episodio">
                  <i class="fas ${index === this.currentEpisodeIndex && this.isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Cache elements
    this.playBtn = this.container.querySelector('.podcast-play-btn');
    this.prevBtn = this.container.querySelector('.podcast-prev-btn');
    this.nextBtn = this.container.querySelector('.podcast-next-btn');
    this.seekBar = this.container.querySelector('.podcast-seek-bar');
    this.volumeBar = this.container.querySelector('.podcast-volume-bar');
    this.muteBtn = this.container.querySelector('.podcast-mute-btn');
    this.currentTimeLabel = this.container.querySelector('.podcast-current-time');
    this.durationLabel = this.container.querySelector('.podcast-duration');
    this.visualizerBars = this.container.querySelectorAll('.podcast-wave-bar');
    this.coverImg = this.container.querySelector('.podcast-player-cover');
    this.playerTitle = this.container.querySelector('.podcast-player-title');
    this.playerDesc = this.container.querySelector('.podcast-player-desc');
  }

  setupAudio() {
    const { podcast } = CONFIG;
    if (!podcast || !podcast.episodes || podcast.episodes.length === 0) return;
    
    this.audio.src = podcast.episodes[this.currentEpisodeIndex].audioUrl;
    this.audio.volume = 0.8;
  }

  setupEventListeners() {
    // Play / Pause principal
    this.playBtn?.addEventListener('click', this.togglePlay);

    // Audio events
    this.audio.addEventListener('timeupdate', this.updateProgress);
    this.audio.addEventListener('ended', this.onAudioEnded);
    this.audio.addEventListener('loadedmetadata', () => {
      if (this.durationLabel) {
        this.durationLabel.textContent = this.formatTime(this.audio.duration);
      }
    });

    // Seek e interacción con la barra de progreso
    this.seekBar?.addEventListener('input', this.seek);

    // Volumen e interacción
    this.volumeBar?.addEventListener('input', this.changeVolume);
    this.muteBtn?.addEventListener('click', this.toggleMute);

    // Navegación de episodios
    this.prevBtn?.addEventListener('click', () => this.navigateEpisode(-1));
    this.nextBtn?.addEventListener('click', () => this.navigateEpisode(1));

    // Clics en la playlist
    const epItems = this.container.querySelectorAll('.podcast-episode-item');
    epItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Evitar que el clic en el botón active doble evento
        if (e.target.closest('button')) return;
        
        const index = parseInt(item.getAttribute('data-index'));
        if (index === this.currentEpisodeIndex) {
          this.togglePlay();
        } else {
          this.loadEpisode(index, true);
        }
      });
    });

    // Configurar clic en los botones individuales de la playlist
    const epPlayBtns = this.container.querySelectorAll('.podcast-ep-play');
    epPlayBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = btn.closest('.podcast-episode-item');
        const index = parseInt(item.getAttribute('data-index'));
        if (index === this.currentEpisodeIndex) {
          this.togglePlay();
        } else {
          this.loadEpisode(index, true);
        }
      });
    });
  }

  loadEpisode(index, autoPlay = false) {
    const { podcast } = CONFIG;
    if (index < 0 || index >= podcast.episodes.length) return;

    this.currentEpisodeIndex = index;
    const ep = podcast.episodes[index];

    // Cargar nuevo source
    this.audio.src = ep.audioUrl;
    this.audio.load();

    // Actualizar UI del player
    if (this.coverImg) this.coverImg.src = ep.cover;
    if (this.playerTitle) this.playerTitle.textContent = ep.title;
    if (this.playerDesc) this.playerDesc.textContent = ep.description;
    if (this.currentTimeLabel) this.currentTimeLabel.textContent = '0:00';
    if (this.seekBar) this.seekBar.value = 0;
    if (this.durationLabel) this.durationLabel.textContent = ep.duration;

    // Actualizar estado activo en la playlist
    const items = this.container.querySelectorAll('.podcast-episode-item');
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
        const btnIcon = item.querySelector('.podcast-ep-play i');
        if (btnIcon) {
          btnIcon.className = 'fas fa-pause';
        }
      } else {
        item.classList.remove('active');
        const btnIcon = item.querySelector('.podcast-ep-play i');
        if (btnIcon) {
          btnIcon.className = 'fas fa-play';
        }
      }
    });

    if (autoPlay) {
      this.isPlaying = false; // Reset to play correctly
      this.togglePlay();
    } else {
      this.isPlaying = false;
      this.updatePlayStateUI();
    }
  }

  navigateEpisode(direction) {
    const { podcast } = CONFIG;
    let nextIndex = this.currentEpisodeIndex + direction;
    if (nextIndex < 0) nextIndex = podcast.episodes.length - 1;
    if (nextIndex >= podcast.episodes.length) nextIndex = 0;
    this.loadEpisode(nextIndex, this.isPlaying);
  }

  togglePlay() {
    if (!this.audio.src) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play().catch(err => console.log("Error al reproducir audio:", err));
      this.isPlaying = true;
    }
    
    this.updatePlayStateUI();
  }

  updatePlayStateUI() {
    // Icono botón principal
    if (this.playBtn) {
      const icon = this.playBtn.querySelector('i');
      if (icon) {
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
      }
    }

    // Animación de ondas
    this.visualizerBars.forEach(bar => {
      if (this.isPlaying) {
        bar.classList.add('animating');
      } else {
        bar.classList.remove('animating');
      }
    });

    // Icono botón playlist activo y los demás
    const items = this.container.querySelectorAll('.podcast-episode-item');
    items.forEach((item, idx) => {
      const btnIcon = item.querySelector('.podcast-ep-play i');
      if (btnIcon) {
        if (idx === this.currentEpisodeIndex) {
          btnIcon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        } else {
          btnIcon.className = 'fas fa-play';
        }
      }
    });
  }

  updateProgress() {
    if (this.audio.duration) {
      const percentage = (this.audio.currentTime / this.audio.duration) * 100;
      if (this.seekBar) {
        this.seekBar.value = percentage;
      }
      if (this.currentTimeLabel) {
        this.currentTimeLabel.textContent = this.formatTime(this.audio.currentTime);
      }
    }
  }

  seek(e) {
    if (this.audio.duration) {
      const time = (e.target.value / 100) * this.audio.duration;
      this.audio.currentTime = time;
    }
  }

  changeVolume(e) {
    const vol = parseFloat(e.target.value);
    this.audio.volume = vol;
    this.audio.muted = vol === 0;
    this.updateVolumeUI();
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.updateVolumeUI();
  }

  updateVolumeUI() {
    const isMuted = this.audio.muted || this.audio.volume === 0;
    
    if (this.volumeBar) {
      this.volumeBar.value = isMuted ? 0 : this.audio.volume;
    }

    if (this.muteBtn) {
      const icon = this.muteBtn.querySelector('i');
      if (icon) {
        if (isMuted) {
          icon.className = 'fas fa-volume-mute';
        } else if (this.audio.volume < 0.4) {
          icon.className = 'fas fa-volume-down';
        } else {
          icon.className = 'fas fa-volume-up';
        }
      }
    }
  }

  onAudioEnded() {
    // Avanzar automáticamente al siguiente episodio
    this.navigateEpisode(1);
  }

  formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  destroy() {
    this.audio.pause();
    this.audio = null;
  }
}

window.PodcastComponent = PodcastComponent;
