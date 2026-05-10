// ═══════════════════════════════════════════════════════════════════════════════
// MANIFEST.JS - Signal & Noise: An MS Journey
// ═══════════════════════════════════════════════════════════════════════════════

export const manifest = {

  // ─────────────────────────────────────────────────────────────────────────────
  // GAME METADATA
  // ─────────────────────────────────────────────────────────────────────────────
  id: "ms_journey",
  title: "Signal & Noise: An MS Journey",
  documentTitle: "Signal & Noise: An MS Journey",
  description: "A heartfelt RPG about navigating life with Multiple Sclerosis — building a team of allies, confronting cognitive fog and relapse, and discovering that strength comes in many forms.",
  theme: "ms_journey",
  startingScene: "intro",
  defeatScene: "epilogue_defeat",

  // ─────────────────────────────────────────────────────────────────────────────
  // UI THEME
  // ─────────────────────────────────────────────────────────────────────────────
  ui: {
    fonts: {
      primary: "'Crimson Text', Georgia, 'Times New Roman', serif",
      monospace: "'Courier New', Courier, monospace",
      heading: "'Cinzel', Georgia, 'Times New Roman', serif",
      sizes: {
        title: "17px",
        heading: "15px",
        body: "14px",
        small: "13px",
        tiny: "12px",
      },
      metrics: {
        lineHeight: 1.4,
        buttonPadding: 1.5,
        sectionGap: 2.0,
        charWidth: 0.55,
        descenderPadding: {
          small: { top: 2, bottom: 6 },
          medium: { top: 3, bottom: 8 },
          large: { top: 4, bottom: 10 },
        },
      },
    },
    colors: {
      dialogBg: 0x0d1a2e,
      dialogBorder: 0x2eb8b8,
      panelBg: 0x081018,
      textPrimary: '#2eb8b8',
      textSecondary: '#7ec8c8',
      textSpeaker: '#a8e6e6',
      textDisabled: '#666666',
      buttonNormal: 0x0e2a3a,
      buttonHover: 0x1a4a5a,
      buttonDisabled: 0x0a1a22,
      buttonText: '#ffffff',
      healthOk: 0x4ade80,
      healthHurt: 0xfbbf24,
      healthCritical: 0xff6b6b,
      healthDown: 0xef4444,
      healthBarBg: 0x333333,
      initiative: {
        currentEnemy: 0x4a1a4a,
        currentParty: 0x0e3a2a,
        inactive: 0x0d1a2e,
        enemyName: '#c084fc',
        partyName: '#5eead4',
        currentName: '#ffffff',
        indicator: '#2eb8b8',
      },
      enemy: {
        name: '#c084fc',
        placeholder: 0x6b21a8,
      },
      party: {
        placeholder: 0x0e7490,
      },
      actionButton: {
        bg: 0x0e4a4a,
        bgHover: 0x1a6a6a,
        border: 0x2eb8b8,
        borderHover: 0x5ed8d8,
      },
      infoButton: {
        bg: 0x1a2a3a,
        bgHover: 0x2a3a4a,
      },
      combat: {
        damageFlash: 0x7c3aed,
        damageText: '#c084fc',
        healText: '#5eead4',
        textStroke: '#000000',
      },
      dice: {
        critical: 0x2eb8b8,
        success: 0x4ade80,
        partial: 0xfbbf24,
        failure: 0xef4444,
        boxBg: 0x0d1a2e,
        boxBorder: 0x2eb8b8,
        criticalTint: 0x0e4a4a,
        failureTint: 0x3a1a3a,
      },
      overlay: {
        dark: 0x000000,
        gradient1: 0x0d1a2e,
        gradient2: 0x081828,
        victoryFlash: 0x2eb8b8,
        defeatTint: 0x4a1a4a,
      },
      backButton: {
        bg: 0x0e1a2a,
        bgHover: 0x1a2a3a,
      },
    },
    dimensions: {
      healthBar: { width: 50, height: 10, borderRadius: 3 },
      enemyHealthBar: { width: 100, height: 12, borderRadius: 4, yOffset: 20 },
      portrait: { small: 20, medium: 22, large: 40 },
      initiative: { entryHeight: 30, panelWidth: 170, padding: 5 },
      ability: { buttonHeight: 52, buttonSpacing: 8, borderRadius: 6, namePaddingTop: 8, descPaddingTop: 28, rightColumnX: 45, sectionSpacing: 16 },
      dialogue: { padding: 20, speakerY: 15, textY: 45, indicatorSize: 14, borderRadius: 12 },
    },
    spacing: { healthBarRow: 28, portraitOffset: 15, nameOffset: 40 },
    animation: { damageFlash: 80, highlightPulse: 400, continuePulse: 600, healGlow: 150 },
    labels: {
      characterSelect: "Choose Your Ally:",
      unknownCharacter: "A team member",
      abilitySelect: "Select Action:",
      basicAttacksSection: "— Core Actions —",
      specialAbilitiesSection: "— Special Actions —",
      initiativeHeader: "TURN ORDER",
      initiativeTitle: "TURN ORDER",
      roundTransition: "--- ROUND {round} ---",
      narrator: "Narrator",
      defeated: "OVERCOME!",
      hpLabel: "HP",
      continueIndicator: "▼",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AI/NARRATOR CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────────
  ai: {
    projectId: "ms_journey",
    partyTerms: {
      singular: "Ally",
      plural: "Team",
      adjective: "Determined",
      description: "a member of the support team",
    },
    fallbackNarration: {
      breakFreeSuccess: "pushes through the fog and regains focus",
      breakFreeFailure: "struggles against the exhaustion but holds on",
      unconscious: "is overwhelmed and cannot act this round",
      effects: {
        restrain: "Movement is slowed by fatigue and nerve pain!",
        poison: "Inflammation deals {damage} additional damage!",
        slow: "Nerve signals are disrupted — the target is slowed!",
        mark: "A symptom pattern is identified for bonus effect!",
        shield: "A protective support network is raised!",
        concealment: "The team adapts and finds a moment of calm!",
        damage_reduction: "Neurological defenses are strained!",
        default: "{type} effect applied!",
      },
    },
    narratorPrompt: `You are the narrator for "Signal & Noise: An MS Journey", a heartfelt RPG about navigating life with Multiple Sclerosis. The player leads Alex Chen and her support team — a neurologist, a physical therapist, and a care coordinator — as they confront the challenges of cognitive fog, fatigue, and relapse.

Your tone is:
- Warm, honest, and empowering — never pitying or minimizing
- Grounded in the real experience of chronic illness, with moments of hard-won humor
- Treats setbacks as part of the journey, not the end of the story

Rules:
- Keep responses under 3 sentences unless asked for more
- Never break character or mention being an AI
- Make every action feel meaningful
- Use clear, accessible language`,
    narratorTone: {
      style: [
        "Warm and honest — acknowledging difficulty without wallowing in it",
        "Grounded in real MS experiences — fatigue, fog, and the small victories",
        "Empowering — each action taken is an act of strength, however small"
      ],
      rules: [
        "Keep responses to 2-3 sentences MAX",
        "Never break character or mention being an AI",
        "Treat every action as meaningful and worth narrating"
      ]
    },
    personalityStyles: {
      determined: "resilient, focused, finds a way forward",
      clinical: "precise, analytical, compassionate under pressure",
      energetic: "encouraging, warm, refuses to give up on anyone",
      organized: "methodical, caring, always has a resource or a plan",
    },
    narrationInstructions: {
      healParty: "channeling restorative energy that flows to the entire team!",
      buffParty: "raising a network of support over the whole team!",
      healSelf: "drawing on inner reserves to recover!",
    },
    npcPrompts: {}
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENE DISPLAY CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────────
  sceneDisplay: {
    victoryScenes: ["midboss_victory", "epilogue_victory"],
    dynamicCharacterDefaults: {
      x: 0.5,
      y: 0.45,
      maxSize: 180,
      successAnimation: { type: "bounce", duration: 600, ease: "Back.easeOut" },
      failureAnimation: { type: "shake", duration: 400, ease: "Power2" }
    },
    scenes: {
      midboss_victory: {
        party: { show: true, pose: "idle", y: 0.45, spacing: 0.2, startX: 0.15, maxSize: 140 }
      },
      epilogue_victory: {
        party: { show: true, pose: "idle", y: 0.45, spacing: 0.2, startX: 0.15, maxSize: 140 }
      }
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PARTY MEMBERS
  // ─────────────────────────────────────────────────────────────────────────────
  party: [
    {
      id: "alex_chen",
      name: "Alex Chen",
      images: {
        idle: "assets/alex_chen-idle.png",
        attack: "assets/alex_chen-attack.png",
        hurt: "assets/alex_chen-hurt.png",
        portrait: "assets/alex_chen-portrait.png",
      },
      gender: "female",
      pronouns: { subject: "she", object: "her", possessive: "her" },
      class: "Advocate",
      stats: {
        brawn: 1,
        cunning: 1,
        spirit: 2,
      },
      maxHealth: 5,
      trait: "determined",
      description: "A woman in her late 20s living with MS who channels her experience into fierce self-advocacy and a refusal to let the disease define her limits",
      personality: "Alex approaches every challenge with a mixture of hard-won resilience and careful self-awareness. She knows her body, knows when to push and when to pace, and speaks up for herself and others with quiet conviction.",
      song: "I've learned that asking for help isn't weakness — it's strategy. My brain does things I didn't ask for, and that's okay. I've built a whole team around the word 'we'.",
    },
    {
      id: "dr_maya",
      name: "Dr. Maya Rodriguez",
      images: {
        idle: "assets/dr_maya-idle.png",
        attack: "assets/dr_maya-attack.png",
        hurt: "assets/dr_maya-hurt.png",
        portrait: "assets/dr_maya-portrait.png",
      },
      gender: "female",
      pronouns: { subject: "she", object: "her", possessive: "her" },
      class: "Neurologist",
      stats: {
        brawn: 0,
        cunning: 3,
        spirit: 1,
      },
      maxHealth: 5,
      trait: "clinical",
      description: "A compassionate neurologist in her mid-40s who combines rigorous clinical expertise with a genuine belief that her patients are the experts on their own experience",
      personality: "Dr. Maya listens first, diagnoses second. She translates complex neuroscience into language that empowers rather than overwhelms, and pushes back hard when she sees the system failing her patients.",
      song: "The scan shows lesions. The data shows progression. But the data doesn't show what you did this week — what you pushed through. I keep both charts. They're equally important.",
    },
    {
      id: "jordan_taylor",
      name: "Jordan Taylor",
      images: {
        idle: "assets/jordan_taylor-idle.png",
        attack: "assets/jordan_taylor-attack.png",
        hurt: "assets/jordan_taylor-hurt.png",
        portrait: "assets/jordan_taylor-portrait.png",
      },
      gender: "nonbinary",
      pronouns: { subject: "they", object: "them", possessive: "their" },
      class: "Physical Therapist",
      stats: {
        brawn: 2,
        cunning: 1,
        spirit: 2,
      },
      maxHealth: 5,
      trait: "energetic",
      description: "A physical therapist in their early 30s who designs neuroplasticity-focused rehab programs and believes, absolutely, that the nervous system is more adaptable than anyone gives it credit for",
      personality: "Jordan meets every patient at exactly the level they're at that day — no judgment, no comparison to yesterday. Their sessions are part science, part encouragement, and occasionally part dance-off.",
      song: "Your brain is not broken. It is rerouting. I have seen people do things their MRIs said were impossible. Today we're going to do the possible. Then next week we renegotiate.",
    },
    {
      id: "sam_park",
      name: "Sam Park",
      images: {
        idle: "assets/sam_park-idle.png",
        attack: "assets/sam_park-attack.png",
        hurt: "assets/sam_park-hurt.png",
        portrait: "assets/sam_park-portrait.png",
      },
      gender: "male",
      pronouns: { subject: "he", object: "him", possessive: "his" },
      class: "Care Coordinator",
      stats: {
        brawn: 0,
        cunning: 2,
        spirit: 2,
      },
      maxHealth: 5,
      trait: "organized",
      description: "A social worker and care coordinator in his late 30s who navigates the healthcare system like a tactician, connecting patients with resources and refusing to accept 'that's just how it works' as an answer",
      personality: "Sam has a planner for his planner. He knows every MS support program, insurance loophole, and community resource in a fifty-mile radius. He brings a small succulent to every meeting for luck, and it works.",
      song: "There's a grant for that. There's a program for that. I know it feels like the system is designed to exhaust you into giving up — that's why you have me. I am extremely difficult to exhaust.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // ABILITIES
  // ─────────────────────────────────────────────────────────────────────────────
  abilities: {
    alex_chen: {
      basicAttacks: [
        {
          id: "speak_up",
          name: "Speak Up",
          description: "Name the symptom clearly and directly. Accurate self-reporting disrupts the fog's hold.",
          stat: "spirit",
          difficulty: "normal",
          damage: 2,
          targetType: "enemy",
        }
      ],
      specialAbilities: [
        {
          id: "determined_push",
          name: "Determined Push",
          description: "Draw on deep reserves of resilience. This costs something, but it counts.",
          stat: "brawn",
          difficulty: "hard",
          damage: 3,
          uses: 2,
          targetType: "enemy",
        },
        {
          id: "adaptive_strategy",
          name: "Adaptive Strategy",
          description: "Rethink the approach. Protect the team with hard-won insight.",
          stat: "cunning",
          difficulty: "easy",
          effect: {
            type: "shield", reduction: 1, duration: 2, description: "Protected by adaptive planning and self-knowledge"
          },
          uses: 1,
          targetType: "party",
        }
      ],
    },
    dr_maya: {
      basicAttacks: [
        {
          id: "clinical_assessment",
          name: "Clinical Assessment",
          description: "Identify the pattern, name the mechanism, target the weak point with precision.",
          stat: "cunning",
          difficulty: "normal",
          damage: 2,
          targetType: "enemy",
        }
      ],
      specialAbilities: [
        {
          id: "treatment_protocol",
          name: "Treatment Protocol",
          description: "Initiate a targeted intervention. Evidence-based care, delivered with conviction.",
          stat: "spirit",
          difficulty: "normal",
          effect: {
            type: "heal", amount: 2
          },
          uses: 2,
          targetType: "party",
        },
        {
          id: "diagnostic_insight",
          name: "Diagnostic Insight",
          description: "See the full picture. Mark a vulnerability for amplified effect.",
          stat: "cunning",
          difficulty: "hard",
          damage: 2,
          effect: {
            type: "mark", duration: 2, description: "Vulnerability identified — next action hits harder"
          },
          uses: 2,
          targetType: "enemy",
        }
      ],
    },
    jordan_taylor: {
      basicAttacks: [
        {
          id: "neuro_pt_circuit",
          name: "Neuro PT Circuit",
          description: "A targeted movement sequence that challenges and strengthens compromised neural pathways.",
          stat: "brawn",
          difficulty: "normal",
          damage: 2,
          targetType: "enemy",
        }
      ],
      specialAbilities: [
        {
          id: "functional_training",
          name: "Functional Training",
          description: "Build strength and restore function. The nervous system responds to consistent input.",
          stat: "brawn",
          difficulty: "normal",
          effect: {
            type: "heal", amount: 2
          },
          uses: 2,
          targetType: "party",
        },
        {
          id: "neuroplasticity_protocol",
          name: "Neuroplasticity Protocol",
          description: "Force the nervous system to reroute. Disrupts established symptom patterns.",
          stat: "spirit",
          difficulty: "hard",
          damage: 2,
          effect: {
            type: "slow", duration: 2, description: "Symptom signals disrupted — progression slowed"
          },
          uses: 2,
          targetType: "enemy",
        }
      ],
    },
    sam_park: {
      basicAttacks: [
        {
          id: "care_coordination",
          name: "Care Coordination",
          description: "Connect the right resource at the right moment. The network activates.",
          stat: "spirit",
          difficulty: "normal",
          damage: 2,
          targetType: "enemy",
        }
      ],
      specialAbilities: [
        {
          id: "symptom_management",
          name: "Symptom Management",
          description: "Deploy a targeted support plan. Reduce the burden before it compounds.",
          stat: "cunning",
          difficulty: "easy",
          effect: {
            type: "damage_reduction", reduction: 1, duration: 2, description: "Support plan active — incoming severity reduced"
          },
          uses: 2,
          targetType: "party",
        },
        {
          id: "community_support",
          name: "Community Support",
          description: "You are not doing this alone. Activate the full network. Everyone benefits.",
          stat: "spirit",
          difficulty: "normal",
          effect: {
            type: "heal", amount: 2
          },
          uses: 2,
          targetType: "party",
        }
      ],
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENEMIES
  // ─────────────────────────────────────────────────────────────────────────────
  enemies: {
    the_fog: {
      id: "the_fog",
      name: "The Fog",
      shortName: "The Fog",
      images: {
        idle: "assets/the_fog-idle.png",
        attack: "assets/the_fog-attack.png",
        hurt: "assets/the_fog-hurt.png",
        dead: "assets/the_fog-damaged.png",
        portrait: "assets/the_fog-portrait.png",
        special: "assets/the_fog-special.png",
      },
      creatureType: "Cognitive",
      size: "Large",
      description: "A churning mass of grey-blue neural static — the cognitive fog of MS given form. It does not attack out of malice. It simply is, and it is everywhere.",
      personality: "The Fog does not think or feel. It accumulates. It muffles. It replaces clarity with static and certainty with doubt. It is most dangerous when you stop naming it.",
      health: 12,
      stats: {
        cunning: 1,
      },
      tactics: {
        openingMove: "cognitive_overload",
      },
      attacks: [
        {
          id: "cognitive_overload",
          name: "Cognitive Overload",
          description: "A surge of competing signals floods perception, making it hard to think or act",
          damage: 1,
          damageType: "cognitive",
          targeting: "random",
          cooldown: 0,
        },
        {
          id: "fatigue_wave",
          name: "Fatigue Wave",
          description: "A slow, heavy pulse of exhaustion radiates outward — slowing everyone it touches",
          damage: 1,
          damageType: "fatigue",
          targeting: "lowest_health",
          effect: {
            type: "slow", duration: 1, description: "Overwhelmed by fatigue — response time reduced"
          },
          cooldown: 0,
        },
        {
          id: "inflammatory_cascade",
          name: "Inflammatory Cascade",
          description: "The fog thickens and intensifies, pressing down on the whole team at once",
          damage: 2,
          damageType: "inflammatory",
          targeting: "random",
          cooldown: 0,
        }
      ],
    },
    the_relapse: {
      id: "the_relapse",
      name: "The Relapse",
      shortName: "The Relapse",
      images: {
        idle: "assets/the_relapse-idle.png",
        attack: "assets/the_relapse-attack.png",
        hurt: "assets/the_relapse-strained.jpg",
        dead: "assets/the_relapse-resolving.jpg",
        portrait: "assets/the_relapse-portrait.jpg",
        attack2: "assets/the_relapse-action.jpg",
        special1: "assets/the_relapse-special.jpg",
        special2: "assets/the_relapse-intensified.jpg",
        transform: "assets/the_relapse-fading.jpg",
      },
      creatureType: "Neurological",
      size: "Large",
      description: "What The Fog becomes when inflammation peaks — a towering storm of deep purple and electric red, active and forceful where The Fog was passive. A relapse is not a failure. But it must be faced.",
      personality: "The Relapse does not hesitate. It arrives without warning and presses every advantage. The only way through it is together — no one manages a relapse alone.",
      health: 18,
      stats: {
        cunning: 2,
      },
      tactics: {
        openingMove: "myelin_assault",
      },
      attacks: [
        {
          id: "myelin_assault",
          name: "Myelin Assault",
          description: "A targeted strike along a nerve pathway — precise, disruptive, and hard to predict",
          damage: 2,
          damageType: "demyelinating",
          targeting: "highest_threat",
          cooldown: 0,
        },
        {
          id: "demyelination_strike",
          name: "Demyelination Strike",
          description: "A powerful surge of inflammatory energy severs signal pathways",
          damage: 3,
          damageType: "demyelinating",
          targeting: "random",
          cooldown: 0,
        },
        {
          id: "relapse_surge",
          name: "Relapse Surge",
          description: "The storm intensifies — a wave of inflammatory energy that immobilizes",
          damage: 1,
          damageType: "inflammatory",
          targeting: "lowest_health",
          effect: {
            type: "restrain", duration: 1, description: "Held in place by the full force of the relapse"
          },
          cooldown: 0,
        }
      ],
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENES
  // ─────────────────────────────────────────────────────────────────────────────
  scenes: {
    intro: {
      id: "intro",
      title: "Signal & Noise: An MS Journey",
      type: "narrative",
      background: "assets/first_symptoms.png",
      music: "assets/another_dust_lullaby_122_bpm_loop.mp3",
      openingText: `It starts quietly. A patch of numbness that comes and goes. Fatigue that sleep doesn't fix. A moment of double vision on a Tuesday afternoon. Multiple Sclerosis doesn't announce itself — it accumulates. Alex Chen is 28 when she gets her diagnosis. She is not alone. But it takes a little while to believe that.`,
      speaker: null,
      nextScene: "first_appointment",
    },

    first_appointment: {
      id: "first_appointment",
      title: "The First Appointment",
      type: "narrative",
      background: "assets/neurologist_office.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `Dr. Maya Rodriguez's office has a whiteboard covered in diagrams of the nervous system and a small cactus on the windowsill labeled "resilient." She explains the diagnosis clearly, without softening it or catastrophizing it. Then she asks what Alex needs to know. It's the first time a doctor has asked that.`,
      speaker: "Dr. Maya Rodriguez",
      choices: [
        {
          id: "ask_about_future",
          label: "Ask what happens next",
          character: "dr_maya",
          stat: "cunning",
          difficulty: "easy",
          outcomes: {
            success: {
              text: "Dr. Maya outlines a treatment plan with calm precision. There are options. There is a path.",
              nextScene: "diagnosis_day",
            },
            failure: {
              text: "The information is a lot to absorb. Dr. Maya writes it down. 'Take this home. Read it twice.'",
              nextScene: "diagnosis_day",
            },
          },
        },
        {
          id: "ask_about_team",
          label: "Ask who else will help",
          character: "alex_chen",
          stat: "spirit",
          difficulty: "easy",
          outcomes: {
            success: {
              text: "Dr. Maya introduces the care team concept. A neurologist, a PT, a coordinator. 'You don't do this alone.' The sentence lands somewhere important.",
              setFlag: "knows_the_team",
              nextScene: "diagnosis_day",
            },
            failure: {
              text: "It's hard to take in. But the name Jordan Taylor and Sam Park get written on a card. Alex pockets it.",
              nextScene: "diagnosis_day",
            },
          },
        },
      ],
    },

    diagnosis_day: {
      id: "diagnosis_day",
      title: "Processing",
      type: "narrative",
      background: "assets/hospital_waiting.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `The waiting room has magazines from three years ago and a water cooler that makes a sound like a question mark. Alex sits with the diagnosis in her chest — not a surprise, exactly, but still a weight. She texts someone. She doesn't know yet that in six months she will be giving other people exactly the information she's wishing for right now.`,
      speaker: null,
      nextScene: "learning_curve",
    },

    learning_curve: {
      id: "learning_curve",
      title: "Learning the Rhythm",
      type: "narrative",
      background: "assets/daily_life.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `Jordan Taylor's PT sessions are nothing like Alex expected. No pity, no kid gloves — just rigorous, thoughtful work adapted to what the nervous system can do today. Sam Park calls with a list of resources and asks how she's actually doing before asking about her paperwork. Slowly, improbably, a team forms. MS is still there. But so are they.`,
      speaker: null,
      nextScene: "midboss_combat",
    },

    midboss_combat: {
      id: "midboss_combat",
      title: "The Fog Arrives",
      type: "combat",
      background: "assets/symptom_arena.png",
      music: "assets/barrel_in_my_back_140_bpm_loop.mp3",
      combat: {
        version: 2,
        enemyId: "the_fog",
        openingNarration: `It comes on a Wednesday, the way it always does — not dramatically, but accumulating. Words slip. The room feels slightly sideways. The list of things Alex was going to do today becomes a list she's looking at from underwater. This is The Fog. And it has to be named to be fought.`,
        victoryScene: "midboss_victory",
        defeatScene: "epilogue_defeat",
      },
    },

    midboss_victory: {
      id: "midboss_victory",
      title: "Clarity",
      type: "narrative",
      background: "assets/treatment_center.png",
      music: "assets/whiskey_barn_dance.mp3",
      openingText: `The fog lifts — not all at once, but enough. A clear hour, then a clear afternoon. Jordan adjusts the plan. Sam finds an energy management program Alex didn't know existed. Dr. Maya updates the treatment notes: "Patient demonstrates excellent self-awareness and care team engagement." Alex reads it and thinks: yeah. We did that.`,
      speaker: null,
      nextScene: "the_long_road",
    },

    the_long_road: {
      id: "the_long_road",
      title: "Between Episodes",
      type: "narrative",
      background: "assets/mri_corridor.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `The MRI corridor is cold and bright and very loud. Alex has learned to bring earbuds and a particular playlist. She's learned what the technicians' expressions mean and how to read a radiologist's report. She's learned to celebrate the clean scans and sit with the ones that aren't. Stability is not the absence of MS. It is a thing you build.`,
      speaker: null,
      nextScene: "infusion_center",
    },

    infusion_center: {
      id: "infusion_center",
      title: "The Infusion Center",
      type: "narrative",
      background: "assets/infusion_center.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `Every few months, the infusion center. The chair is more comfortable than it looks, the nurses know Alex by name now, and there is always bad cable television and surprisingly good crackers. The medication drips in slowly — a disease-modifying therapy that doesn't cure anything but holds the line. Alex brings a book. Sometimes she talks to the person in the next chair. Sometimes they swap tips. Sometimes they just sit together in the particular solidarity of people doing a hard, necessary thing.`,
      speaker: null,
      choices: [
        {
          id: "talk_to_neighbor",
          label: "Talk to the person next to you",
          character: "alex_chen",
          stat: "spirit",
          difficulty: "easy",
          outcomes: {
            success: {
              text: "An easy conversation — swapped tips, a shared laugh, a name on a piece of paper. The infusion passes faster. The team grows by one.",
              setFlag: "infusion_connection",
              nextScene: "community_matters",
            },
            failure: {
              text: "They're asleep before the drip is half done. That's okay too. Alex reads her book. The medication does its job either way.",
              nextScene: "community_matters",
            },
          },
        },
        {
          id: "rest_quietly",
          label: "Rest and recharge",
          character: "alex_chen",
          stat: "brawn",
          difficulty: "easy",
          outcomes: {
            success: {
              text: "A rare few hours of sanctioned stillness. Alex finishes her book, eats the crackers, and leaves feeling steadier than when she arrived.",
              nextScene: "community_matters",
            },
            failure: {
              text: "Too wired to rest, too tired to focus. The crackers help. Sam texts a check-in at exactly the right moment. That helps more.",
              nextScene: "community_matters",
            },
          },
        },
      ],
    },

    community_matters: {
      id: "community_matters",
      title: "Finding Each Other",
      type: "narrative",
      background: "assets/daily_life2.png",
      music: "assets/rambling_154_bpm_loop.mp3",
      openingText: `Sam introduces Alex to an MS support group. It's in a church basement with bad coffee and fluorescent lights, and it is one of the most useful hours of Alex's entire year. There are people who have been living with MS for twenty years, people diagnosed last month, people who are doing the thing Alex feared was impossible: living well. Still MS. Still living well.`,
      speaker: null,
      nextScene: "finalboss_combat",
    },

    finalboss_combat: {
      id: "finalboss_combat",
      title: "The Relapse",
      type: "combat",
      background: "assets/nerve_pathway.png",
      music: "assets/end_of_the_rope_c_172_bpm_loop.mp3",
      combat: {
        version: 2,
        enemyId: "the_relapse",
        openingNarration: `This time it is not subtle. One morning Alex cannot feel her left hand properly, and by afternoon the world has tilted. Dr. Maya calls it a relapse. She says it clearly: this is what MS does sometimes. The treatment plan activates. The team assembles. A relapse is not a failure. But it is a fight, and it will take everything.`,
        victoryScene: "epilogue_victory",
        defeatScene: "epilogue_defeat",
      },
    },

    epilogue_victory: {
      id: "epilogue_victory",
      title: "Coming Through",
      type: "narrative",
      isEnding: true,
      background: "assets/victory.png",
      music: "assets/whiskey_barn_dance.mp3",
      openingText: `The relapse resolves. Not immediately, not without cost — but it resolves. Sensation returns. The world levels out. Jordan builds a new phase into the rehab plan. Sam updates the emergency protocol. Dr. Maya adds a note to the file: "Strong recovery. Excellent team coordination." Alex reads the note and thinks about every person who told her MS meant a smaller life. They were wrong.`,
      speaker: null,
      choices: [
        {
          id: "celebrate",
          label: "Look forward",
          outcomes: {
            success: {
              text: `MS is still here. So is the team. So is Alex. That's enough. That's everything.\n\n--- THE END ---`,
              speaker: "Narrator",
            },
          },
        },
      ],
    },

    epilogue_defeat: {
      id: "epilogue_defeat",
      title: "Not Today",
      type: "narrative",
      isEnding: true,
      background: "assets/defeat.png",
      music: "assets/end_of_the_rope_a_172_bpm_loop.mp3",
      openingText: `Sometimes the fog wins the day. The relapse takes more than expected. The team adjusts the plan, increases support, gives it time. This is not the end of the story — MS is a long journey, and not every episode resolves on the first try. Rest. Regroup. The team is still here. Try again when you're ready.`,
      speaker: null,
      choices: [
        {
          id: "try_again",
          label: "Rest and regroup",
          outcomes: {
            success: {
              text: `Recovery is not linear. Neither is this story. Come back.\n\n--- TRY AGAIN ---`,
              speaker: "Narrator",
            },
          },
        },
      ],
    },
  },
};
