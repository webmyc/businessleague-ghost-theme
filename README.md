# BusinessLeague Editorial Ghost Theme (`businessleague-editorial`)

The official multi-language editorial Ghost theme for [`blog.businessleague.com`](https://blog.businessleague.com), engineered on top of the **BusinessLeague Design System** (`https://start.businessleague.com/design-system`).

## Key Capabilities

1. **BusinessLeague Design System Native**:
   - **Typography**: `Onest` (Display & Headlines), `Inter` (Long-form Editorial Prose), `Roboto Mono` (Metadata, Reading Time & Badges).
   - **Dual-Mode Palette**: Signature Dark Mode default (`#0a0b1a` deep midnight canvas, `#151934` glassmorphic cards, `#7839ee` / `#a78bfa` violet accents, `#00d68f` emerald live indicators) + High-Craft Light Mode toggle (`#f8fafc` canvas, `#ffffff` cards) with automatic dual-logo switching (`logo-horizontal-dark.png` / `logo-horizontal-light.png`).
   - **7:5 Asymmetric Editorial Hero Split**: Magazine-grade visual hierarchy featuring the Lead Story (7 columns) paired with Editor's Picks & Ecosystem Spotlight (5 columns).
2. **Zero Image Cropping (`100%` Intrinsic Aspect Ratio)**:
   - Every card image (`.bl-card-media img`, `.bl-lead-media img`) and article hero image (`.bl-article-hero-media img`) renders with `width: 100%; height: auto; object-fit: contain;` — never cropping interview portraits, event banners, or infographics.
3. **Strict 4-Language Architecture (`RO` / `EN` / `BG` / `ES`)**:
   - **Zero Mixed Languages on Homepage**: Auto-detects browser language (`navigator.languages`) on first visit and renders isolated per-language workspaces (`data-lang-panel="ro|en|bg|es"`).
   - **Instant 4-Language Switcher**: Segmented pill switcher in the header (`RO | EN | BG | ES`) switches both the article feed and all UI labels immediately.
   - **In-Article Language Switcher (`post.hbs`)**: Prominent language bar above the article headline and in the sticky right rail allowing readers to switch directly between the `RO`, `EN`, `BG`, and `ES` versions of the exact same article.
4. **5 Curated Editorial Pillars**:
   - `interviews` — **Voices & Case Studies** (Interviews with Top Marketers, Merchants, Mentors & Unicorns)
   - `playbooks` — **Playbooks & Strategy** (Tactical e-commerce & affiliate guides, *Myth or Reality* series)
   - `competition` — **League & Events** (Black Friday, BusinessLeague Residence, Season Chronicles & Awards Gala)
   - `product` — **Product & Tech** (Shopify App Store, First-Party Attribution, Product Feeds, Big Bear)
   - `corporate` — **2Performant & Investors** (BVB `2P` reports, M&A updates, quarterly results)
5. **SEO, AEO, GEO & LLM Readiness**:
   - Complete `Organization`, `WebSite`, `BlogPosting`, `BreadcrumbList`, and `SpeakableSpecification` JSON-LD schemas.
   - Dynamic `FAQPage` JSON-LD extraction from interview Q&A headings for AI Answer Engines (Perplexity, ChatGPT Search, Google AI Overviews).
   - Multi-language `hreflang` cross-linking (`ro`, `en`, `bg`, `es`, `x-default`).
