(function() {
  function getExportManifest() {
    return window.NightfallExportManifest || {};
  }

  function getThemeId() {
    return getExportManifest().themeId || 'retro-fantasy-test';
  }

  function themePath(category, fileName) {
    return 'assets/themes/' + getThemeId() + '/' + category + '/' + fileName;
  }

  function getThemeAssets() {
    var exportManifest = getExportManifest();
    return exportManifest.themeAssets || null;
  }

  var fallbackManifest = {
    actors: {
      hero: themePath('actors', 'hero.png'),
      knight: themePath('actors', 'knight.png'),
      mage: themePath('actors', 'mage.png'),
      cleric: themePath('actors', 'cleric.png'),
      rogue: themePath('actors', 'rogue.png'),
      necromancer: themePath('actors', 'necromancer.png'),
      paladin: themePath('actors', 'paladin.png'),
      skeleton: themePath('actors', 'skeleton.png'),
      bat: themePath('actors', 'bat.png'),
      slime: themePath('actors', 'slime.png'),
      zombie: themePath('actors', 'zombie.png'),
      demon: themePath('actors', 'demon.png'),
      ghost: themePath('actors', 'ghost.png'),
      wraith: themePath('actors', 'wraith.png'),
      deathknight: themePath('actors', 'deathknight.png')
    },
    weapons: {
      knife: themePath('weapons', 'knife.png'),
      garlic: themePath('weapons', 'garlic.png'),
      holywater: themePath('weapons', 'holywater.png'),
      firewand: themePath('weapons', 'firewand.png'),
      lightning: themePath('weapons', 'lightning.png'),
      axe: themePath('weapons', 'axe.png'),
      whip: themePath('weapons', 'whip.png'),
      runic: themePath('weapons', 'runic.png')
    },
    tiles: {
      ground: themePath('tiles', 'ground.png'),
      ground_macro: themePath('tiles', 'ground_macro.png'),
      ground_moss: themePath('tiles', 'ground_moss.png'),
      ground_leaf: themePath('tiles', 'ground_leaf.png'),
      ground_roots: themePath('tiles', 'ground_roots.png'),
      ground_stone: themePath('tiles', 'ground_stone.png'),
      ground_grass: themePath('tiles', 'ground_grass.png'),
      ground_dirt: themePath('tiles', 'ground_dirt.png'),
      ground_petals: themePath('tiles', 'ground_petals.png'),
      ground_cracked: themePath('tiles', 'ground_cracked.png'),
      ground_mixed: themePath('tiles', 'ground_mixed.png')
    },
    ui: {
      hud_panel: themePath('ui', 'hud_panel.png'),
      stat_speed: themePath('ui', 'stat_speed.png'),
      stat_max_hp: themePath('ui', 'stat_max_hp.png'),
      stat_damage: themePath('ui', 'stat_damage.png'),
      stat_pickup_radius: themePath('ui', 'stat_pickup_radius.png'),
      stat_crit_chance: themePath('ui', 'stat_crit_chance.png'),
      stat_cooldown_reduction: themePath('ui', 'stat_cooldown_reduction.png'),
      stat_armor: themePath('ui', 'stat_armor.png'),
      stat_xp_gain: themePath('ui', 'stat_xp_gain.png')
    },
    weapon_ui: {
      knife: themePath('weapon_ui', 'knife.png'),
      garlic: themePath('weapon_ui', 'garlic.png'),
      holywater: themePath('weapon_ui', 'holywater.png'),
      firewand: themePath('weapon_ui', 'firewand.png'),
      lightning: themePath('weapon_ui', 'lightning.png'),
      axe: themePath('weapon_ui', 'axe.png'),
      whip: themePath('weapon_ui', 'whip.png'),
      runic: themePath('weapon_ui', 'runic.png')
    }
  };

  var manifest = getThemeAssets() || fallbackManifest;

  var images = {};

  function getKey(category, key) {
    return category + ':' + key;
  }

  function ensureImage(category, key) {
    if (!manifest[category] || !manifest[category][key]) return null;
    var id = getKey(category, key);
    if (images[id]) return images[id];
    var img = new Image();
    img.decoding = 'async';
    img.src = manifest[category][key];
    images[id] = img;
    return img;
  }

  function drawSprite(ctx, category, key, x, y, w, h, options) {
    var img = ensureImage(category, key);
    if (!img || !img.complete || !img.naturalWidth) return false;
    var opts = options || {};
    ctx.save();
    if (opts.alpha !== undefined) ctx.globalAlpha = opts.alpha;
    var filter = opts.filter !== undefined ? opts.filter : getFilter(category);
    if (filter && filter !== 'none') ctx.filter = filter;
    if (opts.rotation) {
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(opts.rotation);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
    } else {
      ctx.drawImage(img, x, y, w, h);
    }
    ctx.restore();
    return true;
  }

  function getFilter(category) {
    var exportManifest = getExportManifest();
    var filters = exportManifest.categoryFilters || {};
    return filters[category] || 'none';
  }

  function getActorDraw(key) {
    var exportManifest = getExportManifest();
    var actorDraw = exportManifest.actorDraw || {};
    return actorDraw[key] || null;
  }

  window.NightfallTheme = {
    manifest: manifest,
    drawSprite: drawSprite,
    getActorDraw: getActorDraw,
    getFilter: getFilter,
    getImage: function(category, key) {
      return ensureImage(category, key);
    },
    preload: function() {
      Object.keys(manifest).forEach(function(category) {
        Object.keys(manifest[category]).forEach(function(key) {
          ensureImage(category, key);
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.NightfallTheme.preload();
    }, { once: true });
  } else {
    window.NightfallTheme.preload();
  }
})();
