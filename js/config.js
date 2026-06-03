/**
 * CONFIGURACIÓN CENTRALIZADA
 * Modifica este archivo para cambiar todo el contenido del sitio
 */
const CONFIG = {
  // Paleta de colores principal
  colors: {
    primary: "#5B311B",
    primaryDark: "#8A4E23",
    accent: "#D79A1D",
    accentHover: "#B87712",
    accentLight: "#F4F1EA",
    background: "#F5F0E8",
    surface: "#FFFFFF",
    surfaceAlt: "#E8E6E2",
    text: "#121212",
    textLight: "#5A5A58",
    border: "#8B8B88"
  },

  // Títulos de las secciones
  sectionTitles: {
    timeline: "Línea de tiempo",
    case: "El caso",
    reportaje: "Reportaje",
    game: "Gamificación",
    comic: "Comic",
    gallery: "Galería de fotos",
    social: "Redes",
    credits: "Créditos",
    contact: "Contàctanos"
  },

  // Hero / Portada
  hero: {
    title: "Bajó el telón",
    subtitle: "La historia detrás de una obra que pasó de ser un símbolo de desarrollo cultural a convertirse en objeto de observaciones, retrasos y cuestionamientos ciudadanos.",
    buttonText: "Explorar recorrido",
    backgroundImage: "img/teatro_antiguo.png"
  },

  // Sección: El Caso
  case: {
    description: "La reconstrucción del teatro ha estado marcada por la polémica desde sus inicios. Lo que comenzó como una rehabilitación menor se transformó en una megaobra de ingeniería, multiplicando su presupuesto inicial por más de 2.3 veces. A continuación, un desglose de los montos y las principales observaciones ciudadanas.",
    stats: [
      { label: "Monto inicial (perfil 2021)", value: "S/ 39.36 M", color: "#E8E6E2" },
      { label: "Monto contractual (oct 2024)", value: "S/ 83.46 M", color: "#D79A1D" },
      { label: "Inversión total final (jul 2025)", value: "S/ 90.75 M", color: "#5B311B" }
    ],
    image: "img/1080.jpg",
    conclusion: "El principal cuestionamiento ciudadano radica en la falta de transparencia sobre las reformulaciones del proyecto y el destino final de los recursos adicionales. Organizaciones civiles han solicitado una auditoría forense detallada."
  },

  // Línea de tiempo
  timeline: [
    {
      date: "2021",
      title: "El origen y la primera estimación",
      description: `
        <b>Año 2021:</b> Se otorga la viabilidad inicial al proyecto bajo el código CUI 2523322. En este momento, se estima una inversión básica para rehabilitar el servicio cultural.<br>
        <span style="display: block; margin-left: 20px; color: var(--color-accent); font-weight: 600;">Monto inicial (perfil): S/ 39,362,400.24.</span>
      `,
      image: "img/604.jpg"
    },
    {
      date: "2024",
      title: "Reformulación y adjudicación",
      description: `
        El proyecto sufre una transformación profunda para convertirse en una obra de alta ingeniería, lo que dispara los costos.<br><br>
        <span style="display: block; margin-left: 20px;"><b>Marzo – junio 2024:</b> Se actualiza el expediente técnico para incluir estándares internacionales de acústica y seguridad.</span>
        <span style="display: block; margin-left: 20px;"><b>Septiembre 2024:</b> Se aprueba el formato de consistencia técnica. El presupuesto ya refleja un incremento del <b style="color: var(--color-accent);">72%</b> respecto al perfil original.</span>
        <span style="display: block; margin-left: 40px; color: var(--color-accent); font-weight: 600;">Presupuesto actualizado: S/ 67,943,735.39.</span><br>
        <span style="display: block; margin-left: 20px;"><b>01 de octubre 2024:</b> Se lanza la convocatoria oficial para la ejecución de la obra.</span>
        <span style="display: block; margin-left: 20px;"><b>24 de octubre 2024:</b> Se otorga la Buena Pro al Consorcio Piura (formado por Constructora de Ingeniería Civil S.A.C. y Estructuras Metálicas y de Ingeniería S.A.C.).</span>
        <span style="display: block; margin-left: 20px;"><b>29 de octubre 2024:</b> Firma del contrato principal por la construcción física.</span>
        <span style="display: block; margin-left: 40px; color: var(--color-accent); font-weight: 600;">Monto contractual de obra: S/ 83,460,300.45.</span>
      `,
      image: "img/605.jpg"
    },
    {
      date: "2025",
      title: "Inicio de obra y nuevo techo presupuestal",
      description: `
        El proyecto entra en fase de ejecución y alcanza su valor financiero más alto tras las últimas actualizaciones de precios.<br><br>
        <span style="display: block; margin-left: 20px;"><b>Julio 2025:</b> Se aprueba una nueva reformulación del expediente con precios actualizados a ese mes.</span>
        <span style="display: block; margin-left: 40px; color: var(--color-accent); font-weight: 600;">Inversión total final: S/ 90,752,860.22.</span><br>
        <span style="display: block; margin-left: 20px;"><b>21 de noviembre 2025:</b> Inicio oficial del plazo de ejecución. Se realiza la entrega del terreno y comienza el conteo de los <b>540 días calendario</b>.</span>
        <span style="display: block; margin-left: 20px;"><b>Diciembre 2025:</b> Fase de desmontaje masivo. Se retiran butacas, sistemas de iluminación antiguos y estructuras temporales al <b>100%</b>.</span>
      `,
      image: "img/606.jpg"
    },
    {
      date: "2026",
      title: "Cimentación y estructuras",
      description: `
        <b>Enero 2026:</b> Mes de intensa actividad estructural.<br><br>
        <span style="display: block; margin-left: 20px;"><b>Avance en excavación:</b> Se alcanza el <b style="color: var(--color-accent);">90%</b> del movimiento de tierras en la zona de estacionamientos.</span>
        <span style="display: block; margin-left: 20px;"><b>Hito estructural:</b> Se completa la instalación de <b>76.08 toneladas de estructura metálica</b> (<b style="color: var(--color-accent);">100%</b> de la partida A572 Gr50) para el soporte principal del teatro.</span><br>
        <span style="display: block; margin-left: 20px;"><b>31 de enero 2026 (valorización n° 03):</b> Cierre de reporte con la culminación total de zapatas y solados en el sector del teatro.</span>
        <span style="display: block; margin-left: 40px; color: var(--color-accent); font-weight: 600;">Gasto acumulado en el mes: S/ 2,130,506.97.</span>
      `,
      image: "img/607.jpg"
    },
    {
      date: "2027",
      title: "El horizonte de finalización (un futuro)",
      description: `
        <span style="display: block; margin-left: 20px;"><b>14 de mayo 2027:</b> Fecha proyectada para la entrega de la obra, según el contrato vigente de <b>540 días</b>.</span>
      `,
      image: "img/608.jpg"
    }
  ],

  // Juego interactivo
  game: {
    title: "Ecos del origen",
    description: "Explora ruinas ancestrales, resuelve enigmas y descubre una historia conmovedora sobre la conexión humana con la naturaleza.",
    buttonText: "🎮 Próximamente",
    image: "img/610.jpg"
  },

  // Comic
  comic: {
    title: "El último guardián",
    description: "Una historia visual que narra las memorias del antiguo teatro y los secretos que guardan sus paredes centenarias.",
    coverImage: "img/600.jpg",
    pages: [
      { image: "img/601.jpg", caption: "El teatro en su esplendor, década de 1950." },
      { image: "img/602.jpg", caption: "El abandono y el paso del tiempo." },
      { image: "img/611.jpg", caption: "El descubrimiento de los planos originales." },
      { image: "img/604.jpg", caption: "La lucha por preservar la memoria." },
      { image: "img/605.jpg", caption: "Un nuevo comienzo." }
    ],
    buttonText: "📖 Leer comic completo"
  },

  // Reportaje digital
  reportaje: {
    title: "Crónicas del hielo: el deshielo revela secretos milenarios",
    preview: "Un viaje al corazón de los glaciares, donde la ciencia y la memoria ancestral convergen.",
    coverImage: "img/600.jpg",
    readMoreText: "📖 Leer reportaje completo →",
    modalImages: ["img/602.jpg", "img/604.jpg", "img/605.jpg"],
    modalTexts: [
      "En las profundidades del Ártico, el calentamiento global está dejando al descubierto artefactos y restos orgánicos...",
      "La misión, liderada por un equipo internacional de arqueólogos y climatólogos...",
      "El equipo utilizó tecnología de modelado 3D y drones submarinos para reconstruir asentamientos ancestrales..."
    ],
    finalQuote: "“Lo que emerge del hielo no son solo objetos, es un mensaje para la humanidad”."
  },

  // Contador regresivo
  countdown: {
    targetDate: "2026-06-15T16:00:00",
    eventText: "📅 15 de junio de 2026 - 16:00 hrs · Centro de artes eón",
    title: "Próxima experiencia física"
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
    { platform: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@bajo_el_telon" },
    { platform: "Facebook", icon: "fab fa-facebook", url: "https://facebook.com" },
    { platform: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com" }
  ],

  // Equipo creativo
  team: [
    { name: "Silupu Arana, Darly", role: "Dirección", bio: ".", avatar: "img/68.jpg" },
    { name: "Puelles Saavedra, Augusto", role: "Productor", bio: ".", avatar: "img/32.jpg" },
    { name: "Rimaycuna Peña, Mallely", role: "Investigación, guión", bio: ".", avatar: "img/44.jpg" },
    { name: "Marroquin Flores, Gresly", role: "Guionista, comic", bio: ".", avatar: "img/68.jpg" },
    { name: "Vicente Jimenez, Renzo", role: "Cámara", bio: ".", avatar: "img/32.jpg" },
    { name: "Litano Talledo, Rodrigo", role: "Asistente de cámara", bio: ".", avatar: "img/44.jpg" },
    { name: "Ludeña Muro, Gabriele", role: "Edición", bio: ".", avatar: "img/68.jpg" },
    { name: "Farias Cornejo, Luciana", role: "Redes sociales", bio: ".", avatar: "img/32.jpg" },
    { name: "Velasquez Peña, Thalia", role: "Diseño web, guión", bio: ".", avatar: "img/44.jpg" },
    { name: "Palacios Ruesta, Favio", role: "Gamificación", bio: ".", avatar: "img/44.jpg" }
  ],

  // Footer
  footer: {
    email: "bajoeltelon26@gmail.com",
    copyright: "© 2026 Bajo el telón. Todos los derechos reservados."
  },

  // Navegación
  navLinks: [
    { id: "inicio", name: "Inicio" },
    { id: "timeline", name: "Línea de tiempo" },
    { id: "el-caso", name: "El caso" },
    { id: "reportaje", name: "Reportaje" },
    { id: "gamificacion", name: "Gamificación" },
    { id: "comic", name: "Comic" },
    { id: "countdown", name: "Conteo para experiencia física" },
    { id: "galeria", name: "Galería de fotos" },
    { id: "redes", name: "Redes" },
    { id: "creditos", name: "Créditos" },
    { id: "contact", name: "Contàctanos" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}