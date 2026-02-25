import { z } from 'astro/zod';

// UI metadata for rendering config panel controls
export interface FieldMeta {
  label: string;
  type: 'text' | 'textarea' | 'color' | 'select' | 'radio' | 'number' | 'url';
  options?: { label: string; value: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  /** Show this field in the sidebar config panel. Defaults to false. */
  sidebar?: boolean;
}

// --- Popup Dialog ---
export const popupDialogSchema = z.object({
  title: z.string().default('Exclusive Card Offer'),
  message: z.string().default('Apply now and enjoy 3% unlimited cashback on all spending for the first 3 months.'),
  buttonText: z.string().default('Apply Now'),
  buttonUrl: z.string().url().default('https://www.mastercard.com'),
  bgColor: z.string().default('#ffffff'),
  textColor: z.string().default('#1f2937'),
  buttonBgColor: z.string().default('#ea580c'),
  buttonTextColor: z.string().default('#ffffff'),
  overlayColor: z.string().default('rgba(0,0,0,0.5)'),
  delaySeconds: z.number().min(0).max(30).default(1),
  matchUrl: z.string().default('*'),
});

export type PopupDialogConfig = z.infer<typeof popupDialogSchema>;

export const popupDialogMeta: Record<keyof PopupDialogConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  buttonBgColor: { label: 'Primary Color', type: 'color', sidebar: true },
  buttonUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  title: { label: 'Title', type: 'text', placeholder: 'Dialog title' },
  message: { label: 'Message', type: 'textarea', placeholder: 'Main message content' },
  buttonText: { label: 'Button Text', type: 'text', placeholder: 'CTA button text' },
  bgColor: { label: 'Background Color', type: 'color' },
  textColor: { label: 'Text Color', type: 'color' },
  buttonTextColor: { label: 'Button Text Color', type: 'color' },
  overlayColor: { label: 'Overlay Color', type: 'text', placeholder: 'rgba(0,0,0,0.5)' },
  delaySeconds: { label: 'Delay (seconds)', type: 'number', min: 0, max: 30 },
};

// --- Sticky Banner ---
export const stickyBannerSchema = z.object({
  message: z.string().default('New cardholders enjoy NT$500 welcome bonus — Limited time only'),
  linkText: z.string().default('Apply Now'),
  linkUrl: z.string().url().default('https://www.mastercard.com'),
  position: z.enum(['top', 'bottom']).default('top'),
  bgColor: z.string().default('#ea580c'),
  textColor: z.string().default('#ffffff'),
  linkColor: z.string().default('#fbbf24'),
  showCloseButton: z.enum(['yes', 'no']).default('yes'),
  matchUrl: z.string().default('*'),
});

export type StickyBannerConfig = z.infer<typeof stickyBannerSchema>;

export const stickyBannerMeta: Record<keyof StickyBannerConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  bgColor: { label: 'Primary Color', type: 'color', sidebar: true },
  linkUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  message: { label: 'Message', type: 'text', placeholder: 'Banner message' },
  linkText: { label: 'Link Text', type: 'text', placeholder: 'CTA link text' },
  position: {
    label: 'Position',
    type: 'select',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
    ],
  },
  textColor: { label: 'Text Color', type: 'color' },
  linkColor: { label: 'Link Color', type: 'color' },
  showCloseButton: {
    label: 'Close Button',
    type: 'select',
    options: [
      { label: 'Show', value: 'yes' },
      { label: 'Hide', value: 'no' },
    ],
  },
};

// --- Countdown Offer ---
export const countdownOfferSchema = z.object({
  offerTitle: z.string().default('New Card Bonus'),
  cashbackAmount: z.string().default('NT$3,000'),
  subtitle: z.string().default('Apply now and get rewarded!'),
  ctaText: z.string().default('Apply Now'),
  ctaUrl: z.string().default('https://www.mastercard.com'),
  countdownMinutes: z.number().min(1).max(525600).default(443520),
  primaryColor: z.string().default('#ea580c'),
  socialProofEnabled: z.enum(['yes', 'no']).default('yes'),
  socialProofCount: z.number().min(0).max(99999).default(1247),
  socialProofText: z.string().default('people applied this month'),
  matchUrl: z.string().default('*'),
});

export type CountdownOfferConfig = z.infer<typeof countdownOfferSchema>;

export const countdownOfferMeta: Record<keyof CountdownOfferConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  primaryColor: { label: 'Primary Color', type: 'color', sidebar: true },
  ctaUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  offerTitle: { label: 'Offer Title', type: 'text', placeholder: 'Offer name' },
  cashbackAmount: { label: 'Cashback Amount', type: 'text', placeholder: 'NT$2,000' },
  subtitle: { label: 'Subtitle', type: 'text', placeholder: 'Sub message' },
  ctaText: { label: 'CTA Button', type: 'text', placeholder: 'Button text' },
  countdownMinutes: { label: 'Countdown (min)', type: 'number', min: 1, max: 525600 },
  socialProofEnabled: {
    label: 'Social Proof',
    type: 'select',
    options: [
      { label: 'Show', value: 'yes' },
      { label: 'Hide', value: 'no' },
    ],
  },
  socialProofCount: { label: 'Proof Count', type: 'number', min: 0, max: 99999 },
  socialProofText: { label: 'Proof Text', type: 'text', placeholder: 'people applied this week' },
};

// --- Mini Poll ---
export const miniPollSchema = z.object({
  title: z.string().default('Find Your Perfect Card'),
  subtitle: z.string().default('Tell us about yourself for a personalized card recommendation'),
  questionText: z.string().default('What matters most to you?'),
  submitText: z.string().default('See My Recommended Card'),
  tooltipText: z.string().default('Find my ideal card'),
  option1Label: z.string().default('Cashback on Dining'),
  option2Label: z.string().default('Travel Miles & Rewards'),
  option3Label: z.string().default('Online Shopping Perks'),
  option4Label: z.string().default('Low Annual Fee'),
  ctaUrl: z.string().default('https://www.mastercard.com'),
  primaryColor: z.string().default('#ea580c'),
  buttonPosition: z.enum(['bottom-left', 'bottom-right']).default('bottom-left'),
  delaySeconds: z.number().min(0).max(30).default(2),
  matchUrl: z.string().default('*'),
});

export type MiniPollConfig = z.infer<typeof miniPollSchema>;

export const miniPollMeta: Record<keyof MiniPollConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  primaryColor: { label: 'Primary Color', type: 'color', sidebar: true },
  ctaUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  title: { label: 'Title', type: 'text', placeholder: 'Quiz title' },
  subtitle: { label: 'Subtitle', type: 'text', placeholder: 'Subtitle text' },
  questionText: { label: 'Question', type: 'text', placeholder: 'Main question' },
  submitText: { label: 'Submit Button', type: 'text', placeholder: 'Submit text' },
  tooltipText: { label: 'Tooltip Text', type: 'text', placeholder: 'Floating button tooltip' },
  option1Label: { label: 'Option 1', type: 'text', placeholder: 'First option' },
  option2Label: { label: 'Option 2', type: 'text', placeholder: 'Second option' },
  option3Label: { label: 'Option 3', type: 'text', placeholder: 'Third option' },
  option4Label: { label: 'Option 4', type: 'text', placeholder: 'Fourth option' },
  buttonPosition: {
    label: 'Button Position',
    type: 'select',
    options: [
      { label: 'Bottom Left', value: 'bottom-left' },
      { label: 'Bottom Right', value: 'bottom-right' },
    ],
  },
  delaySeconds: { label: 'Show Delay (sec)', type: 'number', min: 0, max: 30 },
};

// --- Exit Intent ---
export const exitIntentSchema = z.object({
  title: z.string().default('Wait! Don\'t Miss This Offer'),
  message: z.string().default('Apply today and receive NT$1,000 cashback on your first purchase. This exclusive offer expires soon!'),
  imageUrl: z.string().default('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop&crop=center'),
  buttonText: z.string().default('Apply & Get Cashback'),
  buttonUrl: z.string().url().default('https://www.mastercard.com'),
  bgColor: z.string().default('#ffffff'),
  textColor: z.string().default('#1f2937'),
  buttonBgColor: z.string().default('#ea580c'),
  buttonTextColor: z.string().default('#ffffff'),
  overlayColor: z.string().default('rgba(0,0,0,0.6)'),
  showOnce: z.enum(['once', 'every']).default('once'),
  matchUrl: z.string().default('*'),
});

export type ExitIntentConfig = z.infer<typeof exitIntentSchema>;

export const exitIntentMeta: Record<keyof ExitIntentConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  buttonBgColor: { label: 'Primary Color', type: 'color', sidebar: true },
  buttonUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  showOnce: {
    label: 'Trigger Frequency',
    type: 'radio',
    sidebar: true,
    options: [
      { label: 'Once per Session', value: 'once' },
      { label: 'Every Time', value: 'every' },
    ],
  },
  title: { label: 'Title', type: 'text', placeholder: 'Dialog title' },
  message: { label: 'Message', type: 'textarea', placeholder: 'Main message' },
  imageUrl: { label: 'Image URL', type: 'url', placeholder: 'https://...' },
  buttonText: { label: 'Button Text', type: 'text', placeholder: 'CTA button text' },
  bgColor: { label: 'Background Color', type: 'color' },
  textColor: { label: 'Text Color', type: 'color' },
  buttonTextColor: { label: 'Button Text Color', type: 'color' },
  overlayColor: { label: 'Overlay Color', type: 'text', placeholder: 'rgba(0,0,0,0.6)' },
};

// --- Floating Button ---
export const floatingButtonSchema = z.object({
  buttonText: z.string().default('Apply Now'),
  buttonUrl: z.string().url().default('https://www.mastercard.com'),
  bgColor: z.string().default('#ea580c'),
  textColor: z.string().default('#ffffff'),
  position: z.enum(['bottom-right', 'bottom-left']).default('bottom-right'),
  matchUrl: z.string().default('*'),
});

export type FloatingButtonConfig = z.infer<typeof floatingButtonSchema>;

export const floatingButtonMeta: Record<keyof FloatingButtonConfig, FieldMeta> = {
  matchUrl: { label: 'URL to Demo', type: 'text', placeholder: '*', sidebar: true },
  bgColor: { label: 'Primary Color', type: 'color', sidebar: true },
  buttonUrl: { label: 'Apply Now URL', type: 'url', placeholder: 'https://www.mastercard.com', sidebar: true },
  position: {
    label: 'Position',
    type: 'radio',
    sidebar: true,
    options: [
      { label: 'Bottom Right', value: 'bottom-right' },
      { label: 'Bottom Left', value: 'bottom-left' },
    ],
  },
  buttonText: { label: 'Button Text', type: 'text', placeholder: 'Apply Now' },
  textColor: { label: 'Text Color', type: 'color' },
};

// Registry
export const schemas = {
  'popup-dialog': { schema: popupDialogSchema, meta: popupDialogMeta },
  'sticky-banner': { schema: stickyBannerSchema, meta: stickyBannerMeta },
  'countdown-offer': { schema: countdownOfferSchema, meta: countdownOfferMeta },
  'mini-poll': { schema: miniPollSchema, meta: miniPollMeta },
  'exit-intent': { schema: exitIntentSchema, meta: exitIntentMeta },
  'floating-button': { schema: floatingButtonSchema, meta: floatingButtonMeta },
} as const;

export type UseCaseId = keyof typeof schemas;

/** Which config key holds the "primary color" for each use case */
export const primaryColorKey: Record<UseCaseId, string> = {
  'popup-dialog': 'buttonBgColor',
  'sticky-banner': 'bgColor',
  'countdown-offer': 'primaryColor',
  'mini-poll': 'primaryColor',
  'exit-intent': 'buttonBgColor',
  'floating-button': 'bgColor',
};

/** Which config key holds the CTA destination URL for each use case */
export const ctaUrlKey: Record<UseCaseId, string> = {
  'popup-dialog': 'buttonUrl',
  'sticky-banner': 'linkUrl',
  'countdown-offer': 'ctaUrl',
  'mini-poll': 'ctaUrl',
  'exit-intent': 'buttonUrl',
  'floating-button': 'buttonUrl',
};
