import type { UseCaseId } from './config-schemas';
import { generatePopupDialogScript } from './script-templates/popup-dialog';
import { generateStickyBannerScript } from './script-templates/sticky-banner';
import { generateCountdownOfferScript } from './script-templates/countdown-offer';
import { generateMiniPollScript } from './script-templates/mini-poll';
import { generateExitIntentScript } from './script-templates/exit-intent';

const generators: Record<UseCaseId, (config: any) => string> = {
  'popup-dialog': generatePopupDialogScript,
  'sticky-banner': generateStickyBannerScript,
  'countdown-offer': generateCountdownOfferScript,
  'mini-poll': generateMiniPollScript,
  'exit-intent': generateExitIntentScript,
};

export function generateScript(id: UseCaseId, config: Record<string, any>): string {
  const generator = generators[id];
  if (!generator) throw new Error(`Unknown use case: ${id}`);
  return generator(config);
}
