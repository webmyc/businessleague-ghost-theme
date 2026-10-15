/**
 * BusinessLeague Editorial Ghost Theme Engine v1.0.0
 * - 4-Language Instant Editorial Switcher (RO / EN / BG / ES)
 * - In-Article Translation Resolver (window.__BL_TRANSLATIONS__ + hreflang + #trans-*)
 * - 5-Pillar Editorial Classifier & Curated Magazine Sections
 * - Sticky Table of Contents, Reading Progress & Dynamic FAQPage JSON-LD for AEO/GEO
 */
(function () {
    'use strict';

    var SUPPORTED_LANGS = ['ro', 'en', 'bg', 'es'];

    var I18N = {
        ro: {
            nav_all: 'Toate',
            nav_interviews: 'Interviuri & Studii de Caz',
            nav_playbooks: 'Playbooks & Strategie',
            nav_competition: 'Competiție & Evenimente',
            nav_product: 'Produs & Tech',
            nav_corporate: '2Performant & BVB',
            search_label: 'Caută',
            cta_join: 'Intră în Ligă',
            masthead_eyebrow: 'PUBLICAȚIA OFICIALĂ BUSINESSLEAGUE • 2PERFORMANT',
            masthead_title: 'Performanță în E-Commerce, Studii de Caz & Strategii din Liga Campionilor',
            masthead_subtitle: 'Interviuri cu liderii din afiliere și e-commerce, analize tactice aplicabile imediat și noutăți din ecosistemul BusinessLeague.',
            pillar_all: 'Toate Secțiunile',
            pillar_interviews: 'Interviuri & Studii de Caz',
            pillar_playbooks: 'Playbooks & Strategie',
            pillar_competition: 'Competiție & Evenimente',
            pillar_product: 'Produs & Tech',
            pillar_corporate: '2Performant & BVB',
            read_lead: 'Citește articolul principal',
            read_article: 'Citește',
            hero_side_title: 'În Prim-Plan • Selecția Redacției',
            eco_title: 'Crește-ți vânzările sau câștigă comisioane prin performanță pură',
            eco_desc: 'Peste 14,7 milioane de vânzări generate și 696 milioane EUR pentru magazinele online din CEE.',
            eco_btn_companies: 'Pentru Magazine ↗',
            eco_btn_marketers: 'Pentru Marketeri ↗',
            latest_eyebrow: 'ARHIVA EDITORIALĂ COMPLETĂ',
            latest_title: 'Toate Articolele Recente',
            empty_lang_title: 'Ediția în această limbă este în curs de sincronizare',
            empty_lang_desc: 'Scriptul automat de traducere BusinessLeague pregătește articolele în această limbă. Între timp, poți explora edițiile în Română, Engleză sau Bulgară.',
            breadcrumb_home: 'Acasă',
            article_lang_prompt: 'Citește acest articol în:',
            share_label: 'Distribuie',
            toc_title: 'Cuprins Articol',
            rail_lang_title: 'Versiuni Disponibile',
            related_eyebrow: 'CONTINUĂ LECTURA',
            related_title: 'Articole Recomandate',
            footer_desc: 'Publicația oficială a ecosistemului de marketing descentralizat #1 din Europa Centrală și de Est. Studii de caz reale, strategii de performanță și povești de creștere în e-commerce.',
            footer_pillars: 'Piloni Editoriali',
            footer_editions: 'Ediții Lingvistice',
            sec_interviews_eyebrow: 'VOCILE BUSINESSLEAGUE • INTERVIURI & STUDII DE CAZ',
            sec_interviews_title: 'Liderii din E-Commerce & Afiliere',
            sec_playbooks_eyebrow: 'TACTICI APLICABILE • PLAYBOOKS & STRATEGIE',
            sec_playbooks_title: 'Strategii de Creștere, Conversie & Mituri Demontate',
            sec_competition_eyebrow: 'CAMPIONATUL DE PERFORMANȚĂ • COMPETIȚIE & EVENIMENTE',
            sec_competition_title: 'Black Friday, BusinessLeague Residence & Cronici de Sezon',
            sec_product_eyebrow: 'INOVAȚIE ÎN ECOSISTEM • PRODUS & TECH',
            sec_product_title: 'Funcționalități Noi, Atribuire First-Party & Unelte',
            view_all_pillar: 'Vezi toate din această categorie →',
            badge_interviews: 'Interviu & Studiu de Caz',
            badge_playbooks: 'Playbook & Strategie',
            badge_competition: 'Competiție & Ligă',
            badge_product: 'Produs & Tech',
            badge_corporate: '2Performant & BVB'
        },
        en: {
            nav_all: 'All Stories',
            nav_interviews: 'Voices & Case Studies',
            nav_playbooks: 'Playbooks & Strategy',
            nav_competition: 'League & Events',
            nav_product: 'Product & Tech',
            nav_corporate: '2Performant & Investors',
            search_label: 'Search',
            cta_join: 'Join the League',
            masthead_eyebrow: 'OFFICIAL PUBLICATION OF BUSINESSLEAGUE • 2PERFORMANT',
            masthead_title: 'E-Commerce Performance, Case Studies & Championship Playbooks',
            masthead_subtitle: 'In-depth interviews with top affiliate marketers and store owners, tactical growth frameworks, and ecosystem updates.',
            pillar_all: 'All Categories',
            pillar_interviews: 'Voices & Case Studies',
            pillar_playbooks: 'Playbooks & Strategy',
            pillar_competition: 'League & Events',
            pillar_product: 'Product & Tech',
            pillar_corporate: '2Performant & Investors',
            read_lead: 'Read Lead Story',
            read_article: 'Read',
            hero_side_title: 'Spotlight • Editor’s Picks',
            eco_title: 'Scale your e-commerce revenue or earn commissions through pure performance',
            eco_desc: 'Over 14.7 million sales generated and €696M+ in e-commerce revenue across CEE.',
            eco_btn_companies: 'For Online Stores ↗',
            eco_btn_marketers: 'For Marketers ↗',
            latest_eyebrow: 'COMPLETE EDITORIAL ARCHIVE',
            latest_title: 'Latest Published Dispatches',
            empty_lang_title: 'This language edition is currently syncing',
            empty_lang_desc: 'The automated BusinessLeague translation pipeline is preparing articles for this edition.',
            breadcrumb_home: 'Home',
            article_lang_prompt: 'Read this article in:',
            share_label: 'Share',
            toc_title: 'On This Page',
            rail_lang_title: 'Language Editions',
            related_eyebrow: 'KEEP READING',
            related_title: 'Recommended Articles',
            footer_desc: 'The official publication of CEE’s #1 decentralized performance marketing championship. Real case studies, playbooks, and e-commerce growth stories.',
            footer_pillars: 'Editorial Pillars',
            footer_editions: 'Language Editions',
            sec_interviews_eyebrow: 'VOICES OF THE LEAGUE • INTERVIEWS & CASE STUDIES',
            sec_interviews_title: 'Conversations with Top Marketers & Merchants',
            sec_playbooks_eyebrow: 'TACTICAL FRAMEWORKS • PLAYBOOKS & STRATEGY',
            sec_playbooks_title: 'Growth Playbooks, Conversion Tactics & Myth vs. Reality',
            sec_competition_eyebrow: 'THE CHAMPIONSHIP • LEAGUE & EVENTS',
            sec_competition_title: 'Black Friday, BusinessLeague Residence & Season Chronicles',
            sec_product_eyebrow: 'PLATFORM INNOVATION • PRODUCT & TECH',
            sec_product_title: 'Shopify App, First-Party Attribution & Ecosystem Tools',
            view_all_pillar: 'Explore all in this category →',
            badge_interviews: 'Voices & Case Study',
            badge_playbooks: 'Playbook & Strategy',
            badge_competition: 'League & Events',
            badge_product: 'Product & Tech',
            badge_corporate: '2Performant & IR'
        },
        bg: {
            nav_all: 'Всички',
            nav_interviews: 'Интервюта и Казуси',
            nav_playbooks: 'Стратегии и Наръчници',
            nav_competition: 'Състезание и Събития',
            nav_product: 'Продукт и Технологии',
            nav_corporate: '2Performant и Инвеститори',
            search_label: 'Търсене',
            cta_join: 'Влез в Лигата',
            masthead_eyebrow: 'ОФИЦИАЛНО ИЗДАНИЕ НА BUSINESSLEAGUE • 2PERFORMANT',
            masthead_title: 'Е-Commerce Ефективност, Казуси и Стратегии от Лигата на Шампионите',
            masthead_subtitle: 'Интервюта с водещи афилиейт маркетолози и онлайн магазини, практически наръчници за растеж и новини от екосистемата на BusinessLeague.',
            pillar_all: 'Всички Рубрики',
            pillar_interviews: 'Интервюта и Казуси',
            pillar_playbooks: 'Стратегии и Наръчници',
            pillar_competition: 'Състезание и Събития',
            pillar_product: 'Продукт и Технологии',
            pillar_corporate: '2Performant и Инвеститори',
            read_lead: 'Прочети водещата статия',
            read_article: 'Прочети',
            hero_side_title: 'На Фокус • Избор на Редакцията',
            eco_title: 'Увеличете продажбите си или печелете комисиони чрез чиста ефективност',
            eco_desc: 'Над 14,7 милиона генерирани продажби и €696M+ оборот за онлайн магазините в ЦИЕ.',
            eco_btn_companies: 'За Магазини ↗',
            eco_btn_marketers: 'За Маркетолози ↗',
            latest_eyebrow: 'ПЪЛЕН РЕДАКЦИОНЕН АРХИВ',
            latest_title: 'Всички Последни Статии',
            empty_lang_title: 'Изданието на този език се синхронизира',
            empty_lang_desc: 'Автоматичната система за превод на BusinessLeague подготвя статиите на този език.',
            breadcrumb_home: 'Начало',
            article_lang_prompt: 'Прочети тази статия на:',
            share_label: 'Сподели',
            toc_title: 'Съдържание',
            rail_lang_title: 'Езикови Версии',
            related_eyebrow: 'ПРОДЪЛЖИ ЧЕТЕНЕТО',
            related_title: 'Препоръчани Статии',
            footer_desc: 'Официалното издание на #1 децентрализирания шампионат за пърформанс маркетинг в ЦИЕ. Реални казуси и стратегии за растеж.',
            footer_pillars: 'Редакционни Рубрики',
            footer_editions: 'Езикови Издания',
            sec_interviews_eyebrow: 'ГЛАСОВЕТЕ НА ЛИГАТА • ИНТЕРВЮТА И КАЗУСИ',
            sec_interviews_title: 'Разговори с Топ Маркетолози и Онлайн Търговци',
            sec_playbooks_eyebrow: 'ПРАКТИЧЕСКИ ТАКТИКИ • СТРАТЕГИИ И НАРЪЧНИЦИ',
            sec_playbooks_title: 'Стратегии за Растеж, Конверсии и Мит или Реалност',
            sec_competition_eyebrow: 'ШАМПИОНАТЪТ • СЪСТЕЗАНИЕ И СЪБИТИЯ',
            sec_competition_title: 'Black Friday, BusinessLeague Residence и Хроники на Сезона',
            sec_product_eyebrow: 'ИНОВАЦИИ • ПРОДУКТ И ТЕХНОЛОГИИ',
            sec_product_title: 'Нови Функционалности, Атрибуция и Инструменти',
            view_all_pillar: 'Виж всички в тази категория →',
            badge_interviews: 'Интервю и Казус',
            badge_playbooks: 'Стратегия и Наръчник',
            badge_competition: 'Състезание и Лига',
            badge_product: 'Продукт и Тех',
            badge_corporate: '2Performant и Инвеститори'
        },
        es: {
            nav_all: 'Todos',
            nav_interviews: 'Entrevistas y Casos de Éxito',
            nav_playbooks: 'Playbooks y Estrategia',
            nav_competition: 'Competición y Eventos',
            nav_product: 'Producto y Tecnología',
            nav_corporate: '2Performant e Inversores',
            search_label: 'Buscar',
            cta_join: 'Únete a la Liga',
            masthead_eyebrow: 'PUBLICACIÓN OFICIAL DE BUSINESSLEAGUE • 2PERFORMANT',
            masthead_title: 'Rendimiento en E-Commerce, Casos de Éxito y Estrategias de Campeones',
            masthead_subtitle: 'Entrevistas con líderes en marketing de afiliación y tiendas online, guías tácticas de crecimiento y novedades del ecosistema BusinessLeague.',
            pillar_all: 'Todas las Categorías',
            pillar_interviews: 'Entrevistas y Casos de Éxito',
            pillar_playbooks: 'Playbooks y Estrategia',
            pillar_competition: 'Competición y Eventos',
            pillar_product: 'Producto y Tecnología',
            pillar_corporate: '2Performant e Inversores',
            read_lead: 'Leer artículo principal',
            read_article: 'Leer',
            hero_side_title: 'En Portada • Selección Editorial',
            eco_title: 'Escala tus ventas online o gana comisiones por puro rendimiento',
            eco_desc: 'Más de 14,7 millones de ventas generadas y 696M€+ para tiendas online.',
            eco_btn_companies: 'Para Tiendas ↗',
            eco_btn_marketers: 'Para Marketers ↗',
            latest_eyebrow: 'ARCHIVO EDITORIAL COMPLETO',
            latest_title: 'Últimos Artículos Publicados',
            empty_lang_title: 'La edición en Español está sincronizándose',
            empty_lang_desc: 'El motor de traducción automática de BusinessLeague está publicando los artículos en Español.',
            breadcrumb_home: 'Inicio',
            article_lang_prompt: 'Leer este artículo en:',
            share_label: 'Compartir',
            toc_title: 'Contenido del Artículo',
            rail_lang_title: 'Versiones Disponibles',
            related_eyebrow: 'SEGUIR LEYENDO',
            related_title: 'Artículos Recomendados',
            footer_desc: 'La publicación oficial del campeonato descentralizado de performance marketing #1 en Europa Central y del Este.',
            footer_pillars: 'Pilares Editoriales',
            footer_editions: 'Ediciones por Idioma',
            sec_interviews_eyebrow: 'VOCES DE LA LIGA • ENTREVISTAS Y CASOS DE ÉXITO',
            sec_interviews_title: 'Líderes de E-Commerce y Marketing de Afiliación',
            sec_playbooks_eyebrow: 'TÁCTICAS APLICABLES • PLAYBOOKS Y ESTRATEGIA',
            sec_playbooks_title: 'Estrategias de Crecimiento, Conversión y Mito o Realidad',
            sec_competition_eyebrow: 'EL CAMPEONATO • COMPETICIÓN Y EVENTOS',
            sec_competition_title: 'Black Friday, BusinessLeague Residence y Crónicas de Temporada',
            sec_product_eyebrow: 'INNOVACIÓN • PRODUCTO Y TECNOLOGÍA',
            sec_product_title: 'Shopify App, Atribución First-Party y Herramientas',
            view_all_pillar: 'Ver todo en esta categoría →',
            badge_interviews: 'Entrevista y Caso',
            badge_playbooks: 'Playbook y Estrategia',
            badge_competition: 'Liga y Eventos',
            badge_product: 'Producto y Tech',
            badge_corporate: '2Performant e IR'
        }
    };

    function getActiveLang() {
        var lang = (document.documentElement.getAttribute('data-bl-lang') || 'ro').toLowerCase();
        return SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : 'ro';
    }

    function applyTranslations(lang) {
        var dict = I18N[lang] || I18N.ro;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update Pillar Badges on cards according to classified pillar
        document.querySelectorAll('[data-pillar-badge]').forEach(function (badge) {
            var pType = badge.getAttribute('data-pillar-type');
            if (pType && dict['badge_' + pType]) {
                badge.textContent = dict['badge_' + pType];
            }
        });
    }

    /**
     * Classifies an article into one of the 5 BusinessLeague Editorial Pillars
     * using both Ghost tags and title/excerpt heuristics across RO/EN/BG/ES.
     */
    function classifyPillar(tagsStr, titleStr) {
        var t = ((tagsStr || '') + ' ' + (titleStr || '')).toLowerCase();

        if (t.indexOf('hash-pillar-interviews') !== -1) return 'interviews';
        if (t.indexOf('hash-pillar-playbooks') !== -1) return 'playbooks';
        if (t.indexOf('hash-pillar-competition') !== -1) return 'competition';
        if (t.indexOf('hash-pillar-product') !== -1) return 'product';
        if (t.indexOf('hash-pillar-corporate') !== -1) return 'corporate';

        if (/(bvb|2p\.ro|investitor|investor|shareholder|profitshare|acquires|achizi|raport anual|annual report|q1|q2|q3|q4|financial|cifra de afaceri|board|adunarea generala)/i.test(t)) {
            return 'corporate';
        }
        if (/(shopify|first-party|first party|attribution|atribuire|productfeed|feed|big bear|chat feature|new feature|funcționalit|functionalit|google css|css partner|tracking|api|update|lansăm|lansam|launch)/i.test(t)) {
            return 'product';
        }
        if (/(black friday|challenge|residence|gala|awards|premiile|clasament|ranking|season|sezon|campionat|unicorn|comerțului|comertului|sprint|round|etapa|trophy|trofe)/i.test(t)) {
            return 'competition';
        }
        if (/(:|interviu|interview|интервю|entrevista|mentor|superhero|povestea|story of|cum a reușit|cum a reusit|case study|studiu de caz)/i.test(t)) {
            return 'interviews';
        }
        return 'playbooks';
    }

    function decorateAndBuildCuratedSections() {
        var lang = getActiveLang();
        var dict = I18N[lang] || I18N.ro;

        // Classify all cards on page
        document.querySelectorAll('.bl-card, .bl-lead-card, .bl-side-card, .bl-article-shell').forEach(function (el) {
            var tags = el.getAttribute('data-tags') || el.getAttribute('data-post-tags') || '';
            var titleEl = el.querySelector('.bl-card-title, .bl-lead-title, .bl-side-title, .bl-article-title');
            var title = titleEl ? titleEl.textContent : '';
            var pillar = classifyPillar(tags, title);
            el.setAttribute('data-pillar', pillar);

            var badge = el.querySelector('[data-pillar-badge]');
            if (badge) {
                badge.setAttribute('data-pillar-type', pillar);
                if (dict['badge_' + pillar]) {
                    badge.textContent = dict['badge_' + pillar];
                }
            }
        });

        // Build Curated Editorial Pillar rows inside each language workspace
        document.querySelectorAll('.bl-lang-workspace').forEach(function (ws) {
            var curatedContainer = ws.querySelector('[data-curated-sections]');
            var grid = ws.querySelector('[data-workspace-grid]');
            if (!curatedContainer || !grid) return;

            var cards = Array.prototype.slice.call(grid.querySelectorAll('.bl-card'));
            if (cards.length < 3) return;

            var pillarConfigs = [
                { id: 'interviews', eyebrowKey: 'sec_interviews_eyebrow', titleKey: 'sec_interviews_title' },
                { id: 'playbooks', eyebrowKey: 'sec_playbooks_eyebrow', titleKey: 'sec_playbooks_title' },
                { id: 'competition', eyebrowKey: 'sec_competition_eyebrow', titleKey: 'sec_competition_title' },
                { id: 'product', eyebrowKey: 'sec_product_eyebrow', titleKey: 'sec_product_title' }
            ];

            curatedContainer.innerHTML = '';

            pillarConfigs.forEach(function (cfg) {
                var matching = cards.filter(function (c) {
                    return c.getAttribute('data-pillar') === cfg.id;
                }).slice(0, 3);

                if (matching.length === 0) return;

                var section = document.createElement('section');
                section.className = 'bl-section bl-curated-pillar-section';
                section.id = 'pillar-' + cfg.id;
                section.setAttribute('data-pillar-section', cfg.id);

                var header = document.createElement('div');
                header.className = 'bl-section-header';
                header.innerHTML =
                    '<div>' +
                        '<span class="bl-section-eyebrow" data-i18n="' + cfg.eyebrowKey + '">' + (dict[cfg.eyebrowKey] || '') + '</span>' +
                        '<h2 class="bl-section-title" data-i18n="' + cfg.titleKey + '">' + (dict[cfg.titleKey] || '') + '</h2>' +
                    '</div>' +
                    '<button type="button" class="bl-section-link" data-filter-pillar="' + cfg.id + '" data-i18n="view_all_pillar">' +
                        (dict.view_all_pillar || 'Explore all →') +
                    '</button>';

                var rowGrid = document.createElement('div');
                rowGrid.className = 'bl-grid-3';

                matching.forEach(function (card) {
                    var clone = card.cloneNode(true);
                    rowGrid.appendChild(clone);
                });

                section.appendChild(header);
                section.appendChild(rowGrid);
                curatedContainer.appendChild(section);
            });
        });
    }

    /**
     * Filters the active workspace by Editorial Pillar when clicking a category pill
     */
    function filterByPillar(pillar) {
        document.querySelectorAll('[data-filter-pillar]').forEach(function (btn) {
            if (btn.classList.contains('bl-filter-pill')) {
                btn.classList.toggle('is-active', btn.getAttribute('data-filter-pillar') === pillar);
            }
        });
        document.querySelectorAll('[data-pillar-link]').forEach(function (nav) {
            nav.classList.toggle('is-active', nav.getAttribute('data-pillar-link') === pillar);
        });

        document.querySelectorAll('.bl-lang-workspace').forEach(function (ws) {
            var hero = ws.querySelector('[data-hero-section]');
            var curated = ws.querySelector('[data-curated-sections]');
            var cards = ws.querySelectorAll('[data-workspace-grid] .bl-card');

            if (pillar === 'all') {
                if (hero) hero.style.display = '';
                if (curated) curated.style.display = '';
                cards.forEach(function (c) { c.style.display = ''; });
            } else {
                if (hero) hero.style.display = 'none';
                if (curated) curated.style.display = 'none';
                cards.forEach(function (c) {
                    var match = c.getAttribute('data-pillar') === pillar;
                    c.style.display = match ? '' : 'none';
                });
            }
        });
    }

    /**
     * Resolves In-Article Language Switcher links on post.hbs
     */
    function initArticleLanguageSwitcher() {
        var article = document.querySelector('.bl-article-shell');
        if (!article) return;

        var tags = (article.getAttribute('data-post-tags') || '').split(',').filter(Boolean);
        var slug = article.getAttribute('data-post-slug') || '';

        // Detect current article language from tags or html attribute
        var articleLang = 'ro';
        if (tags.indexOf('en') !== -1) articleLang = 'en';
        else if (tags.indexOf('bg') !== -1) articleLang = 'bg';
        else if (tags.indexOf('es') !== -1) articleLang = 'es';
        else if (tags.indexOf('ro') !== -1) articleLang = 'ro';

        // Sync header language indicator with article language
        document.documentElement.setAttribute('data-bl-lang', articleLang);
        applyTranslations(articleLang);

        // Gather translation map from:
        // 1. window.__BL_TRANSLATIONS__ (injected in codeinjection_head)
        // 2. <link rel="alternate" hreflang="ro|en|bg|es" href="...">
        // 3. Slug convention fallback
        var map = {};
        if (window.__BL_TRANSLATIONS__ && typeof window.__BL_TRANSLATIONS__ === 'object') {
            Object.keys(window.__BL_TRANSLATIONS__).forEach(function (k) {
                map[k.toLowerCase()] = window.__BL_TRANSLATIONS__[k];
            });
        }
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (link) {
            var hl = (link.getAttribute('hreflang') || '').slice(0, 2).toLowerCase();
            var href = link.getAttribute('href');
            if (SUPPORTED_LANGS.indexOf(hl) !== -1 && href) {
                map[hl] = href;
            }
        });

        map[articleLang] = window.location.pathname + window.location.search;

        document.querySelectorAll('[data-article-lang]').forEach(function (pill) {
            var targetLang = pill.getAttribute('data-article-lang');
            pill.classList.toggle('is-current', targetLang === articleLang);

            if (map[targetLang]) {
                pill.setAttribute('href', map[targetLang]);
                pill.classList.remove('is-unavailable');
            } else {
                // Fallback to that language edition on homepage
                pill.setAttribute('href', '/?lang=' + targetLang);
            }
        });
    }

    /**
     * Builds Interactive Table of Contents + AEO FAQPage Schema on Single Article Page
     */
    function initArticleTOCAndAEOSchema() {
        var prose = document.getElementById('bl-article-prose');
        var tocCard = document.getElementById('bl-toc-card');
        var tocList = document.getElementById('bl-toc-list');
        if (!prose) return;

        var headings = prose.querySelectorAll('h2, h3');
        if (headings.length >= 2 && tocCard && tocList) {
            tocList.innerHTML = '';
            headings.forEach(function (h, idx) {
                if (!h.id) {
                    h.id = 'section-' + (idx + 1);
                }
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.className = 'bl-toc-link' + (h.tagName === 'H3' ? ' is-h3' : '');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                li.appendChild(a);
                tocList.appendChild(li);
            });
            tocCard.style.display = '';
        }

        // Dynamic FAQPage JSON-LD extraction for interview Q&As (AEO/GEO/LLMs)
        var qaPairs = [];
        var candidates = prose.querySelectorAll('h2, h3, p > strong');
        candidates.forEach(function (el) {
            var qText = (el.textContent || '').trim();
            if (qText.length > 15 && qText.length < 220 && qText.slice(-1) === '?') {
                var block = el.tagName === 'STRONG' ? el.parentElement : el;
                var next = block ? block.nextElementSibling : null;
                if (next && next.tagName === 'P') {
                    var aText = (next.textContent || '').trim();
                    if (aText.length > 30) {
                        qaPairs.push({
                            '@type': 'Question',
                            name: qText,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: aText
                            }
                        });
                    }
                }
            }
        });

        if (qaPairs.length >= 2) {
            var script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: qaPairs.slice(0, 8)
            });
            document.head.appendChild(script);
        }
    }

    /**
     * Global Event Listeners (Language Switcher, Theme Toggle, Pillar Filter, Copy Link, Scroll Progress)
     */
    function initEvents() {
        // 1. Language Switcher clicks
        document.addEventListener('click', function (e) {
            var langBtn = e.target.closest('[data-set-lang]');
            if (langBtn) {
                var newLang = langBtn.getAttribute('data-set-lang').toLowerCase();
                if (SUPPORTED_LANGS.indexOf(newLang) !== -1) {
                    // If we are on a single post page and have a direct translation URL for that language, navigate to it!
                    var articlePill = document.querySelector('[data-article-lang="' + newLang + '"]');
                    if (articlePill && articlePill.getAttribute('href') && articlePill.getAttribute('href').indexOf('/?lang=') !== 0) {
                        e.preventDefault();
                        try { localStorage.setItem('bl_lang', newLang); } catch (err) {}
                        window.location.href = articlePill.getAttribute('href');
                        return;
                    }

                    // If on homepage, switch workspace instantaneously without page reload!
                    if (document.querySelector('.bl-lang-workspace')) {
                        e.preventDefault();
                        document.documentElement.setAttribute('data-bl-lang', newLang);
                        document.documentElement.setAttribute('lang', newLang);
                        try { localStorage.setItem('bl_lang', newLang); } catch (err) {}
                        applyTranslations(newLang);
                        if (window.history && window.history.replaceState) {
                            var url = new URL(window.location.href);
                            url.searchParams.set('lang', newLang);
                            window.history.replaceState({}, '', url.toString());
                        }
                    }
                }
            }

            // 2. Pillar Filter clicks
            var pillarBtn = e.target.closest('[data-filter-pillar]');
            if (pillarBtn) {
                e.preventDefault();
                var p = pillarBtn.getAttribute('data-filter-pillar');
                filterByPillar(p);
            }

            var navPillar = e.target.closest('[data-pillar-link]');
            if (navPillar && document.querySelector('.bl-lang-workspace')) {
                e.preventDefault();
                var np = navPillar.getAttribute('data-pillar-link');
                filterByPillar(np);
                var masthead = document.querySelector('.bl-masthead');
                if (masthead) masthead.scrollIntoView({ behavior: 'smooth' });
            }

            // 3. Copy Link Button
            var copyBtn = e.target.closest('[data-copy-link]');
            if (copyBtn) {
                e.preventDefault();
                var linkUrl = copyBtn.getAttribute('data-copy-link') || window.location.href;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(linkUrl);
                }
                copyBtn.style.borderColor = 'var(--bl-emerald)';
                copyBtn.style.color = 'var(--bl-emerald)';
                setTimeout(function () {
                    copyBtn.style.borderColor = '';
                    copyBtn.style.color = '';
                }, 1800);
            }
        });

        // 4. Dark / Light Theme Toggle
        var themeToggle = document.getElementById('bl-theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                var html = document.documentElement;
                var current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
                var next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                if (next === 'dark') {
                    html.classList.add('dark-mode');
                } else {
                    html.classList.remove('dark-mode');
                }
                try { localStorage.setItem('bl_theme', next); } catch (e) {}
            });
        }

        // 5. Reading Progress Bar
        var progressBar = document.getElementById('bl-reading-progress');
        if (progressBar) {
            window.addEventListener('scroll', function () {
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
                progressBar.style.width = pct + '%';
            }, { passive: true });
        }
    }

    function init() {
        var lang = getActiveLang();
        decorateAndBuildCuratedSections();
        applyTranslations(lang);
        initArticleLanguageSwitcher();
        initArticleTOCAndAEOSchema();
        initEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
