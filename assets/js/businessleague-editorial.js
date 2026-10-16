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
      nav_reports: 'Rapoarte & Whitepapers (PDF)',
      nav_interviews: 'Interviuri & Studii de Caz',
      nav_data: 'Date & Radiografii de Piață',
      nav_playbooks: 'Playbooks & Strategie',
      nav_competition: 'Competiție & Evenimente',
      nav_product: 'Produs & Tech',
      nav_corporate: '2Performant & BVB',
      pillar_all: 'Toate Secțiunile',
      pillar_reports: 'Rapoarte & Whitepapers',
      pillar_data: 'Date & Radiografii de Piață',
      pillar_interviews: 'Interviuri & Studii de Caz',
      pillar_playbooks: 'Playbooks & Strategie',
      pillar_competition: 'Competiție & Evenimente',
      pillar_product: 'Produs & Tech',
      pillar_corporate: '2Performant & BVB',
      sec_reports_eyebrow: 'RAPOARTE DE CATEGORIE & WHITEPAPERS // STUDII PDF COMPLETE',
      sec_reports_title: 'Radiografiile E-Commerce BusinessLeague (PDF)',
      sec_reports_subtitle:
        'Descarcă sau deschide în tab nou rapoartele integrale pe verticale — bazate pe milioane de comenzi reale din ecosistemul BusinessLeague.',
      report_open_pdf: 'Deschide PDF-ul',
      report_read_article: 'Citește sinteza →',
      report_all_data: 'Toate analizele de piață →',
      search_placeholder: 'Caută articole, studii, branduri...',
      search_no_results: 'Niciun articol găsit pentru căutarea ta.',
      search_results_label: 'REZULTATE INSTANT',
      cta_join: 'Intră în Ligă',
      mobile_menu_label: 'Secțiuni',
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
      footer_bl_desc:
        'Primul campionat deschis și descentralizat de performance marketing din lume. Marketerii și magazinele online concurează pe vânzări reale și transparente — într-un ecosistem care funcționează ca o comunitate.',
      footer_2p_desc:
        'BusinessLeague este dezvoltat de 2Performant Network SA — prima companie românească de tehnologie (martech) listată la Bursa de Valori București (BVB: 2P). 17+ ani de inovație în afiliere și e-commerce.',
      footer_hub_cta: 'Explorează Hub-ul Comunității',
      footer_bvb_label: 'Listată pe Bursa de Valori București',
      footer_pillars: 'Piloni Editoriali',
      footer_editions: 'Ediții & Ecosistem',
      footer_col_platform: 'Platformă & 2Performant',
      pulse_sub_kicker: 'THE LEAGUE PULSE • WEEKLY BRIEFING',
      pulse_sub_archive_badge: 'ARHIVA /PULSE ↗',
      pulse_sub_title: 'Abonează-te la The League Pulse',
      pulse_sub_desc: '1 email pe săptămână cu clasamentele live, studii de caz pe cifre reale și mișcările din campionat.',
      pulse_sub_placeholder: 'Adresa ta de email...',
      pulse_sub_btn: 'Abonează-te →',
      pulse_sub_direct_link: 'Abonare directă (#pulse) ↗',
      pulse_sub_archive_link: 'Citește Arhiva /pulse ↗',
      pulse_sub_note: 'Fără spam. Direct pe',
      badge_interviews: 'INTERVIU & STUDIU DE CAZ',
      badge_data: 'DATE & ANALIZĂ PIAȚĂ',
      badge_playbooks: 'PLAYBOOK & STRATEGIE',
      badge_competition: 'COMPETIȚIE & LIGĂ',
      badge_product: 'PRODUS & TECH',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'EDITORIAL',
      load_more_btn: 'Încarcă mai multe articole',
      load_more_loading: 'Se încarcă arhiva...',
      load_more_done: 'Toate articolele au fost încărcate'
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
      nav_reports: 'Reports & Whitepapers (PDF)',
      nav_interviews: 'Interviews & Case Studies',
      nav_data: 'Market Data & Reports',
      nav_playbooks: 'Playbooks & Strategy',
      nav_competition: 'Competition & Events',
      nav_product: 'Product & Tech',
      nav_corporate: '2Performant & IR',
      pillar_all: 'All Sections',
      pillar_reports: 'Reports & Whitepapers',
      pillar_data: 'Market Data & Reports',
      pillar_interviews: 'Interviews & Case Studies',
      pillar_playbooks: 'Playbooks & Strategy',
      pillar_competition: 'Competition & Events',
      pillar_product: 'Product & Tech',
      pillar_corporate: '2Performant & IR',
      sec_reports_eyebrow: 'CATEGORY REPORTS & WHITEPAPERS // FULL PDF STUDIES',
      sec_reports_title: 'BusinessLeague E-Commerce Sector Reports (PDF)',
      sec_reports_subtitle:
        'Open or download the complete vertical whitepapers in a new tab — built on millions of verified e-commerce orders across BusinessLeague.',
      report_open_pdf: 'Open Full PDF',
      report_read_article: 'Read breakdown →',
      report_all_data: 'All market intelligence →',
      search_placeholder: 'Search stories, case studies, brands...',
      search_no_results: 'No matching stories found.',
      search_results_label: 'INSTANT RESULTS',
      cta_join: 'Enter the League',
      mobile_menu_label: 'Sections',
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
      footer_bl_desc:
        'The world’s first open, decentralized performance marketing championship. Marketers and online stores compete on real, transparent sales — inside an ecosystem that operates as a community.',
      footer_2p_desc:
        'BusinessLeague is built by 2Performant Network SA — the first Romanian martech company listed on the Bucharest Stock Exchange (BVB: 2P). 17+ years of affiliate & e-commerce innovation.',
      footer_hub_cta: 'Explore the Community Hub',
      footer_bvb_label: 'Listed on the Bucharest Stock Exchange',
      footer_pillars: 'Editorial Pillars',
      footer_editions: 'Editions & Ecosystem',
      footer_col_platform: 'Platform & 2Performant',
      pulse_sub_kicker: 'THE LEAGUE PULSE • WEEKLY BRIEFING',
      pulse_sub_archive_badge: 'ARCHIVE /PULSE ↗',
      pulse_sub_title: 'Subscribe to The League Pulse',
      pulse_sub_desc: '1 email per week with live championship standings, real-numbers case studies, and key arena moves.',
      pulse_sub_placeholder: 'Your email address...',
      pulse_sub_btn: 'Subscribe →',
      pulse_sub_direct_link: 'Direct subscribe (#pulse) ↗',
      pulse_sub_archive_link: 'Read /pulse Archive ↗',
      pulse_sub_note: 'Zero spam. Powered by',
      badge_interviews: 'INTERVIEW & CASE STUDY',
      badge_data: 'MARKET INTELLIGENCE',
      badge_playbooks: 'GROWTH PLAYBOOK',
      badge_competition: 'COMPETITION & ARENA',
      badge_product: 'PRODUCT & TECH',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'EDITORIAL',
      load_more_btn: 'Load more articles',
      load_more_loading: 'Loading archive...',
      load_more_done: 'All articles loaded'
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
      nav_reports: 'Доклади и Whitepapers (PDF)',
      nav_interviews: 'Интервюта и Казуси',
      nav_data: 'Пазарни Данни',
      nav_playbooks: 'Стратегии и Наръчници',
      nav_competition: 'Състезание и Класации',
      nav_product: 'Продукт и Технологии',
      nav_corporate: '2Performant & BVB',
      pillar_all: 'Всички Секции',
      pillar_reports: 'Доклади и Whitepapers',
      pillar_data: 'Пазарни Данни и Анализи',
      pillar_interviews: 'Интервюта и Казуси',
      pillar_playbooks: 'Стратегии и Наръчници',
      pillar_competition: 'Състезание и Класации',
      pillar_product: 'Продукт и Технологии',
      pillar_corporate: '2Performant & Инвеститори',
      sec_reports_eyebrow: 'СЕКТОРНИ ДОКЛАДИ И WHITEPAPERS // ПЪЛНИ PDF ИЗСЛЕДВАНИЯ',
      sec_reports_title: 'Секторни Доклади за Е-Търговията на BusinessLeague (PDF)',
      sec_reports_subtitle:
        'Отворете в нов таб пълните PDF изследвания по вертикали — базирани на милиони реални поръчки в екосистемата на BusinessLeague.',
      report_open_pdf: 'Отвори PDF доклада',
      report_read_article: 'Прочети анализа →',
      report_all_data: 'Всички пазарни анализи →',
      search_placeholder: 'Търсене на статии, анализи, брандове...',
      search_no_results: 'Няма намерени статии.',
      search_results_label: 'РЕЗУЛТАТИ',
      cta_join: 'Влез в Лигата',
      mobile_menu_label: 'Рубрики',
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
      footer_bl_desc:
        'Първият отворен децентрализиран шампионат по пърформанс маркетинг в света. Маркетолози и онлайн магазини се състезават на база реални и прозрачни продажби.',
      footer_2p_desc:
        'BusinessLeague се разработва от 2Performant Network SA — първата румънска martech компания, листната на Букурещката фондова борса (BVB: 2P).',
      footer_hub_cta: 'Разгледай Общностния Хъб',
      footer_bvb_label: 'Листната на Букурещката фондова борса',
      footer_pillars: 'Редакционни Рубрики',
      footer_editions: 'Издания и Екосистема',
      footer_col_platform: 'Платформа и 2Performant',
      pulse_sub_kicker: 'THE LEAGUE PULSE • СЕДМИЧЕН БЮЛЕТИН',
      pulse_sub_archive_badge: 'АРХИВ /PULSE ↗',
      pulse_sub_title: 'Абонирайте се за The League Pulse',
      pulse_sub_desc: '1 имейл седмично с класации на живо, казуси с реални числа и новини от шампионата.',
      pulse_sub_placeholder: 'Вашият имейл адрес...',
      pulse_sub_btn: 'Абонирай се →',
      pulse_sub_direct_link: 'Директен абонамент (#pulse) ↗',
      pulse_sub_archive_link: 'Виж Архива /pulse ↗',
      pulse_sub_note: 'Без спам. Директно в',
      badge_interviews: 'ИНТЕРВЮ И КАЗУС',
      badge_data: 'ПАЗАРЕН АНАЛИЗ',
      badge_playbooks: 'ПРАКТИЧЕСКИ НАРЪЧНИК',
      badge_competition: 'СЪСТЕЗАНИЕ',
      badge_product: 'ПРОДУКТ И ТЕХНОЛОГИИ',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'РЕДАКЦИОННО',
      load_more_btn: 'Зареди още статии',
      load_more_loading: 'Зареждане на архива...',
      load_more_done: 'Всички статии са заредени'
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
      nav_reports: 'Informes y Whitepapers (PDF)',
      nav_interviews: 'Entrevistas y Casos',
      nav_data: 'Datos y Mercado',
      nav_playbooks: 'Playbooks y Estrategia',
      nav_competition: 'Competición y Eventos',
      nav_product: 'Producto y Tech',
      nav_corporate: '2Performant e IR',
      pillar_all: 'Todas las Secciones',
      pillar_reports: 'Informes y Whitepapers',
      pillar_data: 'Datos y Análisis de Mercado',
      pillar_interviews: 'Entrevistas y Casos de Estudio',
      pillar_playbooks: 'Playbooks y Estrategia',
      pillar_competition: 'Competición y Eventos',
      pillar_product: 'Producto y Tech',
      pillar_corporate: '2Performant e Inversores',
      sec_reports_eyebrow: 'INFORMES DE CATEGORÍA Y WHITEPAPERS // ESTUDIOS PDF COMPLETOS',
      sec_reports_title: 'Radiografías de E-Commerce BusinessLeague (PDF)',
      sec_reports_subtitle:
        'Abre o descarga en una nueva pestaña los informes completos por vertical — basados en millones de pedidos reales en BusinessLeague.',
      report_open_pdf: 'Abrir PDF completo',
      report_read_article: 'Leer resumen →',
      report_all_data: 'Todos los análisis de mercado →',
      search_placeholder: 'Buscar artículos, estudios, marcas...',
      search_no_results: 'No se encontraron artículos.',
      search_results_label: 'RESULTADOS INSTANTÁNEOS',
      cta_join: 'Entrar en la Liga',
      mobile_menu_label: 'Secciones',
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
      footer_bl_desc:
        'El primer campeonato abierto y descentralizado de performance marketing del mundo. Marketers y tiendas online compiten con ventas reales y transparentes.',
      footer_2p_desc:
        'BusinessLeague es desarrollado por 2Performant Network SA — la primera empresa tecnológica (martech) rumana cotizada en la Bolsa de Valores de Bucarest (BVB: 2P).',
      footer_hub_cta: 'Explorar el Community Hub',
      footer_bvb_label: 'Cotizada en la Bolsa de Valores de Bucarest',
      footer_pillars: 'Pilares Editoriales',
      footer_editions: 'Ediciones y Ecosistema',
      footer_col_platform: 'Plataforma y 2Performant',
      pulse_sub_kicker: 'THE LEAGUE PULSE • BOLETÍN SEMANAL',
      pulse_sub_archive_badge: 'ARCHIVO /PULSE ↗',
      pulse_sub_title: 'Suscríbete a The League Pulse',
      pulse_sub_desc: '1 email por semana con clasificaciones en vivo, casos de estudio con cifras reales y novedades de la liga.',
      pulse_sub_placeholder: 'Tu correo electrónico...',
      pulse_sub_btn: 'Suscribirse →',
      pulse_sub_direct_link: 'Suscripción directa (#pulse) ↗',
      pulse_sub_archive_link: 'Leer Archivo /pulse ↗',
      pulse_sub_note: 'Cero spam. Directo en',
      badge_interviews: 'ENTREVISTA Y CASO',
      badge_data: 'ANÁLISIS DE MERCADO',
      badge_playbooks: 'PLAYBOOK Y ESTRATEGIA',
      badge_competition: 'COMPETICIÓN',
      badge_product: 'PRODUCTO Y TECH',
      badge_corporate: '2PERFORMANT & BVB',
      badge_general: 'EDITORIAL',
      load_more_btn: 'Cargar más artículos',
      load_more_loading: 'Cargando archivo...',
      load_more_done: 'Todos los artículos cargados'
    }
  };

  /**
   * 0A. Category Reports & Whitepapers (PDF) Registry
   * Maps all 5 official BusinessLeague category reports with their rendered PDF cover images,
   * direct PDF URLs (RO & EN), key metrics, and sibling article slugs across all 4 languages.
   */
  const CATEGORY_REPORTS = [
    {
      id: 'pharma',
      clusterId: 'cluster-pharma-1-3m-2026',
      dateLabel: 'OCT 2026',
      kicker: {
        ro: 'RAPORT CATEGORIE // PHARMA',
        en: 'SECTOR REPORT // PHARMA',
        bg: 'СЕКТОРЕН ДОКЛАД // ФАРМА',
        es: 'INFORME SECTORIAL // PHARMA'
      },
      title: {
        ro: 'Pharma & Health: 1,31M comenzi unice în 33 de luni',
        en: 'Pharma & Health: 1.31M Unique Orders in 33 Months',
        bg: 'Фарма и Здраве: 1,31 млн. поръчки за 33 месеца',
        es: 'Pharma y Salud: 1,31M de pedidos únicos en 33 meses'
      },
      desc: {
        ro: 'Radiografia completă a categoriei Pharma în BusinessLeague: €38,15M vânzări fără TVA, 29 de farmacii și magazine analizate, sezonalitate și comportament de achiziție.',
        en: 'Complete breakdown of the Pharma vertical in BusinessLeague: €38.15M net sales across 29 stores, conversion benchmarks, and mobile vs. desktop buyer behavior.',
        bg: 'Пълна рентгенова снимка на категория Фарма в BusinessLeague: €38,15 млн. продажби без ДДС, 29 магазина, сезонност и потребителско поведение.',
        es: 'Radiografía completa de la categoría Pharma en BusinessLeague: €38,15M en ventas netas, 29 tiendas analizadas, estacionalidad y conversión.'
      },
      metrics: {
        ro: ['1,31M comenzi', '€38,15M vânzări', '29 magazine'],
        en: ['1.31M orders', '€38.15M sales', '29 stores'],
        bg: ['1,31M поръчки', '€38,15M продажби', '29 магазина'],
        es: ['1,31M pedidos', '€38,15M ventas', '29 tiendas']
      },
      pdf: {
        ro: 'https://blog.businessleague.com/content/files/2026/10/BusinessLeague_Pharma_RO_v6.pdf',
        en: 'https://blog.businessleague.com/content/files/2026/10/BusinessLeague_Pharma_EN_v6.pdf'
      },
      cover: {
        ro: '/assets/images/reports/pharma-ro.webp',
        en: '/assets/images/reports/pharma-en.webp'
      },
      articleSlugs: {
        ro: 'pharma-peste-1-3-milioane-de-comenzi-unice-in-33-de-luni',
        en: 'pharma-over-1-3-million-unique-orders-in-33-months-across-businessleague',
        bg: 'pharma-nad-1-3-miliona-unikalni-porachki-za-33-meseca-v-businessleague-bg',
        es: 'pharma-mas-de-1-3-millones-de-pedidos-unicos-en-33-meses-en-businessleague-es'
      }
    },
    {
      id: 'electronics',
      clusterId: 'cluster-electronics-itc-2026',
      dateLabel: 'SEP 2026',
      kicker: {
        ro: 'RAPORT CATEGORIE // IT&C',
        en: 'SECTOR REPORT // IT&C',
        bg: 'СЕКТОРЕН ДОКЛАД // ЕЛЕКТРОНИКА',
        es: 'INFORME SECTORIAL // IT&C'
      },
      title: {
        ro: 'Electronics & IT&C: 428.184 comenzi și €74,37M vânzări',
        en: 'Electronics & IT&C: 428,184 Orders & €74.37M Sales',
        bg: 'Електроника и IT&C: 428 184 поръчки и €74,37M продажби',
        es: 'Electrónica y TIC: 428.184 pedidos y €74,37M en ventas'
      },
      desc: {
        ro: 'Analiza celor 148 de magazine din categoria Electronics & IT&C: coș mediu de €173,7, evoluția Black Friday și distribuția comenzilor pe subcategorii.',
        en: 'Deep-dive across 148 Electronics & IT&C stores: €173.7 average order value, Black Friday spikes, and conversion patterns across 32 months.',
        bg: 'Анализ на 148 магазина в сектор Електроника и IT&C: средна стойност на поръчката €173,7, Black Friday пикове и конверсии.',
        es: 'Análisis de 148 tiendas de Electrónica y TIC: ticket medio de €173,7, picos de Black Friday y comportamiento de compra en 32 meses.'
      },
      metrics: {
        ro: ['428.184 comenzi', '€74,37M vânzări', '148 magazine'],
        en: ['428,184 orders', '€74.37M sales', '148 stores'],
        bg: ['428 184 поръчки', '€74,37M продажби', '148 магазина'],
        es: ['428.184 pedidos', '€74,37M ventas', '148 tiendas']
      },
      pdf: {
        ro: 'https://blog.businessleague.com/content/files/2026/09/BusinessLeague_Electronics_ITC_RO.pdf',
        en: 'https://blog.businessleague.com/content/files/2026/09/BusinessLeague_Electronics_ITC_EN3.pdf'
      },
      cover: {
        ro: '/assets/images/reports/electronics-ro.webp',
        en: '/assets/images/reports/electronics-en.webp'
      },
      articleSlugs: {
        ro: 'electronics-it-c-428-184-comenzi-unice-in-26-de-luni',
        en: 'electronics-it-c-428-184-unique-orders-across-26-months',
        bg: 'elektronika-i-it-428-184-unikalni-porachki-za-32-meseca-bg',
        es: 'electronica-y-tic-428-184-pedidos-unicos-en-32-meses-es'
      }
    },
    {
      id: 'books',
      clusterId: 'cluster-books-30m-market-2026',
      dateLabel: 'AUG 2026',
      kicker: {
        ro: 'RAPORT CATEGORIE // BOOKS',
        en: 'SECTOR REPORT // BOOKS',
        bg: 'СЕКТОРЕН ДОКЛАД // КНИГИ',
        es: 'INFORME SECTORIAL // LIBROS'
      },
      title: {
        ro: 'Cum se cumpără cărți online: Piață de €29,8M și 1,23M comenzi',
        en: 'How Books Are Bought Online: €29.8M Market & 1.23M Orders',
        bg: 'Как се купуват книги онлайн: Пазар за €29,8M и 1,23M поръчки',
        es: 'Cómo se compran libros online: Mercado de €29,8M y 1,23M pedidos'
      },
      desc: {
        ro: '41,1% dintre comenzile de cărți conțin un singur produs. Radiografia completă a 1.236.336 de comenzi generate pentru 43 de librării online.',
        en: '41.1% of online book orders contain a single item. Complete radiography of 1,236,336 orders across 43 online bookstores in BusinessLeague.',
        bg: '41,1% от онлайн поръчките на книги съдържат един продукт. Пълна рентгенова снимка на 1 236 336 поръчки в 43 онлайн книжарници.',
        es: 'El 41,1% de los pedidos de libros online contiene un solo artículo. Radiografía completa de 1.236.336 pedidos en 43 librerías online.'
      },
      metrics: {
        ro: ['1,24M comenzi', '€29,8M vânzări', '43 librării'],
        en: ['1.24M orders', '€29.8M sales', '43 bookstores'],
        bg: ['1,24M поръчки', '€29,8M продажби', '43 книжарници'],
        es: ['1,24M pedidos', '€29,8M ventas', '43 librerías']
      },
      pdf: {
        ro: 'https://blog.businessleague.com/content/files/2026/08/Cum-se-cumpara-carti-online-2026-1.pdf',
        en: 'https://blog.businessleague.com/content/files/2026/08/How-books-are-bought-online-2026-1.pdf'
      },
      cover: {
        ro: '/assets/images/reports/books-ro.webp',
        en: '/assets/images/reports/books-en.webp'
      },
      articleSlugs: {
        ro: '41-1-dintre-comenzile-de-carti-online-contin-un-singur-produs-cum-arata-radiografia-completa-a-unei-piete-de-30-de-milioane-de-euro',
        en: '41-1-of-online-book-orders-contain-a-single-item-the-complete-breakdown-of-a-eur30-million-market',
        bg: '41-1-ot-onlayn-porachkite-na-knigi-sadarzhat-edin-produkt-palna-rentgenova-snimka-na-pazar-za-30-mln-evro-bg',
        es: 'el-41-1-de-los-pedidos-de-libros-online-contiene-un-solo-articulo-radiografia-de-un-mercado-de-30-millones-de-euros-es'
      }
    },
    {
      id: 'home-garden',
      clusterId: 'cluster-home-garden-84-5-2026',
      dateLabel: 'JUL 2026',
      kicker: {
        ro: 'RAPORT CATEGORIE // HOME & GARDEN',
        en: 'SECTOR REPORT // HOME & GARDEN',
        bg: 'СЕКТОРЕН ДОКЛАД // ДОМ И ГРАДИНА',
        es: 'INFORME SECTORIAL // HOGAR Y JARDÍN'
      },
      title: {
        ro: 'Home & Garden: 84,5% comenzi cu un singur produs (€44,7M)',
        en: 'Home & Garden: 84.5% Single-Item Purchases (€44.7M)',
        bg: 'Дом и Градина: 84,5% поръчки с един продукт (€44,7M)',
        es: 'Hogar y Jardín: 84,5% pedidos de un solo producto (€44,7M)'
      },
      desc: {
        ro: 'Studiu pe 337.834 de comenzi și 229 de magazine Home & Garden: de ce 84,5% dintre achiziții conțin un singur articol și când sunt vârfurile de conversie.',
        en: 'Study across 337,834 orders and 229 Home & Garden stores: why 84.5% of orders are single-item purchases and how seasonality shapes ROAS.',
        bg: 'Изследване върху 337 834 поръчки и 229 магазина за Дом и Градина: защо 84,5% от покупките са с един артикул и кога са пиковете.',
        es: 'Estudio sobre 337.834 pedidos y 229 tiendas de Hogar y Jardín: por qué el 84,5% de las compras son de un solo producto.'
      },
      metrics: {
        ro: ['337.834 comenzi', '€44,7M vânzări', '229 magazine'],
        en: ['337,834 orders', '€44.7M sales', '229 stores'],
        bg: ['337 834 поръчки', '€44,7M продажби', '229 магазина'],
        es: ['337.834 pedidos', '€44,7M ventas', '229 tiendas']
      },
      pdf: {
        ro: 'https://blog.businessleague.com/content/files/2026/07/HG_report_RO--1-.pdf',
        en: 'https://blog.businessleague.com/content/files/2026/07/HG_report_EN--1-.pdf'
      },
      cover: {
        ro: '/assets/images/reports/home-garden-ro.webp',
        en: '/assets/images/reports/home-garden-en.webp'
      },
      articleSlugs: {
        ro: '84-5-din-toate-comenzile-home-garden-sunt-achizitii-cu-un-singur-produs',
        en: '84-5-of-all-home-garden-orders-are-single-product-purchases',
        bg: '84-5-ot-vsichki-porachki-v-home-garden-sa-pokupki-s-edin-produkt-bg',
        es: 'el-84-5-de-todos-los-pedidos-de-hogar-y-jardin-son-compras-de-un-solo-producto-es'
      }
    },
    {
      id: 'fashion',
      clusterId: 'cluster-iphone-fashion-24-2026',
      dateLabel: 'JUN 2026',
      kicker: {
        ro: 'RAPORT CATEGORIE // FASHION',
        en: 'SECTOR REPORT // FASHION',
        bg: 'СЕКТОРЕН ДОКЛАД // МОДА',
        es: 'INFORME SECTORIAL // MODA'
      },
      title: {
        ro: 'Fashion Buying Report: Utilizatorii iPhone cheltuie cu 24% mai mult',
        en: 'Fashion Buying Report: iPhone Users Spend 24% More',
        bg: 'Fashion Buying Report: Потребителите на iPhone харчат с 24% повече',
        es: 'Fashion Buying Report: Los usuarios de iPhone gastan un 24% más'
      },
      desc: {
        ro: '25,1 milioane de click-uri, €49,9M vânzări și 186 de magazine Fashion analizate: diferențe iOS vs. Android, ore de vârf și rata de conversie.',
        en: '25.1 million clicks, €49.9M in sales, and 186 Fashion stores analyzed: iOS vs. Android AOV gaps, peak shopping hours, and conversion benchmarks.',
        bg: '25,1 милиона клика, €49,9M продажби и 186 модни магазина: разлики между iOS и Android, пикови часове и конверсии.',
        es: '25,1 millones de clics, €49,9M en ventas y 186 tiendas de moda analizadas: brecha entre iOS y Android, horas punta y conversión.'
      },
      metrics: {
        ro: ['25,1M click-uri', '€49,9M vânzări', '186 magazine'],
        en: ['25.1M clicks', '€49.9M sales', '186 stores'],
        bg: ['25,1M клика', '€49,9M продажби', '186 магазина'],
        es: ['25,1M clics', '€49,9M ventas', '186 tiendas']
      },
      pdf: {
        ro: 'https://blog.businessleague.com/content/files/2026/06/BusinessLeague_Fashion_Buying_Report_EN-1.pdf',
        en: 'https://blog.businessleague.com/content/files/2026/06/BusinessLeague_Fashion_Buying_Report_EN-1.pdf'
      },
      cover: {
        ro: '/assets/images/reports/fashion-en.webp',
        en: '/assets/images/reports/fashion-en.webp'
      },
      articleSlugs: {
        ro: 'userii-de-iphone-cheltuie-cu-24-mai-mult-pe-fashion-si-alte-5-lucruri-pe-care-ni-le-spun-datele',
        en: 'iphone-users-spend-24-more-on-fashion-plus-5-other-things-the-data-is-telling-us',
        bg: 'potrebitelite-na-iphone-harchat-s-24-poveche-za-moda-i-oshte-5-neshta-koito-dannite-ni-kazvat-bg',
        es: 'los-usuarios-de-iphone-gastan-un-24-mas-en-moda-y-otras-5-cosas-que-nos-dicen-los-datos-es'
      }
    }
  ];

  /**
   * 0. Canonical Cross-Language Article Translation Map (RO <-> EN <-> BG <-> ES)
   * Maps every translated article slug to its exact language equivalents.
   * Also merges with `window.__BL_TRANSLATIONS__` if injected via Ghost Code Injection.
   */
  const TRANSLATION_CLUSTERS = [
    {
      id: 'cluster-apiland-2026',
      pillar: 'interviews',
      ro: 'georgiana-irimus-apiland-ro-pregatim-reduceri-de-black-friday-dar-aniversarea-apiland-ramane-momentul-nostru-special-din-an',
      en: 'georgiana-irimus-apiland-ro-were-preparing-black-friday-discounts-but-the-apiland-anniversary-remains-our-special-moment-of-the-year',
      bg: 'georgiana-irimus-apiland-ro-podgotvyame-namaleniya-za-black-friday-no-godishninata-na-apiland-ostava-nashiyat-specialen-moment-bg',
      es: 'georgiana-irimus-apiland-ro-preparamos-descuentos-de-black-friday-pero-el-aniversario-de-apiland-sigue-siendo-nuestro-momento-especial-es'
    },
    {
      id: 'cluster-sept-champions-2026',
      pillar: 'competition',
      ro: 'anuntam-campionii-afiliati-si-castigatorii-bonusurilor-din-septembrie',
      en: 'announcing-our-september-affiliate-champions-incentive-winners',
      bg: 'obyavyavame-nashite-afilieyt-shampioni-i-pechelivshi-ot-bonusite-prez-septemvri-bg',
      es: 'anunciamos-nuestros-campeones-afiliados-y-ganadores-de-incentivos-de-septiembre-es'
    },
    {
      id: 'cluster-pharma-1-3m-2026',
      pillar: 'data',
      ro: 'pharma-peste-1-3-milioane-de-comenzi-unice-in-33-de-luni',
      en: 'pharma-over-1-3-million-unique-orders-in-33-months-across-businessleague',
      bg: 'pharma-nad-1-3-miliona-unikalni-porachki-za-33-meseca-v-businessleague-bg',
      es: 'pharma-mas-de-1-3-millones-de-pedidos-unicos-en-33-meses-en-businessleague-es'
    },
    {
      id: 'cluster-agrafa-2026',
      pillar: 'interviews',
      ro: 'agrafa-de-la-cani-la-banere-intr-o-casa-cu-multe-camere',
      en: 'agrafa-from-mugs-to-banners-in-a-house-with-lots-of-rooms',
      bg: 'agrafa-ot-chashi-do-baneri-v-kashta-s-mnogo-stai-bg',
      es: 'agrafa-de-tazas-a-banners-en-una-casa-con-muchas-habitaciones-es'
    },
    {
      id: 'cluster-3-shops-commissions-2026',
      pillar: 'competition',
      ro: '3-magazine-cresc-comisioanele-si-si-cauta-campionii-afiliati',
      en: '3-shops-raise-their-commissions-and-look-for-their-affiliate-champions',
      bg: '3-magazina-uvellichavat-komisionite-si-i-tarsyat-svoite-afilieyt-shampioni-bg',
      es: '3-tiendas-aumentan-sus-comisiones-y-buscan-a-sus-campeones-afiliados-es'
    },
    {
      id: 'cluster-bucuresti-dublin-meetups-2026',
      pillar: 'corporate',
      ro: 'bucuresti-si-dublin-doua-meetup-uri-doua-baruri-pline',
      en: 'bucuresti-and-dublin-two-meetups-two-full-house-bars',
      bg: 'bukuresht-i-dablin-dve-sreshti-dva-palni-bara-bg',
      es: 'bucarest-y-dublin-dos-meetups-dos-bares-llenos-es'
    },
    {
      id: 'cluster-electronics-itc-2026',
      pillar: 'data',
      ro: 'electronics-it-c-428-184-comenzi-unice-in-26-de-luni',
      en: 'electronics-it-c-428-184-unique-orders-across-26-months',
      bg: 'elektronika-i-it-428-184-unikalni-porachki-za-32-meseca-bg',
      es: 'electronica-y-tic-428-184-pedidos-unicos-en-32-meses-es'
    },
    {
      id: 'cluster-break-week-hackathon-2026',
      pillar: 'product',
      ro: 'pauza-competitionala-si-vacanta-s-au-terminat',
      en: 'the-competition-break-and-summer-holidays-are-over',
      bg: 'sastezatelnata-pauza-i-lyatnata-vakanciya-priklyuchiha-bg',
      es: 'la-pausa-competitiva-y-las-vacaciones-de-verano-han-terminado-es'
    },
    {
      id: 'cluster-books-and-people-2026',
      pillar: 'playbooks',
      ro: 'cartile-si-oamenii-care-le-vand-in-businessleague-si-in-afara-sa',
      en: 'books-and-the-people-who-sell-them-in-businessleague-and-beyond',
      bg: 'knigite-i-horata-koito-gi-prodavat-v-businessleague-i-izvan-neya-bg',
      es: 'los-libros-y-las-personas-que-los-venden-en-businessleague-y-fuera-de-ella-es'
    },
    {
      id: 'cluster-books-30m-market-2026',
      pillar: 'data',
      ro: '41-1-dintre-comenzile-de-carti-online-contin-un-singur-produs-cum-arata-radiografia-completa-a-unei-piete-de-30-de-milioane-de-euro',
      en: '41-1-of-online-book-orders-contain-a-single-item-the-complete-breakdown-of-a-eur30-million-market',
      bg: '41-1-ot-onlayn-porachkite-na-knigi-sadarzhat-edin-produkt-palna-rentgenova-snimka-na-pazar-za-30-mln-evro-bg',
      es: 'el-41-1-de-los-pedidos-de-libros-online-contiene-un-solo-articulo-radiografia-de-un-mercado-de-30-millones-de-euros-es'
    },
    {
      id: 'cluster-adrian-popa-paahome-2026',
      pillar: 'interviews',
      ro: 'adrian-popa-paa-home-ro-peste-90-dintre-comenzile-de-pe-site-vin-prin-afiliere',
      en: 'adrian-popa-paa-home-ro-relative-to-the-companys-total-sales-approximately-23-come-from-affiliate-marketing',
      bg: 'adrian-popa-paa-home-ro-nad-90-ot-porachkite-na-sayta-idvat-chrez-afilieyt-marketing-bg',
      es: 'adrian-popa-paa-home-ro-mas-del-90-de-los-pedidos-en-la-web-llegan-a-traves-del-marketing-de-afiliacion-es'
    },
    {
      id: 'cluster-elena-turcu-2026',
      pillar: 'interviews',
      ro: 'elena-turcu-afilierea-devine-simpla-numai-dupa-ce',
      en: 'elena-turcu-affiliate-marketing-only-becomes-simple-once-you-learn-and-invest',
      bg: 'elena-turcu-afilieyt-marketingat-stava-prost-edva-sled-kato-nauchish-i-investirash-bg',
      es: 'elena-turcu-el-marketing-de-afiliacion-solo-se-vuelve-sencillo-cuando-aprendes-e-inviertes-es'
    },
    {
      id: 'cluster-home-garden-84-5-2026',
      pillar: 'data',
      ro: '84-5-din-toate-comenzile-home-garden-sunt-achizitii-cu-un-singur-produs',
      en: '84-5-of-all-home-garden-orders-are-single-product-purchases',
      bg: '84-5-ot-vsichki-porachki-v-home-garden-sa-pokupki-s-edin-produkt-bg',
      es: 'el-84-5-de-todos-los-pedidos-de-hogar-y-jardin-son-compras-de-un-solo-producto-es'
    },
    {
      id: 'cluster-iphone-fashion-24-2026',
      pillar: 'data',
      ro: 'userii-de-iphone-cheltuie-cu-24-mai-mult-pe-fashion-si-alte-5-lucruri-pe-care-ni-le-spun-datele',
      en: 'iphone-users-spend-24-more-on-fashion-plus-5-other-things-the-data-is-telling-us',
      bg: 'potrebitelite-na-iphone-harchat-s-24-poveche-za-moda-i-oshte-5-neshta-koito-dannite-ni-kazvat-bg',
      es: 'los-usuarios-de-iphone-gastan-un-24-mas-en-moda-y-otras-5-cosas-que-nos-dicen-los-datos-es'
    },
    {
      id: 'cluster-retargeting-cpa-2026',
      pillar: 'playbooks',
      ro: 'retargetingul-afiliat-functioneaza-pe-model-cpa-magazinul-plateste-doar-la-vanzare-validata',
      en: 'affiliate-retargeting-works-on-a-cpa-model-merchants-only-pay-for-validated-sales',
      bg: 'afilieyt-retargetingat-raboti-po-cpa-model-magazinat-plashta-samo-pri-validirana-prodazhba-bg',
      es: 'el-retargeting-de-afiliacion-funciona-bajo-modelo-cpa-la-tienda-paga-solo-por-venta-validada-es'
    },
    {
      id: 'cluster-dorin-capital-increase-2026',
      pillar: 'corporate',
      ro: 'mesaj-de-la-dorin-boerescu-ceo-2performant-despre-majorarea-de-capital-si-planurile-companiei',
      en: 'message-from-dorin-boerescu-ceo-2performant-on-the-share-capital-increase-and-company-plans',
      bg: 'saobshtenie-ot-dorin-boerescu-ceo-2performant-za-uvelichenieto-na-kapitala-i-planovete-na-kompaniyata-bg',
      es: 'mensaje-de-dorin-boerescu-ceo-de-2performant-sobre-la-ampliacion-de-capital-y-los-planes-de-la-compania-es'
    },
    {
      id: 'cluster-alexandra-gogalniceanu-2026',
      pillar: 'interviews',
      ro: 'alexandra-gogalniceanu-bigger-picture-solutions-rankingul-dintre-afiliati-ne-ambitioneaza-si-ne-face-sa-ne-dam-si-mai-mult-silinta',
      en: 'alexandra-gogalniceanu-bigger-picture-solutions-the-affiliates-ranking-motivates-even-more-to-generate-sales',
      bg: 'alexandra-gogalniceanu-bigger-picture-solutions-klasiraneto-na-afilieitite-ni-motivira-bg',
      es: 'alexandra-gogalniceanu-bigger-picture-solutions-el-ranking-de-afiliados-nos-motiva-a-vender-mas-es'
    },
    {
      id: 'cluster-alin-vlad-otter-2026',
      pillar: 'interviews',
      ro: 'alin-vlad-e-commerce-director-otter-cine-se-supara-pe-retea-pentru-overlap-se-supara-si-pe-matematica',
      en: 'alin-vlad-e-commerce-director-otter-anyone-who-blames-the-network-for-overlap-is-also-blaming-maths',
      bg: 'alin-vlad-e-commerce-director-otter-koyto-se-sardi-na-mrezhata-za-overlap-se-sardi-na-matematikata-bg',
      es: 'alin-vlad-e-commerce-director-otter-quien-culpa-a-la-red-por-el-overlap-culpa-a-las-matematicas-es'
    },
    {
      id: 'cluster-madalina-alupei-shopilo-2026',
      pillar: 'interviews',
      ro: 'madalina-alupei-shopilo-in-romania-procesul-de-maturizare-al-afilierii-se-va-intampla-mai-repede-decat-a-durat-in-vest',
      en: 'madalina-alupei-shopilo-in-romania-the-maturation-of-affiliate-marketing-will-happen-faster-than-it-took-in-the-west',
      bg: 'madalina-alupei-shopilo-v-rumaniya-uzryavaneto-na-afilieyt-marketinga-shte-se-sluchi-po-barzo-bg',
      es: 'madalina-alupei-shopilo-en-rumania-la-maduracion-del-marketing-de-afiliacion-sera-mas-rapida-es'
    },
    {
      id: 'cluster-commercial-adjustments-july-2026',
      pillar: 'corporate',
      ro: 'ajustari-comerciale-de-la-1-iulie-2026',
      en: 'commercial-adjustments-from-july-1st-2026',
      bg: 'targovski-promeni-ot-1-yuli-2026-bg',
      es: 'ajustes-comerciales-desde-el-1-de-julio-de-2026-es'
    },
    {
      id: 'cluster-vladimir-rusu-gsmnet-2026',
      pillar: 'interviews',
      ro: 'vladimir-rusu-am-pornit-de-la-1100-de-conversii-in-februarie-si-am-ajuns-la-aproape-2500-in-aprilie',
      en: 'vladimir-rusu-gsmnet-ro-we-started-at-1100-sales-in-february-and-got-to-2500-in-april',
      bg: 'vladimir-rusu-gsmnet-ro-zapochnahme-ot-1100-prodazhbi-prez-fevruari-i-stignahme-do-2500-prez-april-bg',
      es: 'vladimir-rusu-gsmnet-ro-empezamos-con-1100-ventas-en-febrero-y-llegamos-a-2500-en-abril-es'
    },
    {
      id: 'cluster-mugur-ifrim-klikads-2026',
      pillar: 'interviews',
      ro: 'mugur-ifrim-klikads-ro-businessleague-e-singurul-loc-in-care-performance-marketing-ul-devine-sport-cu-clasament-premii-si-adrenalina-reala',
      en: 'mugur-ifrim-klikads-ro-businessleague-is-the-only-place-where-performance-marketing-becomes-a-sport-with-rankings-prizes-and-real-adrenaline',
      bg: 'mugur-ifrim-klikads-ro-businessleague-e-edinstvenoto-myasto-kadeto-performance-marketingat-se-prevrashta-v-sport-bg',
      es: 'mugur-ifrim-klikads-ro-businessleague-es-el-unico-lugar-donde-el-performance-marketing-se-convierte-en-un-deporte-es'
    },
    {
      id: 'cluster-ligia-rosu-drmax-2026',
      pillar: 'interviews',
      ro: 'ligia-rosu-dr-max-avem-un-parteneriat-de-aproape-5-ani-cu-2performant-si-inca-invatam-unii-de-la-altii-cum-sa-optimizam-fiecare-click-din-retea',
      en: 'ligia-rosu-dr-max-weve-had-a-partnership-of-almost-5-years-with-2performant-and-were-still-learning-from-each-other-how-to-optimize-every-click-in-the-network',
      bg: 'ligia-rosu-dr-max-imame-pochti-5-godishno-partnyorstvo-s-2performant-i-vse-oshte-se-uchim-kak-da-optimizirame-vseki-klik-bg',
      es: 'ligia-rosu-dr-max-tenemos-una-colaboracion-de-casi-5-anos-con-2performant-y-seguimos-aprendiendo-a-optimizar-cada-clic-es'
    },
    {
      id: 'cluster-stefan-mogyorosi-nailshop-2026',
      pillar: 'interviews',
      ro: 'stefan-mogyorosi-nailshop-ro-pentru-noi-afilierea-livreaza-din-ce-in-ce-mai-bine-fata-de-celelalte-canale-de-vanzare',
      en: 'stefan-mogyorosi-nailshop-ro-for-us-affiliate-marketing-delivers-better-and-better-compared-to-other-sales-channels',
      bg: 'stefan-mogyorosi-nailshop-ro-za-nas-afilieyt-marketingat-nosi-vse-po-dobri-rezultati-spryamo-ostanalite-kanali-bg',
      es: 'stefan-mogyorosi-nailshop-ro-para-nosotros-el-marketing-de-afiliacion-rinde-cada-vez-mejor-frente-a-otros-canales-es'
    },
    {
      id: 'cluster-dont-blame-commission-2026',
      pillar: 'playbooks',
      ro: 'nu-da-vina-pe-comision-mereu',
      en: 'dont-blame-it-on-the-commission',
      bg: 'ne-obvinyavayte-vinagi-komisionata-bg',
      es: 'no-culpes-siempre-a-la-comision-es'
    },
    {
      id: 'cluster-myth-or-reality-2026',
      pillar: 'playbooks',
      ro: 'mit-sau-realitate-un-program-de-afiliere-il-pornesti-o-data-si-l-lasi-sa-si-faca-treaba',
      en: 'myth-or-reality-you-launch-an-affiliate-program-and-let-it-do-its-thing-for-month',
      bg: 'mit-ili-realnost-puskash-afilieyt-programa-vednazh-i-ya-ostavyash-sama-da-si-varshi-rabotata-bg',
      es: 'mito-o-realidad-lanzas-un-programa-de-afiliacion-una-vez-y-dejas-que-funcione-solo-es'
    },
    {
      id: 'cluster-bogdan-arhip-viardigital-2026',
      pillar: 'interviews',
      ro: 'bogdan-arhip-viardigital-multe-magazine-nu-inteleg-ca-platesc-doar-pentru-rezultate-concrete-adica-pentru-vanzari-efectiv-realizate',
      en: 'bogdan-arhip-viardigital-many-stores-dont-understand-that-they-only-pay-for-concrete-results-meaning-actual-sales-generated',
      bg: 'bogdan-arhip-viardigital-mnogo-magazini-ne-razbirat-che-plashtat-samo-za-konkretni-rezultati-realno-generirani-prodazhbi-bg',
      es: 'bogdan-arhip-viardigital-muchas-tiendas-no-entienden-que-solo-pagan-por-resultados-concretos-ventas-realmente-generadas-es'
    },
    {
      id: 'cluster-bogdana-manolescu-fashiondays-2026',
      pillar: 'interviews',
      ro: 'bogdana-manolescu-fashiondays-ro-afiliatii-livreaza-constant-sunt-o-parte-esentiala-din-succesul-nostru',
      en: 'bogdana-manolescu-fashiondays-ro-affiliates-deliver-consistently-they-are-an-essential-part-of-our-success'
    },
    {
      id: 'cluster-shopify-app-store-2026',
      pillar: 'product',
      ro: 'shopify-x-businessleague-acum-disponibili-in-shopify-app-store',
      en: 'shopify-meets-businessleague-risk-free-growth-is-just-a-click-away'
    },
    {
      id: 'cluster-profitshare-acquisition-2025',
      pillar: 'corporate',
      ro: 'its-done-2performant-semneaza-contractul-final-pentru-achizitia-profitshare-romania-si-bulgaria',
      en: '2performant-signs-final-contract-for-the-acquisition-of-profitshare-romania-and-bulgaria',
      bg: '2performant-signs-final-contract-for-the-acquisition-of-profitshare-romania-and-bulgaria-bg'
    },
    {
      id: 'cluster-product-feed-5-things-2026',
      pillar: 'playbooks',
      ro: '5-lucruri-pe-care-fiecare-magazin-online-trebuie-sa-le-verifice-azi-in-feed-ul-de-produse',
      en: '5-things-every-e-commerce-store-needs-to-check-today-in-their-affiliate-product-feed',
      bg: '5-neshta-koito-vseki-onlayn-magazin-tryabva-da-proveri-dnes-v-produktoviya-si-fiyd-bg',
      es: '5-cosas-que-toda-tienda-online-debe-revisar-hoy-en-su-feed-de-productos-de-afiliacion-es'
    },
    {
      id: 'cluster-gabriel-bonciu-search-traffic-2026',
      pillar: 'interviews',
      ro: 'gabriel-bonciu-bizdev-director-2performant-traficul-de-search-cu-intentie-ridicata-devine-din-nou-mai-puternic',
      en: 'gabriel-bonciu-bizdev-director-2performant-high-intent-search-traffic-is-becoming-relatively-stronger-again',
      bg: 'gabriel-bonciu-bizdev-director-2performant-search-trafikat-s-visoko-namerenie-otnovo-stava-po-silen-bg',
      es: 'gabriel-bonciu-bizdev-director-2performant-el-trafico-de-busqueda-de-alta-intencion-vuelve-a-ganar-fuerza-es'
    },
    {
      id: 'cluster-kristyna-grobnerova-selltoro-2026',
      pillar: 'interviews',
      ro: 'kristyna-grobnerova-selltoro-valoarea-vanzarilor-generate-in-aprilie-a-depasit-60-500-eur-in-businessleague',
      en: 'kristyna-grobnerova-selltoro-our-generated-sales-value-has-crossed-eur60-500-in-businessleague',
      bg: 'kristyna-grobnerova-selltoro-generiranite-ot-nas-prodazhbi-prez-april-nadminaha-60-500-eur-v-businessleague-bg',
      es: 'kristyna-grobnerova-selltoro-el-valor-de-nuestras-ventas-generadas-en-abril-supero-los-60-500-eur-en-businessleague-es'
    },
    {
      id: 'cluster-nimanka-perera-delupe-2026',
      pillar: 'interviews',
      ro: 'nimanka-perera-delupe-businessleague-este-cu-adevarat-un-ecosistem-profesionist-care-le-permite-magazinelor-sa-se-conecteze-si-sa-vanda',
      en: 'nimanka-perera-delupe-businessleague-is-truly-a-professional-ecosystem-that-enables-shops-to-connect-and-make-sales',
      bg: 'nimanka-perera-delupe-businessleague-e-istinski-profesionalna-ekosistema-koyato-pozvolyava-na-magazinite-da-prodavat-bg',
      es: 'nimanka-perera-delupe-businessleague-es-realmente-un-ecosistema-profesional-que-permite-a-las-tiendas-conectarse-y-vender-es'
    }
  ];

  const SLUG_TO_CLUSTER_MAP = {};
  TRANSLATION_CLUSTERS.forEach((cluster) => {
    SUPPORTED_LANGS.forEach((lang) => {
      if (cluster[lang]) {
        SLUG_TO_CLUSTER_MAP[cluster[lang]] = cluster;
      }
    });
  });

  function getTranslationSiblings(slug) {
    if (!slug) return null;
    const clean = String(slug).replace(/^\/+|\/+$/g, '').trim();
    if (window.__BL_TRANSLATIONS__ && window.__BL_TRANSLATIONS__[clean]) {
      return window.__BL_TRANSLATIONS__[clean];
    }
    return SLUG_TO_CLUSTER_MAP[clean] || null;
  }

  /**
   * 1. Resolve Active Language
   */
  function resolveActiveLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get('lang') || '').toLowerCase();
    if (SUPPORTED_LANGS.includes(urlLang)) {
      try {
        localStorage.setItem(STORAGE_KEY, urlLang);
        localStorage.setItem('bl_lang', urlLang);
      } catch (_) {}
      return urlLang;
    }

    const pathMatch = window.location.pathname.match(/^\/tag\/(ro|en|bg|es)(\/|$)/i);
    if (pathMatch) {
      const pathLang = pathMatch[1].toLowerCase();
      if (SUPPORTED_LANGS.includes(pathLang)) {
        try {
          localStorage.setItem(STORAGE_KEY, pathLang);
          localStorage.setItem('bl_lang', pathLang);
        } catch (_) {}
        return pathLang;
      }
    }

    const articleEl = document.querySelector('.bl-article-shell[data-post-tags], .bl-article-shell[data-post-slug]');
    if (articleEl) {
      const explicitLang = (articleEl.getAttribute('data-post-lang') || '').toLowerCase();
      if (SUPPORTED_LANGS.includes(explicitLang)) {
        return explicitLang;
      }
      const tags = (articleEl.getAttribute('data-post-tags') || '')
        .toLowerCase()
        .split(',')
        .map((t) => t.trim());
      if (tags.includes('en') || tags.includes('hash-en')) return 'en';
      if (tags.includes('bg') || tags.includes('hash-bg')) return 'bg';
      if (tags.includes('es') || tags.includes('hash-es')) return 'es';
      return 'ro';
    }

    try {
      const saved = (localStorage.getItem(STORAGE_KEY) || localStorage.getItem('bl_lang') || '').toLowerCase();
      if (SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (_) {}

    const activeAttr = (
      document.documentElement.getAttribute('data-active-lang') ||
      document.documentElement.getAttribute('data-bl-lang') ||
      ''
    ).toLowerCase();
    if (SUPPORTED_LANGS.includes(activeAttr)) {
      return activeAttr;
    }

    return 'ro';
  }

  /**
   * 2. Editorial Pillar Classifier (RO / EN / BG / ES)
   */
  function classifyPillar(title, tagsCsv, excerpt, slug) {
    if (slug) {
      const siblingCluster = getTranslationSiblings(slug);
      if (siblingCluster && siblingCluster.pillar) {
        return siblingCluster.pillar;
      }
    }

    const hay = `${title || ''} ${tagsCsv || ''} ${excerpt || ''}`.toLowerCase();

    if (
      /interviu|interview|интервю|entrevista|poveste|story|journey|podcast|conversa|dialog|cum a |how .* built|lessons from|sfaturi de la|secrets of|unicorn|top affiliate|top advertiser|brandului|fondator|ceo|specialist|marketerul|câștigător|castigator|winner|как |историята на|georgiana irimus|agrafa|adrian popa|elena turcu|alexandra gogalniceanu|alin vlad|madalina alupei|vladimir rusu|mugur ifrim|ligia rosu|stefan mogyorosi|bogdan arhip|bogdana manolescu/.test(
        hay
      )
    ) {
      return 'interviews';
    }

    if (
      /analiz|analysis|анализ|análisis|radiograf|рентгенова|market|piaț|piat|пазар|mercado|studiu|study|statistic|report|raport|sector|vertical|fashion|moda|мода|beauty|pharma|фарма|home & garden|home and garden|hogar y jardín|electro|електроника|electrónica|it&c|baby|toys|books|cărți|книги|libros|food|automotive|pet|trend|evoluți|evoluti|cifre|numbers|benchmark|insight|whitepaper|cât s-a|cat s-a|milioane de comenzi|million unique orders|милиона уникални поръчки|millones de pedidos|428\.184|428,184|84\.5%|84,5%|41\.1%|41,1%|iphone/.test(
        hay
      )
    ) {
      return 'data';
    }

    if (
      /bvb|burs|invest|acționar|actionar|aga|raport financiar|financial|2performant|echipa|team|aniversare|anniversary|corporate|listare|acțiuni|actiuni|shares|capital|ampliación de capital|увеличението на капитала|profitshare|meetup|dublin|дъблин|dublín/.test(
        hay
      )
    ) {
      return 'corporate';
    }

    if (
      /feature|update|lansare|launch|release|platform|tool|api|tracking|atribuire|attribution|feed|plugin|dashboard|automatiz|ai |product|produs|funcționalit|functionalit|b2b|account|upgrade|платформа|функционалност|shopify|hackathon|pauza competițională|competition break|състезателната пауза|pausa competitiva/.test(
        hay
      )
    ) {
      return 'product';
    }

    if (
      /challenge|clasament|ranking|leaderboard|câștig|castig|premii|prizes|campionat|championship|campeones|шампиони|cupa|cup|black friday|bf |round|etapa|top 10|top 5|record|sprint|maraton|marathon|liga|league|състезание|класация|шампионат|черен петък|пролетни|cresc comisioanele|raise their commissions|увеличават комисионите|aumentan sus comisiones|septembrie|september|септември|septiembre/.test(
        hay
      )
    ) {
      return 'competition';
    }

    if (
      /google ads|facebook ads|tiktok|seo|ppc|ghid|guide|playbook|strateg|conversi|conversion|roas|traffic|trafic|optimiz|tips|sfaturi|cum să|cum sa|how to|tutorial|audit|landing page|shopping ads|keywords|campanii|campaigns|promovare|vânzări|vanzari|sales|трафик|кампании|продажби|ъпгрейд|retargeting|cpa/.test(
        hay
      )
    ) {
      return 'playbooks';
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
    const postSlug = cardEl.getAttribute('data-post-slug') || '';

    let pillar = cardEl.getAttribute('data-pillar');
    if (!pillar || pillar === 'auto') {
      pillar = classifyPillar(
        titleEl ? titleEl.textContent : '',
        tagsCsv,
        excerptEl ? excerptEl.textContent : '',
        postSlug
      );
      cardEl.setAttribute('data-pillar', pillar);
    }

    const badgeKey = `badge_${pillar}`;
    const pillarLabel = dict[badgeKey] || dict.badge_general;

    cardEl.querySelectorAll('[data-pillar-badge], [data-card-badge]').forEach((badge) => {
      badge.setAttribute('data-pillar-type', pillar);
      badge.textContent = pillarLabel;
      if (badge.tagName === 'A' || badge.hasAttribute('data-pillar-link')) {
        badge.setAttribute('data-pillar-link', pillar);
        if (badge.tagName === 'A') {
          badge.setAttribute('href', `/?lang=${lang}#pillar-${pillar}`);
        }
      }
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
    document.documentElement.setAttribute('data-bl-lang', lang);
    document.documentElement.setAttribute('data-active-lang', lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('bl_lang', lang);
    } catch (_) {}

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
      if (btn.tagName === 'BUTTON' || btn.getAttribute('role') === 'button') {
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      } else {
        btn.removeAttribute('aria-pressed');
        if (isActive) {
          btn.setAttribute('aria-current', 'true');
        } else {
          btn.removeAttribute('aria-current');
        }
      }
    });

    document.querySelectorAll('[data-article-lang]').forEach((pill) => {
      const pillLang = pill.getAttribute('data-article-lang');
      pill.classList.toggle('is-active', pillLang === lang);
    });

    document.querySelectorAll('.bl-breadcrumbs a[data-i18n="breadcrumb_home"]').forEach((homeCrumb) => {
      homeCrumb.setAttribute('href', `/?lang=${lang}`);
    });

    document.querySelectorAll('.bl-breadcrumbs a[data-pillar-badge]').forEach((badgeCrumb) => {
      const p =
        badgeCrumb.getAttribute('data-pillar-type') ||
        badgeCrumb.getAttribute('data-pillar-link') ||
        'all';
      badgeCrumb.setAttribute('data-pillar-link', p);
      badgeCrumb.setAttribute('href', `/?lang=${lang}#pillar-${p}`);
      if (dict[`badge_${p}`]) {
        badgeCrumb.textContent = dict[`badge_${p}`];
      }
    });
  }

  /**
   * 4B. 12-Column Auto-Balancing Engine (Real Article Cards Only — Zero Fake Promo Fillers)
   * Ensures ZERO empty spaces in any row across Home, Category Filter, Language, and Single Post views
   * by expanding the real article cards on any partial row to span the full 12 columns.
   */
  function balanceAllGridRows(root) {
    const scope = root || document;

    // Remove any legacy generated filler cards if present
    scope
      .querySelectorAll('.bl-grid-filler-card, [data-generated-filler="true"]')
      .forEach((el) => el.remove());

    // 1. Balance Bento Data Grids (.bl-bento-data-grid) using only real article cards
    scope.querySelectorAll('.bl-bento-data-grid').forEach((bento) => {
      const stack = bento.querySelector('.bl-bento-stack');
      if (!stack) {
        bento.setAttribute('data-bento-single', 'true');
        return;
      }
      const visibleStackItems = Array.from(stack.children).filter(
        (el) => el.style.display !== 'none' && !el.hidden
      );
      if (visibleStackItems.length === 0) {
        bento.setAttribute('data-bento-single', 'true');
        stack.style.display = 'none';
      } else {
        bento.removeAttribute('data-bento-single');
        stack.style.display = '';
      }
    });

    // 2. Balance all 12-column grids (.bl-hero-subgrid, .bl-grid-2, .bl-grid-3, .bl-grid-4, .bl-related-grid, .bl-masonry-grid)
    const gridConfigs = [
      { selector: '.bl-hero-subgrid', cols: 2, defaultSpan: 6 },
      { selector: '.bl-grid-2', cols: 2, defaultSpan: 6 },
      { selector: '.bl-grid-3', cols: 3, defaultSpan: 4 },
      { selector: '.bl-grid-4', cols: 4, defaultSpan: 3 },
      { selector: '.bl-related-grid', cols: 4, defaultSpan: 3 },
      { selector: '.bl-masonry-grid', cols: 3, defaultSpan: 4 }
    ];

    gridConfigs.forEach(({ selector, cols, defaultSpan }) => {
      scope.querySelectorAll(selector).forEach((grid) => {
        const visibleCards = Array.from(grid.children).filter(
          (el) => el.style.display !== 'none' && !el.hidden
        );

        visibleCards.forEach((c) => c.setAttribute('data-row-span', String(defaultSpan)));

        if (visibleCards.length === 0) return;

        const remainder = visibleCards.length % cols;
        if (remainder !== 0) {
          const expandedSpan = Math.floor(12 / remainder);
          for (let i = visibleCards.length - remainder; i < visibleCards.length; i++) {
            visibleCards[i].setAttribute('data-row-span', String(expandedSpan));
          }
        }
      });
    });
  }

  /**
   * 5. Build Curated Journalistic Magazine Sections inside each `.bl-lang-workspace`
   */
  function initWorkspacesAndSections(activeLang, activePillarFilter) {
    document.documentElement.setAttribute('data-bl-lang', activeLang);
    document.documentElement.setAttribute('data-active-lang', activeLang);

    const workspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]');
    if (!workspaces.length) {
      // Single post or page view: still decorate any cards on page & balance related row
      document
        .querySelectorAll('.bl-card, .bl-lead-card, .bl-side-card, .bl-article-shell')
        .forEach((el) => decorateCardElement(el, activeLang));
      balanceAllGridRows(document, activeLang);
      return;
    }

    workspaces.forEach((ws) => {
      const panelLang = ws.getAttribute('data-lang-panel') || 'ro';
      const isPanelActive = panelLang === activeLang;
      ws.classList.toggle('is-active', isPanelActive);
      ws.hidden = !isPanelActive;
      ws.style.display = isPanelActive ? 'block' : 'none';

      // Skip DOM manipulation on inactive language workspaces until activated
      if (!isPanelActive) {
        return;
      }

      // Unwrap deferred <template data-ws-template> when this workspace becomes active
      const deferredTpl = ws.querySelector('template[data-ws-template]');
      if (deferredTpl) {
        ws.appendChild(deferredTpl.content.cloneNode(true));
        deferredTpl.remove();
      }

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
        const imgSrcset = imgEl ? imgEl.getAttribute('srcset') || '' : '';
        const excerptEl = sourceEl.querySelector('.bl-lead-excerpt');
        const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
        const badgeText = dict[`badge_${pillar}`] || dict.badge_general;
        const safeTitle = title.replace(/"/g, '&quot;');

        const article = document.createElement('article');
        article.className = 'bl-card post-card';
        article.setAttribute('data-post-slug', slug);
        article.setAttribute('data-pillar', pillar);
        article.innerHTML = `
          <a class="bl-card-media" href="${url}" aria-label="${safeTitle}">
            <img src="${imgSrc}" ${imgSrcset ? `srcset="${imgSrcset}" sizes="(max-width: 680px) 320px, (max-width: 1120px) 280px, 340px"` : ''} alt="${safeTitle}" width="600" height="338" loading="lazy" decoding="async" />
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
              <a class="bl-read-cta" href="${url}" aria-label="${safeTitle}">
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

      // Build Dedicated Category Reports & Whitepapers PDF Section (`[data-reports-section]`)
      const reportsSection = ws.querySelector('[data-reports-section]');
      if (reportsSection) {
        reportsSection.id = isPanelActive ? 'pillar-reports' : `pillar-reports-${panelLang}`;
      }
      if (reportsSection && !reportsSection.hasAttribute('data-reports-built')) {
        const sampleAsset = reportsSection.getAttribute('data-report-cover-sample') || '';
        const assetVersionMatch = sampleAsset.match(/\?v=[^"'\s&]+/);
        const assetSuffix = assetVersionMatch ? assetVersionMatch[0] : '';

        reportsSection.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'bl-section-header bl-reports-header';
        header.innerHTML = `
          <div class="bl-reports-header-copy">
            <span class="bl-section-eyebrow" data-i18n="sec_reports_eyebrow">${dict.sec_reports_eyebrow}</span>
            <h2 class="bl-section-title" data-i18n="sec_reports_title">${dict.sec_reports_title}</h2>
            <p class="bl-reports-subtitle" data-i18n="sec_reports_subtitle">${dict.sec_reports_subtitle}</p>
          </div>
          <button type="button" class="bl-filter-pill" data-filter-pillar="reports">
            <span data-i18n="nav_reports">${dict.nav_reports}</span>
          </button>
        `;
        reportsSection.appendChild(header);

        const reportsGrid = document.createElement('div');
        reportsGrid.className = 'bl-reports-grid';

        CATEGORY_REPORTS.forEach((rep) => {
          const pdfObj = rep.pdf || {};
          const coverObj = rep.cover || {};
          const hasRoPdf = Boolean(pdfObj.ro);
          const useRoPdf = panelLang === 'ro' && hasRoPdf;
          const pdfUrl = useRoPdf ? pdfObj.ro : (pdfObj.en || pdfObj.ro || '#');
          const rawCoverPath = useRoPdf ? (coverObj.ro || coverObj.en) : (coverObj.en || coverObj.ro);
          const coverPath = rawCoverPath && assetSuffix && !rawCoverPath.includes('?')
            ? `${rawCoverPath}${assetSuffix}`
            : rawCoverPath;
          const pdfBadgeLabel = useRoPdf
            ? (dict.report_badge_pdf_ro || 'PDF • RO')
            : (dict.report_badge_pdf_en || 'PDF • EN');
          const altPdfUrl = (useRoPdf && pdfObj.en && pdfObj.en !== pdfObj.ro)
            ? pdfObj.en
            : (!useRoPdf && pdfObj.ro && pdfObj.ro !== pdfObj.en ? pdfObj.ro : '');
          const altPdfLang = (useRoPdf && pdfObj.en && pdfObj.en !== pdfObj.ro)
            ? (dict.report_also_en || 'EN PDF')
            : (!useRoPdf && pdfObj.ro && pdfObj.ro !== pdfObj.en ? (dict.report_also_ro || 'RO PDF') : '');

          const title = (rep.title && (rep.title[panelLang] || rep.title.ro)) || '';
          const subtitle = (rep.desc && (rep.desc[panelLang] || rep.desc.ro)) || '';
          const kickerText = (rep.kicker && (rep.kicker[panelLang] || rep.kicker.ro)) || '';
          const dateLabel = (rep.dateLabel && (rep.dateLabel[panelLang] || rep.dateLabel.ro)) || '2026';
          const metrics = Array.isArray(rep.metrics)
            ? rep.metrics
            : ((rep.metrics && (rep.metrics[panelLang] || rep.metrics.ro)) || []);
          const articleSlug = (rep.articleSlugs && (rep.articleSlugs[panelLang] || rep.articleSlugs.ro)) || '';
          const articleUrl = `/${articleSlug}/?lang=${panelLang}`;

          const card = document.createElement('article');
          card.className = 'bl-report-card';
          card.setAttribute('data-report-id', rep.id);
          card.innerHTML = `
            <a class="bl-report-cover-link" href="${pdfUrl}" target="_blank" rel="noopener" aria-label="${title} — ${dict.report_open_pdf}">
              <div class="bl-report-cover-frame">
                <img
                  class="bl-report-cover-img"
                  src="${coverPath}"
                  alt="${title} (${pdfBadgeLabel})"
                  width="680"
                  height="962"
                  loading="lazy"
                  decoding="async"
                />
                <div class="bl-report-cover-badges">
                  <span class="bl-report-pdf-pill"><i></i>${pdfBadgeLabel}</span>
                  <span class="bl-report-date-pill">${dateLabel}</span>
                </div>
                <div class="bl-report-cover-hover" aria-hidden="true">
                  <span class="bl-report-cover-hover-btn">
                    <span data-i18n="report_open_pdf">${dict.report_open_pdf}</span>
                    <span>&#8599;</span>
                  </span>
                </div>
              </div>
            </a>
            <div class="bl-report-body">
              <div class="bl-report-kicker">${kickerText}</div>
              <h3 class="bl-report-title">
                <a href="${pdfUrl}" target="_blank" rel="noopener">${title}</a>
              </h3>
              <p class="bl-report-desc">${subtitle}</p>
              <div class="bl-report-metrics">
                ${metrics.map((m) => `<span class="bl-report-metric-chip">${m}</span>`).join('')}
              </div>
              <div class="bl-report-actions">
                <a class="bl-report-pdf-btn" href="${pdfUrl}" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  <span data-i18n="report_open_pdf">${dict.report_open_pdf}</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>
                <div class="bl-report-subactions">
                  <a class="bl-report-article-link" href="${articleUrl}">
                    <span data-i18n="report_read_article">${dict.report_read_article}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  ${altPdfUrl ? `<a class="bl-report-alt-pdf" href="${altPdfUrl}" target="_blank" rel="noopener" title="${altPdfLang}">${altPdfLang} &#8599;</a>` : ''}
                </div>
              </div>
            </div>
          `;
          reportsGrid.appendChild(card);
        });

        reportsSection.appendChild(reportsGrid);
        reportsSection.setAttribute('data-reports-built', 'true');
      }

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

            const stack = document.createElement('div');
            stack.className = 'bl-bento-stack';
            matches.slice(1).forEach((m) => {
              stack.appendChild(m.cloneNode(true));
            });
            grid.appendChild(stack);
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
      const isReportsFilter = activePillarFilter === 'reports';

      if (heroSec) heroSec.style.display = isFiltering ? 'none' : '';
      if (pulseSec) pulseSec.style.display = isFiltering ? 'none' : '';
      if (curatedContainer) curatedContainer.style.display = isFiltering ? 'none' : '';
      if (reportsSection) {
        reportsSection.style.display = (!isFiltering || isReportsFilter || activePillarFilter === 'data') ? '' : 'none';
      }

      if (masonryGrid) {
        // Remove previously injected clones when filter changes
        masonryGrid.querySelectorAll('[data-cloned-filter-card]').forEach((el) => el.remove());

        const reportSlugsForLang = new Set(
          CATEGORY_REPORTS.map((r) => (r.articleSlugs && (r.articleSlugs[panelLang] || r.articleSlugs.ro)) || '')
        );

        if (!isFiltering) {
          masonryCards.forEach((c) => {
            c.style.display = '';
          });
        } else {
          // Hide non-matching masonry cards
          masonryCards.forEach((c) => {
            const slug = c.getAttribute('data-post-slug') || '';
            const match = isReportsFilter
              ? reportSlugsForLang.has(slug)
              : c.getAttribute('data-pillar') === activePillarFilter;
            c.style.display = match ? '' : 'none';
          });
          // Also include matching cards from the Hero zone so they appear in the filtered results
          const existingMasonrySlugs = new Set(
            masonryCards.map((c) => c.getAttribute('data-post-slug'))
          );
          uniquePool.forEach((poolCard) => {
            const slug = poolCard.getAttribute('data-post-slug');
            const matchesPool = isReportsFilter
              ? reportSlugsForLang.has(slug)
              : poolCard.getAttribute('data-pillar') === activePillarFilter;
            if (matchesPool && !existingMasonrySlugs.has(slug)) {
              const clone = poolCard.cloneNode(true);
              clone.setAttribute('data-cloned-filter-card', 'true');
              masonryGrid.prepend(clone);
            }
          });
        }
      }

      // Show Load More button when initial workspace has full batch of articles (12+ in Masonry = 19+ total)
      const loadMoreWrap = ws.querySelector('[data-load-more-wrap]');
      if (loadMoreWrap) {
        const isExhausted = loadMoreWrap.getAttribute('data-exhausted') === 'true';
        const allMasonryCards = masonryGrid
          ? masonryGrid.querySelectorAll(':scope > .bl-card:not([data-cloned-filter-card])').length
          : 0;
        loadMoreWrap.hidden = isReportsFilter || isExhausted || allMasonryCards < 12;
      }

      // Guarantee 100% full rows in every section & archive wall for this workspace
      balanceAllGridRows(ws, panelLang);
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

      // 0. Include Category Reports & Whitepapers PDFs directly in search index for all 4 languages
      SUPPORTED_LANGS.forEach((langCode) => {
        CATEGORY_REPORTS.forEach((rep) => {
          const pdfObj = rep.pdf || {};
          const coverObj = rep.cover || {};
          const useRoPdf = langCode === 'ro' && Boolean(pdfObj.ro);
          const pdfUrl = useRoPdf ? pdfObj.ro : (pdfObj.en || pdfObj.ro || '#');
          const coverPath = useRoPdf ? (coverObj.ro || coverObj.en) : (coverObj.en || coverObj.ro);
          const title = `[PDF] ${(rep.title && (rep.title[langCode] || rep.title.ro)) || ''}`;
          const excerpt = (rep.desc && (rep.desc[langCode] || rep.desc.ro)) || '';
          const dateStr = (rep.dateLabel && (rep.dateLabel[langCode] || rep.dateLabel.ro)) || '2026';
          const kickerStr = (rep.kicker && (rep.kicker[langCode] || rep.kicker.ro)) || '';
          const key = `${langCode}:pdf-${rep.id}`;
          byKey.set(key, {
            title,
            url: pdfUrl,
            slug: `pdf-${rep.id}`,
            lang: langCode,
            date: dateStr,
            image: coverPath,
            excerpt,
            tags: 'pdf,whitepaper,report,raport,studiu,' + kickerStr,
            pillar: 'data'
          });
        });
      });

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
        const searchScope = ws.querySelector('template[data-ws-template]')
          ? ws.querySelector('template[data-ws-template]').content
          : ws;
        searchScope.querySelectorAll('.bl-lead-card, .bl-side-card, .bl-card').forEach((card) => {
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

      // 3. Also harvest server-rendered Ghost search index (`#bl-ghost-search-data` in `default.hbs`)
      const searchTpl = document.getElementById('bl-ghost-search-data');
      const searchRoot = searchTpl && searchTpl.content ? searchTpl.content : searchTpl;
      if (searchRoot) {
        searchRoot.querySelectorAll('[data-s-slug]').forEach((node) => {
          const slug = node.getAttribute('data-s-slug') || '';
          const url = node.getAttribute('data-s-url') || (slug ? `/${slug}/` : '');
          const title = (node.getAttribute('data-s-title') || '').trim();
          if (!slug || !title) return;
          const date = node.getAttribute('data-s-date') || '';
          const tags = (node.getAttribute('data-s-tags') || '').toLowerCase();
          const tagList = tags.split(',').map((t) => t.trim());
          let lang = 'ro';
          if (tagList.includes('en') || tagList.includes('hash-en')) lang = 'en';
          else if (tagList.includes('bg') || tagList.includes('hash-bg')) lang = 'bg';
          else if (tagList.includes('es') || tagList.includes('hash-es')) lang = 'es';

          const key = `${lang}:${slug}`;
          if (byKey.has(key)) return;
          const pillar = classifyPillar(title, tags, '', slug);
          byKey.set(key, {
            title,
            url,
            slug,
            lang,
            date,
            image: '',
            excerpt: '',
            tags,
            pillar
          });
        });
      }

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

          const isPdf = /\.pdf(\?|$)/i.test(item.url);

          return `
            <a class="bl-search-item${idx === 0 ? ' is-active' : ''}"
               href="${escapeHtml(item.url)}"
               ${isPdf ? 'target="_blank" rel="noopener"' : ''}
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
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let points = [];
    let triangles = [];
    const pointer = { x: 0.65, y: 0.38 };
    let rafPending = false;

    const COLS = 13;
    const ROWS = 7;

    // Curated BusinessLeague Arena Telemetry Nodes attached to interior mesh vertices
    const ARENA_NODES = [
      { row: 1, col: 2, label: 'TIER I // UNICORNS', accent: 'violet' },
      { row: 1, col: 8, label: 'TIER II // WIZARDS', accent: 'emerald' },
      { row: 5, col: 3, label: 'TIER III // LOBSTERS', accent: 'emerald' },
      { row: 5, col: 6, label: 'TIER IV // ROOKIES', accent: 'violet' },
      { row: 2, col: 10, label: 'BVB: 2P // ARENA', accent: 'emerald' },
      { row: 4, col: 1, label: 'CPS • REAL DATA', accent: 'violet' }
    ];

    function buildMesh(w, h) {
      width = w || window.innerWidth || 1280;
      height = h || 440;
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
      rafPending = false;
      const t = (now || 0) * 0.00065;
      ctx.clearRect(0, 0, width, height);

      const isLight =
        document.documentElement.getAttribute('data-theme') === 'light' &&
        !document.documentElement.classList.contains('dark-mode');

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
        const wave = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.37);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();

        if (isLight) {
          // Crisp architectural light-mode prism facets (porcelain + violet + signal emerald)
          const facetIdx = (i * 7) % 12;
          const rVal = Math.round(243 - intensity * 20 - facetIdx * 0.7 + wave * 5);
          const gVal = Math.round(242 - intensity * 10 - facetIdx * 0.5 + Math.pow(intensity, 2) * 14);
          const bVal = Math.round(252 - facetIdx * 0.5 + intensity * 3);
          ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${0.52 + intensity * 0.26})`;
          ctx.fill();

          const useEmeraldStroke = (i + Math.floor(t * 2)) % 5 === 0 || intensity > 0.64;
          ctx.strokeStyle = useEmeraldStroke
            ? `rgba(5, 150, 105, ${0.11 + intensity * 0.26})`
            : `rgba(120, 57, 238, ${0.10 + intensity * 0.24})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Dual-Chroma BusinessLeague Dark Arena (Royal Violet #7839ee + Signal Emerald #00d68f)
          const isVioletFacet = (i * 3) % 4 === 0;
          const highlight = Math.pow(intensity, 2.2) * 0.16;
          const baseShade = 8 + ((i * 7) % 9) + intensity * 10;

          const rShade = Math.round(baseShade + (isVioletFacet ? highlight * 120 : highlight * 18));
          const gShade = Math.round(baseShade + (isVioletFacet ? highlight * 55 : highlight * 190));
          const bShade = Math.round(baseShade + (isVioletFacet ? highlight * 235 : highlight * 125));

          ctx.fillStyle = `rgba(${rShade}, ${gShade}, ${bShade}, 0.78)`;
          ctx.fill();

          ctx.strokeStyle = isVioletFacet
            ? `rgba(147, 83, 255, ${0.055 + highlight * 0.42})`
            : `rgba(0, 205, 120, ${0.048 + highlight * 0.42})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Subtle geometric vertex nodes across the mesh
      ctx.fillStyle = isLight ? 'rgba(120, 57, 238, 0.22)' : 'rgba(167, 139, 250, 0.18)';
      for (let i = 0; i < points.length; i += 2) {
        const p = points[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // BusinessLeague Arena Telemetry Callout Nodes (Unicorns, Wizards, Lobsters, Rookies, BVB: 2P)
      if (width >= 680) {
        ctx.save();
        ctx.font = '600 8.5px "Roboto Mono", monospace';
        ctx.textBaseline = 'middle';

        for (let n = 0; n < ARENA_NODES.length; n++) {
          const node = ARENA_NODES[n];
          const idx = node.row * COLS + node.col;
          const pt = points[idx];
          if (!pt) continue;

          const d = Math.hypot(pt.x - lightX, pt.y - lightY);
          const prox = Math.max(0, 1 - d / (width * 0.42));
          const alpha = (isLight ? 0.22 : 0.20) + prox * 0.32;

          const colorStr =
            node.accent === 'emerald'
              ? isLight
                ? `rgba(4, 120, 87, ${alpha})`
                : `rgba(16, 185, 129, ${alpha})`
              : isLight
                ? `rgba(105, 39, 218, ${alpha})`
                : `rgba(185, 135, 255, ${alpha})`;

          // Outer target ring
          ctx.strokeStyle = colorStr;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 5 + Math.sin(t * 2.2 + n) * 1.1, 0, Math.PI * 2);
          ctx.stroke();

          // Inner core dot
          ctx.fillStyle = colorStr;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();

          // Micro callout leader line + label
          ctx.beginPath();
          ctx.moveTo(pt.x + 6, pt.y);
          ctx.lineTo(pt.x + 13, pt.y - 4);
          ctx.stroke();

          ctx.fillText(node.label, pt.x + 16, pt.y - 4);
        }
        ctx.restore();
      }
    }

    function scheduleRender() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(render);
      }
    }

    const startMesh = () => {
      buildMesh(window.innerWidth, 440);
      render(0);

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const cr = entry.contentRect;
            if (
              cr.width > 0 &&
              cr.height > 0 &&
              (Math.abs(cr.width - width) > 4 || Math.abs(cr.height - height) > 4)
            ) {
              buildMesh(cr.width, cr.height);
              scheduleRender();
            }
          }
        });
        ro.observe(canvas);
      } else {
        window.addEventListener(
          'resize',
          () => {
            buildMesh(window.innerWidth, 440);
            scheduleRender();
          },
          { passive: true }
        );
      }
    };

    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(startMesh, { timeout: 600 });
    } else {
      setTimeout(startMesh, 250);
    }

    window.addEventListener(
      'pointermove',
      (e) => {
        if (width > 0 && height > 0) {
          pointer.x = Math.max(0.1, Math.min(0.9, e.clientX / width));
          pointer.y = Math.max(0.1, Math.min(0.9, e.clientY / height));
          scheduleRender();
        }
      },
      { passive: true }
    );

    canvas.__rerenderMesh = scheduleRender;
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
          const tagLower = h.tagName.toLowerCase();
          li.className = `bl-toc-item bl-toc-item--${tagLower}`;
          const a = document.createElement('a');
          a.className = `bl-toc-link${tagLower === 'h3' ? ' is-h3' : ''}`;
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

    // Wire cross-language sibling links (`[data-article-lang]`) & SEO `<link rel="alternate" hreflang="...">`
    const articleShell = document.querySelector('.bl-article-shell[data-post-slug]');
    if (articleShell) {
      const currentSlug = articleShell.getAttribute('data-post-slug') || '';
      const siblings = getTranslationSiblings(currentSlug);

      document.querySelectorAll('[data-article-lang]').forEach((pill) => {
        const pillLang = (pill.getAttribute('data-article-lang') || '').toLowerCase();
        if (!SUPPORTED_LANGS.includes(pillLang)) return;

        if (siblings && siblings[pillLang]) {
          pill.setAttribute('href', `/${siblings[pillLang]}/?lang=${pillLang}`);
          pill.setAttribute('data-has-translation', 'true');
        } else {
          pill.setAttribute('href', `/?lang=${pillLang}`);
          pill.setAttribute('data-has-translation', 'false');
        }
      });

      if (siblings && document.head) {
        SUPPORTED_LANGS.forEach((langCode) => {
          const targetSlug = siblings[langCode];
          if (!targetSlug) return;
          if (!document.head.querySelector(`link[rel="alternate"][hreflang="${langCode}"]`)) {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = langCode;
            link.href = `${window.location.origin}/${targetSlug}/`;
            document.head.appendChild(link);
          }
        });
      }
    }
  }

  /**
   * 10. Main Initialization & Event Delegation
   */
  const VALID_PILLARS = ['all', 'reports', 'data', 'interviews', 'playbooks', 'competition', 'product', 'corporate'];

  function resolveInitialPillar() {
    try {
      const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
      if (hash === 'reports' || hash === 'pillar-reports' || hash.startsWith('pillar-reports-')) {
        return 'reports';
      }
      if (hash.startsWith('pillar-')) {
        const p = hash.slice('pillar-'.length);
        if (VALID_PILLARS.includes(p)) return p;
      }
      const params = new URLSearchParams(window.location.search);
      const qPillar = (params.get('pillar') || '').toLowerCase();
      if (VALID_PILLARS.includes(qPillar)) return qPillar;
    } catch (_) {}
    return 'all';
  }

  function syncPillarNavState(activePillar) {
    document.querySelectorAll('[data-filter-pillar]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-filter-pillar') === activePillar);
    });
    document.querySelectorAll('.bl-nav-link[data-pillar-link]').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-pillar-link') === activePillar);
    });
    const homeLink = document.querySelector('.bl-nav-link[data-i18n="nav_home"]');
    if (homeLink) {
      homeLink.classList.toggle('is-active', activePillar === 'all');
    }
  }

  function applyThemeState(theme) {
    const html = document.documentElement;
    const resolved = theme === 'light' ? 'light' : 'dark';
    html.setAttribute('data-theme', resolved);
    if (resolved === 'dark') {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
    const csMeta = document.querySelector('meta[name="color-scheme"]');
    if (csMeta) {
      csMeta.content = resolved;
    }
    const meshCanvas = document.getElementById('bl-hero-mesh');
    if (meshCanvas && typeof meshCanvas.__rerenderMesh === 'function') {
      meshCanvas.__rerenderMesh();
    }
  }

  function init() {
    let currentLang = resolveActiveLanguage();
    let currentPillar = resolveInitialPillar();

    // Theme Toggle (`#bl-theme-toggle`) + Cross-Tab Storage Sync bound first
    const themeToggle = document.getElementById('bl-theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyThemeState(next);
        try {
          localStorage.setItem(THEME_KEY, next);
          localStorage.setItem('bl_theme', next);
        } catch (_) {}
      });
    }

    window.addEventListener('storage', (e) => {
      if ((e.key === THEME_KEY || e.key === 'bl_theme') && (e.newValue === 'light' || e.newValue === 'dark')) {
        applyThemeState(e.newValue);
      }
    });

    initWorkspacesAndSections(currentLang, currentPillar);
    syncPillarNavState(currentPillar);
    applyTranslations(currentLang);
    initLiveSearch(() => currentLang);
    initHeroMesh();
    initReadingControls();
    initSinglePostEnhancements();

    if (currentPillar !== 'all') {
      const activeWs = document.querySelector(`.bl-lang-workspace[data-lang-panel="${currentLang}"]`);
      const targetSec = activeWs && (
        currentPillar === 'reports'
          ? activeWs.querySelector('[data-reports-section]')
          : activeWs.querySelector('[data-feed-section]')
      );
      if (targetSec) {
        setTimeout(() => {
          targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    }

    window.addEventListener('hashchange', () => {
      const nextPillar = resolveInitialPillar();
      const hasWorkspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').length > 0;
      if (hasWorkspaces) {
        if (nextPillar !== currentPillar) {
          currentPillar = nextPillar;
          syncPillarNavState(currentPillar);
          initWorkspacesAndSections(currentLang, currentPillar);
        }
        if (currentPillar !== 'all') {
          const activeWs = document.querySelector(`.bl-lang-workspace[data-lang-panel="${currentLang}"]`);
          const targetSec = activeWs && (
            currentPillar === 'reports'
              ? activeWs.querySelector('[data-reports-section]')
              : activeWs.querySelector('[data-feed-section]')
          );
          if (targetSec) {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });

    // Mobile Sections Menu Toggle (`#bl-mobile-menu-toggle`)
    const mobileMenuToggle = document.getElementById('bl-mobile-menu-toggle');
    const headerEl = document.querySelector('.bl-header');
    function closeMobileMenu() {
      if (headerEl && headerEl.classList.contains('is-menu-open')) {
        headerEl.classList.remove('is-menu-open');
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
    if (mobileMenuToggle && headerEl) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = headerEl.classList.toggle('is-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeMobileMenu();
        }
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
          document.documentElement.setAttribute('data-bl-lang', currentLang);
          document.documentElement.setAttribute('data-active-lang', currentLang);
          try {
            localStorage.setItem(STORAGE_KEY, currentLang);
            localStorage.setItem('bl_lang', currentLang);
          } catch (_) {}

          // If on single article view and switching language, navigate directly to translated sibling article if available
          const hasWorkspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').length > 0;
          if (!hasWorkspaces) {
            const articleShell = document.querySelector('.bl-article-shell[data-post-slug]');
            const currentSlug = articleShell ? articleShell.getAttribute('data-post-slug') : '';
            const siblings = getTranslationSiblings(currentSlug);
            if (siblings && siblings[currentLang]) {
              window.location.href = `/${siblings[currentLang]}/?lang=${currentLang}`;
            } else {
              window.location.href = `/?lang=${currentLang}`;
            }
            return;
          }

          const url = new URL(window.location.href);
          url.searchParams.set('lang', currentLang);
          window.history.replaceState({}, '', url.toString());

          initWorkspacesAndSections(currentLang, currentPillar);
          applyTranslations(currentLang);
        }
        return;
      }

      // 2. Pillar Filter Tabs (`[data-filter-pillar]`, `[data-pillar-link]`, `[data-pillar-filter]`)
      const pillarBtn = e.target.closest('[data-filter-pillar], [data-pillar-link], [data-pillar-filter]');
      if (pillarBtn) {
        closeMobileMenu();
        const targetPillar =
          pillarBtn.getAttribute('data-filter-pillar') ||
          pillarBtn.getAttribute('data-pillar-link') ||
          pillarBtn.getAttribute('data-pillar-filter') ||
          'all';

        const hasWorkspaces = document.querySelectorAll('.bl-lang-workspace[data-lang-panel]').length > 0;
        if (!hasWorkspaces) {
          e.preventDefault();
          // On single post page, navigate to home and filter by pillar
          window.location.href = `/?lang=${currentLang}#pillar-${targetPillar}`;
          return;
        }

        e.preventDefault();
        currentPillar = targetPillar;
        syncPillarNavState(currentPillar);

        try {
          const url = new URL(window.location.href);
          url.searchParams.set('lang', currentLang);
          url.hash = currentPillar === 'all' ? '' : `pillar-${currentPillar}`;
          window.history.replaceState({}, '', url.toString());
        } catch (_) {}

        initWorkspacesAndSections(currentLang, currentPillar);

        if (currentPillar !== 'all') {
          const activeWs = document.querySelector(`.bl-lang-workspace[data-lang-panel="${currentLang}"]`);
          const targetSec = activeWs && (
            currentPillar === 'reports'
              ? activeWs.querySelector('[data-reports-section]')
              : activeWs.querySelector('[data-feed-section]')
          );
          if (targetSec) {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        return;
      }

      // 3. Load More Archive Pagination (`[data-load-more]`)
      const loadMoreBtn = e.target.closest('[data-load-more]');
      if (loadMoreBtn && !loadMoreBtn.disabled) {
        e.preventDefault();
        const ws = loadMoreBtn.closest('.bl-lang-workspace');
        const masonryGrid = ws ? ws.querySelector('[data-workspace-grid]') : null;
        if (!ws || !masonryGrid) return;

        const LANG_FILTERS = {
          ro: 'tag:-[en,hash-en,bg,hash-bg,es,hash-es]',
          en: 'tag:[en,hash-en]',
          bg: 'tag:[bg,hash-bg]',
          es: 'tag:[es,hash-es]'
        };

        const panelLang = (
          loadMoreBtn.getAttribute('data-load-more') ||
          ws.getAttribute('data-lang-panel') ||
          currentLang ||
          'ro'
        ).toLowerCase();
        const dict = I18N[panelLang] || I18N.ro;
        const langFilter =
          loadMoreBtn.getAttribute('data-lang-filter') ||
          ws.getAttribute('data-lang-filter') ||
          LANG_FILTERS[panelLang] ||
          LANG_FILTERS.ro;
        const nextPage = parseInt(loadMoreBtn.getAttribute('data-next-page') || '2', 10);
        const coverSample =
          loadMoreBtn.getAttribute('data-cover-sample') || '/assets/images/covers/cover-interviews.svg';
        const labelEl = loadMoreBtn.querySelector('.bl-load-more-label');
        const metaEl = ws.querySelector('[data-load-more-meta]');
        const wrapEl = ws.querySelector('[data-load-more-wrap]');

        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('is-loading');
        if (labelEl) labelEl.textContent = dict.load_more_loading;

        const sodoScript = document.querySelector('script[data-sodo-search][data-key]');
        const apiKey =
          (sodoScript && sodoScript.getAttribute('data-key')) || '5b2bb73c870c40e21550d566b0';

        const params = new URLSearchParams({
          key: apiKey,
          include: 'tags,authors',
          limit: '22',
          page: String(nextPage),
          filter: langFilter
        });

        const apiUrl = `/ghost/api/content/posts/?${params.toString()}`;

        fetch(apiUrl)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((data) => {
            const posts = Array.isArray(data && data.posts) ? data.posts : [];
            const pagination = (data && data.meta && data.meta.pagination) || {};

            // Collect existing slugs in workspace to prevent duplicates
            const existingSlugs = new Set();
            ws.querySelectorAll('[data-post-slug]').forEach((el) => {
              const s = el.getAttribute('data-post-slug');
              if (s) existingSlugs.add(s);
            });

            const monthNames = [
              'JAN',
              'FEB',
              'MAR',
              'APR',
              'MAY',
              'JUN',
              'JUL',
              'AUG',
              'SEP',
              'OCT',
              'NOV',
              'DEC'
            ];

            function esc(str) {
              return String(str || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
            }

            function detectPostLanguage(post) {
              const slug = String((post && post.slug) || '').toLowerCase();
              const title = String((post && post.title) || '');
              const tagSlugs = Array.isArray(post && post.tags)
                ? post.tags.map((t) => String((t && t.slug) || '').toLowerCase()).filter(Boolean)
                : [];

              if (
                tagSlugs.includes('bg') ||
                tagSlugs.includes('hash-bg') ||
                slug.endsWith('-bg') ||
                /[а-яА-Я]/.test(title)
              ) {
                return 'bg';
              }
              if (tagSlugs.includes('es') || tagSlugs.includes('hash-es') || slug.endsWith('-es')) {
                return 'es';
              }
              if (tagSlugs.includes('en') || tagSlugs.includes('hash-en')) {
                return 'en';
              }
              const siblings = getTranslationSiblings(slug);
              if (siblings) {
                if (siblings.bg === slug && siblings.ro !== slug) return 'bg';
                if (siblings.es === slug && siblings.ro !== slug) return 'es';
                if (siblings.en === slug && siblings.ro !== slug) return 'en';
                if (siblings.ro === slug) return 'ro';
              }
              return 'ro';
            }

            function toGhostWebp(url, width) {
              const s = String(url || '');
              if (s.includes('/content/images/') && !s.includes('/content/images/size/')) {
                return s.replace('/content/images/', `/content/images/size/w${width}/format/webp/`);
              }
              return s;
            }

            posts.forEach((post) => {
              if (!post || !post.slug || existingSlugs.has(post.slug)) return;
              if (detectPostLanguage(post) !== panelLang) return;
              existingSlugs.add(post.slug);

              const pubDate = post.published_at ? new Date(post.published_at) : new Date();
              const isoDate = !isNaN(pubDate.getTime())
                ? pubDate.toISOString().slice(0, 10)
                : '';
              const dayStr = !isNaN(pubDate.getTime())
                ? String(pubDate.getDate()).padStart(2, '0')
                : '';
              const monStr = !isNaN(pubDate.getTime()) ? monthNames[pubDate.getMonth()] : '';
              const yearStr = !isNaN(pubDate.getTime()) ? pubDate.getFullYear() : '';
              const formattedDate = dayStr ? `${dayStr} ${monStr} ${yearStr}` : '';
              const readingTimeStr =
                post.reading_time && post.reading_time > 0 ? `${post.reading_time} min read` : '';

              const rawExcerpt = (post.custom_excerpt || post.excerpt || '')
                .replace(/\s+/g, ' ')
                .trim();
              const words = rawExcerpt ? rawExcerpt.split(' ') : [];
              const shortExcerpt =
                words.length > 26 ? `${words.slice(0, 26).join(' ')}...` : rawExcerpt;

              const tagsCsv = Array.isArray(post.tags)
                ? `${post.tags.map((t) => t.slug).join(',')},`
                : '';
              const primaryTagName =
                (post.primary_tag && post.primary_tag.name) || 'BusinessLeague';
              const primaryAuthor =
                post.primary_author || (Array.isArray(post.authors) && post.authors[0]) || null;
              const postUrl = post.url || `/${post.slug}/`;

              const article = document.createElement('article');
              article.className = 'bl-card post-card';
              article.setAttribute('data-post-id', post.id || '');
              article.setAttribute('data-post-slug', post.slug);
              article.setAttribute('data-published', isoDate);
              article.setAttribute('data-tags', tagsCsv);
              article.setAttribute('data-pillar', 'auto');

              const img300 = post.feature_image ? toGhostWebp(post.feature_image, 300) : '';
              const img600 = post.feature_image ? toGhostWebp(post.feature_image, 600) : '';

              const mediaHtml = post.feature_image
                ? `<img src="${esc(img600)}" srcset="${esc(img300)} 300w, ${esc(img600)} 600w" sizes="(max-width: 680px) 320px, (max-width: 1120px) 280px, 340px" alt="${esc(
                    post.feature_image_alt || post.title
                  )}" width="600" height="338" loading="lazy" decoding="async" onerror="this.style.display='none';if(this.nextElementSibling){this.nextElementSibling.style.display='flex';}" />
                   <div class="bl-generated-cover" data-cover-pillar="interviews" style="display:none;">
                     <img class="bl-generated-cover-bg" src="${esc(
                       coverSample
                     )}" data-cover-template-img alt="" loading="lazy" decoding="async" />
                     <div class="bl-generated-cover-overlay">
                       <span class="bl-generated-cover-kicker" data-cover-kicker>${esc(
                         primaryTagName
                       )}</span>
                       <span class="bl-generated-cover-headline">${esc(post.title)}</span>
                       <span class="bl-generated-cover-brand">BUSINESSLEAGUE &bull; 2PERFORMANT</span>
                     </div>
                   </div>`
                : `<div class="bl-generated-cover" data-generated-cover data-cover-pillar="interviews">
                     <img class="bl-generated-cover-bg" src="${esc(
                       coverSample
                     )}" data-cover-bg alt="" loading="lazy" decoding="async" />
                     <div class="bl-generated-cover-overlay">
                       <span class="bl-generated-cover-kicker" data-cover-kicker>${esc(
                         primaryTagName
                       )}</span>
                       <span class="bl-generated-cover-headline">${esc(post.title)}</span>
                       <span class="bl-generated-cover-brand">BUSINESSLEAGUE // 2PERFORMANT</span>
                     </div>
                   </div>`;

              const authorHtml = primaryAuthor
                ? `<a class="bl-author-chip" href="${esc(primaryAuthor.url || '#')}">
                     ${
                       primaryAuthor.profile_image
                         ? `<img class="bl-author-avatar" src="${esc(
                             primaryAuthor.profile_image
                           )}" alt="" width="36" height="36" loading="lazy" decoding="async" />`
                         : ''
                     }
                     <span>${esc(primaryAuthor.name || 'BusinessLeague')}</span>
                   </a>`
                : `<span class="bl-author-chip"><span>BusinessLeague</span></span>`;

              article.innerHTML = `
                <a class="bl-card-media" href="${esc(postUrl)}" aria-label="${esc(post.title)}">
                  ${mediaHtml}
                </a>
                <div class="bl-card-body">
                  <div class="bl-meta-row">
                    <span class="bl-pillar-badge" data-pillar-badge>${esc(primaryTagName)}</span>
                    <time class="bl-meta-time" datetime="${esc(isoDate)}">
                      ${esc(formattedDate)}${readingTimeStr ? ` &bull; ${esc(readingTimeStr)}` : ''}
                    </time>
                  </div>
                  <h3 class="bl-card-title">
                    <a href="${esc(postUrl)}">${esc(post.title)}</a>
                  </h3>
                  ${shortExcerpt ? `<p class="bl-card-excerpt">${esc(shortExcerpt)}</p>` : ''}
                  <footer class="bl-card-footer">
                    ${authorHtml}
                    <a class="bl-read-cta" href="${esc(postUrl)}" aria-label="${esc(post.title)}">
                      <span data-i18n="read_article">${esc(dict.read_article)}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </footer>
                </div>
              `;

              const assignedPillar = decorateCardElement(article, panelLang);
              if (currentPillar && currentPillar !== 'all' && assignedPillar !== currentPillar) {
                article.style.display = 'none';
              }

              masonryGrid.appendChild(article);
            });

            balanceAllGridRows(ws, panelLang);

            const totalLoaded =
              7 +
              masonryGrid.querySelectorAll(':scope > .bl-card:not([data-cloned-filter-card])')
                .length;
            const totalAvailable = pagination.total || totalLoaded;

            if (metaEl && totalAvailable > 0) {
              metaEl.textContent = `${Math.min(totalLoaded, totalAvailable)} / ${totalAvailable}`;
            }

            const hasMore = Boolean(pagination.next) && posts.length > 0;
            if (hasMore) {
              loadMoreBtn.setAttribute('data-next-page', String(nextPage + 1));
              loadMoreBtn.disabled = false;
              loadMoreBtn.classList.remove('is-loading');
              if (labelEl) labelEl.textContent = dict.load_more_btn;
            } else {
              loadMoreBtn.classList.remove('is-loading');
              if (labelEl) labelEl.textContent = dict.load_more_done;
              if (wrapEl) {
                wrapEl.setAttribute('data-exhausted', 'true');
                setTimeout(() => {
                  wrapEl.hidden = true;
                }, 1400);
              }
            }
          })
          .catch(() => {
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove('is-loading');
            if (labelEl) labelEl.textContent = dict.load_more_btn;
          });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
