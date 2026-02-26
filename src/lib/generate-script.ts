import type { UseCaseId } from './config-schemas';
import { generatePopupDialogScript } from './script-templates/popup-dialog';
import { generateStickyBannerScript } from './script-templates/sticky-banner';
import { generateCountdownOfferScript } from './script-templates/countdown-offer';
import { generateMiniPollScript } from './script-templates/mini-poll';
import { generateExitIntentScript } from './script-templates/exit-intent';
import { generateFloatingButtonScript } from './script-templates/floating-button';
import { generateSocialProofScript } from './script-templates/social-proof';
import { generateDyScriptScript } from './script-templates/dy-script';

const generators: Record<UseCaseId, (config: any) => string> = {
  'popup-dialog': generatePopupDialogScript,
  'sticky-banner': generateStickyBannerScript,
  'countdown-offer': generateCountdownOfferScript,
  'mini-poll': generateMiniPollScript,
  'exit-intent': generateExitIntentScript,
  'floating-button': generateFloatingButtonScript,
  'social-proof': generateSocialProofScript,
  'dy-script': generateDyScriptScript,
};

export function generateScript(id: UseCaseId, config: Record<string, any>): string {
  const generator = generators[id];
  if (!generator) throw new Error(`Unknown use case: ${id}`);
  return generator(config);
}
