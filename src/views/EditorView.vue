<template>
  <div class="editor-view">
    <div class="editor-cols" ref="colsEl">
      <div class="col-entry" :style="{ width: leftPct + '%' }">
        <EntryUnit />
      </div>

      <div
        class="resize-handle"
        @pointerdown="startDrag"
        title="Drag to resize"
      >
        <div class="resize-grip" />
      </div>

      <div class="col-controls" :style="{ width: (100 - leftPct) + '%' }">
        <ControlUnit />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EntryUnit from '../components/EntryUnit.vue'
import ControlUnit from '../components/ControlUnit.vue'

const router = useRouter()
const colsEl = ref<HTMLDivElement | null>(null)
const leftPct = ref(60)

// ── Keyboard shortcut ───────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault()
    router.push('/prompter')
  }
}

// ── Drag-to-resize ──────────────────────────────────────
function startDrag(e: PointerEvent) {
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

  function onMove(ev: PointerEvent) {
    if (!colsEl.value) return
    const { left, width } = colsEl.value.getBoundingClientRect()
    const pct = ((ev.clientX - left) / width) * 100
    leftPct.value = Math.min(80, Math.max(20, pct))
  }

  function onUp(ev: PointerEvent) {
    (e.currentTarget as HTMLElement)?.releasePointerCapture(ev.pointerId)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  }

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}

onMounted(() => window.addEventListener('keydown', onKeyDown, { capture: true }))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown, { capture: true }))
</script>

<style scoped>
.editor-view {
  flex: 1;
  min-height: 0;
  padding-bottom: 56px;
  overflow: hidden;
}

.editor-cols {
  display: flex;
  height: 100%;
  user-select: none;
}

.col-entry {
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.col-controls {
  min-width: 0;
  overflow-y: auto;
  flex-shrink: 0;
}

/* ── Drag handle ─────────────────────────────────────── */
.resize-handle {
  width: 6px;
  flex-shrink: 0;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: background 0.15s;
  z-index: 1;
}

.resize-handle:hover,
.resize-handle:active {
  background: rgba(190, 130, 255, 0.18);
}

.resize-grip {
  width: 2px;
  height: 40px;
  border-radius: 2px;
  background: rgba(190, 130, 255, 0.30);
  transition: background 0.15s, height 0.15s;
}

.resize-handle:hover .resize-grip,
.resize-handle:active .resize-grip {
  background: rgba(255, 208, 74, 0.60);
  height: 60px;
}

@media (max-width: 600px) {
  .editor-cols { flex-direction: column; }
  .resize-handle { display: none; }
  .col-entry, .col-controls { width: 100% !important; }
}
</style>
