export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export const useCases: UseCase[] = [
  {
    id: 'popup-dialog',
    title: 'Popup Dialog',
    description:
      'A customizable modal dialog that appears on page load or after a delay. Great for promotions, announcements, or lead capture.',
    icon: '💬',
    tags: ['modal', 'promotion', 'lead-capture'],
  },
  {
    id: 'sticky-banner',
    title: 'Sticky Banner',
    description:
      'A fixed banner that stays at the top or bottom of the viewport. Ideal for announcements, cookie notices, or promotional messages.',
    icon: '📢',
    tags: ['banner', 'announcement', 'sticky'],
  },
  {
    id: 'countdown-offer',
    title: 'Countdown Bar',
    description:
      'Fixed bottom countdown timer bar with social proof, cashback badge, and CTA. Perfect for limited-time offers and promotions.',
    icon: '⏱️',
    tags: ['countdown', 'urgency', 'social-proof', 'cashback'],
  },
  {
    id: 'mini-poll',
    title: 'Mini Poll',
    description:
      'A floating button that triggers a multi-select persona quiz. Captures user preferences for personalized experiences.',
    icon: '📋',
    tags: ['poll', 'persona', 'quiz', 'floating-button'],
  },
  {
    id: 'exit-intent',
    title: 'Exit Intent',
    description:
      'A dialog that appears when the user moves their mouse out of the viewport. Features a left-image, right-text layout with a CTA button.',
    icon: '🚪',
    tags: ['exit-intent', 'modal', 'retention', 'mouseleave'],
  },
  {
    id: 'floating-button',
    title: 'Floating Button',
    description:
      'A fixed floating CTA button that stays in the corner of the viewport. Simple and effective for persistent call-to-action.',
    icon: '🔘',
    tags: ['floating', 'cta', 'button', 'fixed'],
  },
  {
    id: 'social-proof',
    title: 'Social Proof',
    description:
      'A floating CTA button with a chat bubble showing how many people have already applied. Builds trust and urgency.',
    icon: '👥',
    tags: ['social-proof', 'floating', 'cta', 'trust'],
  },
  {
    id: 'dy-script',
    title: 'DY Script',
    description:
      'Inject DynamicYield scripts into a target page for testing. No visual UI — configure Session ID and target URL.',
    icon: '🧪',
    tags: ['dynamic-yield', 'script', 'testing', 'injection'],
  },
  {
    id: 'scratch-card',
    title: 'Scratch Card',
    description:
      'A gamified scratch card popup that reveals a hidden offer. Users scratch to uncover rewards and get a CTA to claim.',
    icon: '🎰',
    tags: ['scratch-card', 'gamification', 'popup', 'offer'],
  },
  {
    id: 'spin-wheel',
    title: 'Spin Wheel',
    description:
      'A lucky spin wheel popup with 5 prize slots. Users spin to win a reward and receive a redemption code to copy.',
    icon: '🎡',
    tags: ['spin-wheel', 'gamification', 'popup', 'lucky-draw'],
  },
];
