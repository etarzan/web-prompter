<template>
  <div class="control-unit">

    <!-- Text Controls -->
    <h3 class="section-header">Text Controls</h3>

    <!-- Font size -->
    <div class="control-row">
      <div class="control-label">
        <span class="material-icons icon-muted">format_size</span>
        <span>Text Size</span>
      </div>
      <div class="control-widget">
        <input
          type="range"
          min="10" max="60" step="10"
          :value="store.fontSize"
          @input="store.setFontSize(Number(($event.target as HTMLInputElement).value))"
          class="slider"
        />
        <span class="slider-label">{{ store.fontSize }}px</span>
      </div>
    </div>

    <!-- Text color -->
    <div class="control-row">
      <div class="control-label">
        <span class="material-icons icon-muted">color_lens</span>
        <span>Text Color</span>
      </div>
      <div class="control-widget swatches">
        <button
          v-for="c in textColors" :key="c.value"
          class="swatch"
          :style="{ background: c.value }"
          :class="{ 'swatch--active': store.textColor === c.value }"
          :title="c.label"
          @click="store.setTextColor(c.value)"
        >
          <span v-if="store.textColor === c.value" class="material-icons check-icon">check</span>
        </button>
      </div>
    </div>

    <hr class="divider" />

    <!-- Page Controls -->
    <h3 class="section-header">Page Controls</h3>

    <!-- Scroll speed -->
    <div class="control-row">
      <div class="control-label">
        <span class="material-icons icon-muted">speed</span>
        <span>Scroll Speed</span>
      </div>
      <div class="control-widget swatches">
        <button
          v-for="s in speeds" :key="s.value"
          class="speed-btn"
          :class="{ 'speed-btn--active': store.scrollSpeed === s.value }"
          :title="s.label"
          @click="store.setScrollSpeed(s.value)"
        >
          <span class="material-icons">{{ s.icon }}</span>
        </button>
      </div>
    </div>

    <!-- Background color -->
    <div class="control-row">
      <div class="control-label">
        <span class="material-icons icon-muted">format_color_fill</span>
        <span>Background Color</span>
      </div>
      <div class="control-widget swatches">
        <button
          v-for="c in backColors" :key="c.value"
          class="swatch"
          :style="{ background: c.value }"
          :class="{ 'swatch--active': store.backColor === c.value }"
          :title="c.label"
          @click="store.setBackColor(c.value)"
        >
          <span v-if="store.backColor === c.value" class="material-icons check-icon">check</span>
        </button>
      </div>
    </div>

    <hr class="divider" />

    <!-- Mirror mode -->
    <div class="control-row">
      <div class="control-label">
        <span class="material-icons icon-muted">flip</span>
        <span>Mirror Mode</span>
      </div>
      <div class="control-widget">
        <button
          class="mirror-btn"
          :class="{ 'mirror-btn--active': store.mirrorMode }"
          @click="store.toggleMirror()"
          :title="store.mirrorMode ? 'Disable mirror' : 'Enable mirror'"
        >
          {{ store.mirrorMode ? 'On' : 'Off' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { usePrompterStore } from '../stores/prompter'

const store = usePrompterStore()

const textColors = [
  { value: '#faeefd', label: 'Off white' },
  { value: '#0900ee', label: 'Blue' },
  { value: '#660404', label: 'Red' },
  { value: '#1f1e1e', label: 'Dark gray' },
]

const backColors = [
  { value: '#d4d0e6', label: 'Lavender' },
  { value: '#98b8ff', label: 'Light blue' },
  { value: '#7e3131', label: 'Dark red' },
  { value: '#302d2d', label: 'Near black' },
]

const speeds: { value: 1 | 2 | 4 | 6; icon: string; label: string }[] = [
  { value: 1, icon: 'emoji_people',   label: '1 line/sec — slow' },
  { value: 2, icon: 'directions_walk', label: '2 lines/sec — walk' },
  { value: 4, icon: 'directions_run',  label: '4 lines/sec — run' },
  { value: 6, icon: 'directions_bike', label: '6 lines/sec — fast' },
]
</script>

<style scoped>
.control-unit {
  background: var(--panel-bg);
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.section-header {
  color: rgba(230, 210, 240, 0.8);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 8px 0 10px;
}

.control-row {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  gap: 12px;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 130px;
  color: var(--card-text);
  font-size: 0.88rem;
}

.control-widget {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.slider {
  flex: 1;
  accent-color: var(--navbar-bg);
  cursor: pointer;
}

.slider-label {
  font-size: 0.78rem;
  color: rgba(230, 210, 240, 0.7);
  min-width: 36px;
}

/* Swatches */
.swatches { flex-wrap: wrap; gap: 6px; }

.swatch {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: border-color 0.15s;
}

.swatch--active { border-color: rgba(255,255,255,0.8); }

.check-icon { font-size: 14px; color: rgba(255,255,255,0.9); }

/* Speed buttons */
.speed-btn {
  background: rgba(100, 60, 120, 0.3);
  border: 1px solid rgba(161, 133, 187, 0.3);
  border-radius: 6px;
  color: var(--icon-muted);
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  transition: background 0.15s, color 0.15s;
}

.speed-btn:hover { background: rgba(100, 60, 120, 0.5); }

.speed-btn--active {
  background: var(--navbar-bg);
  color: #fff;
  border-color: transparent;
}

.speed-btn .material-icons { font-size: 20px; }

/* Mirror toggle */
.mirror-btn {
  background: rgba(100, 60, 120, 0.3);
  border: 1px solid rgba(161, 133, 187, 0.3);
  border-radius: 20px;
  color: var(--icon-muted);
  cursor: pointer;
  padding: 4px 20px;
  font-size: 0.85rem;
  font-family: var(--font-body);
  transition: background 0.15s, color 0.15s;
}

.mirror-btn--active {
  background: var(--navbar-bg);
  color: #fff;
  border-color: transparent;
}

.divider {
  border: none;
  border-top: 1px solid rgba(161, 133, 187, 0.25);
  margin: 10px 0 14px;
}
</style>
