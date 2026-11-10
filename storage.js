/**
 * Folio - Storage Service
 * Centralized, modular abstraction for client-side persistence via localStorage.
 * Structured with clear async-compatible patterns to allow drop-in replacement with Supabase in the future.
 */

const STORAGE_KEYS = {
  BOOKMARKS: "folio_bookmarks",
  PUBLISHED_STORIES: "folio_published_stories",
  CHAT_MESSAGES: "folio_chat_messages",
  READER_PREFS: "folio_reader_preferences"
};

const DEFAULT_READER_PREFS = {
  fontSize: 18, // in pixels (14 to 26)
  theme: "light", // 'light' | 'sepia' | 'dark'
  fontFamily: "serif", // 'serif' | 'sans'
  speechRate: 1.0,
  speechPitch: 1.0,
  speechVoice: ""
};

class StorageService {
  /**
   * Safely retrieve and parse JSON from localStorage
   * @param {string} key 
   * @param {*} fallback 
   */
  static _getItem(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      if (data === null || data === undefined) {
        return fallback;
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn(`[StorageService] Error reading key "${key}":`, err);
      return fallback;
    }
  }

  /**
   * Safely serialize and store JSON in localStorage
   * @param {string} key 
   * @param {*} value 
   */
  static _setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[StorageService] Error writing key "${key}":`, err);
      return false;
    }
  }

  // ==========================================
  // BOOKMARKS
  // ==========================================

  /**
   * Get all bookmarked items (array of IDs or objects)
   * @returns {Array<string>}
   */
  static getBookmarks() {
    const bookmarks = this._getItem(STORAGE_KEYS.BOOKMARKS, []);
    return Array.isArray(bookmarks) ? bookmarks : [];
  }

  /**
   * Check if an item is bookmarked
   * @param {string} id 
   * @returns {boolean}
   */
  static isBookmarked(id) {
    if (!id) return false;
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(id);
  }

  /**
   * Add a bookmark (prevents duplicates)
   * @param {string} id 
   * @returns {boolean}
   */
  static addBookmark(id) {
    if (!id) return false;
    const bookmarks = this.getBookmarks();
    if (!bookmarks.includes(id)) {
      bookmarks.push(id);
      this._setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
      return true;
    }
    return false;
  }

  /**
   * Remove a bookmark
   * @param {string} id 
   * @returns {boolean}
   */
  static removeBookmark(id) {
    if (!id) return false;
    const bookmarks = this.getBookmarks();
    const updated = bookmarks.filter(bId => bId !== id);
    this._setItem(STORAGE_KEYS.BOOKMARKS, updated);
    return true;
  }

  /**
   * Toggle a bookmark
   * @param {string} id 
   * @returns {boolean} returns new bookmarked status
   */
  static toggleBookmark(id) {
    if (this.isBookmarked(id)) {
      this.removeBookmark(id);
      return false;
    } else {
      this.addBookmark(id);
      return true;
    }
  }

  // ==========================================
  // PUBLISHED COMMUNITY STORIES
  // ==========================================

  /**
   * Get all published community stories
   * Merges user-published stories with initial seeds if not yet initialized
   * @returns {Array<Object>}
   */
  static getStories() {
    let stories = this._getItem(STORAGE_KEYS.PUBLISHED_STORIES, null);
    if (!stories) {
      // First run: initialize with INITIAL_STORIES
      stories = typeof INITIAL_STORIES !== "undefined" ? [...INITIAL_STORIES] : [];
      this._setItem(STORAGE_KEYS.PUBLISHED_STORIES, stories);
    }
    return Array.isArray(stories) ? stories : [];
  }

  /**
   * Save a newly published story
   * @param {Object} story 
   * @returns {Object}
   */
  static saveStory(story) {
    const stories = this.getStories();
    // Prepend new stories so newest shows first
    const updated = [story, ...stories];
    this._setItem(STORAGE_KEYS.PUBLISHED_STORIES, updated);
    return story;
  }

  /**
   * Delete a story by ID (only allowed for user-created stories or test stories)
   * @param {string} id 
   * @returns {boolean}
   */
  static deleteStory(id) {
    const stories = this.getStories();
    const updated = stories.filter(s => s.id !== id);
    this._setItem(STORAGE_KEYS.PUBLISHED_STORIES, updated);
    // Also remove from bookmarks if present
    this.removeBookmark(id);
    return true;
  }

  /**
   * Find a story by ID
   * @param {string} id 
   */
  static getStoryById(id) {
    const stories = this.getStories();
    return stories.find(s => s.id === id) || null;
  }

  // ==========================================
  // MOCK CHAT MESSAGES
  // ==========================================

  /**
   * Get all chat messages
   * @returns {Array<Object>}
   */
  static getChatMessages() {
    let messages = this._getItem(STORAGE_KEYS.CHAT_MESSAGES, null);
    if (!messages) {
      messages = typeof INITIAL_CHAT_MESSAGES !== "undefined" ? [...INITIAL_CHAT_MESSAGES] : [];
      this._setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
    }
    return Array.isArray(messages) ? messages : [];
  }

  /**
   * Add a chat message
   * @param {Object} message 
   */
  static addChatMessage(message) {
    const messages = this.getChatMessages();
    messages.push(message);
    this._setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
    return message;
  }

  /**
   * Reset or clear chat messages
   */
  static clearChatMessages() {
    const seeds = typeof INITIAL_CHAT_MESSAGES !== "undefined" ? [...INITIAL_CHAT_MESSAGES] : [];
    this._setItem(STORAGE_KEYS.CHAT_MESSAGES, seeds);
    return seeds;
  }

  // ==========================================
  // READER PREFERENCES
  // ==========================================

  /**
   * Get user reader preferences
   * @returns {Object}
   */
  static getReaderPreferences() {
    const prefs = this._getItem(STORAGE_KEYS.READER_PREFS, null);
    return Object.assign({}, DEFAULT_READER_PREFS, prefs || {});
  }

  /**
   * Save user reader preferences
   * @param {Object} partialPrefs 
   */
  static saveReaderPreferences(partialPrefs) {
    const current = this.getReaderPreferences();
    const updated = Object.assign({}, current, partialPrefs);
    this._setItem(STORAGE_KEYS.READER_PREFS, updated);
    return updated;
  }
}

