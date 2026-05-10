# HTML5 Conversion Analysis — Rosebudgames

Assessed: 2026-05-08  
Six games exported from the Rosebud.AI platform. Each entry documents the engine stack, Rosebud-specific dependencies, and the work required to ship as a standalone HTML5 game.

---

## Summary Table

| Game | Engine | Local Assets | Rosebud Script Deps | AI in Core Gameplay | Conversion Effort |
|---|---|---|---|---|---|
| Nightfall Survivors | Canvas 2D (inlined) | 145 (images + audio) | None visible | No | **Minimal** |
| RPG – Fallout | Phaser 3 + Tone.js | 48 (images + audio) | None (already removed) | Fallback-safe | **Minimal** |
| Golden Porch Puzzles | Phaser 3 + Tone.js | 9 (images) | 4 scripts (unused in JS) | No | **Low** |
| Army Rush 3D | Three.js + GLTFLoader | 6 (PNG) + 3 remote GLBs | 4 scripts (unused in JS) | No | **Medium** |
| Tavern Talk (Wizard) | Phaser 3 + Tone.js | 4 (webp) | 5 scripts (ChatManager is core) | **Yes** | **High** |
| Fortune Teller | Three.js + vanilla | None | 1 script (ChatManager is core) | **Yes** | **High** |

---

## Game Details

### 1. Nightfall Survivors (`vampire/`)

**Engine:** Canvas 2D — entire game logic is bundled inline inside the 304 KB `index.html`. No external game framework is loaded.

**Assets:** 145 files stored locally (`assets/`): PNG sprites and MP3/WAV audio. All self-contained.

**Rosebud dependencies:** The Rosebud splash screen is present in the HTML. No `rosebud_staticfiles` scripts are loaded. The game does not call `ChatManager`, `ImageGenerator`, or any Rosebud API.

**Conversion checklist:**
- [ ] Remove the `#rosebud-exported-splash` div and its inline `<style>` + `<script>` block
- [ ] Replace or remove `__rosebud/rosebud-icon.png` reference
- [ ] Replace `<title>` and any Rosebud branding text if needed

**Effort: Minimal.** The game is already self-contained. Only branding cleanup is required.

---

### 2. RPG – Fallout (`fallout rpg/`)

**Engine:** Phaser 3.70.0 + Tone.js 15.0.4 (both loaded via `esm.sh` CDN).

**Assets:** 48 files stored locally: images and audio.

**Rosebud dependencies:** None. The `index.html` has no `rosebud_staticfiles` scripts and no Rosebud splash. The `export-metadata.json` explicitly states: *"Rosebud runtime dependencies removed for direct browser and Android WebView packaging."*

**AI handling:** `AIService.js` implements a `StandaloneChatManager` with graceful degradation. When no auth token is configured it disables itself and the game falls back to `FallbackNarration.js` with deterministic combat narration. AI features are optional enhancements, not load-bearing.

**Conversion checklist:**
- [ ] Verify CDN availability of `esm.sh/phaser@3.70.0` and `esm.sh/tone@15.0.4`, or bundle/self-host them
- [ ] Optionally wire up `StandaloneChatManager` to a real API backend for live narration

**Effort: Minimal.** This is already a standalone build by design.

---

### 3. Golden Porch Puzzles (`cog games/`)

**Engine:** Phaser 3.70.0 + Tone.js 14.7.77 (CDN via `esm.sh`).

**Assets:** 9 images stored locally.

**Rosebud dependencies:** Four `rosebud_staticfiles` scripts are loaded in `index.html` — `ChatManager.js`, `ImageGenerator.js`, `ProgressLogger.js`, `OGP.js` — but **none of the game's JavaScript files call any Rosebud API**. The scripts are dead weight from the export.

**AI usage:** None in any scene (`BootScene`, `HomeScene`, `WordMatchScene`, `PicturePairsScene`, `TriviaScene`, `NumberTilesScene`, `JigsawScene`).

**Conversion checklist:**
- [ ] Remove the four `rosebud_staticfiles` `<script>` tags from `index.html`
- [ ] Remove the Rosebud splash div, its `<style>`, and its `<script>` from `index.html`
- [ ] Remove `__rosebud/rosebud-icon.png` reference
- [ ] Verify/self-host the `esm.sh` CDN imports if offline packaging is needed

**Effort: Low.** Purely mechanical HTML cleanup, no logic changes.

---

### 4. Army Rush 3D (`army/`)

**Engine:** Three.js 0.160.0 + GLTFLoader (CDN via `esm.sh`).

**Assets:** 6 listed in metadata (PNG files), but **three critical 3D models are loaded at runtime from the Rosebud CDN:**
- `EnemyManager.js`: loads `Dragon.glb` and `Demon.glb` from `https://play.rosebud.ai/assets/`
- `PowerupManager.js`: loads `Goblin.glb` from `https://play.rosebud.ai/assets/`

These URLs will break outside the Rosebud platform if those assets become unavailable.

**Rosebud script dependencies:** Four `rosebud_staticfiles` scripts (`ChatManager.js`, `ImageGenerator.js`, `ProgressLogger.js`, `OGP.js`) are loaded in `index.html`, but **none are called in any JS file**. They are dead weight.

**AI usage:** None in game logic.

**Conversion checklist:**
- [ ] Download `Dragon.glb`, `Demon.glb`, and `Goblin.glb` from `play.rosebud.ai` and store in `army/assets/`
- [ ] Update `EnemyManager.js:13`, `EnemyManager.js:16`, and `PowerupManager.js:13` to use local relative paths
- [ ] Remove the four `rosebud_staticfiles` `<script>` tags from `index.html`
- [ ] Remove the Rosebud splash from `index.html`
- [ ] Verify/self-host `esm.sh` imports if needed

**Effort: Medium.** The 3D asset dependency on `play.rosebud.ai` is the key risk — those GLBs must be captured before conversion.

---

### 5. Tavern Talk / Interactive Story – Wizard (`wizard/`)

**Engine:** Phaser 3.70.0 + Tone.js (CDN via `esm.sh`).

**Assets:** 4 webp images stored locally.

**Rosebud dependencies:** Five `rosebud_staticfiles` scripts loaded — `ChatManager.js`, `ProjectRedirect.js`, `ImageGenerator.js`, `ProgressLogger.js`, `OGP.js`.

**AI usage: Core.** `DialogueSystem.js` does `new ChatManager(persona)` at construction time. The entire game is an AI-driven dialogue adventure: every NPC response, every choice tree, and every narrative branch is generated by an LLM call through the Rosebud `ChatManager`. Without it the game produces no content.

**Conversion options:**
1. **Replace with a direct LLM API** (Claude API, OpenAI, etc.): Implement a thin `ChatManager` shim that calls your own backend or a public API endpoint. This preserves full AI capability.
2. **Pre-bake dialogue trees**: Export/record AI responses for all branches into static JSON and rewrite `DialogueSystem` to traverse them. Loses dynamic generation but runs fully offline.
3. **Hybrid**: Ship static fallback dialogue that activates when the API is unavailable.

**Conversion checklist:**
- [ ] Implement a `ChatManager` replacement (API-backed or static fallback)
- [ ] Remove `rosebud_staticfiles` scripts from `index.html`
- [ ] Remove Rosebud splash from `index.html`
- [ ] Remove `ProjectRedirect.js` (platform-only redirect logic)
- [ ] Test all dialogue branches with the replacement system

**Effort: High.** The AI is the game's content engine, not an optional feature.

---

### 6. Fortune Teller (`fortune/`)

**Engine:** Three.js 0.160.0 (CDN via `esm.sh`) + vanilla HTML/CSS/JS.

**Assets:** None — no local asset files.

**Rosebud dependencies:** One script: `ChatManager.js` from `rosebud_staticfiles`.

**AI usage: Core.** `ChatAI.js` does `new ChatManager(AI_BEHAVIOR_DESCRIPTION)` where `ChatManager` is the globally injected Rosebud script. The app's only interactive feature — asking the fortune teller a question and receiving a prediction — is entirely an LLM call. Without `ChatManager`, clicking "Reveal My Fortune" silently fails.

**Conversion options:**
1. **Replace with a direct LLM API call**: The `ChatAIClass.getResponse()` method is a thin wrapper — swap `new ChatManager(...)` for any compatible implementation (fetch to Claude/OpenAI, or a backend proxy).
2. **Hardcoded responses**: Replace with a random fortune from a curated pool. Loses AI personalization but works fully offline.

**Conversion checklist:**
- [ ] Replace `window.ChatManager` usage in `ChatAI.js` with a direct API client or static fallback
- [ ] Remove `ChatManager.js` `<script>` tag from `index.html`
- [ ] Remove Rosebud splash from `index.html`
- [ ] (Optional) Remove the Three.js spinning cube if targeting a simpler deployment — it's decorative only

**Effort: High.** The AI is the entire interactive surface of the app.

---

## Rosebud Splash Removal (All Games)

Every game except **RPG – Fallout** includes a Rosebud splash screen. The pattern is identical across all `index.html` files:

1. An injected `<style>` block for `#rosebud-exported-splash`
2. A `<div id="rosebud-exported-splash">` with the Rosebud logo and text
3. An inline `<script>` that fades out and removes the splash on page load

All three blocks can be safely deleted in games where the splash is not desired.

---

## External CDN Dependencies (All Games)

All games load their game engine from `https://esm.sh`. For production deployment or offline use, these should be self-hosted:

| Game | Package | Version |
|---|---|---|
| Army Rush 3D | `three` | 0.160.0 |
| Fortune Teller | `three` | 0.160.0 |
| Tavern Talk | `phaser` | 3.70.0 |
| Tavern Talk | `tone` | 14.7.77 |
| Golden Porch Puzzles | `phaser` | 3.70.0 |
| Golden Porch Puzzles | `tone` | 14.7.77 |
| RPG – Fallout | `phaser` | 3.70.0 |
| RPG – Fallout | `tone` | 15.0.4 |

All games also load Google Fonts over the network (where used). This should be bundled or replaced with system font stacks for offline deployments.
