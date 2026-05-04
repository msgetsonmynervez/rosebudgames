import Phaser from 'phaser';
import { AccessibilityManager as AM } from '../accessibility.js';
import { GameState as GS } from '../GameState.js';
import { makeButton, makeTopBar, showCompleteBanner } from './UIHelper.js';

const QUESTIONS = [
  {
    q: 'What do you call the season when leaves turn orange and red?',
    answers: ['Autumn', 'Spring', 'Summer', 'Winter'],
    correct: 0,
    explanation: 'Autumn (or Fall) is when trees shed their colorful leaves.',
  },
  {
    q: 'Which bird is famous for saying "cuckoo"?',
    answers: ['Robin', 'Sparrow', 'Cuckoo', 'Wren'],
    correct: 2,
    explanation: 'The cuckoo bird is well known for its distinctive "coo-coo" call.',
  },
  {
    q: 'What is the main ingredient in lemonade?',
    answers: ['Oranges', 'Lemons', 'Limes', 'Grapes'],
    correct: 1,
    explanation: 'Lemonade is made from fresh lemon juice, water, and a little sugar.',
  },
  {
    q: 'What do bees collect from flowers to make honey?',
    answers: ['Dew', 'Pollen', 'Nectar', 'Sap'],
    correct: 2,
    explanation: 'Bees collect nectar from flowers and transform it into honey back at the hive.',
  },
  {
    q: 'What color are most unripe tomatoes?',
    answers: ['Red', 'Yellow', 'Purple', 'Green'],
    correct: 3,
    explanation: 'Tomatoes start out green and turn red (or yellow or orange) as they ripen.',
  },
  {
    q: 'Which planet is known as the Red Planet?',
    answers: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
    correct: 2,
    explanation: 'Mars appears reddish because of iron oxide (rust) on its surface.',
  },
  {
    q: 'How many legs does a spider have?',
    answers: ['Six', 'Eight', 'Ten', 'Four'],
    correct: 1,
    explanation: 'Spiders are arachnids and have 8 legs, unlike insects which have 6.',
  },
  {
    q: 'What instrument has black and white keys?',
    answers: ['Violin', 'Trumpet', 'Piano', 'Drum'],
    correct: 2,
    explanation: 'The piano has both white and black keys, each producing a different musical note.',
  },
];

export class TriviaScene extends Phaser.Scene {
  constructor() { super('Trivia'); }

  create() {
    const { width, height } = this.scale;
    const c = AM.colors;

    this._questions = Phaser.Utils.Array.Shuffle([...QUESTIONS]).slice(0, 4);
    this._qIndex    = 0;
    this._score     = 0;

    this.add.image(width/2, height/2, 'porch-bg').setDisplaySize(width, height).setAlpha(0.28);
    const ov = this.add.graphics();
    ov.fillStyle(AM.highContrast ? 0x000000 : 0x1a0d00, AM.highContrast ? 1 : 0.75);
    ov.fillRect(0, 0, width, height);

    makeTopBar(this, '💡 Gentle Trivia', () => this.scene.start('Home'));

    this._showQuestion(width, height, c);

    AM.speak('Gentle Trivia. I will read each question. Take your time and tap the answer you like best.');
  }

  _showQuestion(width, height, c) {
    // Clear previous question elements
    if (this._questionGroup) this._questionGroup.forEach(o => o.destroy());
    this._questionGroup = [];

    const q = this._questions[this._qIndex];
    const prog = `Question ${this._qIndex + 1} of ${this._questions.length}`;

    // Progress
    const progTxt = this.add.text(width/2, 96, prog, {
      fontFamily: 'Nunito', fontSize: AM.fs(15) + 'px', color: c.accent
    }).setOrigin(0.5);
    this._questionGroup.push(progTxt);

    // Question bubble
    const qBubbleH = 130;
    const qBg = this.add.graphics();
    qBg.fillStyle(AM.highContrast ? 0x111111 : 0x3d2200, 0.95);
    qBg.fillRoundedRect(20, 116, width - 40, qBubbleH, 16);
    qBg.lineStyle(2, c.border, 0.6);
    qBg.strokeRoundedRect(20, 116, width - 40, qBubbleH, 16);
    this._questionGroup.push(qBg);

    const qText = this.add.text(width/2, 116 + qBubbleH/2, q.q, {
      fontFamily: 'Lora, serif',
      fontSize: AM.fs(18) + 'px',
      color: c.text,
      align: 'center',
      wordWrap: { width: width - 80 },
    }).setOrigin(0.5);
    this._questionGroup.push(qText);

    // Answer buttons
    const btnW = width - 48;
    const btnH = 70;
    const startY = 270;
    const gap = btnH + 12;

    q.answers.forEach((ans, i) => {
      const { container, label } = makeButton(
        this, width/2, startY + i * gap, btnW, btnH,
        ans, c.btnPrimary, c.btnText, 16
      );
      label.setStyle({ fontSize: AM.fs(18) + 'px' });
      this._questionGroup.push(container);

      container.on('pointerdown', () => {
        this._onAnswer(i, q, width, height, c, container, startY, gap, btnW, btnH);
      });
    });

    // Read question aloud
    AM.speak(`${prog}. ${q.q}`);
  }

  _onAnswer(chosen, q, width, height, c, chosenContainer, startY, gap, btnW, btnH) {
    // Disable all buttons
    this._questionGroup
      .filter(o => o instanceof Phaser.GameObjects.Container)
      .forEach(btn => btn.disableInteractive());

    const isCorrect = chosen === q.correct;

    // Highlight correct/wrong
    this._questionGroup
      .filter(o => o instanceof Phaser.GameObjects.Container)
      .forEach((btn, i) => {
        if (i === q.correct) {
          // Redraw correct in green
          btn.getAt(0).clear();
          btn.getAt(0).fillStyle(AM.highContrast ? 0x00aa00 : 0x5ba35b, 1);
          btn.getAt(0).fillRoundedRect(-btnW/2, -btnH/2, btnW, btnH, 16);
        } else if (btn === chosenContainer && !isCorrect) {
          btn.getAt(0).clear();
          btn.getAt(0).fillStyle(AM.highContrast ? 0xaa0000 : 0xc0392b, 1);
          btn.getAt(0).fillRoundedRect(-btnW/2, -btnH/2, btnW, btnH, 16);
        }
      });

    const feedback = isCorrect
      ? `Correct! ${q.explanation}`
      : `Good try! The answer is "${q.answers[q.correct]}". ${q.explanation}`;

    AM.speak(feedback);
    AM.showToast(isCorrect ? '✓ Correct!' : `Answer: ${q.answers[q.correct]}`);

    if (isCorrect) this._score++;

    // Explanation text
    const expText = this.add.text(width/2, startY + 4 * (btnH + 12), feedback, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: AM.fs(14) + 'px',
      fontStyle: 'italic',
      color: isCorrect ? c.correct : '#ff8888',
      align: 'center',
      wordWrap: { width: width - 60 },
    }).setOrigin(0.5);
    this._questionGroup.push(expText);

    // Next / Finish button
    const isLast = this._qIndex >= this._questions.length - 1;
    const { container: nextBtn } = makeButton(
      this, width/2, height * 0.88, 220, 64,
      isLast ? 'Finish ✓' : 'Next →', c.btnPrimary, c.btnText
    );
    nextBtn.setDepth(5);
    nextBtn.on('pointerdown', () => {
      if (isLast) {
        GS.completeToday('trivia');
        showCompleteBanner(this, `Well done!\n${this._score} of ${this._questions.length} correct 🌼`, () => this.scene.start('Home'));
      } else {
        this._qIndex++;
        this._showQuestion(width, height, c);
        nextBtn.destroy();
      }
    });
    this._questionGroup.push(nextBtn);
  }
}
