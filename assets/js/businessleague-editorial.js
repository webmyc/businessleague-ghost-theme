/**
 * BusinessLeague Editorial Journalistic Theme — Runtime Controller v3.0
 * Features:
 * 1. Procedural Faceted Crystal Arena Canvas (`#bl-hero-mesh`)
 * 2. Multilingual Edition Switcher (RO / EN / BG / ES) with URL & localStorage sync
 * 3. Smart Editorial Pillar Auto-Classifier (Interviews, Data, Playbooks, Competition, Product, Corporate)
 * 4. Dynamic Magazine Section Builder per Language Workspace (4-col Voices, 7:5 Bento Data, 3-col Playbooks, 2-col Arena, Masonry Wall)
 * 5. Live Instant Autocomplete Search Engine (`#bl-search-input`, `#bl-search-dropdown`, ⌘K / `/`, keyboard navigation, <mark> highlighting)
 * 6. Interactive Reader Typography & Layout Controls (Font Size A-/A+, Sans/Serif, Standard/Zen Focus)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'bl_editorial_lang';
  const THEME_KEY = 'bl_editorial_theme';
  const READING_SIZE_KEY = 'bl_reading_size';
  const READING_FONT_KEY = 'bl_reading_font';
  const READING_LAYOUT_KEY = 'bl_reading_layout';
  const SUPPORTED_LANGS = ['ro', 'en', 'bg', 'es'];

  const READING_SIZES = ['sm', 'md', 'lg', 'xl'];
  const READING_SIZE_LABELS = {
    sm: '90%',
    md: '100%',
    lg: '112%',
    xl: '125%'
  };

  const I18N = {
    ro: {
      header_tagline: 'PUBLICAȚIA DE PERFORMANCE MARKETING',
      masthead_eyebrow: 'BUSINESSLEAGUE EDITORIAL • PERFORMANȚĂ PE CIFRE REALE',
      metric_sales_2025: 'vânzări 2025',
      metric_sales: 'vânzări totale',
      metric_gmv: 'valoare generată',
      metric_roas: 'ROAS mediu',
      masthead_title_html:
        '<span class="bl-thin">Nu încă un blog de marketing.</span><span class="bl-shine">Arena în care performerii joacă pe cifre reale.</span>',
      masthead_subtitle:
        'Zero teorie. Zero clișee. Radiografii pe milioane de comenzi, conversații fără perdea cu campionii din e-commerce și arhitectura primului campionat descentralizat din lume.',
      masthead_film_cta: 'Vezi Filmul (1:44)',
      masthead_hub_link: 'Explorează Community Hub-ul',
      cover_story_tag: 'COVER STORY // #01',
      nav_home: 'Toate Secțiunile',
      nav_all: 'Toate Secțiunile',
      nav_interviews: 'Interviuri & Studii de Caz',
      nav_data: 'Date & Radiografii de Piață',
      nav_playbooks: 'Playbooks & Strategie',
      nav_competition: 'Competiție & Evenimente',
      nav_product: 'Produs & Tech',
      nav_corporate: '2Performant & BVB',
      pillar_all: 'Toate Secțiunile',
      pillar_data: 'Date & Radiografii de Piață',
      pillar_interviews: 'Interviuri & Studii de Caz',
      pillar_playbooks: 'Playbooks & Strategie',
      pillar_competition: 'Competiție & Evenimente',
      pillar_product: 'Produs & Tech',
      pillar_corporate: '2Performant & BVB',
      search_placeholder: 'Caută articole, studii, branduri...',
      search_no_results: 'Niciun articol găsit pentru căutarea ta.',
      search_results_label: 'REZULTATE INSTANT',
      cta_join: 'Intră în Ligă',
      read_lead: 'Citește Cover Story-ul',
      read_article: 'Citește',
      hero_side_title: 'În Prim-Plan • Selecția Redacției',
      eco_title_html: 'Campionatul care e, de fapt, <span class="bl-thin">o comunitate.</span>',
      eco_title: 'Crește-ți vânzările sau câștigă comisioane prin performanță pură',
      eco_desc: 'Intră în campionatul de marketing descentralizat #1 din CEE.',
      dossier_film: 'Manifestul video BusinessLeague (1:44) ↗',
      dossier_pulse: '1 email/săptămână cu tot ce mișcă în Ligă ↗',
      dossier_events: 'Dublin, București & sesiuni live pe Luma ↗',
      dossier_hub_btn: 'Deschide Hub-ul',
      sec_interviews_eyebrow: 'VOCILE LIGII // INTERVIURI EXCLUSIVE',
      sec_interviews_title: 'Conversații cu Top Marketeri & Magazine',
      sec_data_eyebrow: 'DATE & ANALIZE // MARKET INTELLIGENCE',
      sec_data_title: 'Radiografia Pieței de E-Commerce & Rapoarte pe Verticale',
      sec_playbooks_eyebrow: 'STRATEGIE APLICATĂ // PLAYBOOKS',
      sec_playbooks_title: 'Ghiduri de Creștere, Conversie & Google Ads',
      sec_competition_eyebrow: 'ARENA COMPETIȚIONALĂ // CLASAMENTE',
      sec_competition_title: 'Campionate, Provocări & Performanță la Vârf',
      sec_product_eyebrow: 'INOVAȚIE // PLATFORMA BUSINESSLEAGUE',
      sec_product_title: 'Noutăți de Produs, Atribuire & Automatizare',
      latest_eyebrow: 'ARHIVA EDITORIALĂ COMPLETĂ • MASONRY WALL',
      latest_title: 'Toate Articolele Recente',
      view_all_section: 'Filtrează secțiunea →',
      empty_lang_title: 'Ediția în această limbă este în curs de sincronizare',
      empty_lang_desc:
        'Scriptul automat de traducere BusinessLeague pregătește articolele în această limbă. Între timp, poți explora edițiile în Română, Engleză sau Bulgară.',
      breadcrumb_home: 'Acasă',
      article_lang_prompt: 'Citește acest articol în:',
      share_label: 'Distribuie',
      copied_link: 'Link copiat!',
      toc_title: 'Cuprins Articol',
      rail_lang_title: 'Versiuni Disponibile',
      related_eyebrow: 'CONTINUĂ LECTURA',
      related_title: 'Articole Recomandate',
      reading_prefs_label: 'Mod Lectură & Tipografie',
      reading_font_sans: 'Sans',
      reading_font_serif: 'Editorial Serif',
      reading_layout_standard: 'Standard',
      reading_layout_zen: 'Zen Focus',
      footer_bl_eyebrow: 'THE PERFORMANCE MARKETING CHAMPIONSHIP',
      footer_bl_statement:
        'Un campionat deschis de e-commerce în care marketerii și magazinele concurează pe vânzări reale și transparente.',
      footer_bl_cta_hub: 'Hub Comunitate (start.businessleague.com) ↗',
      footer_bl_cta_app: 'Intră în Platformă ↗',
      footer_2p_eyebrow: 'DEZVOLTAT ȘI SUSȚINUT DE',
      footer_2p_statement:
        '2Performant Network SA — compania de tehnologie care dezvoltă BusinessLeague. Prima companie românească de martech listată la Bursa de Valori București.',
      footer_2p_cta_site: '2performant.com ↗',
      footer_bvb_exchange: 'Bursa de Valori București',
      footer_col_hub: 'HUB COMUNITATE',
      footer_link_hub_home: 'Start Hub (start.businessleague.com) ↗',
      footer_link_blog: 'BusinessLeague Editorial (Blog)',
      footer_link_film: 'Filmul (1:44) — Povestea Ligii',
      footer_link_events: 'Meetups & Evenimente (Luma) ↗',
      footer_link_feedback: 'Propune Funcționalități (Supahub) ↗',
      footer_col_pillars: 'RUBRICI EDITORIALE',
      footer_col_editions: 'EDIȚII & CANALE',
      footer_col_2p: '2PERFORMANT & IR',
      badge_interviews: 'INTERVIU & STUDIU DE CAZ',
      badge_data: 'DATE & ANALIZĂ PIAȚĂ',
      badge_playbooks: 'PLAYBOOK & STRATEGIE',
      badge_competition: 'COMPETIȚIE & LIGĂ',
      badge_product: 'PRODUS & TECH',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'EDITORIAL'
    },
    en: {
      header_tagline: 'THE PERFORMANCE MARKETING JOURNAL',
      masthead_eyebrow: 'BUSINESSLEAGUE EDITORIAL • PERFORMANCE ON REAL NUMBERS',
      metric_sales_2025: 'sales in 2025',
      metric_sales: 'total sales',
      metric_gmv: 'generated GMV',
      metric_roas: 'average ROAS',
      masthead_title_html:
        '<span class="bl-thin">Not another marketing blog.</span><span class="bl-shine">The arena where top performers play on real numbers.</span>',
      masthead_subtitle:
        'Zero theory. Zero fluff. Deep-dives across millions of transactions, unfiltered conversations with e-commerce champions, and the architecture of the world’s first decentralized marketing championship.',
      masthead_film_cta: 'Watch the Film (1:44)',
      masthead_hub_link: 'Explore the Community Hub',
      cover_story_tag: 'COVER STORY // #01',
      nav_home: 'All Sections',
      nav_all: 'All Sections',
      nav_interviews: 'Interviews & Case Studies',
      nav_data: 'Market Data & Reports',
      nav_playbooks: 'Playbooks & Strategy',
      nav_competition: 'Competition & Events',
      nav_product: 'Product & Tech',
      nav_corporate: '2Performant & IR',
      pillar_all: 'All Sections',
      pillar_data: 'Market Data & Reports',
      pillar_interviews: 'Interviews & Case Studies',
      pillar_playbooks: 'Playbooks & Strategy',
      pillar_competition: 'Competition & Events',
      pillar_product: 'Product & Tech',
      pillar_corporate: '2Performant & IR',
      search_placeholder: 'Search stories, case studies, brands...',
      search_no_results: 'No matching stories found.',
      search_results_label: 'INSTANT RESULTS',
      cta_join: 'Enter the League',
      read_lead: 'Read Cover Story',
      read_article: 'Read story',
      hero_side_title: 'Spotlight • Editor’s Picks',
      eco_title_html: 'The championship that is, in fact, <span class="bl-thin">a community.</span>',
      eco_title: 'Turn traffic into revenue or scale your online store',
      eco_desc: 'Join the #1 decentralized performance marketing championship in CEE.',
      dossier_film: 'The BusinessLeague Film Manifesto (1:44) ↗',
      dossier_pulse: 'Weekly Pulse — Live championship standings every week ↗',
      dossier_events: 'Dublin, Bucharest & live sessions on Luma ↗',
      dossier_hub_btn: 'Open Community Hub',
      sec_interviews_eyebrow: 'VOICES OF THE LEAGUE // EXCLUSIVE INTERVIEWS',
      sec_interviews_title: 'Conversations with Top Marketers & Merchants',
      sec_data_eyebrow: 'MARKET INTELLIGENCE // DATA & REPORTS',
      sec_data_title: 'E-Commerce Sector Benchmarks & Vertical Deep-Dives',
      sec_playbooks_eyebrow: 'APPLIED STRATEGY // PLAYBOOKS',
      sec_playbooks_title: 'Growth Guides, Conversion & Google Ads',
      sec_competition_eyebrow: 'THE ARENA // COMPETITION & RANKINGS',
      sec_competition_title: 'Championships, Challenges & Peak Performance',
      sec_product_eyebrow: 'INNOVATION // PLATFORM RELEASES',
      sec_product_title: 'Product Updates, Attribution & Automation',
      latest_eyebrow: 'COMPLETE EDITORIAL ARCHIVE • MASONRY WALL',
      latest_title: 'All Published Stories',
      view_all_section: 'Filter section →',
      empty_lang_title: 'This language edition is currently syncing',
      empty_lang_desc:
        'Our automated editorial translation pipeline is preparing stories for this edition. Switch to English, Romanian, or Bulgarian to explore now.',
      breadcrumb_home: 'Home',
      article_lang_prompt: 'Read this article in:',
      share_label: 'Share',
      copied_link: 'Link copied!',
      toc_title: 'Table of Contents',
      rail_lang_title: 'Available Editions',
      related_eyebrow: 'CONTINUE READING',
      related_title: 'Recommended Stories',
      reading_prefs_label: 'Reading Mode & Typography',
      reading_font_sans: 'Sans',
      reading_font_serif: 'Editorial Serif',
      reading_layout_standard: 'Standard',
      reading_layout_zen: 'Zen Focus',
      footer_bl_eyebrow: 'THE PERFORMANCE MARKETING CHAMPIONSHIP',
      footer_bl_statement:
        'An open e-commerce championship where digital marketers and online stores compete on real, transparent sales.',
      footer_bl_cta_hub: 'Community Hub (start.businessleague.com) ↗',
      footer_bl_cta_app: 'Enter the Arena ↗',
      footer_2p_eyebrow: 'BUILT AND POWERED BY',
      footer_2p_statement:
        '2Performant Network SA — the technology company behind BusinessLeague. The first Romanian martech company listed on the Bucharest Stock Exchange.',
      footer_2p_cta_site: '2performant.com ↗',
      footer_bvb_exchange: 'Bucharest Stock Exchange',
      footer_col_hub: 'COMMUNITY HUB',
      footer_link_hub_home: 'Start Hub (start.businessleague.com) ↗',
      footer_link_blog: 'BusinessLeague Editorial (Blog)',
      footer_link_film: 'The Film (1:44) — League Story',
      footer_link_events: 'Meetups & Events (Luma) ↗',
      footer_link_feedback: 'Feature Requests (Supahub) ↗',
      footer_col_pillars: 'EDITORIAL PILLARS',
      footer_col_editions: 'EDITIONS & CHANNELS',
      footer_col_2p: '2PERFORMANT & IR',
      badge_interviews: 'INTERVIEW & CASE STUDY',
      badge_data: 'MARKET INTELLIGENCE',
      badge_playbooks: 'GROWTH PLAYBOOK',
      badge_competition: 'COMPETITION & ARENA',
      badge_product: 'PRODUCT & TECH',
      badge_corporate: '2PERFORMANT & IR',
      badge_general: 'EDITORIAL'
    },
    bg: {
      header_tagline: 'ИЗДАНИЕ ЗА ПЪРФОРМАНС МАРКЕТИНГ',
      masthead_eyebrow: 'BUSINESSLEAGUE EDITORIAL • РЕАЛНИ РЕЗУЛТАТИ В Е-ТЪРГОВИЯТА',
      metric_sales_2025: 'продажби 2025',
      metric_sales: 'общо продажби',
      metric_gmv: 'генериран оборот',
      metric_roas: 'среден ROAS',
      masthead_title_html:
        '<span class="bl-thin">Не просто поредният маркетинг блог.</span><span class="bl-shine">Арената, в която лидерите играят с реални числа.</span>',
      masthead_subtitle:
        'Нула теория. Нула клишета. Анализи на милиони поръчки, откровени разговори с шампионите в електронната търговия и архитектурата на първия децентрализиран шампионат.',
      masthead_film_cta: 'Гледайте филма (1:44)',
      masthead_hub_link: 'Разгледайте Общностния Хъб',
      cover_story_tag: 'ВОДЕЩА ТЕМА // #01',
      nav_home: 'Всички Секции',
      nav_all: 'Всички Секции',
      nav_interviews: 'Интервюта и Казуси',
      nav_data: 'Пазарни Данни',
      nav_playbooks: 'Стратегии и Наръчници',
      nav_competition: 'Състезание и Класации',
      nav_product: 'Продукт и Технологии',
      nav_corporate: '2Performant & BVB',
      pillar_all: 'Всички Секции',
      pillar_data: 'Пазарни Данни и Анализи',
      pillar_interviews: 'Интервюта и Казуси',
      pillar_playbooks: 'Стратегии и Наръчници',
      pillar_competition: 'Състезание и Класации',
      pillar_product: 'Продукт и Технологии',
      pillar_corporate: '2Performant & Инвеститори',
      search_placeholder: 'Търсене на статии, анализи, брандове...',
      search_no_results: 'Няма намерени статии.',
      search_results_label: 'РЕЗУЛТАТИ',
      cta_join: 'Влез в Лигата',
      read_lead: 'Прочети водещата статия',
      read_article: 'Прочети',
      hero_side_title: 'На Фокус • Изборът на Редакцията',
      eco_title_html: 'Шампионатът, който всъщност е <span class="bl-thin">общност.</span>',
      eco_title: 'Превърнете трафика в продажби или развийте своя онлайн магазин',
      eco_desc: 'Включете се в отворения шампионат по пърформанс маркетинг #1 в ЦИЕ.',
      dossier_film: 'Видео манифестът на BusinessLeague (1:44) ↗',
      dossier_pulse: 'Weekly Pulse — Седмичната класация на живо ↗',
      dossier_events: 'Дъблин, Букурещ и сесии на живо в Luma ↗',
      dossier_hub_btn: 'Отвори Хъба',
      sec_interviews_eyebrow: 'ГЛАСОВЕТЕ НА ЛИГАТА // ИНТЕРВЮТА',
      sec_interviews_title: 'Разговори с Топ Маркетолози и Магазини',
      sec_data_eyebrow: 'ПАЗАРНИ ДАННИ // АНАЛИЗИ И СЕКТОРИ',
      sec_data_title: 'Тенденции в Електронната Търговия и Секторни Доклади',
      sec_playbooks_eyebrow: 'ПРИЛОЖНА СТРАТЕГИЯ // НАРЪЧНИЦИ',
      sec_playbooks_title: 'Ръководства за Растеж, Конверсии и Google Ads',
      sec_competition_eyebrow: 'АРЕНАТА // КЛАСАЦИИ И СЪСТЕЗАНИЯ',
      sec_competition_title: 'Шампионати, Предизвикателства и Рекорди',
      sec_product_eyebrow: 'ИНОВАЦИИ // ПЛАТФОРМАТА',
      sec_product_title: 'Продуктови Новости, Атрибуция и Автоматизация',
      latest_eyebrow: 'ПЪЛЕН РЕДАКЦИОНЕН АРХИВ • MASONRY WALL',
      latest_title: 'Всички Публикувани Статии',
      view_all_section: 'Филтрирай секцията →',
      empty_lang_title: 'Изданието на този език се синхронизира',
      empty_lang_desc:
        'В момента няма статии за тази секция. Превключете към българското, румънското или английското издание.',
      breadcrumb_home: 'Начало',
      article_lang_prompt: 'Прочетете тази статия на:',
      share_label: 'Сподели',
      copied_link: 'Копирано!',
      toc_title: 'Съдържание',
      rail_lang_title: 'Налични Издания',
      related_eyebrow: 'ПРОДЪЛЖЕТЕ ЧЕТЕНЕТО',
      related_title: 'Препоръчани Статии',
      reading_prefs_label: 'Режим на Четене',
      reading_font_sans: 'Sans',
      reading_font_serif: 'Editorial Serif',
      reading_layout_standard: 'Стандартен',
      reading_layout_zen: 'Zen Фокус',
      footer_bl_eyebrow: 'ШАМПИОНАТЪТ ПО ПЪРФОРМАНС МАРКЕТИНГ',
      footer_bl_statement:
        'Отворен шампионат за електронна търговия, в който маркетолози и онлайн магазини се състезават на база реални продажби.',
      footer_bl_cta_hub: 'Общностен Хъб (start.businessleague.com) ↗',
      footer_bl_cta_app: 'Влез в Платформата ↗',
      footer_2p_eyebrow: 'СЪЗДАДЕНО И ЗАДВИЖВАНО ОТ',
      footer_2p_statement:
        '2Performant Network SA — технологичната компания зад BusinessLeague, листната на Букурещката фондова борса.',
      footer_2p_cta_site: '2performant.com ↗',
      footer_bvb_exchange: 'Bucharest Stock Exchange',
      footer_col_hub: 'ОБЩНОСТЕН ХЪБ',
      footer_link_hub_home: 'Start Hub (start.businessleague.com) ↗',
      footer_link_blog: 'BusinessLeague Editorial (Blog)',
      footer_link_film: 'Филмът (1:44) — Историята на Лигата',
      footer_link_events: 'Събития и Срещи (Luma) ↗',
      footer_link_feedback: 'Предложения (Supahub) ↗',
      footer_col_pillars: 'РЕДАКЦИОННИ РУБРИКИ',
      footer_col_editions: 'ИЗДАНИЯ И КАНАЛИ',
      footer_col_2p: '2PERFORMANT & IR',
      badge_interviews: 'ИНТЕРВЮ И КАЗУС',
      badge_data: 'ПАЗАРЕН АНАЛИЗ',
      badge_playbooks: 'ПРАКТИЧЕСКИ НАРЪЧНИК',
      badge_competition: 'СЪСТЕЗАНИЕ',
      badge_product: 'ПРОДУКТ И ТЕХНОЛОГИИ',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'РЕДАКЦИОННО'
    },
    es: {
      header_tagline: 'PUBLICACIÓN DE PERFORMANCE MARKETING',
      masthead_eyebrow: 'BUSINESSLEAGUE EDITORIAL • RENDIMIENTO CON CIFRAS REALES',
      metric_sales_2025: 'ventas 2025',
      metric_sales: 'ventas totales',
      metric_gmv: 'valor generado',
      metric_roas: 'ROAS medio',
      masthead_title_html:
        '<span class="bl-thin">No es otro blog de marketing.</span><span class="bl-shine">La arena donde los mejores juegan con cifras reales.</span>',
      masthead_subtitle:
        'Cero teoría. Cero clichés. Radiografías sobre millones de pedidos, conversaciones sin filtro con los campeones del e-commerce y la arquitectura del primer campeonato descentralizado del mundo.',
      masthead_film_cta: 'Ver el Film (1:44)',
      masthead_hub_link: 'Explorar el Community Hub',
      cover_story_tag: 'PORTADA // #01',
      nav_home: 'Todas las Secciones',
      nav_all: 'Todas las Secciones',
      nav_interviews: 'Entrevistas y Casos',
      nav_data: 'Datos y Mercado',
      nav_playbooks: 'Playbooks y Estrategia',
      nav_competition: 'Competición y Eventos',
      nav_product: 'Producto y Tech',
      nav_corporate: '2Performant e IR',
      pillar_all: 'Todas las Secciones',
      pillar_data: 'Datos y Análisis de Mercado',
      pillar_interviews: 'Entrevistas y Casos de Estudio',
      pillar_playbooks: 'Playbooks y Estrategia',
      pillar_competition: 'Competición y Eventos',
      pillar_product: 'Producto y Tech',
      pillar_corporate: '2Performant e Inversores',
      search_placeholder: 'Buscar artículos, estudios, marcas...',
      search_no_results: 'No se encontraron artículos.',
      search_results_label: 'RESULTADOS INSTANTÁNEOS',
      cta_join: 'Entrar en la Liga',
      read_lead: 'Leer Artículo de Portada',
      read_article: 'Leer',
      hero_side_title: 'En Primer Plano • Selección Editorial',
      eco_title_html: 'El campeonato que es, de hecho, <span class="bl-thin">una comunidad.</span>',
      eco_title: 'Convierte el tráfico en ventas o escala tu tienda online',
      eco_desc: 'Únete al campeonato abierto de performance marketing #1 en CEE.',
      dossier_film: 'El Film Manifiesto de BusinessLeague (1:44) ↗',
      dossier_pulse: 'Weekly Pulse — Clasificación en vivo cada semana ↗',
      dossier_events: 'Dublín, Bucarest y sesiones en vivo en Luma ↗',
      dossier_hub_btn: 'Abrir el Hub',
      sec_interviews_eyebrow: 'VOCES DE LA LIGA // ENTREVISTAS',
      sec_interviews_title: 'Conversaciones con Top Marketers y Tiendas',
      sec_data_eyebrow: 'INTELIGENCIA DE MERCADO // DATOS Y SECTORES',
      sec_data_title: 'Radiografía del E-Commerce e Informes por Vertical',
      sec_playbooks_eyebrow: 'ESTRATEGIA APLICADA // PLAYBOOKS',
      sec_playbooks_title: 'Guías de Crecimiento, Conversión y Google Ads',
      sec_competition_eyebrow: 'LA ARENA // COMPETICIÓN Y RANKINGS',
      sec_competition_title: 'Campeonatos, Desafíos y Alto Rendimiento',
      sec_product_eyebrow: 'INNOVACIÓN // PLATAFORMA',
      sec_product_title: 'Novedades de Producto, Atribución y Automatización',
      latest_eyebrow: 'ARCHIVO EDITORIAL COMPLETO • MASONRY WALL',
      latest_title: 'Todos los Artículos Publicados',
      view_all_section: 'Filtrar sección →',
      empty_lang_title: 'La edición en español se está sincronizando',
      empty_lang_desc:
        'El sistema automático de traducción editorial está preparando los artículos en español. Mientras tanto, explora las ediciones en Rumano, Inglés o Búlgaro.',
      breadcrumb_home: 'Inicio',
      article_lang_prompt: 'Leer este artículo en:',
      share_label: 'Compartir',
      copied_link: '¡Enlace copiado!',
      toc_title: 'Índice del Artículo',
      rail_lang_title: 'Ediciones Disponibles',
      related_eyebrow: 'CONTINUAR LEYENDO',
      related_title: 'Artículos Recomendados',
      reading_prefs_label: 'Modo de Lectura y Tipografía',
      reading_font_sans: 'Sans',
      reading_font_serif: 'Editorial Serif',
      reading_layout_standard: 'Estándar',
      reading_layout_zen: 'Zen Focus',
      footer_bl_eyebrow: 'EL CAMPEONATO DE PERFORMANCE MARKETING',
      footer_bl_statement:
        'Un campeonato abierto de e-commerce donde marketers y tiendas online compiten con ventas reales y transparentes.',
      footer_bl_cta_hub: 'Hub de la Comunidad (start.businessleague.com) ↗',
      footer_bl_cta_app: 'Entrar en la Plataforma ↗',
      footer_2p_eyebrow: 'DESARROLLADO Y RESPALDADO POR',
      footer_2p_statement:
        '2Performant Network SA — la empresa tecnológica detrás de BusinessLeague, cotizada en la Bolsa de Valores de Bucarest.',
      footer_2p_cta_site: '2performant.com ↗',
      footer_bvb_exchange: 'Bucharest Stock Exchange',
      footer_col_hub: 'HUB COMUNIDAD',
      footer_link_hub_home: 'Start Hub (start.businessleague.com) ↗',
      footer_link_film: 'El Film (1:44) — Historia de la Liga',
      footer_link_events: 'Eventos y Meetups (Luma) ↗',
      footer_link_feedback: 'Sugerencias (Supahub) ↗',
      footer_col_pillars: 'PILARES EDITORIALES',
      footer_col_editions: 'EDICIONES Y CANALES',
      footer_col_2p: '2PERFORMANT & IR',
      badge_interviews: 'ENTREVISTA Y CASO',
      badge_data: 'ANÁLISIS DE MERCADO',
      badge_playbooks: 'PLAYBOOK Y ESTRATEGIA',
      badge_competition: 'COMPETICIÓN',
      badge_product: 'PRODUCTO Y TECH',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'EDITORIAL'
    }
  };

  /**
   * 1. Resolve Active Language
   */
  function resolveActiveLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get('lang') || '').toLowerCase();
    if (SUPPORTED_LANGS.includes(urlLang)) {
      try {
        localStorage.setItem(STORAGE_KEY, urlLang);
      } catch (_) {}
      return urlLang;
    }

    const articleEl = document.querySelector('.bl-article-shell[data-post-tags]');
    if (articleEl) {
      const tags = (articleEl.getAttribute('data-post-tags') || '').toLowerCase().split(',');
      if (tags.includes('en')) return 'en';
      if (tags.includes('bg')) return 'bg';
      if (tags.includes('es')) return 'es';
    }

    const activeAttr = (document.documentElement.getAttribute('data-active-lang') || '').toLowerCase();
    if (SUPPORTED_LANGS.includes(activeAttr)) {
      return activeAttr;
    }

    try {
      const saved = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
      if (SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (_) {}

    return 'ro';
  }

  /**
   * 2. Editorial Pillar Classifier
   */
  function classifyPillar(title, tagsCsv, excerpt) {
    const hay = `${title || ''} ${tagsCsv || ''} ${excerpt || ''}`.toLowerCase();

    if (
      /interviu|interview|интервю|entrevista|poveste|story|journey|podcast|conversa|dialog|cum a |how .* built|lessons from|sfaturi de la|secrets of|unicorn|top affiliate|top advertiser|brandului|fondator|ceo|specialist|marketerul|câștigător|castigator|winner|как |историята на/.test(
        hay
      )
    ) {
      return 'interviews';
    }

    if (
      /analiz|analysis|анализ|análisis|market|piaț|piat|пазар|mercado|studiu|study|statistic|report|raport|sector|vertical|fashion|beauty|pharma|home & garden|home and garden|electro|it&c|baby|toys|books|food|automotive|pet|trend|evoluți|evoluti|cifre|numbers|benchmark|insight|whitepaper|cât s-a|cat s-a/.test(
        hay
      )
    ) {
      return 'data';
    }

    if (
      /google ads|facebook ads|tiktok|seo|ppc|ghid|guide|playbook|strateg|conversi|conversion|roas|traffic|trafic|optimiz|tips|sfaturi|cum să|cum sa|how to|tutorial|audit|landing page|shopping ads|keywords|campanii|campaigns|promovare|vânzări|vanzari|sales|трафик|кампании|продажби|ъпгрейд/.test(
        hay
      )
    ) {
      return 'playbooks';
    }

    if (
      /challenge|clasament|ranking|leaderboard|câștig|castig|premii|prizes|campionat|championship|cupa|cup|black friday|bf |round|etapa|top 10|top 5|record|sprint|maraton|marathon|liga|league|състезание|класация|шампионат|черен петък|пролетни/.test(
        hay
      )
    ) {
      return 'competition';
    }

    if (
      /feature|update|lansare|launch|release|platform|tool|api|tracking|atribuire|attribution|feed|plugin|dashboard|automatiz|ai |product|produs|funcționalit|functionalit|b2b|account|upgrade|платформа|функционалност/.test(
        hay
      )
    ) {
      return 'product';
    }

    if (
      /bvb|burs|invest|acționar|actionar|aga|raport financiar|financial|2performant|echipa|team|aniversare|anniversary|corporate|listare|acțiuni|actiuni|shares|capital/.test(
        hay
      )
    ) {
      return 'corporate';
    }

    return 'playbooks';
  }

  /**
   * 3. Update Category Cover Templates & Badges inside a container
   */
  function decorateCardElement(cardEl, lang) {
    const dict = I18N[lang] || I18N.ro;
    const titleEl = cardEl.querySelector('.bl-card-title, .bl-lead-title, .bl-side-title, .bl-article-title');
    const excerptEl = cardEl.querySelector('.bl-card-excerpt, .bl-lead-excerpt, .bl-article-dek');
    const tagsCsv = cardEl.getAttribute('data-tags') || cardEl.getAttribute('data-post-tags') || '';

    let pillar = cardEl.getAttribute('data-pillar');
    if (!pillar || pillar === 'auto') {
      pillar = classifyPillar(
        titleEl ? titleEl.textContent : '',
        tagsCsv,
        excerptEl ? excerptEl.textContent : ''
      );
      cardEl.setAttribute('data-pillar', pillar);
    }

    const badgeKey = `badge_${pillar}`;
    const pillarLabel = dict[badgeKey] || dict.badge_general;

    cardEl.querySelectorAll('[data-pillar-badge], [data-card-badge]').forEach((badge) => {
      badge.setAttribute('data-pillar-type', pillar);
      badge.textContent = pillarLabel;
    });

    cardEl.querySelectorAll('.bl-generated-cover, [data-generated-cover]').forEach((coverEl) => {
      coverEl.setAttribute('data-cover-pillar', pillar);
      const img = coverEl.querySelector('[data-cover-template-img], [data-cover-bg]');
      if (img) {
        const currentSrc = img.getAttribute('src') || '';
        const baseDir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
        img.setAttribute('src', `${baseDir}cover-${pillar}.svg`);
      }
      const kicker = coverEl.querySelector('[data-cover-kicker]');
      if (kicker) {
        kicker.textContent = pillarLabel;
      }
    });

    return pillar;
  }

  /**
   * 4. Apply UI Translations (`[data-i18n]`, `[data-i18n-html]`, placeholders, active language buttons)
   */
  function applyTranslations(lang) {
    const dict = I18N[lang] || I18N.ro;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-active-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (key && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.querySelectorAll('[data-set-lang], [data-lang-switch]').forEach((btn) => {
      const btnLang = btn.getAttribute('data-set-lang') || btn.getAttribute('data-lang-switch');
      const isActive = btnLang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('[data-article-lang]').forEach((pill) => {
      const pillLang = pill.getAttribute('data-article-lang');
      pill.classList.toggle('is-active', pillLang === lang);
    });
  }

  /**
   * 5. Build Curated Journalistic Magazine Sections inside each `.bl-lang-workspace`
   */
  function initWorkspacesAndSections(activeLang, activePillarFilter) {
    const workspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]');
    if (!workspaces.length) {
      // Single post or page view: still decorate any cards on page
      document
        .querySelectorAll('.bl-card, .bl-lead-card, .bl-side-card, .bl-article-shell')
        .forEach((el) => decorateCardElement(el, activeLang));
      return;
    }

    workspaces.forEach((ws) => {
      const panelLang = ws.getAttribute('data-lang-panel') || 'ro';
      const dict = I18N[panelLang] || I18N.ro;

      // Decorate all cards in this language workspace
      const allCardsInWorkspace = Array.from(
        ws.querySelectorAll('.bl-lead-card, .bl-side-card, .bl-card')
      );
      allCardsInWorkspace.forEach((c) => decorateCardElement(c, panelLang));

      // Collect unique standard `.bl-card` models from subgrid + masonry grid for curated sections
      const heroSubCards = Array.from(ws.querySelectorAll('.bl-hero-subgrid > .bl-card'));
      const masonryGrid = ws.querySelector('[data-workspace-grid]');
      const masonryCards = masonryGrid
        ? Array.from(masonryGrid.querySelectorAll(':scope > .bl-card:not([data-cloned-filter-card])'))
        : [];

      // Also build standard `.bl-card` representations for the Lead card + 4 Side cards so curated sections have full coverage
      const leadCardEl = ws.querySelector('.bl-lead-card');
      const sideCardEls = Array.from(ws.querySelectorAll('.bl-side-card'));

      function createStandardCardFromAny(sourceEl) {
        if (sourceEl.classList.contains('bl-card')) {
          const c = sourceEl.cloneNode(true);
          c.removeAttribute('style');
          c.hidden = false;
          return c;
        }
        const pillar = sourceEl.getAttribute('data-pillar') || 'playbooks';
        const slug = sourceEl.getAttribute('data-post-slug') || '';
        const date = sourceEl.getAttribute('data-published') || '';
        const titleLink = sourceEl.querySelector('.bl-lead-title a, .bl-side-title a');
        const title = titleLink ? titleLink.textContent.trim() : '';
        const url = titleLink ? titleLink.getAttribute('href') : '#';
        const imgEl = sourceEl.querySelector('img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
        const excerptEl = sourceEl.querySelector('.bl-lead-excerpt');
        const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
        const badgeText = dict[`badge_${pillar}`] || dict.badge_general;

        const article = document.createElement('article');
        article.className = 'bl-card post-card';
        article.setAttribute('data-post-slug', slug);
        article.setAttribute('data-pillar', pillar);
        article.innerHTML = `
          <a class="bl-card-media" href="${url}" aria-label="${title.replace(/"/g, '&quot;')}">
            <img src="${imgSrc}" alt="${title.replace(/"/g, '&quot;')}" loading="lazy" />
          </a>
          <div class="bl-card-body">
            <div class="bl-meta-row">
              <span class="bl-pillar-badge" data-pillar-badge data-pillar-type="${pillar}">${badgeText}</span>
              <time class="bl-meta-time" datetime="${date}">${date}</time>
            </div>
            <h3 class="bl-card-title"><a href="${url}">${title}</a></h3>
            ${excerpt ? `<p class="bl-card-excerpt">${excerpt}</p>` : ''}
            <footer class="bl-card-footer">
              <span class="bl-author-chip"><span>BusinessLeague</span></span>
              <a class="bl-read-cta" href="${url}">
                <span data-i18n="read_article">${dict.read_article}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </footer>
          </div>
        `;
        return article;
      }

      const poolCards = [
        ...heroSubCards.map((c) => createStandardCardFromAny(c)),
        ...masonryCards.map((c) => createStandardCardFromAny(c)),
        ...(leadCardEl ? [createStandardCardFromAny(leadCardEl)] : []),
        ...sideCardEls.map((c) => createStandardCardFromAny(c))
      ];

      // Deduplicate pool by slug/href
      const seenSlugs = new Set();
      const uniquePool = [];
      poolCards.forEach((card) => {
        const key =
          card.getAttribute('data-post-slug') ||
          (card.querySelector('.bl-card-title a') || {}).getAttribute?.('href') ||
          Math.random().toString();
        if (!seenSlugs.has(key)) {
          seenSlugs.add(key);
          uniquePool.push(card);
        }
      });

      const curatedContainer = ws.querySelector('[data-curated-sections]');
      if (curatedContainer && !curatedContainer.hasAttribute('data-curated-built')) {
        curatedContainer.innerHTML = '';

        const sectionSpecs = [
          {
            id: 'interviews',
            num: '01',
            eyebrowKey: 'sec_interviews_eyebrow',
            titleKey: 'sec_interviews_title',
            limit: 4,
            gridClass: 'bl-grid-4'
          },
          {
            id: 'data',
            num: '02',
            eyebrowKey: 'sec_data_eyebrow',
            titleKey: 'sec_data_title',
            limit: 4,
            gridClass: 'bl-bento-data-grid'
          },
          {
            id: 'playbooks',
            num: '03',
            eyebrowKey: 'sec_playbooks_eyebrow',
            titleKey: 'sec_playbooks_title',
            limit: 3,
            gridClass: 'bl-grid-3'
          },
          {
            id: 'competition',
            num: '04',
            eyebrowKey: 'sec_competition_eyebrow',
            titleKey: 'sec_competition_title',
            limit: 2,
            gridClass: 'bl-grid-2'
          },
          {
            id: 'product',
            num: '05',
            eyebrowKey: 'sec_product_eyebrow',
            titleKey: 'sec_product_title',
            limit: 3,
            gridClass: 'bl-grid-3'
          }
        ];

        sectionSpecs.forEach((spec) => {
          const matches = uniquePool
            .filter((c) => c.getAttribute('data-pillar') === spec.id)
            .slice(0, spec.limit);

          if (matches.length === 0) return;

          const sec = document.createElement('section');
          sec.className = 'bl-section bl-curated-section';
          sec.setAttribute('data-curated-pillar', spec.id);

          const header = document.createElement('div');
          header.className = 'bl-section-header';
          header.innerHTML = `
            <div>
              <span class="bl-section-eyebrow" data-i18n="${spec.eyebrowKey}">${dict[spec.eyebrowKey]}</span>
              <h2 class="bl-section-title" data-i18n="${spec.titleKey}">${dict[spec.titleKey]}</h2>
            </div>
            <button type="button" class="bl-filter-pill" data-filter-pillar="${spec.id}">
              <span data-i18n="view_all_section">${dict.view_all_section}</span>
            </button>
          `;
          sec.appendChild(header);

          const grid = document.createElement('div');
          grid.className = spec.gridClass;

          if (spec.gridClass === 'bl-bento-data-grid') {
            const leadClone = matches[0].cloneNode(true);
            grid.appendChild(leadClone);

            if (matches.length > 1) {
              const stack = document.createElement('div');
              stack.className = 'bl-bento-stack';
              matches.slice(1).forEach((m) => {
                stack.appendChild(m.cloneNode(true));
              });
              grid.appendChild(stack);
            }
          } else {
            matches.forEach((m) => {
              grid.appendChild(m.cloneNode(true));
            });
          }

          sec.appendChild(grid);
          curatedContainer.appendChild(sec);
        });

        curatedContainer.setAttribute('data-curated-built', 'true');
      }

      // Apply Pillar Filtering (`all` vs specific pillar)
      const heroSec = ws.querySelector('[data-hero-section]');
      const pulseSec = ws.querySelector('.bl-section-pulse');
      const isFiltering = activePillarFilter && activePillarFilter !== 'all';

      if (heroSec) heroSec.style.display = isFiltering ? 'none' : '';
      if (pulseSec) pulseSec.style.display = isFiltering ? 'none' : '';
      if (curatedContainer) curatedContainer.style.display = isFiltering ? 'none' : '';

      if (masonryGrid) {
        // Remove previously injected clones when filter changes
        masonryGrid.querySelectorAll('[data-cloned-filter-card]').forEach((el) => el.remove());

        if (!isFiltering) {
          masonryCards.forEach((c) => {
            c.style.display = '';
          });
        } else {
          // Hide non-matching masonry cards
          masonryCards.forEach((c) => {
            const match = c.getAttribute('data-pillar') === activePillarFilter;
            c.style.display = match ? '' : 'none';
          });
          // Also include matching cards from the Hero zone so they appear in the filtered results
          const existingMasonrySlugs = new Set(
            masonryCards.map((c) => c.getAttribute('data-post-slug'))
          );
          uniquePool.forEach((poolCard) => {
            const slug = poolCard.getAttribute('data-post-slug');
            if (
              poolCard.getAttribute('data-pillar') === activePillarFilter &&
              !existingMasonrySlugs.has(slug)
            ) {
              const clone = poolCard.cloneNode(true);
              clone.setAttribute('data-cloned-filter-card', 'true');
              masonryGrid.prepend(clone);
            }
          });
        }
      }
    });
  }

  /**
   * 6. Live Instant Autocomplete Search Engine (`#bl-search-wrap`)
   */
  function initLiveSearch(getCurrentLang) {
    const searchWrap = document.getElementById('bl-search-wrap');
    const searchInput = document.getElementById('bl-search-input');
    const searchClear = document.getElementById('bl-search-clear');
    const searchDropdown = document.getElementById('bl-search-dropdown');

    if (!searchWrap || !searchInput || !searchDropdown) return;

    let searchIndex = [];
    let activeResultIdx = -1;

    function buildSearchIndex() {
      const byKey = new Map();

      // 1. Preloaded index from preview server or Ghost JSON (`window.__BL_SEARCH_INDEX__`)
      if (Array.isArray(window.__BL_SEARCH_INDEX__)) {
        window.__BL_SEARCH_INDEX__.forEach((item) => {
          if (!item || !item.title || !item.url) return;
          const pillar = item.pillar || classifyPillar(item.title, item.tags || '', item.excerpt || '');
          const key = `${item.lang || 'ro'}:${item.slug || item.url}`;
          byKey.set(key, {
            title: item.title,
            url: item.url,
            slug: item.slug || '',
            lang: (item.lang || 'ro').toLowerCase(),
            date: item.date || '',
            image: item.feature_image || item.image || '',
            excerpt: item.excerpt || '',
            tags: item.tags || '',
            pillar
          });
        });
      }

      // 2. Also harvest every card rendered in the DOM across all language workspaces
      document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').forEach((ws) => {
        const lang = (ws.getAttribute('data-lang-panel') || 'ro').toLowerCase();
        ws.querySelectorAll('.bl-lead-card, .bl-side-card, .bl-card').forEach((card) => {
          const linkEl = card.querySelector('.bl-lead-title a, .bl-side-title a, .bl-card-title a');
          if (!linkEl) return;
          const title = (linkEl.textContent || '').trim();
          const url = linkEl.getAttribute('href') || '#';
          const slug = card.getAttribute('data-post-slug') || url;
          const key = `${lang}:${slug}`;
          if (byKey.has(key)) return;

          const imgEl = card.querySelector('img');
          const image = imgEl ? imgEl.getAttribute('src') || '' : '';
          const timeEl = card.querySelector('.bl-meta-time');
          const date = timeEl ? (timeEl.textContent || '').split('•')[0].trim() : '';
          const excerptEl = card.querySelector('.bl-lead-excerpt, .bl-card-excerpt');
          const excerpt = excerptEl ? (excerptEl.textContent || '').trim() : '';
          const tags = card.getAttribute('data-tags') || '';
          const pillar = card.getAttribute('data-pillar') || classifyPillar(title, tags, excerpt);

          byKey.set(key, {
            title,
            url,
            slug,
            lang,
            date,
            image,
            excerpt,
            tags,
            pillar
          });
        });
      });

      searchIndex = Array.from(byKey.values());
    }

    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function highlightMatch(text, query) {
      const safeText = escapeHtml(text);
      if (!query) return safeText;
      const tokens = query
        .trim()
        .split(/\s+/)
        .filter((t) => t.length >= 2)
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      if (!tokens.length) return safeText;
      const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
      return safeText.replace(regex, '<mark>$1</mark>');
    }

    function closeDropdown() {
      searchDropdown.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
      activeResultIdx = -1;
    }

    function renderQueryResults(rawQuery) {
      if (!searchIndex.length) {
        buildSearchIndex();
      }

      const query = (rawQuery || '').trim();
      if (searchClear) {
        searchClear.hidden = query.length === 0;
      }

      if (query.length === 0) {
        closeDropdown();
        return;
      }

      const currentLang = getCurrentLang();
      const dict = I18N[currentLang] || I18N.ro;
      const qLower = query.toLowerCase();
      const terms = qLower.split(/\s+/).filter(Boolean);

      const scored = [];
      searchIndex.forEach((item) => {
        const titleLower = item.title.toLowerCase();
        const excerptLower = (item.excerpt || '').toLowerCase();
        const tagsLower = (item.tags || '').toLowerCase();
        const pillarLower = (item.pillar || '').toLowerCase();

        let score = 0;
        let matchedAll = true;

        for (const term of terms) {
          if (titleLower.includes(term)) {
            score += titleLower.startsWith(term) ? 35 : 22;
          } else if (tagsLower.includes(term) || pillarLower.includes(term)) {
            score += 14;
          } else if (excerptLower.includes(term)) {
            score += 8;
          } else {
            matchedAll = false;
          }
        }

        if (!matchedAll || score === 0) return;

        // Prioritize articles in the user's active language edition
        if (item.lang === currentLang) {
          score += 50;
        }

        scored.push({ item, score });
      });

      scored.sort((a, b) => b.score - a.score);
      const topMatches = scored.slice(0, 8).map((s) => s.item);

      if (topMatches.length === 0) {
        searchDropdown.innerHTML = `
          <div class="bl-search-empty">
            ${escapeHtml(dict.search_no_results)}
          </div>
        `;
        searchDropdown.hidden = false;
        searchInput.setAttribute('aria-expanded', 'true');
        activeResultIdx = -1;
        return;
      }

      const headerHtml = `
        <div class="bl-search-dropdown-header">
          <span>${escapeHtml(dict.search_results_label)} (${scored.length})</span>
          <span>↑↓ ENTER · ESC</span>
        </div>
      `;

      const itemsHtml = topMatches
        .map((item, idx) => {
          const itemDict = I18N[item.lang] || dict;
          const badgeLabel = itemDict[`badge_${item.pillar}`] || itemDict.badge_general;
          const fallbackThumb = `/assets/images/covers/cover-${item.pillar || 'playbooks'}.svg`;
          const thumbSrc = item.image || fallbackThumb;

          return `
            <a class="bl-search-item${idx === 0 ? ' is-active' : ''}"
               href="${escapeHtml(item.url)}"
               role="option"
               data-search-result-idx="${idx}">
              <div class="bl-search-thumb">
                <img src="${escapeHtml(thumbSrc)}" alt="" loading="lazy" onerror="this.src='${fallbackThumb}'" />
              </div>
              <div class="bl-search-item-body">
                <div class="bl-search-item-meta">
                  <span class="bl-search-item-kicker">// ${escapeHtml(badgeLabel)}</span>
                  <span>&bull;</span>
                  <span>${escapeHtml(item.lang.toUpperCase())}</span>
                  ${item.date ? `<span>&bull;</span><span>${escapeHtml(item.date)}</span>` : ''}
                </div>
                <div class="bl-search-item-title">${highlightMatch(item.title, query)}</div>
              </div>
            </a>
          `;
        })
        .join('');

      searchDropdown.innerHTML = headerHtml + itemsHtml;
      searchDropdown.hidden = false;
      searchInput.setAttribute('aria-expanded', 'true');
      activeResultIdx = 0;
    }

    function updateActiveItem(newIdx) {
      const items = Array.from(searchDropdown.querySelectorAll('.bl-search-item'));
      if (!items.length) return;
      activeResultIdx = ((newIdx % items.length) + items.length) % items.length;
      items.forEach((el, idx) => {
        const active = idx === activeResultIdx;
        el.classList.toggle('is-active', active);
        if (active) {
          el.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    searchInput.addEventListener('input', (e) => {
      renderQueryResults(e.target.value);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) {
        renderQueryResults(searchInput.value);
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (searchDropdown.hidden) return;
      const items = Array.from(searchDropdown.querySelectorAll('.bl-search-item'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateActiveItem(activeResultIdx + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateActiveItem(activeResultIdx - 1);
      } else if (e.key === 'Enter' && activeResultIdx >= 0 && items[activeResultIdx]) {
        e.preventDefault();
        window.location.href = items[activeResultIdx].getAttribute('href');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
        searchInput.blur();
      }
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.hidden = true;
        closeDropdown();
        searchInput.focus();
      });
    }

    // Global keyboard shortcut: `/` or `⌘K` / `Ctrl+K` focuses search input
    document.addEventListener('keydown', (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash =
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement || {}).tagName || '') &&
        !(document.activeElement || {}).isContentEditable;

      if (isCmdK || isSlash) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === 'Escape' && !searchDropdown.hidden) {
        closeDropdown();
      }
    });

    // Click outside closes dropdown
    document.addEventListener('click', (e) => {
      if (!searchWrap.contains(e.target)) {
        closeDropdown();
      }
    });
  }

  /**
   * 7. Procedural Faceted Crystal Arena Canvas (`#bl-hero-mesh`)
   */
  function initHeroMesh() {
    const canvas = document.getElementById('bl-hero-mesh');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points = [];
    let triangles = [];
    const pointer = { x: 0.65, y: 0.38 };

    const COLS = 13;
    const ROWS = 7;

    function buildMesh() {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || 520;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      triangles = [];
      const cellW = width / (COLS - 1);
      const cellH = height / (ROWS - 1);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const jitterX =
            r > 0 && r < ROWS - 1 && c > 0 && c < COLS - 1
              ? Math.sin(r * 7.3 + c * 3.9) * 0.34 * cellW
              : 0;
          const jitterY =
            r > 0 && r < ROWS - 1 && c > 0 && c < COLS - 1
              ? Math.cos(r * 4.1 + c * 6.2) * 0.34 * cellH
              : 0;
          points.push({
            baseX: c * cellW + jitterX,
            baseY: r * cellH + jitterY,
            x: c * cellW + jitterX,
            y: r * cellH + jitterY,
            phase: (r * COLS + c) * 0.55,
            amp: 5 + ((r * 3 + c * 5) % 9)
          });
        }
      }

      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const i = r * COLS + c;
          triangles.push([i, i + 1, i + COLS]);
          triangles.push([i + 1, i + COLS + 1, i + COLS]);
        }
      }
    }

    function render(now) {
      const t = now * 0.00065;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x = p.baseX + Math.sin(t + p.phase) * p.amp;
        p.y = p.baseY + Math.cos(t * 0.85 + p.phase) * (p.amp * 0.75);
      }

      const lightX = width * pointer.x;
      const lightY = height * pointer.y;

      for (let i = 0; i < triangles.length; i++) {
        const [aIdx, bIdx, cIdx] = triangles[i];
        const a = points[aIdx];
        const b = points[bIdx];
        const c = points[cIdx];

        const cx = (a.x + b.x + c.x) / 3;
        const cy = (a.y + b.y + c.y) / 3;
        const dist = Math.hypot(cx - lightX, cy - lightY);
        const maxDist = Math.hypot(width, height) * 0.72;
        const intensity = Math.max(0, 1 - dist / maxDist);

        const greenHighlight = Math.pow(intensity, 2.4) * 0.16;
        const baseShade = 8 + ((i * 7) % 10) + intensity * 12;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();

        ctx.fillStyle = `rgba(${Math.round(baseShade)}, ${Math.round(
          baseShade + greenHighlight * 195
        )}, ${Math.round(baseShade + greenHighlight * 90)}, 0.78)`;
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 195, 100, ${0.035 + greenHighlight * 0.38})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      requestAnimationFrame(render);
    }

    buildMesh();
    window.addEventListener('resize', buildMesh, { passive: true });
    window.addEventListener(
      'pointermove',
      (e) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          pointer.x = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
          pointer.y = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
        }
      },
      { passive: true }
    );

    requestAnimationFrame(render);
  }

  /**
   * 8. Interactive Reader Typography & Layout Controls (`post.hbs`)
   */
  function initReadingControls() {
    const toolbar = document.querySelector('.bl-reading-toolbar');
    const html = document.documentElement;

    function syncToolbarUI() {
      const currentSize = html.getAttribute('data-reading-size') || 'md';
      const currentFont = html.getAttribute('data-reading-font') || 'sans';
      const currentLayout = html.getAttribute('data-reading-layout') || 'standard';

      const sizeIndicator = document.querySelector('[data-reading-size-indicator]');
      if (sizeIndicator) {
        sizeIndicator.textContent = READING_SIZE_LABELS[currentSize] || '100%';
      }

      document.querySelectorAll('[data-set-reading-font]').forEach((btn) => {
        const isMatch = btn.getAttribute('data-set-reading-font') === currentFont;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });

      document.querySelectorAll('[data-set-reading-layout]').forEach((btn) => {
        const isMatch = btn.getAttribute('data-set-reading-layout') === currentLayout;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });
    }

    if (!toolbar) return;
    syncToolbarUI();

    toolbar.addEventListener('click', (e) => {
      const sizeBtn = e.target.closest('[data-reading-size-action]');
      if (sizeBtn) {
        const action = sizeBtn.getAttribute('data-reading-size-action');
        const currentSize = html.getAttribute('data-reading-size') || 'md';
        let idx = READING_SIZES.indexOf(currentSize);
        if (idx === -1) idx = 1;

        if (action === 'decrease') idx = Math.max(0, idx - 1);
        else if (action === 'increase') idx = Math.min(READING_SIZES.length - 1, idx + 1);
        else if (action === 'reset') idx = 1;

        const nextSize = READING_SIZES[idx];
        html.setAttribute('data-reading-size', nextSize);
        try {
          localStorage.setItem(READING_SIZE_KEY, nextSize);
        } catch (_) {}
        syncToolbarUI();
        return;
      }

      const fontBtn = e.target.closest('[data-set-reading-font]');
      if (fontBtn) {
        const nextFont = fontBtn.getAttribute('data-set-reading-font') || 'sans';
        html.setAttribute('data-reading-font', nextFont);
        try {
          localStorage.setItem(READING_FONT_KEY, nextFont);
        } catch (_) {}
        syncToolbarUI();
        return;
      }

      const layoutBtn = e.target.closest('[data-set-reading-layout]');
      if (layoutBtn) {
        const nextLayout = layoutBtn.getAttribute('data-set-reading-layout') || 'standard';
        html.setAttribute('data-reading-layout', nextLayout);
        try {
          localStorage.setItem(READING_LAYOUT_KEY, nextLayout);
        } catch (_) {}
        syncToolbarUI();
      }
    });
  }

  /**
   * 9. Reading Progress Bar & Automated Table of Contents on Single Post
   */
  function initSinglePostEnhancements() {
    const progressBar = document.getElementById('bl-reading-progress');
    const articleContent = document.querySelector('#bl-article-prose, .bl-prose');
    const tocList = document.getElementById('bl-toc-list');
    const tocCard = document.getElementById('bl-toc-card') || document.getElementById('bl-toc-widget');

    if (progressBar && articleContent) {
      window.addEventListener(
        'scroll',
        () => {
          const rect = articleContent.getBoundingClientRect();
          const total = articleContent.offsetHeight - window.innerHeight * 0.5;
          const scrolled = Math.max(0, -rect.top);
          const pct = total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0;
          progressBar.style.width = `${pct}%`;
        },
        { passive: true }
      );
    }

    if (articleContent && tocList && tocCard) {
      const headings = Array.from(articleContent.querySelectorAll('h2, h3'));
      if (headings.length >= 2) {
        tocList.innerHTML = '';
        headings.forEach((h, idx) => {
          if (!h.id) {
            h.id = `section-${idx + 1}`;
          }
          const li = document.createElement('li');
          li.className = `bl-toc-item bl-toc-item--${h.tagName.toLowerCase()}`;
          const a = document.createElement('a');
          a.href = `#${h.id}`;
          a.textContent = h.textContent;
          li.appendChild(a);
          tocList.appendChild(li);
        });
        tocCard.style.display = '';
        tocCard.hidden = false;
      }
    }

    const copyBtn = document.querySelector('[data-copy-link]');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const urlToCopy = copyBtn.getAttribute('data-copy-link') || window.location.href;
        navigator.clipboard.writeText(urlToCopy).then(() => {
          copyBtn.style.borderColor = 'var(--bl-accent)';
          copyBtn.style.color = 'var(--bl-accent-light)';
          setTimeout(() => {
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
          }, 1800);
        });
      });
    }
  }

  /**
   * 10. Main Initialization & Event Delegation
   */
  function init() {
    let currentLang = resolveActiveLanguage();
    let currentPillar = 'all';

    applyTranslations(currentLang);
    initWorkspacesAndSections(currentLang, currentPillar);
    initLiveSearch(() => currentLang);
    initHeroMesh();
    initReadingControls();
    initSinglePostEnhancements();

    // Theme Toggle (`#bl-theme-toggle`)
    const themeToggle = document.getElementById('bl-theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (_) {}
      });
    }

    // Delegated clicks for Language Switchers & Pillar Filters
    document.addEventListener('click', (e) => {
      // 1. Language Switcher (`[data-set-lang]` or `[data-lang-switch]`)
      const langBtn = e.target.closest('[data-set-lang], [data-lang-switch]');
      if (langBtn) {
        e.preventDefault();
        const targetLang = (
          langBtn.getAttribute('data-set-lang') ||
          langBtn.getAttribute('data-lang-switch') ||
          ''
        ).toLowerCase();
        if (SUPPORTED_LANGS.includes(targetLang)) {
          currentLang = targetLang;
          try {
            localStorage.setItem(STORAGE_KEY, currentLang);
          } catch (_) {}

          // If on single article view and switching language, navigate to home with ?lang=xx
          const hasWorkspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').length > 0;
          if (!hasWorkspaces) {
            window.location.href = `/?lang=${currentLang}`;
            return;
          }

          const url = new URL(window.location.href);
          url.searchParams.set('lang', currentLang);
          window.history.replaceState({}, '', url.toString());

          applyTranslations(currentLang);
          initWorkspacesAndSections(currentLang, currentPillar);
        }
        return;
      }

      // 2. Pillar Filter Tabs (`[data-filter-pillar]`, `[data-pillar-link]`, `[data-pillar-filter]`)
      const pillarBtn = e.target.closest('[data-filter-pillar], [data-pillar-link], [data-pillar-filter]');
      if (pillarBtn) {
        const targetPillar =
          pillarBtn.getAttribute('data-filter-pillar') ||
          pillarBtn.getAttribute('data-pillar-link') ||
          pillarBtn.getAttribute('data-pillar-filter') ||
          'all';

        const hasWorkspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').length > 0;
        if (!hasWorkspaces) {
          // On single post page, let link navigate to home and filter
          window.location.href = `/?lang=${currentLang}#pillar-${targetPillar}`;
          return;
        }

        e.preventDefault();
        currentPillar = targetPillar;

        document.querySelectorAll('[data-filter-pillar]').forEach((btn) => {
          btn.classList.toggle('is-active', btn.getAttribute('data-filter-pillar') === currentPillar);
        });
        document.querySelectorAll('.bl-nav-link[data-pillar-link]').forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('data-pillar-link') === currentPillar);
        });
        const homeLink = document.querySelector('.bl-nav-link[data-i18n="nav_home"]');
        if (homeLink) {
          homeLink.classList.toggle('is-active', currentPillar === 'all');
        }

        initWorkspacesAndSections(currentLang, currentPillar);

        if (currentPillar !== 'all') {
          const activeWs = document.querySelector(`.bl-lang-workspace[data-lang-panel="${currentLang}"]`);
          const feedSec = activeWs && activeWs.querySelector('[data-feed-section]');
          if (feedSec) {
            feedSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
