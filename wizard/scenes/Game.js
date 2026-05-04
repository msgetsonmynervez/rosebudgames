import Phaser from 'phaser';
import { MANIFEST } from '../manifest.js';
import { DialogueSystem } from '../systems/DialogueSystem.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.chatHistory = [];
        this.isWaitingForResponse = false;
        // D&D Style Stats (8-18 for starting characters)
        this.stats = {
            strength: Phaser.Math.Between(8, 18),
            charm: Phaser.Math.Between(8, 18),
            intelligence: Phaser.Math.Between(8, 18)
        };
        // Conviction Meter (0-100)
        this.conviction = 50; 
        this.maxConviction = 100;
    }

    // Helper to calculate D&D Modifier: (Score - 10) / 2, rounded down
    getModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    // Check if we're in portrait mobile or compact/square mode
    checkPortraitMobile() {
        // Safe Mode is Default. Returns TRUE if we are NOT in Wide Desktop mode.
        // Must match CSS query: @media only screen and (min-width: 1025px) and (min-height: 720px)
        const isWideDesktop = window.matchMedia('(min-width: 1025px) and (min-height: 720px)').matches;
        
        // If we are NOT wide desktop, we are effectively "Compact/Mobile"
        return !isWideDesktop;
    }

    create() {
        // Detect if we're in portrait mobile mode
        this.isPortraitMobile = this.checkPortraitMobile();
        
        // Initialize DialogueSystem
        this.dialogueSystem = new DialogueSystem(MANIFEST.persona);

        // Setup background and character
        this.setupScene();

        // 3. Initialize DOM UI
        this.initializeDOMUI();

        // 4. Initial Greeting (Debt Scenario)
        const initialGreeting = MANIFEST.metadata.initialGreeting;
        const initialOptions = [
            "[Strength] Slam your fist on the table and refuse.",
            "[Charm] Smile and promise to pay double next week.",
            "[Intelligence] Argue that the ale was watered down."
        ];
        
        this.displayMessage(MANIFEST.metadata.characterName, initialGreeting);
        this.time.delayedCall(1500, () => {
            this.displayOptions(initialOptions);
        });

        // Handle resize events
        this.scale.on('resize', this.handleResize, this);
    }

    setupScene() {
        // 1. Background
        if (this.bg) this.bg.destroy();
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        const scaleX = this.cameras.main.width / this.bg.width;
        const scaleY = this.cameras.main.height / this.bg.height;
        const scale = Math.max(scaleX, scaleY);
        this.bg.setScale(scale).setScrollFactor(0);
        
        this.bg.x = (this.cameras.main.width - this.bg.width * scale) / 2;
        this.bg.y = (this.cameras.main.height - this.bg.height * scale) / 2;

        // 2. Orc Character
        const height = this.cameras.main.height;
        
        // In portrait mode, position character to fill from top to middle
        // In desktop, position at bottom filling most of screen
        const characterBottomY = this.isPortraitMobile ? height * 0.65 : height;
        
        if (this.orc) this.orc.destroy();
        this.orc = this.add.image(this.cameras.main.centerX, characterBottomY, 'character_neutral');
        this.orc.setOrigin(0.5, 1);
        
        // Adjust character size - make it bigger on mobile to fill the space better
        const heightMultiplier = this.isPortraitMobile ? 0.6 : 0.8;
        const orcScale = (this.cameras.main.height * heightMultiplier) / this.orc.height;
        this.orc.setScale(orcScale);
        
        // Breathing animation
        if (this.breathingTween) this.breathingTween.remove();
        this.breathingTween = this.tweens.add({
            targets: this.orc,
            scaleY: orcScale * 1.02,
            scaleX: orcScale * 0.99,
            y: this.orc.y + 5,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    handleResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
        
        // Update camera
        this.cameras.resize(width, height);
        
        // Re-detect portrait mode
        this.isPortraitMobile = this.checkPortraitMobile();
        
        // Re-setup scene with new dimensions
        this.setupScene();
    }

    initializeDOMUI() {
        // Get DOM elements
        this.domSpeakerName = document.getElementById('speaker-name');
        this.domDialogueText = document.getElementById('dialogue-text');
        this.domDialogueOptions = document.getElementById('dialogue-options');
        this.domPersuasionFill = document.getElementById('persuasion-bar-fill');
        this.domStatStrength = document.getElementById('stat-strength');
        this.domStatCharm = document.getElementById('stat-charm');
        this.domStatIntelligence = document.getElementById('stat-intelligence');
        
        // Initialize stats display
        this.updateStatsDisplay();
        this.updateConvictionBar();
    }

    updateStatsDisplay() {
        const getModifier = (score) => {
            const mod = Math.floor((score - 10) / 2);
            const sign = mod >= 0 ? '+' : '';
            return `${sign}${mod}`;
        };
        
        this.domStatStrength.textContent = `⚔️ Strength: ${this.stats.strength} (${getModifier(this.stats.strength)})`;
        this.domStatCharm.textContent = `✨ Charm: ${this.stats.charm} (${getModifier(this.stats.charm)})`;
        this.domStatIntelligence.textContent = `📖 Intelligence: ${this.stats.intelligence} (${getModifier(this.stats.intelligence)})`;
    }

    updateConvictionBar() {
        // Clamp value
        this.conviction = Phaser.Math.Clamp(this.conviction, 0, 100);
        
        // Update width
        this.domPersuasionFill.style.width = `${this.conviction}%`;
        
        // Dynamic gradient colors based on value with smooth transitions
        let gradient, glowColor;
        
        if (this.conviction >= 75) {
            // High success - vibrant green gradient
            gradient = 'linear-gradient(180deg, #00ff00 0%, #00dd00 50%, #00bb00 100%)';
            glowColor = 'rgba(0, 255, 0, 0.8)';
        } else if (this.conviction >= 50) {
            // Good - yellow-green gradient
            gradient = 'linear-gradient(180deg, #88ff00 0%, #aadd00 50%, #88bb00 100%)';
            glowColor = 'rgba(136, 255, 0, 0.7)';
        } else if (this.conviction >= 25) {
            // Neutral - yellow-orange gradient
            gradient = 'linear-gradient(180deg, #ffff00 0%, #ffdd00 50%, #ffbb00 100%)';
            glowColor = 'rgba(255, 255, 0, 0.6)';
        } else {
            // Danger - red-orange gradient
            gradient = 'linear-gradient(180deg, #ff4400 0%, #dd3300 50%, #bb2200 100%)';
            glowColor = 'rgba(255, 68, 0, 0.8)';
        }
        
        this.domPersuasionFill.style.background = gradient;
        this.domPersuasionFill.style.boxShadow = `
            0 0 20px ${glowColor},
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `;
    }

    setOrcTexture(key) {
        if (!this.orc) return;
        this.orc.setTexture(key);
        
        // Recalculate base scale (adjust for portrait mobile)
        const heightMultiplier = this.isPortraitMobile ? 0.6 : 0.8;
        const orcScale = (this.cameras.main.height * heightMultiplier) / this.orc.height;
        this.orc.setScale(orcScale);
        
        // Reset position to base
        const height = this.cameras.main.height;
        this.orc.y = this.isPortraitMobile ? height * 0.65 : height;

        // Restart breathing animation with new scale
        if (this.breathingTween) this.breathingTween.remove();

        this.breathingTween = this.tweens.add({
            targets: this.orc,
            scaleY: orcScale * 1.02,
            scaleX: orcScale * 0.99,
            y: this.orc.y + 5,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }



    async handleOptionSelect(optionText, statType, dc) {
        if (this.isWaitingForResponse) return;
        
        // Disable all buttons during processing
        const buttons = this.domDialogueOptions.querySelectorAll('.dialogue-option');
        buttons.forEach(btn => {
            btn.dataset.isTyping = 'true';
            btn.style.opacity = '0.5';
            btn.style.pointerEvents = 'none';
        });
        
        this.isWaitingForResponse = true;

        // --- SKILL CHECK LOGIC ---
        let checkResult = "Neutral";
        let roll = 0;
        let total = 0;
        let modifier = 0;
        const difficulty = dc || 12; // Use passed DC or fallback
        
        if (statType) {
            const statValue = this.stats[statType.toLowerCase()] || 10;
            modifier = this.getModifier(statValue);
            
            // Generate the final result ahead of time
            roll = Phaser.Math.Between(1, 20);
            total = roll + modifier;
            
            // Visual feedback for the roll with ticking animation
            await this.showRollAnimation(statType, roll, modifier, total, difficulty);
            
            if (roll === 20) {
                checkResult = "CRITICAL SUCCESS";
                this.updateConviction(80); // Double persuasion for Nat 20!
                this.setOrcTexture('character_success');
            } else if (total >= difficulty) {
                checkResult = "SUCCESS";
                this.updateConviction(40);
                this.setOrcTexture('character_success');
            } else {
                checkResult = "FAILURE";
                this.updateConviction(-15);
                this.setOrcTexture('character_failure');
            }
        }
        
        // Formulate message for AI
        const cleanMessage = optionText.replace(/\[.*?\]\s*/, '');
        let messageToAI = `"${cleanMessage}"`;
        
        if (statType) {
            const modSign = modifier >= 0 ? '+' : '';
            messageToAI += `\n(System: User rolled for ${statType}. Result: ${checkResult}. Roll: ${roll} ${modSign}${modifier} = ${total} vs DC ${difficulty}. Current Persuasion: ${this.conviction}%)`;
        }

        // Check for End Game
        if (this.conviction >= 100) {
            this.handleGameEnd(true);
            return;
        } else if (this.conviction <= 0) {
            this.handleGameEnd(false);
            return;
        }

        // Show "Thinking..." in the dialogue text
        this.domSpeakerName.textContent = MANIFEST.metadata.characterName;
        this.domDialogueText.textContent = statType ? `*Reacting to your ${checkResult.toLowerCase()}...*` : 'Thinking...';

        try {
            const { speech, options } = await this.dialogueSystem.generateResponse(messageToAI);
            
            this.displayMessage(MANIFEST.metadata.characterName, speech);
            this.time.delayedCall(speech.length * 20, () => {
                this.displayOptions(options);
            });
        } catch (error) {
            console.error('Chat error:', error);
            this.displayMessage('System', `${MANIFEST.metadata.characterName} glares silently. (Connection Error)`);
            this.displayOptions(["Try again"]);
        } finally {
            this.isWaitingForResponse = false;
        }
    }

    updateConviction(amount) {
        const startValue = this.conviction;
        this.conviction = Phaser.Math.Clamp(this.conviction + amount, 0, 100);
        
        // Animate bar fill using CSS transition (already defined in CSS)
        this.updateConvictionBar();
        
        // Show floating text change indicator
        this.showConvictionChange(amount);
    }
    
    showConvictionChange(amount) {
        // Create floating text element
        const floatingText = document.createElement('div');
        floatingText.textContent = amount > 0 ? `+${amount}%` : `${amount}%`;
        floatingText.style.position = 'fixed';
        floatingText.style.fontFamily = '"Press Start 2P"';
        floatingText.style.fontSize = this.isPortraitMobile ? '18px' : '24px';
        floatingText.style.color = amount > 0 ? '#00ff00' : '#ff0000';
        floatingText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        floatingText.style.pointerEvents = 'none';
        floatingText.style.zIndex = '200';
        floatingText.style.transition = 'all 1.5s ease-out';
        
        // Position near persuasion bar
        const persuasionContainer = document.getElementById('persuasion-container');
        const rect = persuasionContainer.getBoundingClientRect();
        floatingText.style.left = `${rect.left + rect.width / 2}px`;
        floatingText.style.top = `${rect.top + rect.height / 2}px`;
        floatingText.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(floatingText);
        
        // Animate
        setTimeout(() => {
            floatingText.style.top = `${rect.top - 30}px`;
            floatingText.style.opacity = '0';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            floatingText.remove();
        }, 1600);
    }

    async handleGameEnd(win) {
        // Disable all buttons
        const buttons = this.domDialogueOptions.querySelectorAll('.dialogue-option');
        buttons.forEach(btn => {
            btn.dataset.isTyping = 'true';
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
        });
        
        this.isWaitingForResponse = true;

        const endPrompt = win 
            ? "(System: The player has successfully persuaded you. Accept their deal or forgive the debt graciously. Suggest they talk to the female Rogue in the corner for a quest. Wrap up the conversation.)"
            : "(System: The player has failed to persuade you. Lose your patience completely. Throw them out or demand payment immediately. Wrap up the conversation.)";

        try {
            const { speech } = await this.dialogueSystem.generateResponse(endPrompt);
            this.displayMessage(MANIFEST.metadata.characterName, speech);
            
            this.time.delayedCall(speech.length * 20 + 500, () => {
                this.showEndGameScreen(win);
            });
        } catch (e) {
            console.error(e);
        }
    }

    showEndGameScreen(win) {
        // Show result text as a Phaser text object in the canvas (above the dialogue box area)
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY * 0.4; // Position in upper area
        
        const resultText = this.add.text(centerX, centerY, win ? 'DEBT FORGIVEN' : 'THROWN OUT', {
            fontFamily: '"MedievalSharp", cursive',
            fontSize: this.isPortraitMobile ? '36px' : '56px',
            color: win ? '#00ff00' : '#ff0000',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setAlpha(0).setScale(0.5);
        
        resultText.setDepth(1000);

        this.tweens.add({
            targets: resultText,
            alpha: 1,
            scale: 1,
            duration: 1000,
            ease: 'Bounce.out'
        });

        // Replace the 3 dialogue buttons with end game options
        const buttons = this.domDialogueOptions.querySelectorAll('.dialogue-option');
        
        // Button 1: Play Again
        if (buttons[0]) {
            this.updateEndGameButton(buttons[0], 'Play Again', '#ffd700', () => {
                this.scene.restart();
            });
        }
        
        // Button 2: Talk to Rogue (only on win) or empty
        if (buttons[1]) {
            if (win) {
                this.updateEndGameButton(buttons[1], 'Talk to Rogue', '#00ffff', () => {
                    if (typeof RosebudProjectRedirect !== 'undefined') {
                        RosebudProjectRedirect.redirectToProject('02f788d7-4d1e-4bb2-b247-418e48519f57');
                    } else {
                        console.log('Redirecting to Rogue project...');
                    }
                });
            } else {
                buttons[1].style.opacity = '0';
                buttons[1].style.pointerEvents = 'none';
            }
        }
        
        // Button 3: Hide
        if (buttons[2]) {
            buttons[2].style.opacity = '0';
            buttons[2].style.pointerEvents = 'none';
        }
    }

    updateEndGameButton(button, text, borderColor, onClick) {
        // Remove old stat classes
        button.classList.remove('strength', 'charm', 'intelligence');
        
        // Style for end game button
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.borderColor = borderColor;
        button.style.fontSize = this.isPortraitMobile ? '22px' : '24px';
        button.style.fontWeight = 'bold';
        
        button.textContent = text;
        
        // Remove old click handlers
        const oldClickHandler = button.clickHandler;
        if (oldClickHandler) {
            button.removeEventListener('click', oldClickHandler);
        }
        
        // Add new click handler
        button.clickHandler = onClick;
        button.addEventListener('click', onClick);
    }

    showRollAnimation(stat, finalRoll, modifier, total, dc) {
        return new Promise((resolve) => {
            // Temporarily hide the dialogue UI during dice roll
            const dialogueUI = document.getElementById('dialogue-ui');
            const originalPointerEvents = dialogueUI.style.pointerEvents;
            dialogueUI.style.opacity = '0.3';
            dialogueUI.style.pointerEvents = 'none';
            
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            const container = this.add.container(centerX, centerY);
            container.setDepth(1000); // Ensure it appears above everything
            
            const boxWidth = this.isPortraitMobile ? 250 : 300;
            const boxHeight = this.isPortraitMobile ? 200 : 240;
            const halfWidth = boxWidth / 2;
            const halfHeight = boxHeight / 2;
            
            const bg = this.add.graphics();
            bg.fillStyle(0x000000, 0.95);
            bg.fillRoundedRect(-halfWidth, -halfHeight, boxWidth, boxHeight, 15);
            bg.lineStyle(4, 0xffffff, 1);
            bg.strokeRoundedRect(-halfWidth, -halfHeight, boxWidth, boxHeight, 15);
            container.add(bg);

            const baseFontSize = this.isPortraitMobile ? 18 : 24;
            const textStyle = { fontFamily: '"MedievalSharp", cursive', fontSize: `${baseFontSize}px`, color: '#ffffff', align: 'center' };
            const modSign = modifier >= 0 ? '+' : '';
            
            const title = this.add.text(0, this.isPortraitMobile ? -80 : -90, `${stat.toUpperCase()} CHECK`, { ...textStyle, color: '#ffd700', fontSize: this.isPortraitMobile ? '22px' : '28px' }).setOrigin(0.5);
            
            // Show Difficulty
            const dcText = this.add.text(0, this.isPortraitMobile ? -55 : -60, `Target (DC): ${dc}`, { ...textStyle, fontSize: this.isPortraitMobile ? '16px' : '20px', color: '#ff8888' }).setOrigin(0.5);

            // The Rolling Number
            const rollLabel = this.add.text(0, this.isPortraitMobile ? -20 : -20, `d20 Roll`, { ...textStyle, fontSize: this.isPortraitMobile ? '14px' : '18px', color: '#aaaaaa' }).setOrigin(0.5);
            const rollValueText = this.add.text(0, this.isPortraitMobile ? 5 : 10, `1`, { ...textStyle, fontSize: this.isPortraitMobile ? '40px' : '48px', fontStyle: 'bold' }).setOrigin(0.5);
            
            const calculationText = this.add.text(0, this.isPortraitMobile ? 50 : 60, `Wait...`, textStyle).setOrigin(0.5);
            
            container.add([title, dcText, rollLabel, rollValueText, calculationText]);
            container.setScale(0);

            // 1. Pop In
            this.tweens.add({
                targets: container,
                scale: 1,
                duration: 200,
                ease: 'Back.out',
                onComplete: () => {
                    // 2. Ticking Animation
                    let ticks = 0;
                    const maxTicks = 20; 
                    
                    const tickEvent = this.time.addEvent({
                        delay: 50,
                        repeat: maxTicks,
                        callback: () => {
                            const randomNum = Phaser.Math.Between(1, 20);
                            rollValueText.setText(randomNum);
                            
                            if (randomNum === 20) rollValueText.setColor('#00ff00');
                            else if (randomNum === 1) rollValueText.setColor('#ff0000');
                            else rollValueText.setColor('#ffffff');
                            
                            ticks++;
                            
                            // 3. Final Result
                            if (ticks > maxTicks) {
                                rollValueText.setText(finalRoll);
                                if (finalRoll === 20) rollValueText.setColor('#00ff00');
                                else if (finalRoll === 1) rollValueText.setColor('#ff0000');
                                else rollValueText.setColor('#ffffff');

                                calculationText.setText(`${finalRoll} (Roll) ${modSign}${modifier} (Mod) = ${total}`);
                                
                                this.time.delayedCall(500, () => {
                                    const success = total >= dc;
                                    let resultString = success ? 'SUCCESS' : 'FAILURE';
                                    if (finalRoll === 20) resultString = 'CRITICAL!';

                                    const resultText = this.add.text(0, 0, resultString, {
                                        fontFamily: '"Press Start 2P"',
                                        fontSize: this.isPortraitMobile ? '28px' : '40px',
                                        color: success ? '#00ff00' : '#ff0000',
                                        stroke: '#000000',
                                        strokeThickness: this.isPortraitMobile ? 4 : 6
                                    }).setOrigin(0.5).setAngle(-15).setScale(2).setAlpha(0);
                                    
                                    container.add(resultText);

                                    this.tweens.add({
                                        targets: resultText,
                                        scale: 1,
                                        alpha: 1,
                                        duration: 300,
                                        ease: 'Bounce.out'
                                    });

                                    this.time.delayedCall(1500, () => {
                                        this.tweens.add({
                                            targets: container,
                                            scale: 0,
                                            duration: 200,
                                            ease: 'Back.in',
                                            onComplete: () => {
                                                container.destroy();
                                                
                                                // Restore dialogue UI visibility
                                                dialogueUI.style.opacity = '1';
                                                dialogueUI.style.pointerEvents = originalPointerEvents;
                                                
                                                resolve();
                                            }
                                        });
                                    });
                                });
                            }
                        }
                    });
                }
            });
        });
    }

    getStatIcon(statType) {
        const icons = {
            'Strength': '⚔️',
            'Charm': '✨',
            'Intelligence': '📖'
        };
        return icons[statType] || '';
    }

    displayMessage(speaker, text) {
        // Reset expression to neutral when speaking
        if (speaker === MANIFEST.metadata.characterName) {
            this.setOrcTexture('character_neutral');
        }

        this.domSpeakerName.textContent = speaker;
        this.domDialogueText.textContent = '';
        
        let i = 0;
        if (this.typingEvent) this.typingEvent.remove();
        
        this.typingEvent = this.time.addEvent({
            delay: 20,
            callback: () => {
                this.domDialogueText.textContent = text.substring(0, i + 1);
                i++;
                if (i === text.length) {
                    this.typingEvent.remove();
                }
            },
            repeat: text.length - 1
        });
    }

    displayOptions(options) {
        // Ensure we always have exactly 3 buttons
        // If we have buttons already, update them; otherwise create them
        const existingButtons = this.domDialogueOptions.querySelectorAll('.dialogue-option');
        
        // Pad options to always have 3
        while (options.length < 3) {
            options.push('...');
        }
        
        options.slice(0, 3).forEach((optionText, index) => {
            // Extract Tag
            const match = optionText.match(/\[(Strength|Charm|Intelligence)\]/i);
            const statType = match ? match[1] : null;
            
            // Clean text for display
            const cleanText = optionText.replace(/^[\d\-\.\)]+\s*/, ''); // Remove numbering if any
            
            // Generate Random DC (Difficulty Class)
            let dc = 12;
            let displayText = cleanText;
            
            if (statType) {
                dc = Phaser.Math.Between(10, 15);
                
                // Get icon for stat type
                const icon = this.getStatIcon(statType);
                
                // Insert DC and icon into the tag for display: [Strength] -> ⚔️ [Strength DC 12]
                const tagRegex = new RegExp(`\\[${statType}\\]`, 'i');
                displayText = cleanText.replace(tagRegex, `${icon} [${statType} DC ${dc}]`);
            }
            
            // Update existing button or create new one
            if (existingButtons[index]) {
                this.updateOptionButton(existingButtons[index], displayText, statType, dc);
            } else {
                this.createOptionButton(displayText, statType, dc);
            }
        });
    }

    updateOptionButton(button, text, statType, dc) {
        // Remove old stat classes
        button.classList.remove('strength', 'charm', 'intelligence', 'disabled');
        
        // Add new stat-specific class for border color
        if (statType) {
            button.classList.add(statType.toLowerCase());
        }
        
        // Re-enable button styling
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        
        // Store the full text and typing state
        button.dataset.fullText = text;
        button.dataset.statType = statType || '';
        button.dataset.dc = dc;
        button.dataset.isTyping = 'true';
        
        // Disable clicking during typing
        const oldClickHandler = button.clickHandler;
        if (oldClickHandler) {
            button.removeEventListener('click', oldClickHandler);
        }
        
        // Typewriter effect
        button.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                button.textContent = text.substring(0, i + 1);
                i++;
            } else {
                clearInterval(typeInterval);
                button.dataset.isTyping = 'false';
                
                // Re-enable clicking after typing is done
                const clickHandler = () => {
                    if (button.dataset.isTyping === 'false') {
                        this.handleOptionSelect(text, statType, dc);
                    }
                };
                button.clickHandler = clickHandler;
                button.addEventListener('click', clickHandler);
            }
        }, 20);
    }

    createOptionButton(text, statType, dc) {
        const button = document.createElement('div');
        button.className = 'dialogue-option';
        
        // Add stat-specific class for border color
        if (statType) {
            button.classList.add(statType.toLowerCase());
        }
        
        // Store data
        button.dataset.fullText = text;
        button.dataset.statType = statType || '';
        button.dataset.dc = dc;
        button.dataset.isTyping = 'true';
        
        // Typewriter effect on initial creation
        button.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                button.textContent = text.substring(0, i + 1);
                i++;
            } else {
                clearInterval(typeInterval);
                button.dataset.isTyping = 'false';
                
                // Enable clicking after typing is done
                const clickHandler = () => {
                    if (button.dataset.isTyping === 'false') {
                        this.handleOptionSelect(text, statType, dc);
                    }
                };
                button.clickHandler = clickHandler;
                button.addEventListener('click', clickHandler);
            }
        }, 20);
        
        this.domDialogueOptions.appendChild(button);
    }
}
