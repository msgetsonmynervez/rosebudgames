// ==================================================
// ChatAIClass Definition
// ==================================================

// This module provides a class, ChatAIClass, which uses a ChatManager (provided externally) 
// to conduct a conversation with an AI. The AI's behavior is defined by a description string, 
// and the ChatAIClass offers a simple getResponse method to get AI responses.
// 
// This is AI is powered by Rosebud AI and is Rosebud's method to add in-game AI features.
//
// IMPORTANT NOTE:
// - Do not assume how ChatManager works beyond what is described here.
// - We only know that:
//   1. ChatManager is constructed by passing in a description string.
//   2. We can add messages by calling chatManager.addMessage('user', prompt).
//   3. We can get an AI-generated response by calling chatManager.getCharacterResponse('chat').
// - Any other assumptions about ChatManager internals or methods should not be made.
//
// This code can be used in any JS project by simply importing this class and using it.

// Defines how the AI should behave - customize this for your specific project
const AI_BEHAVIOR_DESCRIPTION = `
You are Madame Mystique, an ancient and mystical fortune teller with the gift of foresight.
You peer into the cosmic energies and provide predictions about the future.
Your responses should:
- Be mystical and enigmatic, using fortune teller language
- Provide thoughtful predictions based on the question asked
- Use phrases like "I see in the mystic realm...", "The cosmic forces reveal...", "The cards speak of..."
- Keep predictions positive and uplifting when possible
- Be concise (2-4 sentences maximum)
- Add a touch of mystery and wonder
- Never break character as a fortune teller
Remember: You're giving fortune predictions, not advice. Focus on what you "see" or "sense" about their future.
`;

/**
 * ChatAIClass:
 * 
 * This class provides a simple interface for AI conversations.
 * 
 * Basic Usage:
 * 1. Create an instance of ChatAIClass:
 *    const chat = new ChatAIClass();
 * 
 * 2. Call getResponse(prompt) to get a response from the AI:
 *    const answer = await chat.getResponse("What is the weather like?");
 *    console.log(answer);
 * 
 * Message History Management:
 * - User messages are automatically added to conversation history
 * - AI responses are NOT automatically added to history by default
 * - To maintain conversation context, manually add AI responses:
 *    const response = await chat.getResponse("Hello");
 *    chat.addAssistantMessage(response); // Add AI's response to history
 * - This is useful for ongoing conversations but may not be needed for single queries
 */
export class ChatAIClass {
    constructor() {
        // Directly create a new ChatManager instance with the AI behavior description.
        // We assume ChatManager is available globally or imported from elsewhere.
        this.chatManager = new ChatManager(AI_BEHAVIOR_DESCRIPTION);
    }

    /**
     * Generates a response from the AI based on the given prompt.
     *
     * @param {string} prompt - The user's input or question.
     * @returns {Promise<string>} - The AI's response as text.
     */
    async getResponse(prompt) {
        // Add the user's message to the conversation.
        this.chatManager.addMessage('user', prompt);
        // Ask the ChatManager for the AI's response and return it.
        const response = await this.chatManager.getCharacterResponse('chat');
        return response;
    }
    /**
     * Manually add the AI's response to conversation history.
     * Call this after getResponse() if you want the AI to remember its own responses.
     *
     * @param {string} response - The AI's response text to add to history
     */
    addAssistantMessage(response) {
        this.chatManager.addMessage('assistant', response);
    }
    /**
     * Get a response and automatically add both user and AI messages to history.
     * Use this for ongoing conversations where context should be maintained.
     *
     * @param {string} prompt - The user's input or question
     * @returns {Promise<string>} - The AI's response as text
     */
    async getResponseWithHistory(prompt) {
        const response = await this.getResponse(prompt);
        this.addAssistantMessage(response);
        return response;
    }
}