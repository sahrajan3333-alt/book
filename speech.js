/**
 * Folio - Audiobook Controller (Web Speech API)
 * High-performance, chunk-based speech synthesis manager with sentence synchronization,
 * voice selection, speed controls, and robust error recovery.
 */

class AudiobookPlayer {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSupported = !!this.synth;
    this.voices = [];
    this.currentChunks = [];
    this.currentChunkIndex = 0;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentBookId = null;
    this.currentChapterIndex = 0;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.selectedVoiceURI = null;

    // Callbacks
    this.onStatusChange = null; // (status: 'playing'|'paused'|'stopped', info)
    this.onChunkChange = null;  // (chunkIndex, totalChunks, chunkText)
    this.onError = null;        // (errorMessage)

    this._initVoices();
  }

  _initVoices() {
    if (!this.isSupported) return;

    const loadVoices = () => {
      this.voices = this.synth.getVoices().filter(v => v.lang.startsWith("en") || v.lang.startsWith("EN"));
      // If no English voices found, include all available
      if (this.voices.length === 0) {
        this.voices = this.synth.getVoices();
      }
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        loadVoices();
      };
    }
  }

  getVoices() {
    if (!this.isSupported) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  setVoice(voiceURI) {
    this.selectedVoiceURI = voiceURI;
  }

  setRate(newRate) {
    this.rate = Math.max(0.5, Math.min(2.0, parseFloat(newRate) || 1.0));
  }

  /**
   * Split raw text into manageable sentence chunks.
   * Browsers (especially Chromium) can freeze or drop utterances longer than ~200 characters.
   * Chunking ensures reliability and enables karaoke-style text highlighting.
   * @param {string} text 
   * @returns {Array<string>}
   */
  _chunkText(text) {
    if (!text) return [];
    // Clean text
    const cleanText = text.replace(/\r\n/g, "\n").trim();
    // Split on paragraph boundaries first, then sentence punctuation (. ! ?)
    const paragraphs = cleanText.split(/\n\s*\n/);
    const chunks = [];

    paragraphs.forEach(p => {
      const trimmedPara = p.trim();
      if (!trimmedPara) return;
      // Split by sentence while keeping sentence punctuation
      const sentenceRegex = /[^.!?]+[.!?]+["']?|[^.!?]+$/g;
      const sentences = trimmedPara.match(sentenceRegex) || [trimmedPara];
      sentences.forEach(s => {
        const sentenceClean = s.trim();
        if (sentenceClean.length > 0) {
          chunks.push(sentenceClean);
        }
      });
    });

    return chunks;
  }

  /**
   * Start or restart playback of a given text
   * @param {string} text Full text to read
   * @param {string} bookId Identifier for current book
   * @param {number} chapterIndex Current chapter index
   * @param {number} startChunkIndex Index to start from (defaults to 0)
   */
  loadAndPlay(text, bookId = null, chapterIndex = 0, startChunkIndex = 0) {
    if (!this.isSupported) {
      if (this.onError) {
        this.onError("Your browser does not support the Web Speech API.");
      }
      return false;
    }

    // Stop any existing playback
    this.stop(false);

    this.currentBookId = bookId;
    this.currentChapterIndex = chapterIndex;
    this.currentChunks = this._chunkText(text);
    this.currentChunkIndex = Math.max(0, Math.min(startChunkIndex, this.currentChunks.length - 1));

    if (this.currentChunks.length === 0) {
      if (this.onError) {
        this.onError("No readable text found for audio playback.");
      }
      return false;
    }

    this.isPlaying = true;
    this.isPaused = false;
    this._notifyStatus("playing");
    this._speakCurrentChunk();
    return true;
  }

  _speakCurrentChunk() {
    if (!this.isPlaying || this.isPaused) return;

    if (this.currentChunkIndex >= this.currentChunks.length) {
      // Reached the end of the text
      this.stop(true);
      return;
    }

    const chunkText = this.currentChunks[this.currentChunkIndex];
    if (this.onChunkChange) {
      this.onChunkChange(this.currentChunkIndex, this.currentChunks.length, chunkText);
    }

    // Cancel any hanging utterance in the browser
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(chunkText);
    this.currentUtterance = utterance;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    // Apply selected voice
    if (this.selectedVoiceURI && this.voices.length > 0) {
      const match = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (match) utterance.voice = match;
    }

    utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentChunkIndex++;
        // Small delay between sentences for natural pacing
        setTimeout(() => {
          this._speakCurrentChunk();
        }, 120);
      }
    };

    utterance.onerror = (e) => {
      // Ignore user-induced cancellation
      if (e.error === "canceled" || e.error === "interrupted") {
        return;
      }
      console.warn("[AudiobookPlayer] Speech error:", e.error);
      // Attempt recovery on next chunk or report error
      if (this.isPlaying && !this.isPaused) {
        this.currentChunkIndex++;
        if (this.currentChunkIndex < this.currentChunks.length) {
          setTimeout(() => this._speakCurrentChunk(), 200);
        } else {
          this.stop(true);
        }
      }
    };

    this.synth.speak(utterance);
  }

  pause() {
    if (!this.isSupported || !this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    this.synth.pause();
    this._notifyStatus("paused");
  }

  resume() {
    if (!this.isSupported || !this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    this._notifyStatus("playing");

    // Some browsers have a known bug where synth.resume() doesn't fire; speak chunk directly if needed
    if (this.synth.paused) {
      this.synth.resume();
      setTimeout(() => {
        if (!this.synth.speaking && this.isPlaying && !this.isPaused) {
          this._speakCurrentChunk();
        }
      }, 100);
    } else {
      this._speakCurrentChunk();
    }
  }

  stop(finished = false) {
    if (!this.isSupported) return;
    this.isPlaying = false;
    this.isPaused = false;
    this.synth.cancel();
    this.currentUtterance = null;
    this._notifyStatus("stopped", { finished });
  }

  seekChunk(targetIndex) {
    if (targetIndex >= 0 && targetIndex < this.currentChunks.length) {
      this.currentChunkIndex = targetIndex;
      if (this.isPlaying && !this.isPaused) {
        this._speakCurrentChunk();
      } else {
        if (this.onChunkChange) {
          this.onChunkChange(this.currentChunkIndex, this.currentChunks.length, this.currentChunks[this.currentChunkIndex]);
        }
      }
    }
  }

  _notifyStatus(status, extra = {}) {
    if (this.onStatusChange) {
      this.onStatusChange(status, {
        bookId: this.currentBookId,
        chapterIndex: this.currentChapterIndex,
        chunkIndex: this.currentChunkIndex,
        totalChunks: this.currentChunks.length,
        rate: this.rate,
        ...extra
      });
    }
  }
}
