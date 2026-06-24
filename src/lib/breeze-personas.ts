// ─────────────────────────────────────────────────────────────
// Breeze — Personalized EDM demo data model
//
// Derives a customer "persona" from fake spending records (weighted
// by amount) and builds a personalized Mastercard Travel Rewards email.
// Colors/gradients are borrowed from hero-variants.ts to stay visually
// consistent with the rest of the demo site.
// ─────────────────────────────────────────────────────────────

export type Category = 'overseas' | 'shopping' | 'dining' | 'daily';
export type PersonaId = 'globetrotter' | 'shopper' | 'foodie' | 'everyday';

export const categoryLabels: Record<Category, string> = {
  overseas: 'Overseas',
  shopping: 'Online Shopping',
  dining: 'Dining',
  daily: 'Daily Spending',
};

export const categoryIcons: Record<Category, string> = {
  overseas: '✈️',
  shopping: '🛍️',
  dining: '🍽️',
  daily: '🏠',
};

// Accent colors mirror the matching hero-variants themes.
export const categoryColors: Record<Category, string> = {
  overseas: '#0EA5E9',
  shopping: '#A855F7',
  dining: '#F97316',
  daily: '#64748B',
};

// ─── Countries (overseas destination-specific offers) ───

export interface CountryOption {
  code: string;
  flag: string;
  name: string;
  city: string;
  currency: string;
  offerTitle: string;
  offerBody: string;
}

export const countries: CountryOption[] = [
  {
    code: 'JP', flag: '🇯🇵', name: 'Japan', city: 'Tokyo', currency: '¥',
    offerTitle: 'Double Points in Tokyo',
    offerBody:
      'Earn 2x Travel Rewards points on all spending in Japan, plus a ¥5,000 hotel credit on your next Tokyo stay.',
  },
  {
    code: 'FR', flag: '🇫🇷', name: 'France', city: 'Paris', currency: '€',
    offerTitle: 'Paris Getaway Bonus',
    offerBody:
      'Earn 2x points across France and unlock complimentary airport lounge access on your next trip to Paris.',
  },
  {
    code: 'US', flag: '🇺🇸', name: 'USA', city: 'New York', currency: '$',
    offerTitle: 'Explore the USA',
    offerBody:
      'Earn 3x points on all US spending, plus a $50 dining credit to enjoy in New York.',
  },
  {
    code: 'TH', flag: '🇹🇭', name: 'Thailand', city: 'Bangkok', currency: '฿',
    offerTitle: 'Bangkok Escape',
    offerBody:
      'Earn 2x points in Thailand and redeem a complimentary spa experience on your next Bangkok visit.',
  },
  {
    code: 'KR', flag: '🇰🇷', name: 'Korea', city: 'Seoul', currency: '₩',
    offerTitle: 'Seoul Shopping Spree',
    offerBody:
      'Earn 2x points across Korea, plus a ₩50,000 shopping voucher for your next Seoul trip.',
  },
];

export const countryByCode = (code?: string): CountryOption | undefined =>
  code ? countries.find((c) => c.code === code) : undefined;

// ─── Transactions ───

export interface Transaction {
  id: string;
  category: Category;
  country?: string; // country code, only meaningful when category === 'overseas'
  merchant: string;
  amount: number; // USD
}

// Auto-filled when adding a transaction (merchant + amount fields are hidden).
export const defaultMerchants: Record<Category, string> = {
  overseas: 'Overseas Purchase',
  shopping: 'Online Store',
  dining: 'Restaurant',
  daily: 'Grocery Mart',
};

export const defaultAmounts: Record<Category, number> = {
  overseas: 500,
  shopping: 150,
  dining: 90,
  daily: 70,
};

export interface QuickAdd {
  label: string;
  tx: Omit<Transaction, 'id'>;
}

export const quickAdds: QuickAdd[] = [
  { label: '+ Tokyo Trip', tx: { category: 'overseas', country: 'JP', merchant: 'Tokyo Trip', amount: 600 } },
  { label: '+ Paris Trip', tx: { category: 'overseas', country: 'FR', merchant: 'Paris Trip', amount: 600 } },
  { label: '+ Online Order', tx: { category: 'shopping', merchant: 'Online Store', amount: 150 } },
  { label: '+ Dinner Out', tx: { category: 'dining', merchant: 'Restaurant', amount: 90 } },
  { label: '+ Groceries', tx: { category: 'daily', merchant: 'Grocery Mart', amount: 70 } },
];

// Pre-seeded so the EDM renders a clear persona on first load (Globetrotter / Japan).
export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 'seed-1', category: 'overseas', country: 'JP', merchant: 'Hotel Okura Tokyo', amount: 820 },
  { id: 'seed-2', category: 'overseas', country: 'JP', merchant: 'JR Rail Pass', amount: 340 },
  { id: 'seed-3', category: 'dining', merchant: 'Sushi Saito', amount: 180 },
  { id: 'seed-4', category: 'daily', merchant: 'Grocery Mart', amount: 95 },
];

// ─── Personas ───

export interface Persona {
  id: PersonaId;
  label: string;
  icon: string;
  tagline: string;
  primaryColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export const personas: Record<PersonaId, Persona> = {
  globetrotter: {
    id: 'globetrotter', label: 'The Globetrotter', icon: '🌍',
    tagline: 'Always chasing the next destination.',
    primaryColor: '#0284C7', gradientFrom: '#0c2d48', gradientTo: '#1a6e8e',
  },
  shopper: {
    id: 'shopper', label: 'The Smart Shopper', icon: '🛍️',
    tagline: 'Turns every online order into rewards.',
    primaryColor: '#7C3AED', gradientFrom: '#1e1b4b', gradientTo: '#4c1d95',
  },
  foodie: {
    id: 'foodie', label: 'The Culinary Explorer', icon: '🍽️',
    tagline: 'Lives for the next great meal.',
    primaryColor: '#EA580C', gradientFrom: '#431407', gradientTo: '#9a3412',
  },
  everyday: {
    id: 'everyday', label: 'The Everyday Spender', icon: '💳',
    tagline: "Earning rewards on life's essentials.",
    primaryColor: '#475569', gradientFrom: '#1e293b', gradientTo: '#334155',
  },
};

const categoryToPersona: Record<Category, PersonaId> = {
  overseas: 'globetrotter',
  shopping: 'shopper',
  dining: 'foodie',
  daily: 'everyday',
};

// A signal category must reach this share (by amount) to define a persona.
const DOMINANCE_THRESHOLD = 0.4;

const ALL_CATEGORIES: Category[] = ['overseas', 'shopping', 'dining', 'daily'];

export interface DerivedPersona {
  personaId: PersonaId;
  shares: Record<Category, number>; // 0..1 by amount
  totals: Record<Category, number>; // $ by category
  total: number;
  topCategory: Category | null;
  topCountry?: CountryOption;
  reason: string;
}

export function derivePersona(txs: Transaction[]): DerivedPersona {
  const totals: Record<Category, number> = { overseas: 0, shopping: 0, dining: 0, daily: 0 };
  for (const t of txs) totals[t.category] += Math.max(0, t.amount || 0);
  const total = ALL_CATEGORIES.reduce((sum, c) => sum + totals[c], 0);

  const shares: Record<Category, number> = {
    overseas: total ? totals.overseas / total : 0,
    shopping: total ? totals.shopping / total : 0,
    dining: total ? totals.dining / total : 0,
    daily: total ? totals.daily / total : 0,
  };

  let topCategory: Category | null = null;
  if (total > 0) {
    topCategory = [...ALL_CATEGORIES].sort((a, b) => totals[b] - totals[a])[0];
  }

  // Persona: a non-daily category dominating >= threshold, else everyday.
  let personaId: PersonaId = 'everyday';
  if (topCategory && topCategory !== 'daily' && shares[topCategory] >= DOMINANCE_THRESHOLD) {
    personaId = categoryToPersona[topCategory];
  }

  // For globetrotters, find the most-spent destination.
  let topCountry: CountryOption | undefined;
  if (personaId === 'globetrotter') {
    const byCountry: Record<string, number> = {};
    for (const t of txs) {
      if (t.category === 'overseas' && t.country) {
        byCountry[t.country] = (byCountry[t.country] || 0) + Math.max(0, t.amount || 0);
      }
    }
    const topCode = Object.keys(byCountry).sort((a, b) => byCountry[b] - byCountry[a])[0];
    topCountry = countryByCode(topCode);
  }

  return {
    personaId,
    shares,
    totals,
    total,
    topCategory,
    topCountry,
    reason: buildReason(personaId, shares, topCountry, total),
  };
}

const pct = (x: number): number => Math.round(x * 100);

function buildReason(
  personaId: PersonaId,
  shares: Record<Category, number>,
  topCountry: CountryOption | undefined,
  total: number,
): string {
  if (total === 0) {
    return 'No spending recorded yet — add a few transactions to reveal a persona.';
  }
  switch (personaId) {
    case 'globetrotter':
      return `${pct(shares.overseas)}% of spending is overseas${
        topCountry ? ` (mostly ${topCountry.flag} ${topCountry.name})` : ''
      } — you travel often and value rewards on the go.`;
    case 'shopper':
      return `${pct(shares.shopping)}% of spending is online shopping — you shop digitally and love earning on every order.`;
    case 'foodie':
      return `${pct(shares.dining)}% of spending is on dining — restaurants and cafés are clearly your thing.`;
    default:
      return 'Spending is spread across everyday categories — no single habit dominates yet, so we reward the essentials.';
  }
}

// ─── EDM content ───

const CUSTOMER_NAME = 'Alex';

export interface MerchantOffer {
  icon: string;
  merchant: string;
  offer: string;
}

export interface EdmContent {
  subject: string;
  preheader: string;
  greeting: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroIcon: string;
  pointsBalance: number;
  nextReward: string; // e.g. "a free night in Tokyo"
  nextRewardPts: number; // points still needed
  mainOffer: { passLabel: string; multiplier: string; title: string; body: string; cta: string };
  merchantOffers: MerchantOffer[];
}

const POINTS_BALANCE = 48250;
const NEXT_REWARD_PTS = 1750;

export function buildEdm(personaId: PersonaId, topCountry?: CountryOption): EdmContent {
  const greeting = `Hi ${CUSTOMER_NAME},`;
  const heroEyebrow = 'MASTERCARD TRAVEL REWARDS';

  const base = {
    greeting,
    heroEyebrow,
    pointsBalance: POINTS_BALANCE,
    nextRewardPts: NEXT_REWARD_PTS,
  };

  switch (personaId) {
    case 'globetrotter': {
      const mult = topCountry?.code === 'US' ? '3×' : '2×';
      return {
        ...base,
        subject: topCountry
          ? `${topCountry.flag} ${CUSTOMER_NAME}, your ${topCountry.city} rewards are waiting`
          : `${CUSTOMER_NAME}, unlock 2x points on your next trip`,
        preheader: topCountry
          ? `Exclusive Travel Rewards for your trips to ${topCountry.name}`
          : 'Turn your overseas spending into your next getaway',
        heroHeadline: topCountry ? `Your next ${topCountry.city} adventure, rewarded` : 'The world rewards you',
        heroIcon: '✈️',
        nextReward: topCountry ? `a free night in ${topCountry.city}` : 'a free flight',
        mainOffer: topCountry
          ? {
              passLabel: 'BOARDING PASS',
              multiplier: mult,
              title: topCountry.offerTitle,
              body: topCountry.offerBody,
              cta: `Plan my ${topCountry.city} trip`,
            }
          : {
              passLabel: 'BOARDING PASS',
              multiplier: mult,
              title: 'Double Points Abroad',
              body: 'Earn 2x Travel Rewards points on all overseas spending and redeem for flights, hotels, and lounge access.',
              cta: 'Explore travel rewards',
            },
        merchantOffers: [
          { icon: '✈️', merchant: 'ANA', offer: 'Earn 2× miles on every flight booking' },
          { icon: '🏨', merchant: 'Marriott Bonvoy', offer: '5,000 bonus points per hotel stay' },
          { icon: '🛍️', merchant: 'DFS Duty Free', offer: '10% off airport duty-free shopping' },
        ],
      };
    }
    case 'shopper':
      return {
        ...base,
        subject: `${CUSTOMER_NAME}, your points could be a free flight 🛍️ → ✈️`,
        preheader: 'Convert your online shopping into Travel Rewards',
        heroHeadline: 'Shop today, travel tomorrow',
        heroIcon: '🛍️',
        nextReward: 'a $50 travel voucher',
        mainOffer: {
          passLabel: 'REWARD PASS',
          multiplier: '3×',
          title: 'Turn Carts into Trips',
          body: 'Earn 3x Travel Rewards points on online shopping this month — enough to redeem for your next weekend escape.',
          cta: 'Boost my points',
        },
        merchantOffers: [
          { icon: '📦', merchant: 'Amazon', offer: '5% cash back on every order' },
          { icon: '🏪', merchant: '7-Eleven', offer: 'Double points on in-store buys' },
          { icon: '🎧', merchant: 'Spotify', offer: '3 months of Premium on us' },
        ],
      };
    case 'foodie':
      return {
        ...base,
        subject: `${CUSTOMER_NAME}, a culinary trip on us? 🍽️`,
        preheader: 'Your dining points unlock global food experiences',
        heroHeadline: 'Taste the world, rewarded',
        heroIcon: '🍽️',
        nextReward: 'a fine-dining experience',
        mainOffer: {
          passLabel: 'REWARD PASS',
          multiplier: '3×',
          title: 'Dine Now, Travel for Flavor',
          body: "Earn 3x Travel Rewards points on dining and redeem for Michelin-guide getaways and exclusive chef's table experiences abroad.",
          cta: 'Discover food trips',
        },
        merchantOffers: [
          { icon: '🍽️', merchant: 'The Capital Grille', offer: '15% off your total bill' },
          { icon: '🛵', merchant: 'Uber Eats', offer: '$10 off your next 3 orders' },
          { icon: '☕', merchant: 'Starbucks', offer: 'Buy one, get one free' },
        ],
      };
    default:
      return {
        ...base,
        subject: `${CUSTOMER_NAME}, your everyday spending is going places`,
        preheader: 'Every purchase earns Travel Rewards points',
        heroHeadline: 'Everyday spending, extraordinary trips',
        heroIcon: '💳',
        nextReward: 'your next getaway',
        mainOffer: {
          passLabel: 'REWARD PASS',
          multiplier: '1×',
          title: 'Earn on Everything',
          body: 'Collect Travel Rewards points on every purchase — groceries, bills, and more — and watch them add up to your next trip.',
          cta: 'See my rewards',
        },
        merchantOffers: [
          { icon: '🏪', merchant: 'FamilyMart', offer: '5% cash back on in-store buys' },
          { icon: '⛽', merchant: 'Shell', offer: '$0.10/L fuel rebate' },
          { icon: '🛒', merchant: 'Costco', offer: '2% rewards on groceries' },
        ],
      };
  }
}
