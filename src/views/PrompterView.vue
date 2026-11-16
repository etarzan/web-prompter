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
      <div class="scroll-content" ref="contentEl" :style="{ textShadow: textShadow }">
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

    <!-- Reset button -->
    <button
      class="overlay-btn reset-btn"
      title="Reset to top (R)"
      @click.stop="resetScroll"
    >
      <span class="material-icons">replay</span>
    </button>

    <!-- Play / Pause button -->
    <button
      class="overlay-btn play-btn"
      :title="playing ? 'Pause (Space)' : 'Play (Space)'"
      @click.stop="togglePlay"
    >
      <span class="material-icons">{{ playing ? 'pause_circle_filled' : 'play_circle_filled' }}</span>
    </button>

    <!-- Mirror toggle -->
    <button
      class="overlay-btn mirror-toggle"
      :class="{ 'mirror-toggle--active': store.mirrorMode }"
      title="Toggle mirror mode"
      @click.stop="store.toggleMirror()"
    >
      <span class="material-icons">flip</span>
    </button>

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
import { useRouter } from 'vue-router'
import { usePrompterStore } from '../stores/prompter'
import KeyboardHints from '../components/KeyboardHints.vue'

const store = usePrompterStore()
const router = useRouter()

const wrapperEl = ref<HTMLDivElement | null>(null)
const playing = ref(false)

let rafId = 0
let lastTs = 0

const pxPerMs = computed(() => {
  const lineHeight = store.fontSize * 1.6
  return (store.scrollSpeed * lineHeight) / 1000
})

function hexLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lin = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

// When background is light, add a dark text shadow so any text color stays readable
const textShadow = computed(() => {
  const lum = hexLuminance(store.backColor)
  return lum > 0.35
    ? '0 1px 4px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.30)'
    : '0 1px 6px rgba(0,0,0,0.25)'
})

function scroll(ts: number) {
  if (!wrapperEl.value) return
  if (lastTs !== 0) {
    const delta = ts - lastTs
    wrapperEl.value.scrollTop += pxPerMs.value * delta
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

function resetScroll() {
  if (wrapperEl.value) wrapperEl.value.scrollTop = 0
  if (playing.value) {
    cancelAnimationFrame(rafId)
    playing.value = false
    lastTs = 0
  }
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

// capture:true so we fire BEFORE the scroll-wrapper consumes Space
function onKeyDown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  }
  if (e.key === 'Escape') {
    router.push('/')
  }
  if (e.key === 'm' || e.key === 'M') {
    store.toggleMirror()
  }
  if (e.key === 'r' || e.key === 'R') {
    resetScroll()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown, { capture: true }))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown, { capture: true })
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

.mirror-toggle { top: 16px; right: 16px; }
.reset-btn { bottom: 20px; right: 84px; }
.mirror-toggle--active {
  background: rgba(156, 68, 204, 0.70);
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 208, 74, 0.30);
}

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
