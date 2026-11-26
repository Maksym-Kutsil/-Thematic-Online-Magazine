import { SubscriptionPlan } from '../entities/subscription-plan.enum.js';
import type { AccessPolicy } from './access-policy.interface.js';
import { FreeAccessPolicy } from './free-access-policy.js';
import { PremiumAccessPolicy } from './premium-access-policy.js';

/**
 * Factory Method (GoF): creates the AccessPolicy strategy that matches a
 * subscription plan, so callers never instantiate a concrete policy directly.
 */
export class AccessPolicyFactory {
  static createFor(plan: SubscriptionPlan): AccessPolicy {
    switch (plan) {
      case SubscriptionPlan.PREMIUM:
        return new PremiumAccessPolicy();
      case SubscriptionPlan.FREE:
        return new FreeAccessPolicy();
    }
  }
}
