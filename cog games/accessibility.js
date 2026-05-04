// Puzzle Porch – Accessibility Manager
// Handles: high contrast, reduced motion, voice narration, tap confirmation, toasts

export const AccessibilityManager = {
  highContrast: false,
  reducedMotion: false,
  voiceEnabled: true,
  tapConfirmEnabled: true,
  fontSize: 'large', // 'normal' | 'large' | 'xlarge'
  _speech: null,
  _toastTimer: null,

  init() {
    // Load saved prefs
    try {
      const saved = JSON.parse(localStorage.getItem('pp_accessibility') || '{}');
      this.highContrast    = saved.highContrast    ?? false;
      this.reducedMotion   = saved.reducedMotion   ?? false;
      this.voiceEnabled    = saved.voiceEnabled    ?? true;
      this.tapConfirmEnabled = saved.tapConfirmEnabled ?? true;
      this.fontSize        = saved.fontSize        ?? 'large';
    } catch(e) {}

    // Check OS reduced motion preference
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.reducedMotion = true;
    }

    this._applyBodyClass();
    this._setupConfirm();
  },

  save() {
    try {
      localStorage.setItem('pp_accessibility', JSON.stringify({
        highContrast: this.highContrast,
        reducedMotion: this.reducedMotion,
        voiceEnabled: this.voiceEnabled,
        tapConfirmEnabled: this.tapConfirmEnabled,
        fontSize: this.fontSize,
      }));
    } catch(e) {}
  },

  toggleHighContrast() {
    this.highContrast = !this.highContrast;
    this._applyBodyClass();
    this.save();
    this.speak(this.highContrast ? 'High contrast mode on' : 'High contrast mode off');
  },

  toggleReducedMotion() {
    this.reducedMotion = !this.reducedMotion;
    this.save();
    this.speak(this.reducedMotion ? 'Reduced motion on' : 'Reduced motion off');
  },

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    this.save();
    if (this.voiceEnabled) this.speak('Voice narration on');
  },

  toggleTapConfirm() {
    this.tapConfirmEnabled = !this.tapConfirmEnabled;
    this.save();
    this.speak(this.tapConfirmEnabled ? 'Tap confirmation on' : 'Tap confirmation off');
  },

  _applyBodyClass() {
    document.body.classList.toggle('hc', this.highContrast);
  },

  // Web Speech API
  speak(text, interrupt = true) {
    if (!this.voiceEnabled) return;
    if (!window.speechSynthesis) return;
    if (interrupt) window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1.0;
    u.volume = 1.0;
    window.speechSynthesis.speak(u);
  },

  stopSpeech() {
    window.speechSynthesis?.cancel();
  },

  // DOM Toast notification
  showToast(msg, duration = 2500) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  },

  // Tap confirmation dialog
  _confirmCallback: null,
  _setupConfirm() {
    const overlay = document.getElementById('tap-confirm');
    const yesBtn  = document.getElementById('confirm-yes');
    const noBtn   = document.getElementById('confirm-no');
    if (!overlay || !yesBtn || !noBtn) return;

    yesBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      if (this._confirmCallback) { this._confirmCallback(true); this._confirmCallback = null; }
    });
    noBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      if (this._confirmCallback) { this._confirmCallback(false); this._confirmCallback = null; }
    });
  },

  confirm(message, callback) {
    if (!this.tapConfirmEnabled) { callback(true); return; }
    const overlay = document.getElementById('tap-confirm');
    const msgEl   = document.getElementById('tap-confirm-msg');
    if (!overlay || !msgEl) { callback(true); return; }
    msgEl.textContent = message;
    overlay.classList.add('active');
    this._confirmCallback = callback;
    this.speak(message + '. Press Yes or No.');
  },

  // Tween helper – skips animation if reducedMotion
  tween(scene, config) {
    if (this.reducedMotion) {
      // Apply final state immediately
      const target = config.targets;
      if (config.alpha !== undefined) {
        (Array.isArray(target) ? target : [target]).forEach(t => { if(t) t.alpha = (typeof config.alpha === 'object') ? config.alpha.to ?? config.alpha : config.alpha; });
      }
      if (config.scaleX !== undefined) (Array.isArray(target) ? target : [target]).forEach(t => { if(t) t.scaleX = config.scaleX; });
      if (config.scaleY !== undefined) (Array.isArray(target) ? target : [target]).forEach(t => { if(t) t.scaleY = config.scaleY; });
      if (config.x !== undefined) (Array.isArray(target) ? target : [target]).forEach(t => { if(t) t.x = (typeof config.x === 'object') ? config.x.value ?? config.x : config.x; });
      if (config.y !== undefined) (Array.isArray(target) ? target : [target]).forEach(t => { if(t) t.y = (typeof config.y === 'object') ? config.y.value ?? config.y : config.y; });
      if (config.onComplete) config.onComplete();
      return null;
    }
    return scene.tweens.add(config);
  },

  // Color helpers
  get colors() {
    if (this.highContrast) {
      return {
        bg:          0x000000,
        bgStr:       '#000000',
        panel:       0x111111,
        panelStr:    '#111111',
        text:        '#ffffff',
        textNum:     0xffffff,
        accent:      '#ffff00',
        accentNum:   0xffff00,
        border:      0xffffff,
        tileA:       0xffd700,
        tileB:       0x00ccff,
        tileMatch:   0x00ff00,
        btnPrimary:  0xffff00,
        btnText:     '#000000',
        btnSecondary:0x444444,
        btnSecText:  '#ffffff',
        correct:     '#00ff00',
        wrong:       '#ff4444',
      };
    }
    return {
      bg:          0x2a1a0a,
      bgStr:       '#2a1a0a',
      panel:       0x5c3a1e,
      panelStr:    '#5c3a1e',
      text:        '#fffaf0',
      textNum:     0xfffaf0,
      accent:      '#f5c842',
      accentNum:   0xf5c842,
      border:      0xc8860a,
      tileA:       0xe8b04a,
      tileB:       0x7cb87c,
      tileMatch:   0x5ba35b,
      btnPrimary:  0xc8860a,
      btnText:     '#ffffff',
      btnSecondary:0x8b5e3c,
      btnSecText:  '#fffaf0',
      correct:     '#5ba35b',
      wrong:       '#c0392b',
    };
  },

  get fontSizeScale() {
    return { normal: 1, large: 1.25, xlarge: 1.5 }[this.fontSize] ?? 1.25;
  },

  fs(base) { return Math.round(base * this.fontSizeScale); },
};
