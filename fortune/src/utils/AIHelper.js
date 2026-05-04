import { ChatAIClass } from 'components/ChatAI.js';

/**
 * AIHelper - A utility module for managing AI interactions
 * 
 * This module provides convenient methods for integrating AI features
 * into any part of the application. It handles ChatAI instance management
 * and provides common interaction patterns.
 */
class AIHelper {
    constructor() {
        this.chatAI = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the AI helper (lazy loading)
     */
    init() {
        if (!this.isInitialized) {
            try {
                this.chatAI = new ChatAIClass();
                this.isInitialized = true;
                console.log('AI Helper initialized successfully');
            } catch (error) {
                console.warn('AI Helper initialization failed:', error.message);
                this.isInitialized = false;
            }
        }
        return this.isInitialized;
    }

    /**
     * Check if AI is available and ready to use
     */
    isReady() {
        return this.isInitialized && this.chatAI !== null;
    }

    /**
     * Get AI response with automatic initialization (no conversation history)
     * @param {string} prompt - The user's question or input
     * @returns {Promise<string|null>} - AI response or null if unavailable
     */
    async ask(prompt) {
        if (!this.isReady() && !this.init()) {
            console.warn('AI is not available');
            return null;
        }
        try {
            const response = await this.chatAI.getResponse(prompt);
            return response;
        } catch (error) {
            console.error('AI request failed:', error);
            return null;
        }
    }
    /**
     * Get AI response with conversation history maintained
     * @param {string} prompt - The user's question or input
     * @returns {Promise<string|null>} - AI response or null if unavailable
     */
    async askWithHistory(prompt) {
        if (!this.isReady() && !this.init()) {
            console.warn('AI is not available');
            return null;
        }
        try {
            const response = await this.chatAI.getResponseWithHistory(prompt);
            return response;
        } catch (error) {
            console.error('AI request failed:', error);
            return null;
        }
    }

    /**
     * Get creative suggestions for scene enhancements (uses conversation history)
     * @param {string} sceneDescription - Description of current scene
     * @returns {Promise<string|null>} - Creative suggestions or null
     */
    async getSuggestions(sceneDescription) {
        const prompt = `Based on this scene: "${sceneDescription}", suggest 3 creative visual enhancements or effects that would make it more interesting.`;
        return await this.askWithHistory(prompt);
    }
    /**
     * Get help with concepts (no history needed for explanations)
     * @param {string} concept - The concept to explain
     * @returns {Promise<string|null>} - Explanation or null
     */
    async explainConcept(concept) {
        const prompt = `Explain this concept in simple terms with a practical example: ${concept}`;
        return await this.ask(prompt);
    }
    /**
     * Get troubleshooting help (uses conversation history for follow-up questions)
     * @param {string} issue - Description of the problem
     * @returns {Promise<string|null>} - Troubleshooting advice or null
     */
    async troubleshoot(issue) {
        const prompt = `I'm having this issue with my application: "${issue}". What might be causing this and how can I fix it?`;
        return await this.askWithHistory(prompt);
    }
    /**
     * Start or continue a conversation with context
     * @param {string} message - The conversation message
     * @returns {Promise<string|null>} - AI response or null
     */
    async chat(message) {
        return await this.askWithHistory(message);
    }
}

// Export a singleton instance
export const aiHelper = new AIHelper();

// Also export the class for custom instances if needed
export { AIHelper };