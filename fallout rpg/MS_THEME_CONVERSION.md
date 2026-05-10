# MS Theme Conversion — Fallout RPG → "Signal & Noise: An MS Journey"

## Concept

A turn-based narrative RPG following Alex, a person newly diagnosed with Multiple Sclerosis,
alongside their care team. The party fights through personified MS symptoms — invisible enemies
that are real, relentless, and beatable. Every combat mechanic maps to a real aspect of MS:
fatigue drains your action economy, myelin damage reduces your defenses, but treatment, community,
and resilience push back.

The tone mirrors the original: darkly honest, occasionally wry, ultimately hopeful. MS isn't
defeated — it's managed. Victory means stability, not a cure. The game teaches players what MS
actually feels like to live with.

**Working title:** Signal & Noise: An MS Journey  
**Tagline:** "The signal always finds a way through."

---

## Narrative Structure (Scene-by-Scene)

Mapped 1:1 to the existing scene IDs so no code changes are needed for story flow.

| Original Scene | New Scene ID | New Title |
|---|---|---|
| intro | intro | First Signal |
| mission_briefing | mission_briefing | The Diagnosis |
| challenge_scene | challenge_scene | The Healthcare Maze |
| journey | journey | Learning the New Normal |
| midboss_combat | midboss_combat | The Fog Descends |
| midboss_victory | midboss_victory | A Moment of Clarity |
| obstacle | obstacle | Warning Signs |
| explore_lair | explore_lair | The Infusion Center |
| finalboss_combat | finalboss_combat | The Relapse |
| epilogue_victory | epilogue_victory | Stable Ground |
| epilogue_defeat | epilogue_defeat | A Harder Road |

### Scene Narrative Text

**intro** — *First Signal*
> "Multiple sclerosis begins quietly. Not with a bang, but with a question: why does my left hand
> feel like it's wrapped in cotton? Why did that patch of vision go gray for a moment and then
> come back? For Alex, a graphic designer in their early thirties, the first symptoms arrive like
> bad reception — the signal is there, but something is interfering. This is the story of finding
> out what, and what comes next."

**mission_briefing** — *The Diagnosis*  
Speaker: Dr. Priya Okafor  
> "After an MRI, a lumbar puncture, and enough blood draws to stock a small vampire, the answer
> arrives in a neurology office with a beige carpet and a poster of the brain. 'You have relapsing-
> remitting multiple sclerosis,' Dr. Okafor says. She pauses. 'I know that's a lot to take in.
> Let me explain what it means — and more importantly, what it doesn't mean.'"

Choices:
- "Ask everything — I need to understand this." → Cunning / Normal → "Knowledge is power. You leave with a notebook full of questions answered."
- "I just need a moment." → Spirit / Easy → "She waits. Some diagnoses need space before they need plans."

**challenge_scene** — *The Healthcare Maze*
> "Between the diagnosis and the treatment plan lies a bureaucratic wilderness: insurance pre-
> authorizations, specialist referrals, a pharmacy that keeps putting things on hold, and a
> patient portal that has never once worked correctly. Tyler, the physical therapist, calls it
> 'the system.' Maeve, the care coordinator, calls it 'Tuesday.'"

**journey** — *Learning the New Normal*
> "Disease-modifying therapy starts with a training session on self-injection and a pamphlet
> about injection sites. Physical therapy starts with walking drills that feel absurdly basic
> until your legs remind you they're not working at full signal strength. There are good days and
> bad days. On bad days, the fatigue sits on your chest like something heavy and permanent. On
> good days, you forget, briefly, that anything is different. Both kinds of days matter."

**midboss_combat** — *The Fog Descends* (combat vs. The Fog)  
Opening:
> "It arrives on a Tuesday morning during an important meeting. First the words stop coming
> clearly. Then the meeting itself stops making sense. Then your hands feel distant, operated by
> remote control. MS cognitive fog — The Fog — is invisible to everyone else in the room. It is
> very visible to you. Dr. Okafor warned you about this. Now it's here. Time to find out what
> you're made of."

**midboss_victory** — *A Moment of Clarity*
> "The Fog retreats. Not defeated permanently — MS doesn't work like that — but managed, pushed
> back, made smaller. You catalogue what helped: the rest you fought to take, the strategies Tyler
> drilled into you, the fact that Maeve picked up the phone on the second ring. You write it down
> while you can still write clearly. The Fog will come back. Now you know what to do."

**obstacle** — *Warning Signs*
> "Three months into the treatment plan, new symptoms appear: vision that dims at the edges, a
> band of tightness around the ribs that the internet unhelpfully calls the 'MS hug,' and a
> fatigue so total it feels geological. This is what a relapse feels like in its opening hours.
> Dr. Okafor is already pulling up the treatment options. The team assembles."

**explore_lair** — *The Infusion Center*
> "The infusion center has comfortable chairs and bad coffee and people who understand in a way
> that most people don't. A woman named Diane — diagnosed eleven years ago, marathoner, total
> force of nature — tells you the first relapse is the scariest one. 'After that you know what
> you're dealing with,' she says. 'The knowing is actually better.' The IV drips. Somewhere
> in your nervous system, the inflammation is being contested."

**finalboss_combat** — *The Relapse* (combat vs. The Relapse)  
Opening:
> "The Relapse arrives in force: the vision loss spreading, the right leg failing to respond
> properly, the exhaustion so complete it takes effort to breathe intentionally. This is the
> immune system, confused and attacking, stripping myelin from nerves that need it. The team
> is here. The treatment is running. But this one has to be fought through. No shortcuts.
> 'Stay with us, Alex,' says Dr. Okafor. 'We've got you.'"

**epilogue_victory** — *Stable Ground*
> "Six weeks after the relapse, the MRI shows no new lesions. The existing ones haven't grown.
> The vision returned mostly — ninety percent, which turns out to be enough. The right leg is
> slower than it was, but it's working, and Tyler has a plan for the rest. Dr. Okafor calls it
> stability. You call it hard-won. Both are correct. MS will come back, in some form, at some
> time. But today the signal is clear, and that's enough."

**epilogue_defeat** — *A Harder Road*
> "This relapse leaves more behind than the last one. The leg doesn't come back all the way.
> The visual field has a gap that probably won't close. Dr. Okafor adjusts the treatment plan.
> Tyler designs a new program around what is, not what was. 'Recovery isn't always restoration,'
> Maeve says, not unkindly. 'Sometimes it's adaptation.' This is a harder road. It is still a
> road."

---

## Party Members

### 1. Alex Chen — Self-Advocate
*Replaces: Vault Dweller Vince*

- **Class:** Self-Advocate
- **Gender:** nonbinary | **Pronouns:** they/them/their
- **Stats:** brawn=2, cunning=0, spirit=1 | **Max HP:** 5
- **Trait:** determined
- **Description:** "A graphic designer in their early thirties who received an MS diagnosis eight months ago and has since become, out of pure necessity, an expert in navigating neurological healthcare, insurance appeals, and their own body."
- **Personality:** Processes everything through research and dark humor. Exhausted by the invisible labor of being sick in public. Fiercely protective of the others. Makes jokes about myelin at inappropriate moments.
- **Song:** "Okay so I looked up what the MRI results mean at 2am, which was a mistake, and now I know what every lesion location implies, which is also a mistake, but I'm choosing to interpret it as 'my brain is very interesting.'"

**Basic Attack — Speak Up:**
- "Refuse to minimize. Name the symptom clearly and push back."
- stat: brawn | damage: 2

**Special: Determined Push** (2 uses)
- "This matters. Push through the fatigue anyway."
- damage: 3

**Special: Adaptive Strategy** (1 use)
- "Stop fighting the old way. Find what actually works."
- shield effect | reduction: 1 | duration: 2

---

### 2. Dr. Priya Okafor — Neurologist
*Replaces: Patches McGraw*

- **Class:** Neurologist
- **Gender:** female | **Pronouns:** she/her/hers
- **Stats:** brawn=0, cunning=2, spirit=1 | **Max HP:** 5
- **Trait:** methodical
- **Description:** "A board-certified neurologist with twenty years of MS specialty experience, an evidence-based approach to everything, and the particular patience of someone who has delivered difficult diagnoses to many hundreds of people and learned to stay present for each one."
- **Personality:** Precise and clinical but genuinely warm. Cites studies in casual conversation. Remembers every patient's specific presentation. Has zero tolerance for misinformation.
- **Song:** "The literature is clear. The imaging is consistent with RRMS. Your oligoclonal bands are elevated. All of which is to say: we know exactly what we're dealing with, and we have tools. Let's talk about those tools."

**Basic Attack — Clinical Assessment:**
- "Identify the mechanism precisely. Target the pathology."
- stat: cunning | damage: 2

**Special: Treatment Protocol** (2 uses)
- "Evidence-based, aggressive, exactly indicated for this presentation."
- difficulty: hard | damage: 4

**Special: Diagnostic Insight** (1 use)
- "Find the pattern under the noise. Expose the vulnerability."
- concealment effect | duration: 1

---

### 3. Tyler Reyes — Physical Therapist
*Replaces: Grok*

- **Class:** Neurological PT
- **Gender:** male | **Pronouns:** he/him/his
- **Stats:** brawn=0, cunning=1, spirit=2 | **Max HP:** 5
- **Trait:** relentlessly encouraging
- **Description:** "A neurological physical therapist who genuinely believes the nervous system can build new pathways around damaged ones, and will tell you this approximately forty times per session while making you walk a balance beam."
- **Personality:** Radiates the energy of someone who has never once considered giving up. Talks about neuroplasticity the way other people talk about sports teams. Makes every exercise sound like it's the most exciting thing that has ever happened.
- **Song:** "Okay so the myelin might be damaged on that pathway, BUT — and this is the exciting part — your brain can literally rewire itself. We're going to build a detour. It takes longer and it's annoying but it WORKS. Ready? Here's a foam roller."

**Basic Attack — Neuro PT Circuit:**
- "Movement is medicine. Make it count."
- stat: spirit | damage: 2

**Special: Functional Training** (2 uses)
- "Targeted rehab sequence. Restore function, disrupt symptoms."
- damage: 2 | slow effect | duration: 2

**Special: Neuroplasticity Protocol** (2 uses)
- "New pathways. Build around the damage."
- heal effect | amount: 2

---

### 4. Maeve Donovan — MS Care Navigator
*Replaces: Wadsworth Mk. III*

- **Class:** Care Navigator
- **Gender:** female | **Pronouns:** she/her/hers
- **Stats:** brawn=0, cunning=1, spirit=2 | **Max HP:** 5
- **Trait:** dry and deeply competent
- **Description:** "An MS specialty nurse and care coordinator who has been helping patients navigate the disease and the system around it for fifteen years, and whose combination of exact clinical knowledge, dark humor, and genuine compassion has seen people through their worst days."
- **Personality:** Speaks in measured understatements. Has heard every fear and knows how to sit with it. Calls the insurance company like she was born to be put on hold. Remembers which patients need a hug and which ones need a plan.
- **Song:** "I've already submitted the prior auth, scheduled the infusion, and called the MS Society about the support group. I also emailed you three peer-reviewed papers because you're clearly going to read them at 3am and I'd rather it be good ones."

**Basic Attack — Care Coordination:**
- "Steady, methodical, exactly what is needed right now."
- stat: spirit | damage: 2

**Special: Symptom Management** (2 uses)
- "Reduce the impact. Restore function. One thing at a time."
- heal effect | amount: 2

**Special: Community Support** (2 uses)
- "Fifteen years of collective patient wisdom, deployed."
- damage: 1 | burn/sustained effect | duration: 2

---

## Enemies

### Midboss: The Fog
*Replaces: Skullcrusher Jane*
*Short name: The Fog*

- **Type:** Manifestation | **Size:** Medium
- **HP:** 12
- **Stats:** cunning=1
- **Description:** "The personification of MS cognitive fog and fatigue — the symptom that's invisible to everyone else and total to the person experiencing it. It doesn't look like anything. It feels like thinking through wet concrete, like your words are on the tip of your tongue and also nowhere near it."
- **Personality:** "The Fog doesn't announce itself or make speeches. It simply arrives and makes everything harder. It's most devastating in important moments: meetings, conversations, anything that requires you to be fully present. It has no interest in fair fights."
- **Visual concept:** A dense, swirling entity of dark gray mist with no fixed form. Semi-humanoid when it coalesces. Features are blurred and indistinct, as if seen through frosted glass. Radiates a heavy, oppressive weight. Eyes, if it has them, are muted and distant.

**Attacks:**
- `cognitive_overload` — "Floods working memory. Words dissolve. Concentration fails." (damage 1, targets lowest health)
- `fatigue_wave` — "A wave of exhaustion so complete it feels structural." (damage 2, targets random)

---

### Final Boss: The Relapse
*Replaces: Colonel Augustus Blackwood*
*Short name: The Relapse*

- **Type:** Inflammatory Event | **Size:** Large
- **HP:** 18
- **Stats:** cunning=2
- **Description:** "A full MS relapse — the immune system in full attack mode, stripping myelin from nerve fibers with indiscriminate violence. It arrives in layers: first the subtle wrongness, then the failing systems, then the total confrontation. It is the thing everyone with MS fears and eventually faces."
- **Personality:** "The Relapse doesn't negotiate or posture. It escalates. Each phase is worse than the last. It has no malice — only mechanism. The immune system believes it is doing the right thing. That makes it no less dangerous."
- **Visual concept:** A massive crackling entity of red and orange inflammatory energy, jagged and electrical. Nerve fiber imagery visible inside — myelin sheaths dissolving where the energy touches. Radiates heat and urgency. Has phases: grows more intense and unstable as health decreases.

**Attacks:**
- `inflammatory_cascade` — "Immune cells flood the CNS. Everything becomes inflamed." (damage 2, energy damage, targets highest threat)
- `myelin_assault` — "Direct attack on the protective nerve sheath. Signal integrity failing." (damage 2, physical damage, targets closest)
- `demyelination_strike` — "Coordinated signal disruption. Multiple systems affected." (damage 1, energy damage, targets grouped)

---

## Status Effect Rename Table

All existing status effect *mechanics* remain identical. Only flavor names and descriptions change.

| Code Name | New Display Name | New Description |
|---|---|---|
| SHIELD | Myelin Guard | Protective medication buffers the next hit. −1 incoming damage. |
| SLOW | Fatigue Response | The enemy's attacks are slowed by its own disrupted signaling. −1 outgoing damage. |
| CONCEALMENT | Symptom Management | The party has found strategies to reduce the impact of the next attack. −1 incoming damage. |
| MARK | Inflammation Target | A weakness in the enemy's pathology has been identified. +1 damage on next hit. |
| RESTRAIN | Spasticity | The target's movement is disrupted by its own misfiring signals. Cannot act; may attempt to break free. |
| DAMAGE_REDUCTION | Neuroprotection | Active neuroprotective measures are in effect. |

---

## Asset List with Generation Prompts

---

### CHARACTER PORTRAITS (16 images)

Each character needs 4 states: **idle**, **attack**, **hurt**, **portrait**  
Style spec for all characters: `2D digital illustration, painterly RPG character portrait, warm naturalistic lighting, clean linework with soft color fills, expressive faces, modern-day clothing, no fantasy elements`

---

**ALEX CHEN** (`assets/alex_chen-*.png`)

`alex_chen-idle.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Alex Chen, early 30s, East Asian, nonbinary, graphic designer. Wearing a comfortable oversized sweater, jeans, and worn sneakers. Sitting in a slightly tired but alert posture, one hand resting on a notebook, looking outward with quiet determination. Warm ambient lighting. Expressive, lived-in face. No fantasy elements. Modern contemporary style.

`alex_chen-attack.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Alex Chen, early 30s, East Asian, nonbinary, same clothing as idle. Standing upright, leaning forward, one hand raised in a firm point or open-palm gesture of assertion — the posture of someone forcefully advocating for themselves. Confident, resolute expression. Dynamic but grounded pose. Warm lighting. Modern contemporary style.

`alex_chen-hurt.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Alex Chen, early 30s, East Asian, nonbinary, same clothing. Sitting with head slightly bowed, one hand pressed to their temple, eyes half-closed — the posture of someone hit by a wave of fatigue or pain. Not defeated, but visibly struggling in this moment. Slightly cooler, softer lighting. Modern contemporary style.

`alex_chen-portrait.png`
> 2D digital illustration, painterly RPG character portrait, close-up face and shoulders on dark neutral background. Alex Chen, early 30s, East Asian, nonbinary. Warm direct gaze at viewer. Slight tired warmth in their eyes — the look of someone who knows hard things and has chosen to stay anyway. Soft rim lighting. Clean, expressive, no fantasy elements.

---

**DR. PRIYA OKAFOR** (`assets/dr_okafor-*.png`)

`dr_okafor-idle.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Dr. Priya Okafor, late 40s, South Asian woman, neurologist. Wearing a white lab coat over professional clothing, stethoscope, ID badge. Standing in a calm, grounded posture holding a tablet showing brain scan images. Composed, warm-but-clinical expression. Clean warm lighting. Modern medical setting implied. No fantasy elements.

`dr_okafor-attack.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Dr. Priya Okafor, same clothing. Leaning forward with one hand extended, pointing decisively at something unseen — the gesture of a clinician making an exact, authoritative diagnosis. Focused, precise expression. The tablet in her other hand shows medical data. Sharp confident lighting. Modern contemporary style.

`dr_okafor-hurt.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Dr. Priya Okafor, same clothing. A rare moment of visible concern — brow furrowed, hand pressed to her chin, eyes showing the weight of a case that is harder than expected. Still standing, still professional, but visibly affected. Slightly cooler lighting. Modern contemporary style.

`dr_okafor-portrait.png`
> 2D digital illustration, painterly RPG character portrait, close-up face and shoulders on dark neutral background. Dr. Priya Okafor, late 40s, South Asian woman. Calm, intelligent, warm eyes. The expression of someone who delivers difficult news with honesty and holds the room steady while they do it. Professional but human. Soft lighting.

---

**TYLER REYES** (`assets/tyler_reyes-*.png`)

`tyler_reyes-idle.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Tyler Reyes, late 20s, Latino man, physical therapist. Wearing scrubs or athletic PT clothing, sneakers. Standing in an open, energetic posture — hands slightly out, ready to demonstrate something. Big genuine smile. Holding a clipboard or resistance band. Bright warm energetic lighting. Modern contemporary style. No fantasy elements.

`tyler_reyes-attack.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Tyler Reyes, same clothing. In motion — demonstrating a rehabilitation exercise or movement sequence, arms extended, one foot forward. High-energy, dynamic pose. Expression of intense encouragement. Motion blur on arms slightly. Bright lighting. Modern contemporary style.

`tyler_reyes-hurt.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Tyler Reyes, same clothing. Hands on knees, breathing hard, expression briefly discouraged — someone whose relentless optimism has been genuinely dented by something difficult. Still holding the clipboard. Slightly softer lighting. Modern contemporary style.

`tyler_reyes-portrait.png`
> 2D digital illustration, painterly RPG character portrait, close-up face and shoulders on dark neutral background. Tyler Reyes, late 20s, Latino man. Bright open eyes, the smile of someone who genuinely believes improvement is always possible. Warm, high-energy even at rest. Encouraging expression. Warm bright lighting.

---

**MAEVE DONOVAN** (`assets/maeve_donovan-*.png`)

`maeve_donovan-idle.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Maeve Donovan, mid 40s, Irish-American woman, MS care navigator and nurse. Wearing comfortable professional scrubs or smart casual nursing attire. Standing in a calm, settled posture — phone in one hand, folder of notes in the other. Slight knowing expression, a hint of dry humor at the corner of her mouth. Warm indoor lighting. Modern contemporary style. No fantasy elements.

`maeve_donovan-attack.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Maeve Donovan, same clothing. One hand on hip, the other pointing decisively at someone off-screen — the posture of a nurse who is going to bat for her patient on the phone with insurance. Absolutely certain, slightly fierce, zero hesitation. Determined expression. Warm lighting. Modern contemporary style.

`maeve_donovan-hurt.png`
> 2D digital illustration, painterly RPG character art, full body portrait on transparent background. Maeve Donovan, same clothing. A rare unguarded moment — shoulders slightly dropped, eyes showing fifteen years of witnessing hard things. Not broken, just tired in a human way. Sitting on the edge of a chair, hands loosely folded. Softer, cooler lighting. Modern contemporary style.

`maeve_donovan-portrait.png`
> 2D digital illustration, painterly RPG character portrait, close-up face and shoulders on dark neutral background. Maeve Donovan, mid 40s, Irish-American woman. Steady, experienced eyes. The expression of someone who has seen the worst and decided to stay useful rather than detach. Dry warmth visible in the set of her mouth. Soft even lighting.

---

### ENEMY SPRITES (15 images)

Style spec for enemies: `2D digital illustration, painterly RPG monster/villain art, dark atmospheric lighting, abstract symbolic design representing MS symptoms, no literal monsters — metaphorical and medical in aesthetic`

---

**THE FOG** (`assets/the_fog-*.png`)

`the_fog-idle.png`
> 2D digital illustration, painterly RPG enemy art. The Fog — a dense, swirling semi-humanoid entity of dark gray mist on a transparent background. Body has no fixed form; it coalesces into a rough human silhouette then dissolves at the edges. Features are blurred and indistinct as if seen through frosted glass. Two dim, distant eyes barely visible within the mass. Radiates heaviness and opacity. Dark atmospheric lighting, cool blue-gray palette. Slow hovering pose.

`the_fog-attack.png`
> 2D digital illustration, painterly RPG enemy art. The Fog in aggressive motion — the gray mist mass surging forward and outward, tendrils of dense fog extending toward the viewer. The indistinct face is closer and more oppressive. A sense of cognitive weight and suffocation emanating from the form. Dynamic motion, cool dark palette, tendrils catching dim light.

`the_fog-hurt.png`
> 2D digital illustration, painterly RPG enemy art. The Fog partially disrupted — the swirling gray mass has gaps of clearer air breaking through it. The form is less cohesive, the dim eyes flickering. A thin beam of bright light cuts through from upper right. The entity is visibly reduced but not defeated. Cool palette with intrusions of warm light.

`the_fog-dead.png`
> 2D digital illustration, painterly RPG enemy art. The Fog dissipating — the gray mist entity dissolving upward and outward into thin wisps. The humanoid silhouette is barely visible, fragmenting. Clear air visible below where the mass once was. Sense of relief in the dispersal. Cool palette fading to near-transparent.

`the_fog-portrait.png`
> 2D digital illustration, painterly RPG enemy portrait, close-up face region on dark background. The Fog close-up — the indistinct blurred face within the gray mist, two dim distant eyes barely visible within the mass. Features present but not fully formed, as if the face keeps trying to resolve and cannot. Heavy atmospheric weight. Dark cool lighting.

`the_fog-special.png`
> 2D digital illustration, painterly RPG enemy art. The Fog at maximum intensity — forming a massive dense wall of dark gray pressing forward, the full silhouette at full height and opacity, both dim eyes now fixed and pointed. The air around it is thick with interference. Overwhelming presence. Dark blue-gray palette, rim lighting from within.

---

**THE RELAPSE** (`assets/the_relapse-*.png`)

`the_relapse-idle.png`
> 2D digital illustration, painterly RPG boss enemy art, full figure on transparent background. The Relapse — a large crackling entity of deep red and orange inflammatory energy. Vaguely humanoid in shape but made of electrical discharge and fragmented imagery. Visible within the form are abstract nerve fiber cross-sections — cylindrical sheaths dissolving where the energy touches them. The entity pulses with contained urgency. Dark background, dramatic warm red lighting.

`the_relapse-attack.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse in full attack — both arms extended forward discharging a massive burst of red-orange electrical inflammatory energy. Nerve fiber imagery visible in the discharge stream, myelin dissolving at the impact point. The entity leans forward, all energy directed outward. Violent, purposeful, overwhelming. Dramatic warm lighting.

`the_relapse-hurt.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse partially contained — the red-orange energy form flickering, some areas going dark or cooling to amber. Visible areas where the inflammatory energy has been suppressed show cooler blue-white light breaking through — the color of effective treatment. The entity is still large but visibly contested. Mixed warm-cool lighting.

`the_relapse-dead.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse collapsing — the red-orange crackling entity breaking apart from the bottom up. Nerve fiber imagery in the background now shows intact myelin sheaths rather than damaged ones. The inflammatory energy is fading to amber to gray to nothing. A sense of hard-won resolution. Cooling palette.

`the_relapse-portrait.png`
> 2D digital illustration, painterly RPG boss portrait, close-up face region on dark background. The Relapse close-up — the crackling inflammatory energy coalescing into a face of pure mechanism, no malice, just biological process unleashed. Nerve fiber cross-sections visible in the structure. Eyes like electrical discharges. Intense, relentless, deeply unsettling. Deep red and orange palette with dark background.

`the_relapse-attack2.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse — secondary attack pose. The entity draws inward, compressing its energy into a tight dense mass of red-orange crackling force in its core, then the moment before release — pulled back, coiled, all the inflammatory energy concentrated and aimed. Tension visible in every line.

`the_relapse-special1.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse special — Inflammatory Cascade. The entity expands outward in all directions simultaneously, sending tendrils of red-orange inflammatory energy spreading like a wave across the ground and walls around it. Total environmental attack. Engulfing, ubiquitous, impossible to entirely avoid.

`the_relapse-special2.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse special — Myelin Assault. The entity directs its energy in a tight focused beam, and within that beam the visual language is clearly medical — nerve cross-sections with myelin sheaths being stripped away layer by layer. Surgical, precise destruction. The focused intensity is somehow more frightening than the wide attacks.

`the_relapse-transform.png`
> 2D digital illustration, painterly RPG boss enemy art. The Relapse mid-phase-transition — the entity is restructuring. The red-orange energy form is briefly incomplete, pulling in ambient inflammation to rebuild itself larger and more intense. In the moment of transformation, the inner nerve fiber structure is clearly visible — a glimpse of the biological mechanism at the core of the disease. The next form will be worse. Dramatic backlighting.

---

### SCENE BACKGROUNDS (11 images)

Style spec for all backgrounds: `2D digital illustration, painterly scene background, wide landscape format (16:9), atmospheric depth, realistic modern-day setting, no text or UI elements`

---

`assets/first_symptoms.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A living room at night, warm lamplight. A desk with a computer showing graphic design work. The room is comfortable and personal — bookshelves, plants, an unmade throw blanket on the couch. In the center, a hand resting on a desk, slightly blurred at the fingertips as if the visual signal is degrading slightly. The overall image is warm and domestic but with a subtle wrongness — like a signal slightly out of tune. Very slight chromatic aberration at one edge.

`assets/hospital_waiting.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A hospital neurology waiting room. Rows of beige or blue chairs, a reception desk with a frosted glass window, institutional lighting — but warmer than a typical hospital. Potted plants. A small table with brochures (no readable text). One or two other patients visible in soft focus in background chairs. Morning light through windows. Clean, clinical, but not cold.

`assets/mri_corridor.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A hospital corridor leading to a closed door marked with an MRI symbol. Long fluorescent-lit hallway, clinical white and gray. The perspective is long and slightly dramatic — a vanishing point at the door. The lighting has the particular quality of hospital fluorescents. A sense of anticipation and the specific loneliness of a medical process you face mostly alone.

`assets/neurologist_office.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A neurologist's office. Light box on the wall displaying MRI brain scans. A desk with organized papers and a computer. Anatomical brain model on a shelf. Diplomas on the wall. Warm wood tones mixed with clinical white. A second chair — the patient's chair — visible beside the desk. Morning light from a window. Authoritative but humanized by personal touches.

`assets/physical_therapy.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A bright physical therapy gym. Parallel bars for walking. Exercise mats in blue and yellow. Large mirrors on one wall. Resistance bands hanging on a hook. Balance boards on a shelf. High windows letting in afternoon sunlight. Clean, active, optimistic energy. A space designed for rebuilding. Empty but clearly in use.

`assets/daily_life.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A home adapted for daily life with MS — still warm and personal, not clinical. Comfortable ergonomic furniture. A walking aid leaned neatly against a wall — not prominently placed, just there. Medication organizer on the kitchen counter. Notes and a calendar. A comfortable chair by a window. The scene looks like someone's real, full life — not defined by illness but honestly including it. Warm golden hour light.

`assets/symptom_arena.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. An abstract internal mindscape — the visual representation of cognitive fog and MS fatigue as an environment. Dark, heavy gray clouds at ground level, pressing down. The space is recognizable as something like a room or a path but distorted, wavering. Pinpoints of clear light visible in the distance — not hope exactly, but the memory of clarity. Cool blue-gray palette. Abstract and atmospheric.

`assets/infusion_center.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. An MS infusion center. Comfortable recliner chairs in a semicircle. IV poles with bags of clear medication. Large windows with natural light. A side table with water and a small snack. Other patients visible in soft focus — reading, on phones, resting. A warm, unhurried quality to the light and space. Medical but community-feeling. Afternoon light.

`assets/nerve_pathway.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. An abstract visualization of a nerve pathway — the final boss arena. Cylindrical myelin-sheathed nerve fibers extending into the distance like a corridor or tunnel. The healthy sections glow with soft blue-white light. Several areas are visibly damaged — the myelin sheath fragmented, the fiber beneath exposed and dark. The environment feels biological and vast. Cool scientific palette with warm areas of active signal.

`assets/victory.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A person outdoors in a park or garden, late afternoon golden hour light. They are sitting on a bench, looking outward at the scene — trees, sky, a path ahead. The posture is tired but peaceful, not defeated. Two other figures visible nearby — suggesting the support team or loved ones. The image has the particular quality of a hard day that ended okay. Warm golden light.

`assets/defeat.jpg`
> 2D digital illustration, painterly game scene background, 16:9 widescreen. A hospital room at nighttime — quiet, soft blue light from a window, a bed, an IV stand. Not dramatic or tragic — just still. The room is the kind of quiet that follows a hard thing. A chair beside the bed where someone else has been sitting. A glass of water. A phone on the side table. The scene is honest and humane rather than devastating. Cool blue and silver night light.

---

### MUSIC TRACKS (6 tracks)

Style: `ambient/electronic with organic elements, modern, emotionally specific`

`assets/first_signal_ambient.mp3`
> Ambient piano and soft synth for an RPG game intro scene. Warm but slightly unsettled — the feeling of something not quite right that you can't yet name. Sparse piano notes over a gentle pad with subtle dissonance that resolves and then returns. No percussion. Meditative, domestic, faintly anxious. 80 BPM. Seamless loop. Duration 30 seconds.

`assets/forward_motion.mp3`
> Acoustic guitar and ambient synth loop for an RPG journey/navigation scene. Hopeful but honest — the feeling of making progress through a hard situation. Fingerpicked acoustic guitar over a warm pad, minimal percussion, occasional gentle string swell. Positive but measured, not triumphant. 95 BPM. Seamless loop. Duration 30 seconds.

`assets/the_fog_theme.mp3`
> Oppressive, slow electronic music for an RPG combat scene against a cognitive fog enemy. Heavy, suffocating low synth bass that pulses slowly. Layered gray noise textures. No clear rhythm — more like a heartbeat slowed to something wrong. Occasional high tone that gets buried in the mass of sound. 60 BPM. Tense and disorienting. Seamless loop. Duration 30 seconds.

`assets/small_victory.mp3`
> Warm acoustic guitar and soft strings for an RPG post-battle victory scene. The feeling of a hard thing survived, not a triumphant win — more like relief and quiet pride. Gentle fingerpicked melody with sparse strings. Soft and human. 90 BPM. Seamless loop. Duration 30 seconds.

`assets/relapse_storm.mp3`
> Urgent, crackling electronic music for an RPG boss combat scene. Neural-static textures, urgent rising synth arpeggios, strong driving percussion. Red and orange in musical terms — heat and electricity and urgency. The feeling of a biological process at full intensity. 140 BPM. Seamless loop. Duration 30 seconds.

`assets/harder_road.mp3`
> Quiet, reflective ambient music for an RPG defeat/difficult outcome scene. Solo piano or acoustic guitar at low tempo, with long atmospheric reverb. Somber but not hopeless — the sound of someone sitting quietly with something difficult and not collapsing. 70 BPM. Seamless loop. Duration 30 seconds.

---

### SOUND EFFECTS

These map to existing SFX slots. New prompts to match the MS theme.

`sfx_dice_critical` (for nat-20 / critical success)
> Short triumphant chime, clean and bright, like a bell tone with a rising harmonic — the sound of the signal getting through clearly. 0.5 seconds.

`sfx_dice_fail` (for nat-1 / failure)
> Short low thud, muffled and heavy — the sound of a signal that didn't reach. Not dramatic, just dropped. 0.5 seconds.

`sfx_heal` (for healing abilities)
> Soft warm ascending tone with gentle reverb — a sound like a pathway opening, like light through a gap. 0.8 seconds.

`sfx_shield` (for Myelin Guard / protection effects)
> A sustained, low hum that solidifies — the sound of something being reinforced and held. 0.6 seconds.

`sfx_attack_physical` (for physical/brawn attacks)
> Solid, grounded impact sound — not violent, more like a firm deliberate push. 0.4 seconds.

`sfx_attack_cognitive` (for cunning-based attacks, clinical assessments)
> Clean precise click or electronic tone — the sound of a correct diagnosis, something identified. 0.4 seconds.

`sfx_slow` (for Fatigue debuff applied to enemy)
> A descending pitch bend followed by a heavy dragging texture — the feeling of something slowing down against its will. 0.6 seconds.

`sfx_victory_sting`
> A short warm musical phrase — three or four notes — the feeling of a door opening or a path clearing. 2 seconds.

`sfx_defeat_sting`
> A single soft piano note with long sustain — quiet, honest, not cruel. 2 seconds.

---

## UI Text Changes (manifest.js labels)

These strings in the manifest need updating to match the new theme:

| Key | Original | New |
|---|---|---|
| `partyTerms.singular` | Survivor | Advocate |
| `partyTerms.plural` | Survivors | Advocates |
| `partyTerms.adjective` | Wasteland-hardened | MS-informed |
| `partyTerms.description` | a member of the party | a member of the care team |
| `game.title` | Fallout: Wasteland Wanderers | Signal & Noise: An MS Journey |
| `ui.labels.characterSelect` | Choose a Survivor: | Choose a Team Member: |
| `ui.labels.defeated` | FLATLINED! | OVERWHELMED |
| `ui.labels.initiativeTitle` | ⚔ TURN ORDER | ◉ RESPONSE ORDER |
| `ui.labels.initiativeHeader` | TURN ORDER | RESPONSE ORDER |

---

## Color Palette Update (Optional)

The Fallout gold-and-olive palette can be shifted to better reflect the MS theme while keeping
the same warm/cool contrast structure.

| Role | Fallout Color | MS Theme Color | Notes |
|---|---|---|---|
| Primary text / accent | `#d4a017` (gold) | `#4a90d9` (MS blue) | MS awareness color is orange, but blue is cleaner for UI |
| Secondary text | `#7cb342` (olive) | `#6ec6a0` (soft teal) | Calm, medical, hopeful |
| Speaker name | `#ffcc00` (bright yellow) | `#f5a623` (warm orange) | MS awareness orange |
| Dialogue border | `0xd4a017` (gold) | `0x4a90d9` (blue) | Matches primary accent |
| Dice critical | `0xffd700` (gold) | `0x4a90d9` (blue-white) | Clear signal |
| Enemy name | `#ff6b6b` (red) | `#e05c5c` (deep red) | Same function, slightly richer |

---

## Summary: Asset Count

| Type | Count |
|---|---|
| Character portraits (4 chars × 4 states) | 16 |
| Enemy sprites (Fog × 6 + Relapse × 9) | 15 |
| Scene backgrounds | 11 |
| Music tracks | 6 |
| Sound effects | 9 |
| **Total** | **57** |
