import type { AccessPolicy } from './access-policy.interface.js';

export class PremiumAccessPolicy implements AccessPolicy {
  readonly name = 'premium' as const;

  canAccess(): boolean {
    return true;
  }
}
