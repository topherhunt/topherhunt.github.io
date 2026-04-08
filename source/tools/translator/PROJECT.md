# Translation Practice

> **MAINTAIN THIS FILE.** When you change the translator app, update this doc to match. It exists so each new Claude session can quickly onboard without reading the entire single-file app. Keep it brief and accurate — if it drifts out of date it's worse than nothing.

AI-powered translation practice tool. The user picks any native → target language pair, types translations, and gets AI evaluation with adaptive difficulty.

## How It Works

1. User sees a sentence in their native language
2. They type the translation into the target language (timed)
3. AI evaluates: correct/incorrect, score, expected translation, grammar notes, CEFR fluency level
4. Next sentence auto-adapts in difficulty based on recent performance
5. Repeat — stats tracked over time

## Architecture

- **Single HTML file** (`translator.html`) — vanilla JS, no build step, no server
- **Anthropic Claude API** called directly from browser via `fetch` with `anthropic-dangerous-direct-browser-access: true` header
- **Model**: `claude-sonnet-4-6`
- **API key**: user provides their own, stored in `localStorage`
- **All data** persists in `localStorage`

## Language Support

**Native languages** (what you translate FROM): English, Dutch, Spanish, Turkish, German, Italian, Greek, French

**Target languages** (what you translate TO): same set

**UI languages**: the full interface (buttons, labels, feedback, AI notes) renders in one of 8 languages: NL, EN, FR, IT, EL, ES, DE, TR. Controlled by the "App Language" setting, which picks between native or target language for the entire UI locale.

## Screens

Four hash-routed screens:

### Home (`#/` — default)
- Stats overview + "Practice" button when history exists
- Redirects to Settings if no API key is saved

### Settings (`#/settings`)
- Native language picker
- Target language picker
- App language toggle (native vs target — target recommended for immersion)
- API key input (password field with show/hide toggle)
- Validates key with a test API call on save
- "Clear all data" button

### Practice (`#/practice`)
- Main loop: sentence card → text input → submit → feedback card → next
- Timer starts when sentence appears (shows elapsed seconds, not stressful)
- Auto-focus input, Enter to submit, Enter again for next
- Loading spinner while waiting for API
- Status bar: CEFR level, streak, running score, total sentences

### Help (`#/help`)
- Onboarding guide: setup, practice flow, scoring explanation, progress tracking
- Fully localized in all 8 UI languages

## AI Integration — Organic Difficulty

No hard-coded level rubric. The AI receives the **last 20 sentences + results** as context and adjusts difficulty naturally. Empty history = start at basic A1.

### API calls per round

**First round only — GENERATE call** produces the first native-language sentence:
- Receives: last 20 sentences with correct/incorrect indication + AI notes
- System prompt: `{target}` language tutor for a `{native}` speaker
- Returns: `{es, hint, topic}` (the `es` field name is a legacy artifact — it holds whatever the native language is)

**Every subsequent round — EVALUATE call** scores the translation AND generates the next sentence in one call:
- Receives: native original + user's target-language attempt + last 20 history + AI notes
- Returns evaluation fields + `next_es`, `next_hint`, `next_topic` for the following round
- This means after the first sentence, only **one API call per round** instead of two

**Evaluate response fields:**
- `correct` (bool)
- `score` (0–100) — 100 perfect, 80+ minor issues, 50–79 partial, 0–49 wrong
- `expected` (ideal target-language translation)
- `feedback` (markdown: summary line + ✅/❌ bullet points with bold/italic, written in the UI language)
- `fluency_level` (CEFR: "A1-" through "B2+", 12 sub-levels)
- `notes` (internal AI scratchpad — 2–3 sentences, written in the UI language)
- `next_es`, `next_hint`, `next_topic` (the next sentence, bundled to save an API call)

### Retry Injection

Every 3rd sentence (`RETRY_INTERVAL = 3`), instead of using the AI's bundled `next_es`, the app injects a sentence the student previously got wrong and has not yet corrected. "Unresolved wrong" = the most recent history entry whose `es` matches has `correct === false`. Once they answer correctly, that sentence's latest entry flips to `correct: true` and it drops out of the candidate pool automatically. The oldest unresolved wrong sentence is picked first.

When a retry is injected, `currentSentence.isRetry` is set, the EVALUATE prompt includes a NOTE telling the AI it's a retry (with the prior attempt), and the saved history entry is tagged `isRetry: true`. Retry sentences cost zero tokens to "generate" since they're pulled from history.

**Watch: hints** — The `hint` field gives a brief grammar nudge in the target language about what construct to use. Current sense is they're helpful and appropriate. But keep an eye on whether they become a crutch. If so, consider: making hints opt-in, making them terser at higher CEFR levels, or omitting hints for already-mastered grammar.

### AI Notes Scratchpad

The EVALUATE response includes an internal `notes` field — a free-text scratchpad the AI maintains across rounds. It tracks:

- Recurring weaknesses and patterns of struggle
- Strengths and what the student has mastered
- Progression over time ("improving at X", "regressing on Y")

The most recent `notes` value is fed back into both GENERATE and EVALUATE prompts, giving the AI continuity without needing verbose per-item feedback in history. Notes are written in the UI language, capped at 2–3 sentences.

Displayed in dim gray text on the feedback card and home/stats page for diagnostic purposes.

### CEFR Sub-Levels

**A1- → A1 → A1+ → A2- → A2 → A2+ → B1- → B1 → B1+ → B2- → B2 → B2+**

Three gradations per official level (minus/base/plus) for 12 total levels. The AI assigns one per evaluation based on accumulated evidence across the full history, not just the current sentence.

### Evaluation Rules (codified in the system prompt)

- Output `expected` first so the AI has a reference before judging
- Accept minor spelling variations but flag them
- Accept romanized/transliterated input (e.g. "tha pao" for "θα πάω") — mark correct, show proper script
- Punctuation errors: note gently, deduct a few points (80–90), never mark incorrect solely for punctuation
- Only critique the current translation, not past mistakes
- Don't double-count errors (wrong word ≠ wrong word + wrong article on that word)
- Perfect translations get 100 — never deduct "to leave room for growth"

## Scoring

**Base score:** AI awards 0–100 based on correctness. Displayed as-is, never penalized.

**Speed bonus (carrot, not stick):**
```
targetTime = sentence.length / 2  (seconds)
speedRatio = max(0, 1 - elapsed / targetTime)
timeBonus = round(baseScore * 0.3 * speedRatio)
sentenceScore = baseScore + timeBonus
```

Only awarded when the answer is correct. If you answer faster than the target time, you earn up to +30% of your base score as a green "+N speed bonus". No penalty for being slow. A perfect fast answer can theoretically score ~130.

**Running score:** EMA of sentence scores (alpha = 0.15)

**Streak:** increments when baseScore > 75, resets otherwise (any score ≤ 75 breaks the streak)

## Data Model (localStorage)

```
translator_api_key      — string
translator_native_lang  — language code (default: 'en')
translator_target_lang  — language code (default: 'en')
translator_feedback_lang — 'native' | 'target' (controls UI locale)
translator_openai_key   — optional OpenAI key for TTS playback

translator_stats — {
  totalAttempted,
  totalCorrect,
  currentStreak,
  bestStreak,
  runningScore,
  totalTimeSpent
}

translator_history — [
  {
    es,              // native-language sentence (field name is legacy)
    attempt,         // user's target-language attempt
    expected,        // correct target-language translation
    baseScore,       // AI score (0-100)
    sentenceScore,   // after time bonus
    responseTime,    // seconds
    correct,         // bool
    fluencyLevel,    // CEFR string (e.g. "A2+")
    feedback,        // AI feedback text (markdown)
    notes,           // AI internal scratchpad
    tokensIn,        // input tokens (generate + evaluate)
    tokensOut,       // output tokens (generate + evaluate)
    timestamp        // Date.now()
  }
]
// Last 20 sent to AI for context. ALL kept permanently for stats/history.

translator_sessions — [
  {
    date,            // session start timestamp
    duration,        // seconds
    count,           // number of sentences
    averageScore,
    fluencyStart,
    fluencyEnd,
    totalTokensIn,
    totalTokensOut
  }
]
```

## Home / Stats Page

- Stats grid: CEFR level, accuracy %, total sentences, running score, current streak, best streak, avg response time, API cost
- Token summary: total in/out, average cost per round
- AI notes: latest internal scratchpad
- Fluency chart: CEFR level over time (canvas, with tooltip on hover)
- Score chart: sentence scores over time
- History table: every sentence attempted — filterable by correct/incorrect
- Session summaries: collapsible cards with per-session aggregates

## Token / Cost Tracking

Each API response includes a `usage` field with `input_tokens` and `output_tokens`. When eval bundles the next sentence, generate usage is zero for that round.

Cost constants: $3/M input tokens, $15/M output tokens.

## Text-to-Speech (optional)

If the user provides an OpenAI API key in Settings, the feedback card shows a ▶ button next to the expected translation. Clicking it calls `POST https://api.openai.com/v1/audio/speech` with `model: gpt-4o-mini-tts`, `voice: alloy`, `response_format: mp3` and plays the returned blob. The audio is cached in memory (`ttsCache`) for the duration of the current feedback view so replays are free and instant; the cache is cleared when the next feedback card is shown. While loading, the button shows a spinner and is disabled. While playing, the button turns orange and becomes a stop button.

## Style

- Dark theme, mobile-friendly — matches `quizzer.html` aesthetic
- Same CSS variables and component patterns
- CEFR level badges with tier emojis

## API Call Details

```js
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: userPrompt }],
  }),
});
```

Error handling:
- 401: bad key → redirect to settings
- 429: rate limited → show "wait a moment" message
- Malformed JSON response: retry once, then show error and let user skip
- Network failure: show error, let user retry
