/**
 * CONFIGURACIÓN CENTRALIZADA
 * Modifica este archivo para cambiar todo el contenido del sitio
 */
const CONFIG = {
    // Paleta de colores principal
    colors: {
      primary: "#1e3b4a",
      accent: "#c87a5c",
      accentHover: "#b06248",
      background: "#F5F0E8",
      surface: "#ffffff"
    },
  
    // Títulos de las secciones
    sectionTitles: {
      timeline: "Línea de Tiempo",
      video: "Documental Visual",
      game: "El Juego",
      reportaje: "Revista Digital",
      gallery: "Galería de Experiencias",
      social: "Síguenos en Redes",
      credits: "Equipo Creativo"
    },
  
    // Hero / Portada
    hero: {
      title: "El Legado del Tiempo",
      subtitle: "Un viaje interactivo entre historia, juego y memoria visual.",
      buttonText: "Explorar recorrido",
      backgroundImage: "img/1080.jpg"
    },
  
    // Línea de tiempo
    timeline: [
      {
        date: "2018",
        title: "Fundación",
        description: "Nace la idea de documentar experiencias a través de medios digitales.",
        image: "img/606.jpg"
      },
      {
        date: "2020",
        title: "Primera expedición",
        description: "Viaje a los Alpes para capturar imágenes inmersivas del cambio climático.",
        image: "img/607.jpg"
      },
      {
        date: "2023",
        title: "Lanzamiento del juego",
        description: "Se publica 'Ecos del Origen', aventura narrativa interactiva con más de 100,000 descargas.",
        image: "img/608.jpg"
      },
      {
        date: "2025",
        title: "Exposición global",
        description: "Más de 50 ciudades visitan la galería interactiva con experiencias inmersivas.",
        image: "img/609.jpg"
      }
    ],
  
    // Video documental
    video: {
      thumbnail: "img/601.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=b39Nd9yXA2g",
      caption: "🎬 Haz clic para ver el documental completo en YouTube"
    },
  
    // Juego interactivo
    game: {
      title: "Ecos del Origen",
      description: "Explora ruinas ancestrales, resuelve enigmas y descubre una historia conmovedora sobre la conexión humana con la naturaleza.",
      buttonText: "🎮 Jugar ahora",
      image: "img/610.jpg"
    },
  
    // Reportaje digital
    reportaje: {
      title: "Crónicas del hielo: el deshielo revela secretos milenarios",
      preview: "Un viaje al corazón de los glaciares, donde la ciencia y la memoria ancestral convergen para contarnos una historia olvidada.",
      coverImage: "img/600.jpg",
      readMoreText: "📖 Leer reportaje completo →",
      modalImages: [
        "img/602.jpg",
        "img/604.jpg",
        "img/605.jpg"
      ],
      modalTexts: [
        "En las profundidades del Ártico, el calentamiento global está dejando al descubierto artefactos y restos orgánicos que permanecieron congelados durante más de 5,000 años. Los científicos han encontrado herramientas de caza, vestimentas y restos de alimentos que revelan cómo vivían las antiguas civilizaciones del hielo.",
        "La misión, liderada por un equipo internacional de arqueólogos y climatólogos, permitió recuperar herramientas de madera, fibras textiles y vestigios de fauna prehistórica en un estado de conservación excepcional. Cada hallazgo es una pieza del rompecabezas de nuestra historia compartida.",
        "El equipo utilizó tecnología de modelado 3D y drones submarinos para reconstruir asentamientos ancestrales que habían quedado sepultados bajo capas de hielo. Los resultados son impresionantes y cambian nuestra comprensión de la adaptación humana a climas extremos."
      ],
      finalQuote: "“Lo que emerge del hielo no son solo objetos, es un mensaje para la humanidad sobre nuestra capacidad de adaptación y nuestra fragilidad ante los cambios del planeta”."
    },
  
    // Contador regresivo para evento
    countdown: {
      targetDate: "2026-06-15T16:00:00",
      eventText: "📅 15 de Junio de 2026 - 16:00 hrs · Centro de Artes Eón",
      title: "Próxima Experiencia Física"
    },
  
    // Galería de imágenes
    gallery: [
      "img/611.jpg",
      "img/1080.jpg",
      "img/400.jpg",
      "img/401.jpg"
    ],
  
    // Redes sociales
    socialLinks: [
      { platform: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com" },
      { platform: "X", icon: "fa-brands fa-x-twitter", url: "https://twitter.com" },
      { platform: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com" },
      { platform: "Facebook", icon: "fab fa-facebook", url: "https://facebook.com" }
    ],
  
    // Equipo creativo
    team: [
      {
        name: "Elena Vargas",
        role: "Dirección creativa",
        bio: "Visión artística y narrativa. 15 años de experiencia en documentales interactivos.",
        avatar: "img/68.jpg"
      },
      {
        name: "Mateo Ruiz",
        role: "Desarrollador",
        bio: "Arquitectura interactiva y experiencia de usuario. Creador de experiencias inmersivas.",
        avatar: "img/32.jpg"
      },
      {
        name: "Sofía León",
        role: "Investigación",
        bio: "Documentación y archivo histórico. Doctora en Antropología Visual.",
        avatar: "img/44.jpg"
      }
    ],
  
    // Footer
    footer: {
      email: "contacto@cronica-interactiva.com",
      copyright: "© 2026 Crónica Interactiva. Todos los derechos reservados."
    },
  
    // Navegación
    navLinks: [
      { id: "inicio", name: "Inicio" },
      { id: "timeline", name: "Línea" },
      { id: "video", name: "Video" },
      { id: "juego", name: "Juego" },
      { id: "reportaje", name: "Revista" },
      { id: "countdown", name: "Evento" },
      { id: "galeria", name: "Galería" },
      { id: "redes", name: "Redes" },
      { id: "creditos", name: "Créditos" }
    ]
  };
  
  // Exportar para uso en módulos (si se usa un bundler)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
  }