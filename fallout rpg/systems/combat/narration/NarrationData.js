/**
 * NarrationData.js — Static offline narration tables for Signal & Noise: An MS Journey
 *
 * Organised as:
 *   PLAYER_NARRATION[abilityId][tier]  → string[]  (2–3 variants, picked randomly)
 *   ENEMY_NARRATION[attackId]          → string[]  ({target} placeholder substituted at call time)
 *   ENEMY_SPECIAL_NARRATION[abilityId] → string[]
 *
 * Fallout originals are kept so the game still narrates while the manifest is being converted.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Pick a random element from an array */
export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** Replace {target} and {enemy} placeholders */
function fill(str, subs = {}) {
    return str
        .replace(/{target}/g, subs.target || 'the target')
        .replace(/{enemy}/g, subs.enemy || 'the enemy')
        .replace(/{character}/g, subs.character || 'the character');
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYER NARRATION
// Keys match ability IDs in manifest.js
// ─────────────────────────────────────────────────────────────────────────────

const PLAYER_NARRATION = {

    // ── Alex Chen ─────────────────────────────────────────────────────────────

    speak_up: {
        critical: [
            "Alex speaks with absolute clarity — not loud, just certain. Every word lands exactly where it needs to. The symptom has no answer for someone this present in their own experience. It falters.",
            "Something shifts in the room. Alex has found the precise words at the precise moment, and the effect is immediate. This is what self-advocacy at full power looks like. The Fog doesn't know what to do with certainty.",
        ],
        success: [
            "Alex holds the ground and names exactly what is happening. Not perfectly, but clearly enough. The symptom loses some of its purchase when it's called directly by its name.",
            "The words come. Alex gets the key thing said, and it registers. The Fog has no counter for straightforward, documented truth.",
        ],
        partial: [
            "The point lands, but slowly — some of it arrives and some of it gets lost in the interference. Alex got enough through. It will have to be enough for now.",
            "Alex manages the core of what needs saying, even if the edges stay blurry. Half a signal still carries information. The symptom is not unaffected.",
        ],
        failure: [
            "The sentence starts and then dissolves. The Fog is in the words today — they are there somewhere but they will not organize into anything usable. Alex closes their mouth. This round belongs to the symptom.",
            "Alex reaches for the right words and finds static. Not silence, not absence — just interference where there should be signal. The Fog wins this exchange. Not the fight.",
        ],
    },

    determined_push: {
        critical: [
            "Everything Alex has been building toward — the diagnosis, the 3am research spirals, the appointments, the waiting — converts into one absolutely directed act of defiance. It lands like a door closing on the symptom. THWAM. That was everything.",
            "Alex decides, and the deciding is the action. Eight months of learning to live in this body with this disease, and this is what that knowledge becomes: force, directed, total. The symptom staggers like it wasn't expecting that. It wasn't.",
        ],
        success: [
            "Alex pushes through. Not elegantly — through. The symptom absorbs the hit and takes damage anyway. Determination doesn't need to be graceful to be effective.",
            "The determined push lands. It costs Alex something real, and the symptom pays for that cost. The math is acceptable.",
        ],
        partial: [
            "There's push left in Alex, just not quite the full amount this round. The symptom takes partial damage and Alex takes partial credit. Both are true.",
            "Alex pushes, and most of it lands. The symptom is hurt. Alex is tired. Both things are temporary.",
        ],
        failure: [
            "Alex reaches for the push and finds exhaustion instead. Not defeat — there is a specific difference between exhausted and defeated, and Alex knows it well. This round: exhausted.",
            "The determined push doesn't materialize this turn. Alex notes it, adjusts, prepares the next approach. Fatigue is a fact about this disease, not a fact about this person.",
        ],
    },

    adaptive_strategy: {
        critical: [
            "Everything clicks. A new approach emerges that works better than the old one ever did — built around actual constraints, not the ones that used to apply. The whole team feels the shift. The Fog finds purchase nowhere.",
            "Alex maps a route around the obstacle that no one had charted before, because no one had needed to before. That's the thing about adaptive strategy: it's always new. It works completely.",
        ],
        success: [
            "Alex finds the workaround. It costs something to think this clearly right now, but the protective framework settles around the team. This is experience converting to technique.",
            "The adaptive strategy deploys. Not the plan from before the diagnosis — a better one, built for actual conditions. The team is protected.",
        ],
        partial: [
            "The strategy partially lands. Some of the protection holds; some dissipates before it can anchor. A partial shield is still a shield.",
            "Alex's approach gets most of the way there. The team has some cover. Next round: refine.",
        ],
        failure: [
            "The strategy is there in Alex's mind in full detail — and will not come out in any usable order. The Fog wins on tactics this round. Alex files away what didn't work.",
            "The adaptive strategy misfires. This happens. Alex notes the conditions, begins recalculating.",
        ],
    },

    // ── Dr. Priya Okafor ───────────────────────────────────────────────────────

    clinical_assessment: {
        critical: [
            "Dr. Okafor identifies the exact point where the pathology is most vulnerable and targets it with the specific, unhurried confidence of twenty years of clinical practice. The intervention is precise and total. CLICK. That's what evidence-based looks like.",
            "'There.' Dr. Okafor's assessment is complete, her intervention exact. Twenty years of MS neurology focused to a point. The mechanism doesn't have a defense against someone who has read every paper about it.",
        ],
        success: [
            "The assessment identifies the right target. The intervention follows logically. Dr. Okafor doesn't celebrate — she logs the result and prepares the next step.",
            "Clean clinical targeting. The intervention lands where it was directed. Dr. Okafor files this data point and moves forward.",
        ],
        partial: [
            "The assessment is correct; the targeting is close. The intervention partially registers. In Dr. Okafor's experience, partial response narrows the differential — it's still useful data.",
            "Dr. Okafor's intervention lands at partial effectiveness. She notes the resistance pattern. This is how medicine works: hypothesis, test, adjust.",
        ],
        failure: [
            "Even Dr. Okafor's assessment can be confounded by a sufficiently complex pathology. She notes the failure mode with the same precision she notes everything else. The next approach is already forming.",
            "The clinical assessment misses its mark. Dr. Okafor accepts this with equanimity — she has been wrong before and will be wrong again, and both times she adjusted and improved. She adjusts now.",
        ],
    },

    treatment_protocol: {
        critical: [
            "'Evidence-based. Aggressive. Exactly indicated for this presentation.' Dr. Okafor's protocol lands with the full weight of everything current neurological science has to offer. This is what twenty years of research looks like deployed without hesitation. The symptom has no answer.",
            "The treatment protocol executes precisely as designed. Every element correct, every timing exact. The peer-reviewed literature recommended this approach, and the peer-reviewed literature was right. CRACK.",
        ],
        success: [
            "The treatment protocol lands. Methodical and effective, exactly as designed for exactly this pathology. Dr. Okafor does not look surprised. She expected this.",
            "Protocol followed, outcome achieved. The intervention works. Dr. Okafor's expression doesn't change — success was always the plan.",
        ],
        partial: [
            "The protocol works, partially. In medicine, partial response is information — it confirms the mechanism is the right target, even if the full effect didn't land. Dr. Okafor is already adjusting dosing.",
            "Partial effectiveness. The treatment is on the right track; the calibration needs work. Dr. Okafor logs it as progress, because partial progress is progress.",
        ],
        failure: [
            "The protocol doesn't take hold this round. Dr. Okafor notes the treatment resistance without alarm — resistance is a known phenomenon with known responses. She is already selecting the next option.",
            "The treatment protocol misfires. This is information. Dr. Okafor treats failure as data, because it is, and adjusts accordingly.",
        ],
    },

    diagnostic_insight: {
        critical: [
            "'I see the pattern.' Dr. Okafor's insight into the mechanism is complete enough to route entirely around it. The team receives a clear map of what's coming and where to step. The symptom's advantage evaporates.",
            "The diagnostic insight is total — mechanism, trajectory, vulnerability, all of it clear. Dr. Okafor shares the picture with the team in three precise sentences. Everyone is suddenly better prepared than they were.",
        ],
        success: [
            "The diagnostic insight gives everyone a working map of the terrain. The symptoms have less purchase when you can anticipate them. Dr. Okafor's twenty years are doing the work.",
            "Pattern identified, insight deployed. The team knows where to stand. The incoming damage is reduced.",
        ],
        partial: [
            "Some of the insight holds; some of it remains unclear. A partial map is still a map. The team navigates better than they would have.",
            "Partial diagnostic clarity. Enough to reduce exposure, not enough for complete cover. Dr. Okafor works with what she has.",
        ],
        failure: [
            "Dr. Okafor, for once, does not have a clear picture. She holds this with the equanimity of someone who knows that not-knowing is the beginning of the diagnostic process. She will know more shortly.",
            "The diagnostic insight doesn't resolve this round. 'I need more data,' says Dr. Okafor, which is not the same as defeat.",
        ],
    },

    // ── Tyler Reyes ────────────────────────────────────────────────────────────

    neuro_pt_circuit: {
        critical: [
            "'YES. THAT IS THE PATHWAY. BUILD IT.' Tyler's exercise sequence hits the precise combination that forces new neurological adaptations in real time. The symptom literally cannot keep up with a nervous system in active remodeling. THWAP.",
            "Tyler's therapeutic movement pattern disrupts the symptom at its functional level — not by overpowering it, but by routing around it. 'Neuroplasticity is real and it is ANGRY,' he confirms, correctly.",
        ],
        success: [
            "The neuro PT circuit lands. Clean, specific, exactly targeted at the functional limitation the symptom depends on. 'That's the one. Write that down.' The symptom takes damage.",
            "Movement disrupts the symptom's normal logic. Tyler's circuit works as designed. 'Science!' he says, unnecessarily but accurately.",
        ],
        partial: [
            "The circuit partially lands. 'Still progress,' Tyler insists, and the data supports him. The symptom registers partial disruption.",
            "Part of the PT sequence executes cleanly; part of it slips. The symptom absorbs reduced damage. Tyler nods like this was the expected result.",
        ],
        failure: [
            "'Okay, that rep didn't count. We're doing another one.' Tyler resets without hesitation. In his experience, the nervous system learns from failed attempts too. This is going in the data.",
            "The circuit misfires. The symptom holds its ground. 'That's fine! We're gathering baseline information!' Tyler is not being sarcastic. He genuinely means this.",
        ],
    },

    functional_training: {
        critical: [
            "Tyler hits the exact functional sequence with the precision of someone who studied four years of neurological rehabilitation precisely for this. The symptom slows — genuinely slowed by a body that refuses to comply with its logic. 'I TOLD you this would work!'",
            "CRACK. The functional training sequence executes perfectly. The symptom's rhythm is disrupted; its damage output drops. Tyler is already noting what technique produced this result.",
        ],
        success: [
            "The functional training disrupts the symptom's operating rhythm. It slows. Tyler knew exactly which pattern to use. 'That's the research,' he says, meaning the years of it he has read.",
            "Training applied, function restored, symptom slowed. Tyler's approach is working. He is already thinking about the next sequence.",
        ],
        partial: [
            "The training sequence partially lands. The symptom slows but not completely. 'Partial response is still a response,' Tyler confirms. He's right.",
            "The functional training registers but doesn't fully disrupt. The symptom is slowed, not stopped. A partial win in PT is still a win.",
        ],
        failure: [
            "'Okay. That one we're adjusting.' Tyler's training sequence doesn't connect this round. He writes something in his mental notes and prepares a different approach.",
            "The training misfires. The symptom holds its full speed. Tyler accepts this as information, not failure — in his professional opinion there is a distinction.",
        ],
    },

    neuroplasticity_protocol: {
        critical: [
            "'NEW PATHWAY. WE ARE LITERALLY BUILDING A NEW PATHWAY RIGHT NOW.' Tyler's protocol fires completely. The team feels actual physical restoration as new neurological routes form around the damaged ones. It is, improbably, exactly as good as Tyler promised.",
            "The neuroplasticity protocol executes at full effect. Detours around damaged myelin, new signal paths forming in real time. The team heals. Tyler's expression suggests he has been waiting to see this work for some time.",
        ],
        success: [
            "The protocol does what Tyler promised: the brain builds detours. Old damage doesn't disappear — new routes form around it. The team is restored.",
            "Neuroplasticity engages. The healing isn't dramatic, but it's real, and it compounds. The team benefits.",
        ],
        partial: [
            "Some pathways form; some don't. Recovery is non-linear, and Tyler has always known this. The team receives partial healing. Better than nothing — better than most things, actually.",
            "Partial neuroplasticity response. Some routes build. The team recovers partially. Tyler notes the conditions for next time.",
        ],
        failure: [
            "'That's fine, that's fine, neuroplasticity takes time, the literature is VERY CLEAR that this is how the learning process—' The protocol doesn't fire this round. The team is not healed. Tyler is undiscouraged in a way that suggests he has experienced this before.",
            "The protocol misfires. 'The brain needs more sessions,' Tyler explains, which is true and also not immediately helpful. The team is not healed this round.",
        ],
    },

    // ── Maeve Donovan ──────────────────────────────────────────────────────────

    care_coordination: {
        critical: [
            "Maeve deploys fifteen years of clinical patience as a direct weapon and it lands with surprising force. 'I've seen this before,' she says, and the absolute certainty in her voice is devastating to anything that relies on the unknown to function. The symptom has no response.",
            "Maeve coordinates the response with the practiced efficiency of someone who has managed worse Tuesdays than this. Clean, effective, and she was already thinking three steps ahead before the action resolved.",
        ],
        success: [
            "Clean care coordination. The intervention lands exactly where it was needed. Maeve does not celebrate — she notes it and moves on to what's next.",
            "Maeve works the problem with the steady precision of fifteen years' experience. The symptom takes damage. She is unsurprised by this outcome.",
        ],
        partial: [
            "'That's something,' says Maeve, which from her is essentially a standing ovation. The intervention partially lands. She is already identifying what didn't work.",
            "Partial coordination. The symptom takes reduced damage. Maeve treats this as baseline data.",
        ],
        failure: [
            "Maeve holds her phone and looks at the symptom with the expression of someone who has been put on hold for worse. She will wait. She will find another approach. She has found another approach.",
            "The care coordination doesn't land this round. Maeve notes the outcome without comment and prepares the next intervention. She has done this before.",
        ],
    },

    symptom_management: {
        critical: [
            "Every management tool Maeve has identified over fifteen years converges into one brilliant intervention. The symptom doesn't just retreat — it *loses*. The team breathes. 'That's what the research recommends,' says Maeve, as if this outcome were always obvious.",
            "Total symptom management. The healing is complete, the team restored. Maeve doesn't explain what she did differently. She just did it.",
        ],
        success: [
            "'That's what the research recommends.' Maeve's symptom management works exactly as prescribed. The team is healed. She is already reviewing what comes next.",
            "Symptom management applied, team restored. Maeve's approach is grounded in fifteen years of knowing what works. It works.",
        ],
        partial: [
            "Management, partial. 'It's still management,' Maeve observes, unmoved by partial as a category. The team recovers partially. This is fine.",
            "Partial healing. The symptom management works at partial effectiveness. Maeve notes what the resistance suggests about the mechanism.",
        ],
        failure: [
            "The management approach doesn't land cleanly. Maeve accepts this with the same equanimity she accepts everything — as information. She is already formulating the next one.",
            "'Next approach,' says Maeve, and doesn't elaborate. The team is not healed this round. She has a plan.",
        ],
    },

    community_support: {
        critical: [
            "'Fifteen years of collective patient wisdom, deployed.' Maeve channels something that comes from every MS patient who ever shared what worked — a collective intervention that the symptom cannot specifically identify or defend against. It lands completely. The sustained damage begins.",
            "The community support does what community always does when it works properly: it changes the terms entirely. The symptom will keep taking damage from something it cannot directly target. Maeve looks satisfied.",
        ],
        success: [
            "Community support applied. The sustained damage settles in. The symptom will feel this for rounds to come — not from any single source, but from the accumulation of everything shared knowledge has to offer.",
            "The intervention lands. Shared experience makes difficult things survivable; apparently it also makes enemies take ongoing damage. The symptom burns.",
        ],
        partial: [
            "Some of the community wisdom lands. The sustained effect sticks at partial intensity. It will still cost the symptom something over time.",
            "Partial community support. The burning effect holds, weaker than intended. The symptom takes ongoing damage. Maeve notes the partial registration.",
        ],
        failure: [
            "Even the community cannot reach this symptom today. Maeve notes this, files a mental referral, and identifies another resource. The symptom is unaffected this round.",
            "The community support misfires. 'Different approach,' says Maeve. She is already reconfiguring.",
        ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Fallout originals — kept for backward compatibility during conversion
    // ─────────────────────────────────────────────────────────────────────────

    power_armor_punch: {
        critical: ["CLANG! Vince's servo-assisted fist connects with the force of several bad decisions! LEGENDARY!", "Ad victoriam! Vince's power armor punch hits so hard the wasteland felt it!"],
        success: ["Vince delivers a solid servo-assisted punch! The Power Armor did its job!", "The punch connects! Vince is making the wasteland safer, one fist at a time."],
        partial: ["Vince's punch glances off. Partial hit, partial credit, all enthusiasm.", "Not quite full contact, but Vince's fist still registered a solid complaint."],
        failure: ["Vince swings and misses spectacularly. The Power Armor whirs in embarrassment.", "Vince's punch connects with nothing but air. Vault-Tec films did not cover this scenario."],
    },

    minigun_spin: {
        critical: ["BRRRRT! Freedom rings at 6000 rounds per minute! CRITICAL MINIGUN FREEDOM!", "Vince's salvaged minigun spins up and delivers democracy at an alarming rate!"],
        success: ["The minigun connects in a sustained burst. Vince yells something patriotic.", "Minigun fire on target. Vince is very happy about this."],
        partial: ["Some of the rounds find their mark. Vince considers this a success.", "Partial minigun hit. Still a lot of rounds though."],
        failure: ["The minigun jams. Vince stares at it, betrayed. 'This never happened in the films.'", "CLICK. The minigun is not cooperating. Vince rethinks his positivity."],
    },

    vault_tec_training: {
        critical: ["Vince's Vault-Tec training activates at full intensity! A shimmering barrier surrounds the party!", "The party is protected! 'Ad victoriam!' Vince yells, for reasons no one fully understands."],
        success: ["Vault-Tec training applied! The party has a shield. Vince is very proud.", "The protective barrier forms! Vince quotes a training film. It's actually relevant."],
        partial: ["A partial shield forms. Better than nothing. Vince insists the films are still helpful.", "The training partially activates. Some protection is better than none."],
        failure: ["Vince can't remember the relevant training module. No shield. He's writing a letter of complaint to Vault-Tec.", "The training fails to materialize. Vince blames the radiation."],
    },

    pipe_rifle_shot: {
        critical: ["CRACK! Patches' 200-year-old rifle finds the mark. 'Still works,' he notes, unsurprised.", "Patches puts the shot exactly where he intended it. He has had 200 years to practice."],
        success: ["Patches fires. The shot connects. He nods once.", "A clean hit from the pipe rifle. Patches was aiming there."],
        partial: ["Partial hit. Patches notes it like a stock market fluctuation. Data.", "The shot partially lands. Patches already knows why."],
        failure: ["The shot goes wide. Patches stares at the gun for one long moment. 'Seen worse,' he says.", "Miss. Patches puts it in his mental ledger and moves on."],
    },

    wasteland_wisdom: {
        critical: ["SNAP! Two centuries of survival knowledge deployed in one decisive maneuver. Patches looked bored the whole time.", "Patches identifies the exact weak point with 200 years of pattern recognition and exploits it completely. CRACK."],
        success: ["The wasteland wisdom finds its mark. Patches has seen this weakness before. Twice.", "Clean hit. Patches files this under 'things that still work.'"],
        partial: ["Partial wisdom application. 'Could've been worse,' says Patches, and he's right.", "The maneuver partially lands. Patches accepts this outcome with the equanimity of someone who has accepted worse."],
        failure: ["Even 200 years isn't always enough. Patches makes a note. Not his best showing.", "The wisdom fails to translate to action. Patches blames modernity."],
    },

    ghoul_stealth: {
        critical: ["Patches disappears completely. One moment present, next moment: gone. The party is very hard to hit right now.", "Ghoul stealth engaged. Patches is not just hiding — he IS the rubble. The party benefits."],
        success: ["The party takes cover. Patches has been practicing this since the bombs fell.", "Concealment achieved. Patches nods from somewhere in the shadows."],
        partial: ["Partial concealment. Better than nothing. Patches squints.", "Some cover. The party is somewhat harder to target."],
        failure: ["Patches is too visible. 'Used to be easier,' he says. It probably was.", "The stealth fails. Patches is very much visible."],
    },

    percussive_maintenance: {
        critical: ["GROK HIT VERY PRECISELY. The terminal is now fixed AND the enemy is damaged AND Grok is very pleased with himself.", "PERCUSSIVE COMMUNION. Grok channels the machine spirit through aggressive physical interaction. THWAM. Door open now."],
        success: ["Grok hits the problem until it is less of a problem. This is hacking.", "GROK COMMUNE. The machine spirit responds to the one true method."],
        partial: ["Partial hit. Grok is still right about the methodology, just not the execution today.", "Grok's maintenance is partial. The machine spirit requires more sessions."],
        failure: ["GROK CONFUSED. The machine did not respond to hitting. Grok will hit it again, differently.", "The percussive maintenance misses. Grok is recalibrating."],
    },

    terminal_communion: {
        critical: ["GROK COMMUNE WITH MACHINE SPIRIT. MACHINE SPIRIT SLOW NOW. Grok looks philosophical about this. He has achieved digital enlightenment.", "The terminal is communed with. The enemy slows. Grok says something thoughtful about consciousness and then smashes another screen."],
        success: ["The communion works. The enemy is slowed. Grok nods at the terminal.", "Machine spirit answers Grok. Terminal communed. Enemy disrupted."],
        partial: ["Partial communion. The machine spirit was listening, mostly. The enemy is somewhat slowed.", "The communion partially takes. Grok will try again."],
        failure: ["MACHINE SPIRIT SILENT. Grok stares at the terminal for a long time. It does not respond. He punches it once more, just in case.", "The communion fails. Grok reassesses his methodology."],
    },

    super_mutant_rage: {
        critical: ["GROK RAGE. The deepest wisdom is achieved. The party is healed. Grok screams something about consciousness while hitting everything. It works completely.", "Super mutant rage fully unlocked. The party heals. Grok explains this is simply the natural result of applied kinetic philosophy."],
        success: ["The rage heals the party. Grok is philosophical about this. 'Anger is medicine,' he explains.", "GROK HEAL. The party benefits from the applied rage."],
        partial: ["Partial rage. Some healing. Grok was saving some for later.", "The rage partially heals the party. Grok is still angry. More healing available."],
        failure: ["Grok rages but the healing doesn't come through. He switches to punching things. Same energy, different outcome.", "The super mutant rage doesn't connect. Grok reconsiders his approach to consciousness."],
    },

    buzz_saw_trim: {
        critical: ["Originally for hedgerows. Adapts magnificently to combat. BZZT. Wadsworth looks mildly interested in the result.", "BZZT! Wadsworth's hedge trimmer reaches its true purpose. 'A controlled trim,' he notes, drily."],
        success: ["The buzz saw connects. 'I was designed for this,' Wadsworth does not say, but implies.", "Clean hit. Wadsworth notes it in whatever passes for his mental ledger."],
        partial: ["Partial trim. Wadsworth notes the suboptimal outcome and prepares a sarcastic observation.", "The buzz saw partially lands. 'Adequate,' Wadsworth decides."],
        failure: ["The buzz saw misses. Wadsworth makes a face that communicates what he thinks about this outcome.", "BZZT into nothing. Wadsworth catalogues this failure alongside centuries of disappointment."],
    },

    stimpak_injection: {
        critical: ["'Hold still, sir.' The stimpak delivers complete healing. Wadsworth somehow makes full recovery sound like a criticism. The party is healed.", "'I do enjoy watching entirely preventable wounds close,' says Wadsworth, injecting the stimpak with flawless precision. The party heals completely."],
        success: ["The stimpak works as designed. Wadsworth considers this a minimum standard. The party recovers.", "Healing administered. Wadsworth delivers it with the energy of someone who expected to be asked to do this."],
        partial: ["Partial healing. Wadsworth says something about resource management. The party partially recovers.", "The stimpak's effect is partial. Wadsworth notes this is still better than the alternative."],
        failure: ["The stimpak doesn't take properly. Wadsworth eyes it with a look that has seen 200 years of technical failures.", "Healing fails. Wadsworth sighs in a way that contains multitudes."],
    },

    flamer_fuel_burst: {
        critical: ["'My flamer attachment is for controlled burns, sir.' This is not a controlled burn. FWOOOM. The enemy burns completely. Wadsworth looks slightly pleased.", "FWOOOM! Wadsworth's controlled burn is exactly as controlled as this situation calls for."],
        success: ["The flamer connects. Wadsworth notes this is a reasonable application of the technology.", "Controlled burn applied. The enemy burns. Wadsworth is comfortable with this outcome."],
        partial: ["Partial burn. Wadsworth considers this acceptable. The enemy burns, somewhat.", "The flame partially lands. Something burns. Wadsworth notes it."],
        failure: ["The flamer sputters. Wadsworth looks at it with two centuries of accumulated disappointment.", "The burn doesn't take. 'Apparently the fuel line has opinions,' Wadsworth observes."],
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// ENEMY NARRATION
// Keys match attack IDs in manifest.js
// {target} is replaced with the resolved target name at call time
// ─────────────────────────────────────────────────────────────────────────────

const ENEMY_NARRATION = {

    // ── The Fog ────────────────────────────────────────────────────────────────

    cognitive_overload: [
        "The Fog presses against {target}'s working memory and the words just — stop. Thoughts that were present half a second ago are somewhere else now. The Fog doesn't need to win the fight. It just needs to make everything harder.",
        "Something important was being held in {target}'s mind, and The Fog just took it. Not permanently. Just now, when it matters. That's the thing about cognitive fog: it's always impeccably timed.",
        "The Fog thickens specifically around {target}'s concentration. The harder {target} reaches for clarity, the further it recedes. The symptom understands exactly what it's doing.",
    ],

    fatigue_wave: [
        "A wave of exhaustion rolls through {target} that feels structural — like the body has simply decided a lower level of function is the new default. {target} is still standing. The standing takes everything right now.",
        "The Fog sends its fatigue wave through {target}. Not tiredness — a different thing entirely, heavier and less logical. {target} knows the difference by now. That doesn't make it easier.",
        "The fatigue doesn't arrive quietly. It arrives like a dropped weight on {target}'s chest, sudden and total. The Fog is a mechanism, not a malice, and somehow that makes it worse.",
    ],

    // ── The Relapse ────────────────────────────────────────────────────────────

    inflammatory_cascade: [
        "The Relapse cascades — that's the clinical word, and it earns it. Inflammatory energy floods {target} indiscriminately, the immune system doing exactly what it was designed to do against exactly the wrong target. FWOOOM.",
        "INFLAMMATORY CASCADE. The energy spreads everywhere at once, unstoppable as a biological process that knows no purpose but its own mechanism. {target} is directly in it.",
        "The Relapse triggers a full cascade. {target} feels the inflammation before they can name it — a systemic wrongness that is very familiar by now and no less difficult for being familiar.",
    ],

    myelin_assault: [
        "The Relapse focuses its attack on {target}'s nerve pathways. Not random destruction — targeted, efficient, and precisely the kind of damage that compounds. The myelin is the target. {target} feels it.",
        "The Relapse finds {target}'s most vulnerable signal pathway and strips it. The attack is quiet in the way medical crises are often quiet — no explosion, just something that was there and then isn't.",
        "MYELIN ASSAULT on {target}. The protective sheath around the nerve fiber degrades under inflammatory attack. The signal weakens. The Relapse knows exactly what it's doing.",
    ],

    demyelination_strike: [
        "Coordinated signal disruption. Multiple pathways in {target} affected simultaneously. The Relapse has done this before and it knows exactly which connections to sever for maximum effect.",
        "The demyelination moves through {target}'s system methodically — stripping signals from their channels, leaving static where there was clear transmission. The Relapse is patient in a way that is deeply unfair.",
        "The Relapse's strike lands on {target} with clinical precision. Demyelination: the protective coating stripped, the signal interrupted, the damage done in the quiet biological way that MS always operates.",
    ],

    // ── Fallout originals ──────────────────────────────────────────────────────

    flamethrower_burst: [
        "Jane's flamethrower roars to life! {target} is directly in the path of the inferno!",
        "FWOOOM! Jane cackles as the flames reach for {target}. 'I love this part!'",
        "'This is for EVERYONE WHO EVER GAVE ME A WEIRD LOOK!' Jane unleashes fire upon {target}.",
    ],

    psycho_rage: [
        "Jane injects Psycho and immediately starts vibrating. {target} is in trouble.",
        "PSYCHO RAGE ACTIVATED. Jane is now operating at approximately 400% normal danger. {target} — run.",
        "'BURN IT ALL!' Jane, hopped up on Psycho, charges {target} with unhinged intent.",
    ],

    plasma_barrage: [
        "Colonel Blackwood fires a sustained plasma burst at {target}. 'America will be purified.'",
        "PLASMA BARRAGE. Blackwood's rifle melts through everything in its path. {target} is in the way.",
        "'For the Enclave.' Blackwood's plasma fire converges on {target} with military precision.",
    ],

    power_fist_strike: [
        "Blackwood charges {target} with his armored power fist. The impact shakes the ground.",
        "POWER FIST. Blackwood hits {target} with the full force of Advanced Power Armor. This is what a facist in a robot suit looks like.",
        "'Your kind has no place in the new America,' says Blackwood, punching {target} extremely hard.",
    ],

    enclave_protocol: [
        "Blackwood activates combat protocols! The Sentry Bot locks onto {target}. Coordinated fire incoming!",
        "ENCLAVE PROTOCOL. Maximum firepower focused on {target}. This is what a military machine looks like.",
        "'Coordinate and destroy.' Blackwood's protocol targets {target} with Enclave efficiency.",
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ENEMY SPECIAL NARRATION
// For ability activations (buffs, transforms, etc.)
// ─────────────────────────────────────────────────────────────────────────────

const ENEMY_SPECIAL_NARRATION = {

    // The Fog specials (if any are added)
    fog_intensify: [
        "The Fog thickens — if that were even possible. The gray mass presses in from all directions, doubling its density. The team feels the cognitive weight increase.",
        "Something changes in The Fog's quality: it becomes heavier, more purposeful, more total. Everyone in the room feels it at the same moment.",
    ],

    // The Relapse specials
    phase_escalation: [
        "The Relapse restructures. The first phase was an opening move. This — this is the Relapse operating at full inflammatory capacity. The crackling red energy surges in intensity.",
        "The Relapse transitions. Something in its mechanism shifts and amplifies. The team feels the temperature change before the next attack arrives.",
    ],

    // Fallout originals
    psycho_injection: [
        "Jane stabs herself with a syringe. The chemical hits her bloodstream. This is not good for the opposing team.",
        "'This one's special,' Jane says about the Psycho, injecting it with disturbing enthusiasm.",
    ],

    enclave_reinforcement: [
        "Blackwood calls for reinforcements via armored comm. More Enclave soldiers are incoming. The corridor fills with red eyeslits.",
        "'Backup requested. Genetic impurities detected.' Blackwood's armor beeps. Something is coming.",
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get a random narration line for a player ability use.
 * @param {string} abilityId
 * @param {string} tier  - 'critical' | 'success' | 'partial' | 'failure'
 * @returns {string|null}  null if no entry found (caller should use generic fallback)
 */
export function getRandomPlayerNarration(abilityId, tier) {
    const entry = PLAYER_NARRATION[abilityId];
    if (!entry) return null;
    const lines = entry[tier];
    if (!lines || lines.length === 0) return null;
    return pick(lines);
}

/**
 * Get a random narration line for an enemy attack.
 * @param {string} attackId
 * @param {string} targetName  - resolved target display name
 * @returns {string|null}
 */
export function getRandomEnemyNarration(attackId, targetName) {
    const lines = ENEMY_NARRATION[attackId];
    if (!lines || lines.length === 0) return null;
    return fill(pick(lines), { target: targetName });
}

/**
 * Get a random narration line for an enemy special ability activation.
 * @param {string} abilityId
 * @param {string} enemyName
 * @returns {string|null}
 */
export function getRandomEnemySpecialNarration(abilityId, enemyName) {
    const lines = ENEMY_SPECIAL_NARRATION[abilityId];
    if (!lines || lines.length === 0) return null;
    return fill(pick(lines), { enemy: enemyName });
}
