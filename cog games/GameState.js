// Puzzle Porch – Game State Manager

export const GameState = {
  // Daily progress: which puzzles completed today
  todayKey: null,
  completed: [],       // list of puzzle type strings completed today
  totalStars: 0,       // lifetime stars earned
  hintsUsed: 0,

  puzzleTypes: ['word-match', 'picture-pairs', 'trivia', 'number-tiles', 'jigsaw'],

  puzzleLabels: {
    'word-match':     'Word Match',
    'picture-pairs':  'Picture Pairs',
    'trivia':         'Gentle Trivia',
    'number-tiles':   'Number Tiles',
    'jigsaw':         'Easy Jigsaw',
  },

  puzzleEmojis: {
    'word-match':    '🔤',
    'picture-pairs': '🖼️',
    'trivia':        '💡',
    'number-tiles':  '🔢',
    'jigsaw':        '🧩',
  },

  init() {
    try {
      const data = JSON.parse(localStorage.getItem('pp_gamestate') || '{}');
      this.totalStars = data.totalStars ?? 0;
      // Check if today's key matches
      const today = this._todayStr();
      if (data.todayKey === today) {
        this.completed = data.completed ?? [];
      } else {
        this.completed = [];
      }
      this.todayKey = today;
    } catch(e) {
      this.completed = [];
      this.todayKey = this._todayStr();
    }
  },

  _todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  },

  completeToday(type) {
    if (!this.completed.includes(type)) {
      this.completed.push(type);
      this.totalStars += 1;
    }
    this.save();
  },

  isCompleted(type) {
    return this.completed.includes(type);
  },

  get allDoneToday() {
    return this.puzzleTypes.every(t => this.completed.includes(t));
  },

  get completedCount() {
    return this.completed.length;
  },

  save() {
    try {
      localStorage.setItem('pp_gamestate', JSON.stringify({
        todayKey: this.todayKey,
        completed: this.completed,
        totalStars: this.totalStars,
      }));
    } catch(e) {}
  },
};
