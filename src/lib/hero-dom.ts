import { variants, type VariantId, type VariantData } from './hero-variants';

/** Selector → { html, style } snapshot for restoring original content */
export type OriginalSnapshot = Record<string, { html: string; style: string }>;

const LPO_SELECTORS = [
  'hero-section',
  'hero-circle-1',
  'hero-circle-2',
  'hero-badge',
  'hero-title',
  'hero-desc',
  'hero-stats',
  'hero-card',
  'hero-icons',
  'bonus-banner',
  'bonus-text',
  'bonus-cta',
  'benefits-subtitle',
  'benefits-title',
  'benefits-desc',
  'benefit-1',
  'benefit-2',
  'benefit-3',
  'benefit-4',
  'benefit-5',
  'benefit-6',
] as const;

function el(attr: string): HTMLElement | null {
  return document.querySelector(`[data-lpo="${attr}"]`);
}

/** Save the original innerHTML and style.cssText of all data-lpo elements */
export function saveOriginals(): OriginalSnapshot {
  const snap: OriginalSnapshot = {};
  for (const sel of LPO_SELECTORS) {
    const node = el(sel);
    if (node) {
      snap[sel] = { html: node.innerHTML, style: node.style.cssText };
    }
  }
  return snap;
}

/** Restore all elements from a previously saved snapshot */
export function restoreOriginals(snap: OriginalSnapshot) {
  for (const [sel, data] of Object.entries(snap)) {
    const node = el(sel);
    if (node) {
      node.innerHTML = data.html;
      node.style.cssText = data.style;
    }
  }
}

function renderBenefitCard(b: VariantData['benefits'][0]): string {
  return `<div style="width:48px; height:48px; border-radius:12px; background:${b.iconBg}; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${b.iconStroke}" stroke-width="2">${b.iconSvg}</svg>
</div>
<h3 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 8px;">${b.title}</h3>
<p style="font-size:14px; color:#6b7280; line-height:1.6; margin:0;">${b.description}</p>`;
}

/** Apply a variant's content to the page DOM */
export function applyVariant(variantId: VariantId) {
  const v = variants[variantId];

  // Hero section background
  const heroSection = el('hero-section');
  if (heroSection) heroSection.style.background = v.heroBg;

  // Decorative circles
  const c1 = el('hero-circle-1');
  if (c1) c1.style.background = v.decorCircle1;
  const c2 = el('hero-circle-2');
  if (c2) c2.style.background = v.decorCircle2;

  // Badge
  const badge = el('hero-badge');
  if (badge) badge.textContent = v.badge;

  // Title (HTML because of <br/> and <span>)
  const title = el('hero-title');
  if (title) title.innerHTML = v.title;

  // Description
  const desc = el('hero-desc');
  if (desc) desc.textContent = v.description;

  // Stats
  const stats = el('hero-stats');
  if (stats) {
    stats.innerHTML = v.stats
      .map(
        (s) =>
          `<div>
        <div style="font-size:28px; font-weight:800; color:${s.color};">${s.value}</div>
        <div style="font-size:12px; color:rgba(255,255,255,0.5); margin-top:4px;">${s.label}</div>
      </div>`
      )
      .join('');
  }

  // Card gradient
  const card = el('hero-card');
  if (card) card.style.background = v.cardGradient;

  // Themed icons around the card
  const icons = el('hero-icons');
  if (icons) icons.innerHTML = v.heroIcons;

  // Banner
  const banner = el('bonus-banner');
  if (banner) banner.style.background = v.bannerBg;
  const bannerText = el('bonus-text');
  if (bannerText) bannerText.textContent = v.bannerText;
  const bannerCta = el('bonus-cta');
  if (bannerCta) bannerCta.textContent = v.bannerCta;

  // Benefits header
  const bSub = el('benefits-subtitle');
  if (bSub) bSub.textContent = v.benefitsSubtitle;
  const bTitle = el('benefits-title');
  if (bTitle) bTitle.textContent = v.benefitsTitle;
  const bDesc = el('benefits-desc');
  if (bDesc) bDesc.textContent = v.benefitsDescription;

  // Benefits cards
  for (let i = 0; i < 6; i++) {
    const card = el(`benefit-${i + 1}`);
    if (card) card.innerHTML = renderBenefitCard(v.benefits[i]);
  }
}
