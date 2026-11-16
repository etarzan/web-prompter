<template>
  <div
    class="prompter-view"
    :style="{ background: store.backColor, color: store.textColor }"
    @click="togglePlay"
  >
    <!-- Scroll container -->
    <div
      class="scroll-wrapper"
      ref="wrapperEl"
      :style="{
        fontSize: store.fontSize + 'px',
        transform: store.mirrorMode ? 'scaleX(-1)' : 'none',
      }"
    >
      <div class="scroll-content" ref="contentEl">
        <!-- Leading spacer so text starts off-screen -->
        <div class="spacer-top" />
        <p v-for="(line, i) in store.lines" :key="i" class="prompt-line">{{ line }}</p>
        <div class="spacer-bottom" />
      </div>
    </div>

    <!-- Back button -->
    <RouterLink to="/" class="overlay-btn back-btn" title="Back to editor" @click.stop>
      <span class="material-icons">arrow_back</span>
    </RouterLink>

    <!-- Play / Pause button -->
    <button
      class="overlay-btn play-btn"
      :title="playing ? 'Pause (Space)' : 'Play (Space)'"
      @click.stop="togglePlay"
    >
      <span class="material-icons">{{ playing ? 'pause_circle_filled' : 'play_circle_filled' }}</span>
    </button>

    <!-- Mirror indicator -->
    <div v-if="store.mirrorMode" class="mirror-badge">
      <span class="material-icons">flip</span> Mirror
    </div>

    <!-- Keyboard hints -->
    <KeyboardHints screen="prompter" />

    <!-- Empty state -->
    <div v-if="store.lines.length === 0" class="empty-overlay">
      <p>No script yet.</p>
      <RouterLink to="/" class="empty-link" @click.stop>Go back and add some lines →</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { usePrompterStore } from '../stores/prompter'
import KeyboardHints from '../components/KeyboardHints.vue'

const store = usePrompterStore()

const wrapperEl = ref<HTMLDivElement | null>(null)
const contentEl = ref<HTMLDivElement | null>(null)
const playing = ref(false)

let rafId = 0
let lastTs = 0

// pixels per millisecond derived from scroll speed (lines/sec) and font size
const pxPerMs = computed(() => {
  const lineHeight = store.fontSize * 1.6 // approximate line height
  return (store.scrollSpeed * lineHeight) / 1000
})

function scroll(ts: number) {
  if (!wrapperEl.value) return
  if (lastTs !== 0) {
    const delta = ts - lastTs
    wrapperEl.value.scrollTop += pxPerMs.value * delta
    // stop at the end
    const { scrollTop, scrollHeight, clientHeight } = wrapperEl.value
    if (scrollTop + clientHeight >= scrollHeight) {
      playing.value = false
      lastTs = 0
      return
    }
  }
  lastTs = ts
  rafId = requestAnimationFrame(scroll)
}

function togglePlay() {
  if (store.lines.length === 0) return
  playing.value = !playing.value
  if (playing.value) {
    lastTs = 0
    rafId = requestAnimationFrame(scroll)
  } else {
    cancelAnimationFrame(rafId)
    lastTs = 0
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.prompter-view {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.scroll-wrapper {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: auto;
  /* hide scrollbar visually */
  scrollbar-width: none;
}

.scroll-wrapper::-webkit-scrollbar { display: none; }

.scroll-content {
  display: flex;
  flex-direction: column;
}

.spacer-top  { height: 100vh; }
.spacer-bottom { height: 100vh; }

.prompt-line {
  margin: 0 0 0.4em;
  padding: 0 10vw;
  line-height: 1.6;
  text-align: center;
  word-break: break-word;
}

/* ── Overlay buttons ───────────────────────────────────── */
.overlay-btn {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
  z-index: 10;
}

.overlay-btn:hover { background: rgba(0, 0, 0, 0.7); }
.overlay-btn .material-icons { font-size: 28px; }

.back-btn { top: 16px; left: 16px; }
.play-btn { bottom: 20px; right: 20px; width: 56px; height: 56px; }
.play-btn .material-icons { font-size: 36px; }

/* ── Mirror badge ───────────────────────────────────────── */
.mirror-badge {
  position: fixed;
  top: 16px;
  right: 16px;
  background: rgba(0,0,0,0.5);
  color: rgba(255,255,255,0.75);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
}

.mirror-badge .material-icons { font-size: 14px; }

/* ── Empty state ────────────────────────────────────────── */
.empty-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  pointer-events: none;
  z-index: 5;
}

.empty-overlay p { font-size: 1.1rem; opacity: 0.7; margin: 0; }

.empty-link {
  pointer-events: all;
  color: inherit;
  opacity: 0.85;
  font-size: 0.9rem;
}
</style>
