/**
 * FOLIO — Digital Reading & Writers Community
 * Main Application Controller (Vanilla JavaScript)
 */

class FolioApp {
  constructor() {
    this.currentTab = "classics";
    this.audioPlayer = new AudiobookPlayer();
    this.currentReaderBook = null;
    this.currentReaderChapterIndex = 0;
    this.bookshelfFilter = "all";
    this.readerPrefs = StorageService.getReaderPreferences();

    this.init();
  }

  init() {
    // 1. Initialize Reader Preferences
    this.applyReaderPreferences();

    // 2. Initialize Audio Callbacks
    this.initAudioListeners();

    // 3. Render All Views
    this.renderClassics();
    this.renderSummaries();
    this.renderCommunityStories();
    this.renderChatMessages();
    this.renderBookshelf();
    this.updateBookshelfCount();

    // 4. Attach Event Listeners
    this.initEventListeners();

    // 5. Populate Voices when ready
    this.populateVoiceDropdown();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.populateVoiceDropdown();
      };
    }

    console.log("[FolioApp] Application initialized successfully with local storage persistence.");
  }

  // ========================================================================
  // 1. NAVIGATION & TAB SWITCHING
  // ========================================================================

  switchTab(tabName) {
    if (!tabName) return;
    this.currentTab = tabName;

    // Update Nav links
    document.querySelectorAll(".nav-link").forEach(btn => {
      if (btn.getAttribute("data-tab") === tabName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Close mobile menu if open
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) navMenu.classList.remove("open");

    // Switch View Sections
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const targetSection = document.getElementById(`view-${tabName}`);
    if (targetSection) {
      targetSection.classList.add("active");
      // Scroll to top of section or content
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Refresh view specific data if needed
    if (tabName === "bookshelf") {
      this.renderBookshelf();
    } else if (tabName === "community") {
      this.renderCommunityStories();
    }
  }

  toggleMobileNav() {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) {
      navMenu.classList.toggle("open");
    }
  }

  // ========================================================================
  // 2. FREE CLASSICS (PUBLIC DOMAIN)
  // ========================================================================

  renderClassics() {
    const container = document.getElementById("classics-grid");
    if (!container) return;

    container.innerHTML = INITIAL_CLASSICS.map(book => {
      const isBookmarked = StorageService.isBookmarked(book.id);
      return `
        <article class="book-card" data-id="${book.id}">
          <div class="book-cover-wrap" style="background: ${book.coverColor}">
            <div class="book-cover-pattern"></div>
            <div class="book-spine-line"></div>
            <div class="book-cover-badges">
              <span class="book-genre-pill">${book.genre}</span>
              <button type="button" class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                      onclick="app.handleBookmarkToggle('${book.id}')" 
                      title="${isBookmarked ? 'Remove Bookmark' : 'Add to Bookshelf'}"
                      aria-label="Bookmark ${book.title}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <div class="book-cover-typography">
              <h3 class="book-cover-title">${book.title}</h3>
              <p class="book-cover-author">${book.author}</p>
            </div>
          </div>

          <div class="book-card-body">
            <div class="book-meta-row">
              <span class="book-rating">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${book.rating.toFixed(2)}
              </span>
              <span>Published ${book.year}</span>
              <span>${book.readTime}</span>
            </div>

            <p class="book-card-desc">${book.description}</p>

            <div class="book-tags-row">
              ${book.tags.map(t => `<span class="book-tag">#${t}</span>`).join('')}
            </div>

            <div class="book-card-actions">
              <button type="button" class="btn btn-primary" onclick="app.openClassicReader('${book.id}', 0)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                Read Full Book
              </button>
              <button type="button" class="btn btn-secondary" onclick="app.playBookAudio('${book.id}', 0)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                Listen
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // ========================================================================
  // 3. BOOK SUMMARIES (MODERN LITERATURE)
  // ========================================================================

  renderSummaries() {
    const container = document.getElementById("summaries-grid");
    if (!container) return;

    container.innerHTML = INITIAL_SUMMARIES.map(book => {
      const isBookmarked = StorageService.isBookmarked(book.id);
      return `
        <article class="book-card" data-id="${book.id}">
          <div class="book-cover-wrap" style="background: ${book.coverColor}">
            <div class="book-cover-pattern"></div>
            <div class="book-spine-line"></div>
            <div class="book-cover-badges">
              <span class="book-genre-pill">${book.genre}</span>
              <button type="button" class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                      onclick="app.handleBookmarkToggle('${book.id}')" 
                      title="${isBookmarked ? 'Remove Bookmark' : 'Add to Bookshelf'}"
                      aria-label="Bookmark ${book.title}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <div class="book-cover-typography">
              <h3 class="book-cover-title">${book.title}</h3>
              <p class="book-cover-author">${book.author}</p>
            </div>
          </div>

          <div class="book-card-body">
            <div class="book-meta-row">
              <span class="book-rating">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${book.rating.toFixed(1)}
              </span>
              <span>${book.readTime}</span>
              <span>Year ${book.year}</span>
            </div>

            <p class="book-card-desc">${book.description}</p>

            <div class="book-tags-row">
              ${book.tags.map(t => `<span class="book-tag">#${t}</span>`).join('')}
            </div>

            <div class="book-card-actions">
              <button type="button" class="btn btn-primary" onclick="app.openSummaryModal('${book.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Read 5-Min Summary
              </button>
              <a href="${book.purchaseUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" title="Buy Book (Opens legitimate bookstore link in new tab)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Buy Book
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  openSummaryModal(bookId) {
    const book = INITIAL_SUMMARIES.find(s => s.id === bookId);
    if (!book) return;

    this.currentSummaryBook = book;

    document.getElementById("summary-title").textContent = book.title;
    document.getElementById("summary-author").textContent = `By ${book.author} (${book.year})`;
    document.getElementById("summary-genre-pill").textContent = book.genre;
    document.getElementById("summary-readtime-badge").textContent = book.readTime;
    document.getElementById("summary-rating-badge").textContent = `★ ${book.rating}`;

    const buyLink = document.getElementById("summary-buy-link");
    if (buyLink) buyLink.href = book.purchaseUrl;

    const s = book.summary;
    const bodyHtml = `
      <div class="summary-main-idea-box">
        <div class="summary-main-idea-title">The Main Thesis</div>
        <div class="summary-main-idea-text">"${s.mainIdea}"</div>
      </div>

      <div class="summary-section-block">
        <h3>Introduction & Context</h3>
        <p>${s.intro}</p>
      </div>

      <div class="summary-section-block">
        <h3>Core Concepts & Mental Models</h3>
        ${s.coreConcepts.map(c => `
          <div class="summary-concept-card">
            <h4>${c.heading}</h4>
            <p>${c.text.replace(/\n/g, '<br>')}</p>
          </div>
        `).join('')}
      </div>

      <div class="summary-section-block">
        <h3>Key Lessons</h3>
        <ul style="padding-left: 1.25rem;">
          ${s.keyLessons.map(l => `<li style="margin-bottom: 0.5rem;">${l}</li>`).join('')}
        </ul>
      </div>

      <div class="summary-section-block">
        <h3>Practical Examples & Application</h3>
        <ul style="padding-left: 1.25rem;">
          ${s.practicalExamples.map(e => `<li style="margin-bottom: 0.5rem;">${e}</li>`).join('')}
        </ul>
      </div>

      <div class="summary-section-block">
        <h3>Key Takeaways Cheat Sheet</h3>
        <div class="summary-concept-card" style="background: var(--forest-subtle); border-color: var(--forest-border);">
          <ul style="padding-left: 1.25rem; color: var(--forest-dark); font-weight: 500;">
            ${s.takeaways.map(t => `<li style="margin-bottom: 0.4rem;">${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    document.getElementById("summary-dialog-body").innerHTML = bodyHtml;
    document.getElementById("summary-modal").classList.add("open");
  }

  closeSummaryModal() {
    document.getElementById("summary-modal").classList.remove("open");
  }

  playSummaryAudio() {
    if (!this.currentSummaryBook) return;
    const book = this.currentSummaryBook;
    const summaryText = `Summary of ${book.title} by ${book.author}. The main idea: ${book.summary.mainIdea}. Introduction: ${book.summary.intro}. Key Lessons: ${book.summary.keyLessons.join(". ")}`;

    this.audioPlayer.loadAndPlay(summaryText, book.id, 0);
    this.openAudioDock(`Summary: ${book.title}`, "Reading 5-min summary...");
    this.showToast(`Now listening to summary of ${book.title}`);
  }

  // ========================================================================
  // 4. DEDICATED FULL READER MODAL (CLASSICS & COMMUNITY)
  // ========================================================================

  openClassicReader(bookId, chapterIndex = 0) {
    const book = INITIAL_CLASSICS.find(b => b.id === bookId);
    if (!book) return;

    this.currentReaderBook = book;
    this.currentReaderChapterIndex = chapterIndex;
    this.renderReaderChapter();

    const modal = document.getElementById("reader-modal");
    modal.classList.add("open");

    // Reset scroll position
    const canvas = document.getElementById("reader-scroll-canvas");
    if (canvas) canvas.scrollTop = 0;
  }

  openCommunityStoryReader(storyId) {
    const story = StorageService.getStoryById(storyId);
    if (!story) return;

    // Adapt story format to reader format
    this.currentReaderBook = {
      id: story.id,
      title: story.title,
      author: story.author,
      genre: story.genre,
      chapters: [
        {
          id: `${story.id}-ch1`,
          title: story.chapterTitle || "Chapter 1",
          subtitle: `By ${story.author} • ${story.genre}`,
          content: story.content
        }
      ]
    };
    this.currentReaderChapterIndex = 0;
    this.renderReaderChapter();

    const modal = document.getElementById("reader-modal");
    modal.classList.add("open");
  }

  renderReaderChapter() {
    if (!this.currentReaderBook) return;
    const book = this.currentReaderBook;
    const chapter = book.chapters[this.currentReaderChapterIndex];
    if (!chapter) return;

    document.getElementById("reader-book-title").textContent = book.title;
    document.getElementById("reader-book-author").textContent = book.author;
    document.getElementById("reader-display-badge").textContent = book.genre || "Public Domain Classic";
    document.getElementById("reader-display-title").textContent = chapter.title;
    document.getElementById("reader-display-subtitle").textContent = chapter.subtitle || "";

    // Populate Chapter Selector
    const chapterSelect = document.getElementById("reader-chapter-select");
    chapterSelect.innerHTML = book.chapters.map((ch, idx) => `
      <option value="${idx}" ${idx === this.currentReaderChapterIndex ? 'selected' : ''}>
        ${ch.title}
      </option>
    `).join("");

    // Split text into paragraphs and wrap sentences in span.reader-chunk
    const textContainer = document.getElementById("reader-text-container");
    const rawContent = chapter.content.replace(/\r\n/g, "\n").trim();
    const paragraphs = rawContent.split(/\n\s*\n/);

    let globalChunkIdx = 0;
    const html = paragraphs.map(p => {
      const sentenceRegex = /[^.!?]+[.!?]+["']?|[^.!?]+$/g;
      const sentences = p.trim().match(sentenceRegex) || [p.trim()];
      const spans = sentences.map(s => {
        const span = `<span class="reader-chunk" id="chunk-${globalChunkIdx}" data-chunk-index="${globalChunkIdx}">${s.trim()} </span>`;
        globalChunkIdx++;
        return span;
      }).join("");
      return `<p>${spans}</p>`;
    }).join("");

    textContainer.innerHTML = html;

    // Update bottom navigation buttons
    const prevBtn = document.getElementById("reader-prev-chap-btn");
    const nextBtn = document.getElementById("reader-next-chap-btn");

    if (this.currentReaderChapterIndex <= 0) {
      prevBtn.style.visibility = "hidden";
    } else {
      prevBtn.style.visibility = "visible";
    }

    if (this.currentReaderChapterIndex >= book.chapters.length - 1) {
      nextBtn.style.visibility = "hidden";
    } else {
      nextBtn.style.visibility = "visible";
    }

    // Update progress bar
    this.updateReaderProgressBar();
  }

  handleReaderChapterSelect(indexStr) {
    const idx = parseInt(indexStr, 10);
    if (!isNaN(idx) && this.currentReaderBook && this.currentReaderBook.chapters[idx]) {
      // Stop speech when chapter changes
      if (this.audioPlayer.isPlaying) {
        this.audioPlayer.stop();
      }
      this.currentReaderChapterIndex = idx;
      this.renderReaderChapter();
      document.getElementById("reader-scroll-canvas").scrollTop = 0;
    }
  }

  prevChapter() {
    if (this.currentReaderChapterIndex > 0) {
      this.handleReaderChapterSelect(this.currentReaderChapterIndex - 1);
    }
  }

  nextChapter() {
    if (this.currentReaderBook && this.currentReaderChapterIndex < this.currentReaderBook.chapters.length - 1) {
      this.handleReaderChapterSelect(this.currentReaderChapterIndex + 1);
    }
  }

  closeReader() {
    const modal = document.getElementById("reader-modal");
    modal.classList.remove("open");
    // Stop audio if speaking current book
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
    }
  }

  handleReaderScroll() {
    this.updateReaderProgressBar();
  }

  updateReaderProgressBar() {
    const canvas = document.getElementById("reader-scroll-canvas");
    const bar = document.getElementById("reading-progress-bar");
    if (!canvas || !bar) return;

    const scrollTop = canvas.scrollTop;
    const scrollHeight = canvas.scrollHeight - canvas.clientHeight;
    const percent = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    bar.style.width = `${percent}%`;
  }

  adjustFontSize(delta) {
    let current = this.readerPrefs.fontSize || 18;
    current = Math.min(26, Math.max(14, current + delta));
    this.readerPrefs.fontSize = current;
    StorageService.saveReaderPreferences({ fontSize: current });
    this.applyReaderPreferences();
  }

  toggleFontFamily() {
    const current = this.readerPrefs.fontFamily || "serif";
    const next = current === "serif" ? "sans" : "serif";
    this.readerPrefs.fontFamily = next;
    StorageService.saveReaderPreferences({ fontFamily: next });
    this.applyReaderPreferences();
    this.showToast(`Font switched to ${next === 'serif' ? 'Serif (Lora)' : 'Sans-serif (Modern)'}`);
  }

  setReaderTheme(themeName) {
    if (!["light", "sepia", "dark"].includes(themeName)) return;
    this.readerPrefs.theme = themeName;
    StorageService.saveReaderPreferences({ theme: themeName });
    this.applyReaderPreferences();
  }

  applyReaderPreferences() {
    // 1. Theme
    const theme = this.readerPrefs.theme || "light";
    document.body.setAttribute("data-reader-theme", theme);

    // Update active state in theme buttons
    document.querySelectorAll(".theme-opt-btn").forEach(btn => {
      if (btn.classList.contains(`theme-opt-${theme}`)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // 2. Font Size
    const size = this.readerPrefs.fontSize || 18;
    const textContainer = document.getElementById("reader-text-container");
    if (textContainer) {
      textContainer.style.fontSize = `${size}px`;
    }
    const indicator = document.getElementById("font-size-val");
    if (indicator) {
      indicator.textContent = `${size}px`;
    }

    // 3. Font Family
    const family = this.readerPrefs.fontFamily || "serif";
    if (textContainer) {
      textContainer.style.fontFamily = family === "serif" ? "var(--font-serif-reading)" : "var(--font-sans)";
    }

    // 4. Audio Rate & Voice
    if (this.readerPrefs.speechRate) {
      this.audioPlayer.setRate(this.readerPrefs.speechRate);
      const speedSelect = document.getElementById("audio-speed-select");
      if (speedSelect) speedSelect.value = String(this.readerPrefs.speechRate);
    }
  }

  // ========================================================================
  // 5. AUDIOBOOK CONTROLLER (WEB SPEECH API)
  // ========================================================================

  initAudioListeners() {
    this.audioPlayer.onStatusChange = (status, info) => {
      this.updateAudioDockUI(status, info);
    };

    this.audioPlayer.onChunkChange = (chunkIdx, total, chunkText) => {
      // Highlight current chunk in reader
      document.querySelectorAll(".reader-chunk.speaking-active").forEach(el => {
        el.classList.remove("speaking-active");
      });

      const activeChunk = document.getElementById(`chunk-${chunkIdx}`);
      if (activeChunk) {
        activeChunk.classList.add("speaking-active");
        // Smoothly scroll reader so the speaking sentence is visible
        activeChunk.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const statusEl = document.getElementById("audio-track-status");
      if (statusEl) {
        statusEl.textContent = `Speaking sentence ${chunkIdx + 1} of ${total}`;
      }
    };

    this.audioPlayer.onError = (msg) => {
      this.showToast(msg, "warning");
    };
  }

  playBookAudio(bookId, chapterIndex = 0) {
    const book = INITIAL_CLASSICS.find(b => b.id === bookId);
    if (!book || !book.chapters[chapterIndex]) return;

    const chapter = book.chapters[chapterIndex];
    this.audioPlayer.loadAndPlay(chapter.content, book.id, chapterIndex);
    this.openAudioDock(`${book.title} — ${chapter.title}`, "Starting narration...");
    this.showToast(`Now playing audio: ${book.title}`);
  }

  toggleReaderAudio() {
    if (!this.currentReaderBook) return;

    if (this.audioPlayer.isPlaying && !this.audioPlayer.isPaused) {
      this.audioPlayer.pause();
    } else if (this.audioPlayer.isPaused) {
      this.audioPlayer.resume();
    } else {
      const book = this.currentReaderBook;
      const chapter = book.chapters[this.currentReaderChapterIndex];
      if (chapter) {
        this.audioPlayer.loadAndPlay(chapter.content, book.id, this.currentReaderChapterIndex);
        this.openAudioDock(`${book.title} — ${chapter.title}`, "Reading chapter...");
      }
    }
  }

  handleAudioMainToggle() {
    if (!this.audioPlayer.isPlaying) {
      // If stopped, resume or play active reader book if open
      if (this.currentReaderBook) {
        this.toggleReaderAudio();
      } else {
        // Play first classic by default
        this.playBookAudio("classic-sherlock", 0);
      }
    } else if (this.audioPlayer.isPaused) {
      this.audioPlayer.resume();
    } else {
      this.audioPlayer.pause();
    }
  }

  openAudioDock(title, status = "Playing") {
    const dock = document.getElementById("audio-dock");
    if (dock) {
      dock.classList.add("visible");
      document.getElementById("audio-track-title").textContent = title;
      document.getElementById("audio-track-status").textContent = status;
    }
  }

  closeAudioDock() {
    this.audioPlayer.stop();
    const dock = document.getElementById("audio-dock");
    if (dock) dock.classList.remove("visible");
  }

  updateAudioDockUI(status, info) {
    const dock = document.getElementById("audio-dock");
    const playIcon = document.getElementById("audio-main-icon-play");
    const pauseIcon = document.getElementById("audio-main-icon-pause");
    const readerAudioBtnText = document.getElementById("reader-audio-btn-text");

    if (status === "playing") {
      if (dock) {
        dock.classList.add("visible");
        dock.classList.add("is-playing");
      }
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "block";
      if (readerAudioBtnText) readerAudioBtnText.textContent = "Pause";
    } else if (status === "paused") {
      if (dock) {
        dock.classList.remove("is-playing");
      }
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";
      if (readerAudioBtnText) readerAudioBtnText.textContent = "Resume";
    } else {
      // Stopped
      if (dock) {
        dock.classList.remove("is-playing");
      }
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";
      if (readerAudioBtnText) readerAudioBtnText.textContent = "Listen";

      // Clear chunk highlights
      document.querySelectorAll(".reader-chunk.speaking-active").forEach(el => {
        el.classList.remove("speaking-active");
      });
    }
  }

  handleSpeedChange(newSpeed) {
    this.audioPlayer.setRate(newSpeed);
    this.readerPrefs.speechRate = parseFloat(newSpeed);
    StorageService.saveReaderPreferences({ speechRate: this.readerPrefs.speechRate });
    this.showToast(`Playback speed set to ${newSpeed}x`);
  }

  handleVoiceChange(voiceURI) {
    this.audioPlayer.setVoice(voiceURI);
    this.readerPrefs.speechVoice = voiceURI;
    StorageService.saveReaderPreferences({ speechVoice: voiceURI });
  }

  populateVoiceDropdown() {
    const dropdown = document.getElementById("audio-voice-select");
    if (!dropdown) return;

    const voices = this.audioPlayer.getVoices();
    if (voices.length === 0) return;

    dropdown.innerHTML = voices.map(v => `
      <option value="${v.voiceURI}">${v.name} (${v.lang})</option>
    `).join("");

    if (this.readerPrefs.speechVoice) {
      dropdown.value = this.readerPrefs.speechVoice;
      this.audioPlayer.setVoice(this.readerPrefs.speechVoice);
    }
  }

  playSampleAudio() {
    const text = "Welcome to Folio. This is the Web Speech synthesis engine reading in real-time right inside your browser.";
    this.audioPlayer.loadAndPlay(text, "sample-audio", 0);
    this.openAudioDock("Folio Audio Engine Demo", "Speaking...");
  }

  // ========================================================================
  // 6. WRITERS COMMUNITY & STORY PUBLISHING
  // ========================================================================

  renderCommunityStories() {
    const container = document.getElementById("community-stories-grid");
    if (!container) return;

    const stories = StorageService.getStories();

    if (stories.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </div>
          <h3 class="empty-state-title">No stories published yet</h3>
          <p class="empty-state-desc">Be the first to publish a chapter or article to the writers feed above!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = stories.map(story => {
      const isBookmarked = StorageService.isBookmarked(story.id);
      const isUserStory = story.isUserStory || story.id.startsWith("user-story-");
      const preview = story.content.substring(0, 150) + "...";

      return `
        <div class="story-card" data-id="${story.id}">
          <div class="story-card-top">
            <span class="book-genre-pill" style="background: var(--forest-subtle); color: var(--forest-dark); border-color: var(--forest-border);">
              ${story.genre}
            </span>
            <button type="button" class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    onclick="app.handleBookmarkToggle('${story.id}')" 
                    title="${isBookmarked ? 'Remove Bookmark' : 'Add to Bookshelf'}"
                    style="width: 30px; height: 30px; background: var(--bg-secondary); color: var(--forest-dark); border: 1px solid var(--border-medium);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <h3 class="story-card-title">${story.title}</h3>
          <div class="story-card-author">By ${story.author} • ${story.readTime || '~3 min read'}</div>
          <p class="story-card-preview">${preview}</p>

          <div class="story-card-footer">
            <button type="button" class="btn btn-primary" onclick="app.openCommunityStoryReader('${story.id}')" style="font-size: 0.84rem; padding: 0.5rem 0.9rem;">
              Read Story
            </button>

            ${isUserStory ? `
              <button type="button" class="btn-delete" onclick="app.deleteUserStory('${story.id}')" title="Delete your test story">
                Delete
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  handleStoryPublish(event) {
    event.preventDefault();

    const title = document.getElementById("story-title").value.trim();
    const author = document.getElementById("story-author").value.trim();
    const genre = document.getElementById("story-genre").value;
    const chapterTitle = document.getElementById("story-chapter-title").value.trim() || "Chapter 1";
    const content = document.getElementById("story-content").value.trim();

    if (!title || !author || !content) {
      this.showToast("Please fill in all required fields.", "warning");
      return;
    }

    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    const estMinutes = Math.max(1, Math.ceil(words / 180));

    const newStory = {
      id: "user-story-" + Date.now(),
      type: "community",
      title: title,
      author: author,
      genre: genre,
      chapterTitle: chapterTitle,
      content: content,
      wordCount: words,
      readTime: `~${estMinutes} min read`,
      createdAt: new Date().toISOString(),
      isUserStory: true
    };

    StorageService.saveStory(newStory);
    this.renderCommunityStories();
    this.showToast(`Story "${title}" published successfully!`);

    // Reset Form
    event.target.reset();
    document.getElementById("word-count-badge").textContent = "0 words";
    document.getElementById("reading-time-badge").textContent = "~0 min read";

    // Scroll to published card
    const grid = document.getElementById("community-stories-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  }

  fillSampleDraft() {
    document.getElementById("story-title").value = "The Cartographer of Lost Constellations";
    document.getElementById("story-author").value = "Gabriel Vance";
    document.getElementById("story-genre").value = "Historical Fiction";
    document.getElementById("story-chapter-title").value = "Chapter 1: The Silver Astrolabe";
    document.getElementById("story-content").value = `In the autumn of 1674, while the fog of the Thames still hung heavy over the Royal Exchange, Master Jonathan Drake unpacked an instrument that did not belong to this world.

The brass was inscribed with celestial rings that turned upon gears no thicker than a moth's wing. When the candlelight caught the horizon disc, it did not mirror London's smoky sky, but a vault of violet stars that no navigator from Bristol to Cathay had ever mapped.

"If the Admiralty learns of this," his apprentice whispered, holding his breath as the gears clicked softly into place.

Jonathan shook his head. "The Admiralty looks for gold and trade winds, Peter. They do not know that some maps were drawn before the sky was finished."`;

    // Trigger input events to update counters
    const contentInput = document.getElementById("story-content");
    contentInput.dispatchEvent(new Event("input"));
    this.showToast("Loaded sample writing draft.");
  }

  deleteUserStory(storyId) {
    if (confirm("Are you sure you want to delete this story? This cannot be undone.")) {
      StorageService.deleteStory(storyId);
      this.renderCommunityStories();
      this.renderBookshelf();
      this.updateBookshelfCount();
      this.showToast("Story deleted.");
    }
  }

  // ========================================================================
  // 7. WRITERS LOUNGE (MOCK MESSAGING)
  // ========================================================================

  renderChatMessages() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    const messages = StorageService.getChatMessages();

    container.innerHTML = messages.map(msg => `
      <div class="chat-bubble-wrap ${msg.isUser ? 'is-user' : ''}">
        <div class="chat-avatar">${msg.avatar || 'WR'}</div>
        <div class="chat-bubble-body">
          <div class="chat-sender-line">
            <span class="chat-sender-name">${msg.author}</span>
            <span class="chat-time">${msg.timestamp}</span>
          </div>
          <div>${msg.text}</div>
        </div>
      </div>
    `).join("");

    // Auto-scroll to bottom of chat
    container.scrollTop = container.scrollHeight;
  }

  handleChatMessage(event) {
    event.preventDefault();
    const input = document.getElementById("chat-input-text");
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: "msg-" + Date.now(),
      author: "You (Writer)",
      avatar: "ME",
      text: text,
      timestamp: timeStr,
      isUser: true
    };

    StorageService.addChatMessage(userMessage);
    input.value = "";
    this.renderChatMessages();

    // Friendly local mock simulation reply after 1.2s
    setTimeout(() => {
      this.simulateCommunityReply(text);
    }, 1200);
  }

  simulateCommunityReply(userText) {
    const communityWriters = [
      { name: "Elena Rostova", avatar: "ER", responses: [
        "Fascinating perspective! That reminds me of Jane Austen's subtle character dynamics.",
        "Beautifully put. Strong dialogue always anchors the narrative.",
        "I love exploring that theme in historical settings. What chapter are you working on next?"
      ]},
      { name: "Marcus Thorne", avatar: "MT", responses: [
        "Great point! In science fiction and modern storytelling, pacing makes all the difference.",
        "Totally agree. Keep pushing forward with that draft!",
        "That's such a keen observation. Have you published your chapter in the community feed yet?"
      ]},
      { name: "Clara Higgins", avatar: "CH", responses: [
        "Love seeing fresh ideas in the lounge today. Reading and writing truly go hand in hand.",
        "That resonates deeply. Books always teach us how to live and write better."
      ]}
    ];

    const randomWriter = communityWriters[Math.floor(Math.random() * communityWriters.length)];
    const randomReply = randomWriter.responses[Math.floor(Math.random() * randomWriter.responses.length)];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const replyMsg = {
      id: "msg-" + Date.now(),
      author: randomWriter.name,
      avatar: randomWriter.avatar,
      text: randomReply,
      timestamp: timeStr,
      isUser: false
    };

    StorageService.addChatMessage(replyMsg);
    this.renderChatMessages();
  }

  resetChat() {
    StorageService.clearChatMessages();
    this.renderChatMessages();
    this.showToast("Chat reset to initial discussion.");
  }

  // ========================================================================
  // 8. MY BOOKSHELF (PERSONAL LIBRARY)
  // ========================================================================

  handleBookmarkToggle(id) {
    const isNowBookmarked = StorageService.toggleBookmark(id);
    this.updateBookmarkButtonStates(id, isNowBookmarked);
    this.updateBookshelfCount();

    if (this.currentTab === "bookshelf") {
      this.renderBookshelf();
    }

    if (isNowBookmarked) {
      this.showToast("Saved to My Bookshelf!");
    } else {
      this.showToast("Removed from My Bookshelf.");
    }
  }

  updateBookmarkButtonStates(id, isBookmarked) {
    document.querySelectorAll(`.book-card[data-id="${id}"] .bookmark-btn, .story-card[data-id="${id}"] .bookmark-btn`).forEach(btn => {
      if (isBookmarked) {
        btn.classList.add("active");
        btn.setAttribute("title", "Remove Bookmark");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("title", "Add to Bookshelf");
      }
    });
  }

  updateBookshelfCount() {
    const bookmarks = StorageService.getBookmarks();
    const countBadge = document.getElementById("bookshelf-count");
    if (countBadge) {
      countBadge.textContent = bookmarks.length;
    }
  }

  renderBookshelf() {
    const container = document.getElementById("bookshelf-grid");
    const emptyState = document.getElementById("bookshelf-empty-state");
    if (!container) return;

    const bookmarks = StorageService.getBookmarks();
    const allItems = this.getAllSearchableItems();
    const savedItems = allItems.filter(item => bookmarks.includes(item.id));

    // Update filter counts
    const countAll = savedItems.length;
    const countClassic = savedItems.filter(i => i.type === "classic").length;
    const countSummary = savedItems.filter(i => i.type === "summary").length;
    const countCommunity = savedItems.filter(i => i.type === "community").length;

    const elCountAll = document.getElementById("count-all");
    const elCountClassic = document.getElementById("count-classic");
    const elCountSummary = document.getElementById("count-summary");
    const elCountCommunity = document.getElementById("count-community");

    if (elCountAll) elCountAll.textContent = countAll;
    if (elCountClassic) elCountClassic.textContent = countClassic;
    if (elCountSummary) elCountSummary.textContent = countSummary;
    if (elCountCommunity) elCountCommunity.textContent = countCommunity;

    // Filter items based on active filter
    let filtered = savedItems;
    if (this.bookshelfFilter !== "all") {
      filtered = savedItems.filter(i => i.type === this.bookshelfFilter);
    }

    if (savedItems.length === 0 || filtered.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    container.innerHTML = filtered.map(item => {
      const isClassic = item.type === "classic";
      const isSummary = item.type === "summary";
      const isCommunity = item.type === "community";

      const readAction = isClassic 
        ? `app.openClassicReader('${item.id}', 0)`
        : isSummary 
          ? `app.openSummaryModal('${item.id}')`
          : `app.openCommunityStoryReader('${item.id}')`;

      const typeLabel = isClassic ? "Classic Literature" : isSummary ? "5-Min Summary" : "Community Story";

      return `
        <article class="book-card" data-id="${item.id}">
          <div class="book-cover-wrap" style="background: ${item.coverColor || 'linear-gradient(135deg, #243b2f 0%, #112019 100%)'}; height: 190px;">
            <div class="book-cover-pattern"></div>
            <div class="book-spine-line"></div>
            <div class="book-cover-badges">
              <span class="book-genre-pill">${typeLabel}</span>
              <button type="button" class="bookmark-btn active" 
                      onclick="app.handleBookmarkToggle('${item.id}')" 
                      title="Remove from Bookshelf"
                      aria-label="Remove ${item.title}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <div class="book-cover-typography">
              <h3 class="book-cover-title" style="font-size: 1.2rem;">${item.title}</h3>
              <p class="book-cover-author">${item.author}</p>
            </div>
          </div>

          <div class="book-card-body">
            <div class="book-meta-row">
              <span class="book-genre-pill" style="background: var(--bg-secondary); color: var(--text-secondary); border-color: var(--border-medium); font-size: 0.7rem;">
                ${item.genre || 'Literature'}
              </span>
              <span>${item.readTime || ''}</span>
            </div>

            <p class="book-card-desc" style="font-size: 0.88rem;">${(item.description || item.content || '').substring(0, 110)}...</p>

            <div class="book-card-actions">
              <button type="button" class="btn btn-primary" onclick="${readAction}">
                Read Now
              </button>
              <button type="button" class="btn btn-outline" onclick="app.handleBookmarkToggle('${item.id}')" style="color: #A33A3A; border-color: #F1D4D4;">
                Remove
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  clearAllBookmarks() {
    if (confirm("Are you sure you want to remove all saved books from your bookshelf?")) {
      StorageService._setItem(STORAGE_KEYS.BOOKMARKS, []);
      this.renderClassics();
      this.renderSummaries();
      this.renderCommunityStories();
      this.renderBookshelf();
      this.updateBookshelfCount();
      this.showToast("Bookshelf cleared.");
    }
  }

  // ========================================================================
  // 9. SEARCH & DISCOVERY
  // ========================================================================

  getAllSearchableItems() {
    const classics = INITIAL_CLASSICS.map(c => ({
      id: c.id,
      title: c.title,
      author: c.author,
      genre: c.genre,
      year: c.year,
      type: "classic",
      description: c.description,
      readTime: c.readTime,
      coverColor: c.coverColor
    }));

    const summaries = INITIAL_SUMMARIES.map(s => ({
      id: s.id,
      title: s.title,
      author: s.author,
      genre: s.genre,
      year: s.year,
      type: "summary",
      description: s.description,
      readTime: s.readTime,
      coverColor: s.coverColor
    }));

    const userStories = StorageService.getStories().map(st => ({
      id: st.id,
      title: st.title,
      author: st.author,
      genre: st.genre,
      type: "community",
      description: st.content.substring(0, 150),
      readTime: st.readTime || "~3 min read",
      coverColor: "linear-gradient(135deg, #243b2f 0%, #112019 100%)"
    }));

    return [...classics, ...summaries, ...userStories];
  }

  openSearchModal() {
    const modal = document.getElementById("search-modal");
    modal.classList.add("open");
    const input = document.getElementById("global-search-input");
    input.value = "";
    input.focus();
    this.renderSearchResults("");
  }

  closeSearchModal() {
    document.getElementById("search-modal").classList.remove("open");
  }

  handleSearchInput(query) {
    this.renderSearchResults(query.trim().toLowerCase());
  }

  renderSearchResults(query) {
    const container = document.getElementById("search-results-list");
    if (!container) return;

    const all = this.getAllSearchableItems();
    let results = all;

    if (query) {
      results = all.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const authorMatch = item.author.toLowerCase().includes(query);
        const genreMatch = item.genre ? item.genre.toLowerCase().includes(query) : false;
        const descMatch = item.description ? item.description.toLowerCase().includes(query) : false;
        return titleMatch || authorMatch || genreMatch || descMatch;
      });
    }

    if (results.length === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted);">
          <svg style="width: 32px; height: 32px; margin-bottom: 0.5rem; opacity: 0.6;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p>No matching titles, authors, or stories found for "<strong>${query}</strong>".</p>
          <span style="font-size: 0.8rem;">Try searching for "Sherlock", "James Clear", "Pride", or "Fiction".</span>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(item => {
      const typeLabel = item.type === "classic" ? "Classic" : item.type === "summary" ? "Summary" : "Community Story";
      return `
        <div class="search-result-item" onclick="app.handleSearchResultClick('${item.id}', '${item.type}')">
          <div class="search-res-info">
            <h4>${item.title}</h4>
            <p>By ${item.author} • ${item.genre} • <span style="font-weight: 600; color: var(--forest-primary);">${typeLabel}</span></p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      `;
    }).join("");
  }

  handleSearchResultClick(id, type) {
    this.closeSearchModal();

    if (type === "classic") {
      this.openClassicReader(id, 0);
    } else if (type === "summary") {
      this.openSummaryModal(id);
    } else if (type === "community") {
      this.openCommunityStoryReader(id);
    }
  }

  // ========================================================================
  // 10. LEGAL MODALS & UTILITIES
  // ========================================================================

  openLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("open");
  }

  closeLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("open");
  }

  handleDmcaSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("dmca-name").value;
    this.showToast(`Thank you, ${name}. Your DMCA report has been logged.`);
    event.target.reset();
    setTimeout(() => {
      this.closeLegalModal("modal-dmca");
    }, 800);
  }

  showStorageInfo() {
    const bookmarks = StorageService.getBookmarks().length;
    const stories = StorageService.getStories().length;
    const messages = StorageService.getChatMessages().length;

    alert(
      `Folio Architecture & Local Storage Report:\n\n` +
      `• Bookmarks: ${bookmarks} saved item(s)\n` +
      `• Stories: ${stories} community story/stories\n` +
      `• Lounge Messages: ${messages} message(s)\n` +
      `• Theme: ${this.readerPrefs.theme}\n` +
      `• Font Size: ${this.readerPrefs.fontSize}px\n\n` +
      `All data is persisted in browser localStorage with zero external server dependencies.`
    );
  }

  showToast(message, type = "normal") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    if (type === "warning") {
      toast.style.background = "#7A4315";
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px) scale(0.95)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  // ========================================================================
  // 11. EVENT LISTENERS
  // ========================================================================

  initEventListeners() {
    // Navigation Links
    document.querySelectorAll(".nav-link").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById("mobile-nav-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => this.toggleMobileNav());
    }

    // Search Trigger Button
    const searchTrigger = document.getElementById("search-trigger-btn");
    if (searchTrigger) {
      searchTrigger.addEventListener("click", () => this.openSearchModal());
    }

    // Global Search Input
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearchInput(e.target.value));
    }

    // Bookshelf Filter Buttons
    const filterPills = document.getElementById("bookshelf-filter-pills");
    if (filterPills) {
      filterPills.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-pill-btn");
        if (btn) {
          filterPills.querySelectorAll(".filter-pill-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.bookshelfFilter = btn.getAttribute("data-filter") || "all";
          this.renderBookshelf();
        }
      });
    }

    // Word counter for publishing textarea
    const storyContentInput = document.getElementById("story-content");
    if (storyContentInput) {
      storyContentInput.addEventListener("input", () => {
        const text = storyContentInput.value.trim();
        const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
        const estMinutes = Math.max(1, Math.ceil(words / 180));
        document.getElementById("word-count-badge").textContent = `${words} words`;
        document.getElementById("reading-time-badge").textContent = `~${words > 0 ? estMinutes : 0} min read`;
      });
    }

    // Keyboard Shortcuts (Esc to close modals, '/' to open search)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeReader();
        this.closeSummaryModal();
        this.closeSearchModal();
        document.querySelectorAll(".legal-modal.open").forEach(m => m.classList.remove("open"));
      } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        this.openSearchModal();
      }
    });

    // Close modals when clicking backdrop
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("search-modal")) {
        this.closeSearchModal();
      } else if (e.target.classList.contains("summary-modal")) {
        this.closeSummaryModal();
      } else if (e.target.classList.contains("legal-modal")) {
        e.target.classList.remove("open");
      }
    });
  }
}

// Bootstrap application on DOM ready or immediately if already loaded
function initFolio() {
  if (!window.app) {
    window.app = new FolioApp();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFolio);
} else {
  initFolio();
}
