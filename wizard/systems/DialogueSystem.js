export class DialogueSystem {
    constructor(persona) {
        // ChatManager is a global class provided by the environment
        this.chatManager = new ChatManager(persona);
    }

    /**
     * Sends a user message to the AI and returns the parsed response.
     * @param {string} userMessage - The message from the player/system.
     * @returns {Promise<{speech: string, options: string[]}>}
     */
    async generateResponse(userMessage) {
        this.chatManager.addMessage('user', userMessage);
        
        try {
            const rawResponse = await this.chatManager.getCharacterResponse();
            this.chatManager.addMessage('assistant', rawResponse);
            return this.parseResponse(rawResponse);
        } catch (error) {
            console.error('DialogueSystem Error:', error);
            throw error;
        }
    }

    /**
     * Parses the raw LLM response into speech text and options.
     * Expected format:
     * [Speech Text]
     * <OPTIONS>
     * [Option 1]
     * [Option 2]
     * @param {string} rawResponse 
     */
    parseResponse(rawResponse) {
        const parts = rawResponse.split('<OPTIONS>');
        let speech = parts[0].trim();
        let optionsRaw = parts.length > 1 ? parts[1].trim() : "";

        // Fallback options if none provided
        if (!optionsRaw) {
            optionsRaw = "[Strength] Attack him\n[Charm] Beg for mercy\n[Intelligence] Trick him";
        }

        const options = optionsRaw.split('\n')
            .map(o => o.trim())
            .filter(o => o.length > 0);

        return {
            speech,
            options
        };
    }
}