export type VariantId = 'default' | 'overseas' | 'shopping' | 'dining';

export interface VariantStat {
  value: string;
  label: string;
  color: string;
}

export interface VariantBenefit {
  title: string;
  description: string;
  iconBg: string;
  iconStroke: string;
  iconSvg: string;
}

export interface VariantData {
  badge: string;
  title: string;
  description: string;
  stats: [VariantStat, VariantStat, VariantStat];
  heroBg: string;
  decorCircle1: string;
  decorCircle2: string;
  cardGradient: string;
  /** Floating themed SVG icons around the card */
  heroIcons: string;
  bannerBg: string;
  bannerText: string;
  bannerCta: string;
  benefitsSubtitle: string;
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: [VariantBenefit, VariantBenefit, VariantBenefit, VariantBenefit, VariantBenefit, VariantBenefit];
}

export const variantLabels: Record<VariantId, string> = {
  default: 'Default',
  overseas: 'Overseas Spending',
  shopping: 'Online Shopping',
  dining: 'Dining',
};

export const variants: Record<VariantId, VariantData> = {
  // ─── Default ───
  default: {
    badge: 'New Card Launch',
    title: 'Horizon<br/>Mastercard<span style="color:#FF5F00;">®</span> World',
    description:
      'Earn unlimited cashback on every purchase. Enjoy premium travel perks, exclusive dining offers, and world-class security — all with no annual fee for the first year.',
    stats: [
      { value: '3%', label: 'Dining Cashback', color: '#FF5F00' },
      { value: '2%', label: 'Online Shopping', color: '#F79E1B' },
      { value: '1%', label: 'Everything Else', color: '#fff' },
    ],
    heroBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    decorCircle1: 'rgba(235,0,27,0.08)',
    decorCircle2: 'rgba(247,158,27,0.06)',
    cardGradient: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
    heroIcons: '',
    bannerBg: 'linear-gradient(90deg, #FF5F00, #EB001B)',
    bannerText: 'Limited Time Offer: NT$3,000 welcome bonus on your first purchase',
    bannerCta: 'Claim Now',
    benefitsSubtitle: 'Why Choose Horizon',
    benefitsTitle: 'Benefits That Fit Your Lifestyle',
    benefitsDescription:
      'From everyday purchases to international travel, Horizon Mastercard World gives you more at every turn.',
    benefits: [
      {
        title: 'Unlimited Cashback',
        description:
          'Earn 3% on dining, 2% on online shopping, and 1% on all other purchases — with no cap on rewards.',
        iconBg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        iconStroke: '#D97706',
        iconSvg:
          '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      },
      {
        title: 'Travel Privileges',
        description:
          'Complimentary airport lounge access at 1,000+ lounges worldwide. Includes travel insurance up to NT$20M.',
        iconBg: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
        iconStroke: '#2563EB',
        iconSvg:
          '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      },
      {
        title: 'Exclusive Offers',
        description:
          'Access exclusive dining and shopping offers at 500+ partner merchants. Up to 20% off at selected restaurants.',
        iconBg: 'linear-gradient(135deg, #FCE7F3, #F9A8D4)',
        iconStroke: '#DB2777',
        iconSvg:
          '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
      },
      {
        title: 'No Annual Fee (1st Year)',
        description:
          'Enjoy all premium benefits with zero annual fee for the first year. Regular annual fee of NT$2,000 thereafter.',
        iconBg: 'linear-gradient(135deg, #D1FAE5, #6EE7B7)',
        iconStroke: '#059669',
        iconSvg:
          '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
      },
      {
        title: 'Purchase Protection',
        description:
          '90-day purchase protection on eligible items. Extended warranty adds up to 1 additional year of coverage.',
        iconBg: 'linear-gradient(135deg, #EDE9FE, #C4B5FD)',
        iconStroke: '#7C3AED',
        iconSvg:
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      },
      {
        title: 'Contactless Payment',
        description:
          'Tap to pay with Mastercard contactless. Works with Apple Pay, Google Pay, and Samsung Pay.',
        iconBg: 'linear-gradient(135deg, #FEE2E2, #FCA5A5)',
        iconStroke: '#DC2626',
        iconSvg:
          '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
      },
    ],
  },

  // ─── Overseas Spending ───
  overseas: {
    badge: 'Best for Travel',
    title: 'Horizon<br/>Mastercard<span style="color:#0EA5E9;">®</span> World',
    description:
      'Earn up to 5% cashback on overseas spending. Complimentary access to 1,300+ airport lounges worldwide, travel insurance up to NT$20M, and zero foreign transaction fees.',
    stats: [
      { value: '5%', label: 'Overseas Spending', color: '#0EA5E9' },
      { value: '3%', label: 'Travel Bookings', color: '#38BDF8' },
      { value: '1%', label: 'Domestic', color: '#fff' },
    ],
    heroBg: 'linear-gradient(135deg, #0c2d48 0%, #0a3d62 50%, #1a6e8e 100%)',
    decorCircle1: 'rgba(14,165,233,0.1)',
    decorCircle2: 'rgba(56,189,248,0.07)',
    cardGradient: 'linear-gradient(135deg, #0c2d48, #1a5276)',
    heroIcons: [
      '<svg style="position:absolute;top:-20px;right:20px;opacity:0.2;" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      '<svg style="position:absolute;bottom:-10px;left:-30px;opacity:0.15;" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      '<svg style="position:absolute;top:40px;left:-35px;opacity:0.18;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7DD3FC" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      '<svg style="position:absolute;bottom:30px;right:-20px;opacity:0.15;" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    ].join(''),
    bannerBg: 'linear-gradient(90deg, #0284C7, #0EA5E9)',
    bannerText: 'Limited Time: Up to 5% cashback on overseas spending + complimentary airport transfers',
    bannerCta: 'Apply Now',
    benefitsSubtitle: 'Travel Essentials',
    benefitsTitle: 'Your Best Travel Companion',
    benefitsDescription:
      'From airport lounges to overseas cashback, Horizon Mastercard World makes every trip more rewarding.',
    benefits: [
      {
        title: '5% Overseas Cashback',
        description:
          'Earn up to 5% cashback on all overseas purchases — no spending cap, automatically credited to your statement.',
        iconBg: 'linear-gradient(135deg, #E0F2FE, #7DD3FC)',
        iconStroke: '#0284C7',
        iconSvg:
          '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      },
      {
        title: 'Airport Lounge Access',
        description:
          'Complimentary access to 1,300+ airport lounges worldwide with Priority Pass membership included.',
        iconBg: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
        iconStroke: '#2563EB',
        iconSvg:
          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
      },
      {
        title: 'Travel Insurance',
        description:
          'Automatic coverage for flight delays and lost baggage. Travel inconvenience insurance up to NT$20M.',
        iconBg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        iconStroke: '#D97706',
        iconSvg:
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      },
      {
        title: 'Zero FX Fees',
        description:
          'Enjoy preferential exchange rates with full rebate on cross-border transaction fees.',
        iconBg: 'linear-gradient(135deg, #D1FAE5, #6EE7B7)',
        iconStroke: '#059669',
        iconSvg:
          '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      },
      {
        title: 'Global Emergency Support',
        description:
          '24/7 emergency card replacement and cash advance services worldwide — peace of mind wherever you go.',
        iconBg: 'linear-gradient(135deg, #FCE7F3, #F9A8D4)',
        iconStroke: '#DB2777',
        iconSvg:
          '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
      },
      {
        title: 'Contactless Payment',
        description:
          'Tap to pay with Apple Pay and Google Pay — no need to carry your wallet while traveling abroad.',
        iconBg: 'linear-gradient(135deg, #EDE9FE, #C4B5FD)',
        iconStroke: '#7C3AED',
        iconSvg:
          '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
      },
    ],
  },

  // ─── Online Shopping ───
  shopping: {
    badge: 'Best for Shopping',
    title: 'Horizon<br/>Mastercard<span style="color:#A855F7;">®</span> World',
    description:
      'Earn up to 5% cashback on online purchases and 3% on streaming subscriptions. Virtual card numbers, purchase protection, and free return shipping — the card built for online shoppers.',
    stats: [
      { value: '5%', label: 'Online Shopping', color: '#A855F7' },
      { value: '3%', label: 'Streaming', color: '#C084FC' },
      { value: '1%', label: 'Everything Else', color: '#fff' },
    ],
    heroBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    decorCircle1: 'rgba(168,85,247,0.1)',
    decorCircle2: 'rgba(192,132,252,0.07)',
    cardGradient: 'linear-gradient(135deg, #1e1b4b, #3b0764)',
    heroIcons: [
      '<svg style="position:absolute;top:-15px;right:15px;opacity:0.18;" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
      '<svg style="position:absolute;bottom:-5px;left:-30px;opacity:0.15;" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#A855F7" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      '<svg style="position:absolute;top:50px;left:-30px;opacity:0.18;" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D8B4FE" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      '<svg style="position:absolute;bottom:35px;right:-15px;opacity:0.15;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    ].join(''),
    bannerBg: 'linear-gradient(90deg, #7C3AED, #A855F7)',
    bannerText: 'Limited Time: Up to 5% cashback on online shopping + free return shipping coverage',
    bannerCta: 'Apply Now',
    benefitsSubtitle: 'Shop Smarter',
    benefitsTitle: 'Built for Online Shoppers',
    benefitsDescription:
      'From e-commerce platforms to streaming subscriptions, Horizon Mastercard World rewards every online purchase.',
    benefits: [
      {
        title: '5% Online Cashback',
        description:
          'Earn up to 5% cashback on all online purchases — e-commerce, marketplaces, and digital services.',
        iconBg: 'linear-gradient(135deg, #F3E8FF, #D8B4FE)',
        iconStroke: '#7C3AED',
        iconSvg:
          '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
      },
      {
        title: '3% Streaming Rewards',
        description:
          'Netflix, Spotify, YouTube Premium and more — earn 3% cashback on all streaming subscriptions.',
        iconBg: 'linear-gradient(135deg, #EDE9FE, #C4B5FD)',
        iconStroke: '#8B5CF6',
        iconSvg:
          '<polygon points="5 3 19 12 5 21 5 3"/>',
      },
      {
        title: 'Virtual Card Numbers',
        description:
          'Generate virtual card numbers instantly for safer online transactions — protect your real card details.',
        iconBg: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
        iconStroke: '#2563EB',
        iconSvg:
          '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      },
      {
        title: 'Free Return Shipping',
        description:
          'Return shipping cost coverage up to 12 times per year, with a maximum of NT$500 per return.',
        iconBg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        iconStroke: '#D97706',
        iconSvg:
          '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
      },
      {
        title: 'Purchase Protection',
        description:
          '90-day purchase protection on online orders — claim if items are not delivered or differ from description.',
        iconBg: 'linear-gradient(135deg, #D1FAE5, #6EE7B7)',
        iconStroke: '#059669',
        iconSvg:
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      },
      {
        title: 'Mobile Payments',
        description:
          'Works with Apple Pay and Google Pay — seamless checkout online and in-store.',
        iconBg: 'linear-gradient(135deg, #FCE7F3, #F9A8D4)',
        iconStroke: '#DB2777',
        iconSvg:
          '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
      },
    ],
  },

  // ─── Dining ───
  dining: {
    badge: 'Best for Dining',
    title: 'Horizon<br/>Mastercard<span style="color:#F97316;">®</span> World',
    description:
      'Earn up to 5% cashback on dining and 3% on food delivery. Exclusive restaurant deals, gourmet event invitations — the ultimate card for food lovers.',
    stats: [
      { value: '5%', label: 'Dining', color: '#F97316' },
      { value: '3%', label: 'Food Delivery', color: '#FB923C' },
      { value: '1%', label: 'Everything Else', color: '#fff' },
    ],
    heroBg: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%)',
    decorCircle1: 'rgba(249,115,22,0.12)',
    decorCircle2: 'rgba(251,146,60,0.08)',
    cardGradient: 'linear-gradient(135deg, #431407, #78350f)',
    heroIcons: [
      '<svg style="position:absolute;top:-18px;right:20px;opacity:0.18;" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
      '<svg style="position:absolute;bottom:-8px;left:-28px;opacity:0.15;" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      '<svg style="position:absolute;top:45px;left:-32px;opacity:0.18;" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FDBA74" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      '<svg style="position:absolute;bottom:30px;right:-18px;opacity:0.15;" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 3 20 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="13.5" cy="18.5" r="2.5"/></svg>',
    ].join(''),
    bannerBg: 'linear-gradient(90deg, #EA580C, #F97316)',
    bannerText: 'Limited Time: Up to 5% cashback on dining + 15% off at selected restaurants',
    bannerCta: 'Apply Now',
    benefitsSubtitle: 'For Foodies',
    benefitsTitle: 'The Ultimate Dining Companion',
    benefitsDescription:
      'From fine dining to food delivery, Horizon Mastercard World maximizes your rewards on every meal.',
    benefits: [
      {
        title: '5% Dining Cashback',
        description:
          'Earn up to 5% cashback at restaurants, cafes, and bars — no spending cap, automatically credited.',
        iconBg: 'linear-gradient(135deg, #FFEDD5, #FDBA74)',
        iconStroke: '#EA580C',
        iconSvg:
          '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
      },
      {
        title: '3% Food Delivery',
        description:
          'Uber Eats, foodpanda, Deliveroo and more — earn 3% cashback on all food delivery orders.',
        iconBg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        iconStroke: '#D97706',
        iconSvg:
          '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 3 20 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="13.5" cy="18.5" r="2.5"/>',
      },
      {
        title: '15% Off Selected Restaurants',
        description:
          'Exclusive 15% discount at 500+ partner restaurants — unlimited uses every month.',
        iconBg: 'linear-gradient(135deg, #FCE7F3, #F9A8D4)',
        iconStroke: '#DB2777',
        iconSvg:
          '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
      },
      {
        title: 'Gourmet Events',
        description:
          'Exclusive invitations to Michelin restaurant wine tastings, chef\'s table nights, and culinary events.',
        iconBg: 'linear-gradient(135deg, #D1FAE5, #6EE7B7)',
        iconStroke: '#059669',
        iconSvg:
          '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      },
      {
        title: 'No Minimum Spend',
        description:
          'No minimum purchase required — earn cashback on everything from a coffee to a fine dining experience.',
        iconBg: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
        iconStroke: '#2563EB',
        iconSvg:
          '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      },
      {
        title: 'Instant Notifications',
        description:
          'Real-time push notifications for every transaction — track your cashback earnings at a glance.',
        iconBg: 'linear-gradient(135deg, #EDE9FE, #C4B5FD)',
        iconStroke: '#7C3AED',
        iconSvg:
          '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
      },
    ],
  },
};
