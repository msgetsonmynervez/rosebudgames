/**
 * CombatAI — Fully offline combat decisions and narration
 *
 * All methods remain async so CombatManager requires no changes.
 * AI calls have been replaced with:
 *   - Deterministic fallback logic for enemy decisions
 *   - Pre-written narration tables (NarrationData.js) for all narration
 *
 * The chatManager parameter is accepted but never used; it can be null.
 */

import { getEnemyAttackNarration, getPlayerActionNarration } from './narration/FallbackNarration.js';
import {
    getRandomPlayerNarration,
    getRandomEnemyNarration,
    getRandomEnemySpecialNarration,
} from './narration/NarrationData.js';

export class CombatAI {
    /**
     * @param {*} chatManager - Ignored. Kept for interface compatibility.
     */
    constructor(chatManager) {
        // chatManager intentionally unused — game runs fully offline
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Enemy Decision
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Decide the enemy's next action using deterministic offline logic.
     * @returns {Promise<{ action_id: string, target: string }>}
     */
    async getEnemyDecision(enemyData, combatState, party) {
        return this._offlineDecision(enemyData, combatState, party);
    }

    _offlineDecision(enemyData, combatState, party) {
        const cooldowns = combatState.enemy?.cooldowns || {};
        const available = enemyData.attacks.filter(
            a => !a.cooldown || cooldowns[a.id] === 0
        );

        // Guard: if everything is on cooldown, use first attack ignoring cooldown
        if (!available.length) {
            const first = enemyData.attacks[0];
            if (!first) return { action_id: null, target: null };
            return { action_id: first.id, target: first.targeting || 'random' };
        }

        // Honour the configured opening move on round 1
        if (combatState.round === 1 && enemyData.tactics?.openingMove) {
            const opener = available.find(a => a.id === enemyData.tactics.openingMove);
            if (opener) return { action_id: opener.id, target: opener.targeting || 'random' };
        }

        // Low-health desperation: prefer highest-damage attack
        const enemyHpPct = combatState.enemy.currentHealth / combatState.enemy.maxHealth;
        if (enemyHpPct <= 0.3) {
            const hardest = available
                .filter(a => a.damage)
                .sort((a, b) => (b.damage || 0) - (a.damage || 0))[0];
            if (hardest) return { action_id: hardest.id, target: hardest.targeting || 'random' };
        }

        // Default: first damaging attack available
        const damaging = available.find(a => a.damage) || available[0];
        return {
            action_id: damaging.id,
            target: damaging.targeting || 'random',
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Narration
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Narration for an enemy attack.
     * @returns {Promise<string>}
     */
    async getEnemyActionNarration(enemyData, decision, party, resolvedTargetName, context = {}) {
        const attack = enemyData.attacks.find(a => a.id === decision.action_id);
        if (!attack) return `${enemyData.shortName} attacks!`;

        const targetName = resolvedTargetName
            || party.find(p => p.id === decision.target)?.name
            || decision.target
            || 'the party';

        // Try rich table first
        const rich = getRandomEnemyNarration(attack.id, targetName);
        if (rich) return rich;

        // Generic fallback
        return getEnemyAttackNarration({
            enemyName: enemyData.shortName,
            attackName: attack.name,
            targetName,
            damage: attack.damage,
            effect: attack.effect || attack.bonusEffect,
        });
    }

    /**
     * Narration for a player ability outcome.
     * @returns {Promise<string>}
     */
    async getPlayerOutcomeNarration(character, ability, rollResult, enemyData, context = {}) {
        // Try rich table first
        const rich = getRandomPlayerNarration(ability.id, rollResult.tier);
        if (rich) return rich;

        // Generic fallback
        return getPlayerActionNarration({
            characterName: character.name,
            abilityName: ability.name,
            tier: rollResult.tier,
            damage: ability.damage,
            effect: ability.effect,
        });
    }

    /**
     * Narration for an enemy special ability activation (buffs, transforms, etc.).
     * @returns {Promise<string>}
     */
    async getEnemySpecialNarration(enemyData, ability) {
        const rich = getRandomEnemySpecialNarration(ability.id, enemyData.shortName);
        if (rich) return rich;

        const effectDesc = ability.effect?.description || ability.description || '';
        return `${enemyData.shortName} activates ${ability.name}! ${effectDesc}`.trim();
    }

    /**
     * Narration for a companion attack.
     * @returns {Promise<string>}
     */
    async getCompanionNarration(companion, attack, targetName, context = {}) {
        // Companions use the same enemy narration table (shared attack IDs)
        const rich = getRandomEnemyNarration(attack.id, targetName);
        if (rich) return rich;

        return `${companion.name} attacks with ${attack.name}!`;
    }
}
