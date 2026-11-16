<template>
  <div class="hints" :class="`hints--${screen}`">
    <span
      v-for="hint in hints[screen]"
      :key="hint.key"
      class="hint-chip"
    >
      <kbd class="hint-key">{{ hint.key }}</kbd>
      <span class="hint-label">{{ hint.label }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ screen: 'editor' | 'prompter' }>()

const hints = {
  editor: [
    { key: '↵', label: 'Add line' },
    { key: 'Esc', label: 'Cancel edit' },
  ],
  prompter: [
    { key: 'Space', label: 'Play / Pause' },
    { key: '←', label: 'Back to editor' },
  ],
}
</script>

<style scoped>
.hints {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Editor: sits in a strip above the fixed footer */
.hints--editor {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  padding: 4px 14px;
  background: rgba(7, 4, 15, 0.70);
  border-top: 1px solid var(--hint-border);
  backdrop-filter: blur(6px);
  z-index: 90;
}

/* Prompter: floating bottom-left, away from play button */
.hints--prompter {
  position: fixed;
  bottom: 20px;
  left: 16px;
  padding: 6px 10px;
  background: rgba(7, 4, 15, 0.55);
  border: 1px solid var(--hint-border);
  border-radius: 10px;
  backdrop-filter: blur(6px);
  z-index: 10;
}

.hint-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: var(--hint-text);
}

.hint-key {
  font-family: var(--font-body);
  font-size: 0.70rem;
  background: var(--hint-key-bg);
  border: 1px solid rgba(190, 130, 255, 0.30);
  border-radius: 4px;
  padding: 1px 5px;
  color: rgba(230, 200, 255, 0.90);
  white-space: nowrap;
}

.hint-label {
  opacity: 0.80;
}
</style>
