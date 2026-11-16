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
/* ── Editor variant: inline block at bottom of tools panel ── */
.hints--editor {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--hint-border);
  border-radius: 8px;
}

/* ── Prompter variant: cool corner badge, bottom-left ─────── */
.hints--prompter {
  position: fixed;
  bottom: 20px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 12px;
  background: rgba(7, 4, 15, 0.60);
  border: 1px solid var(--hint-border);
  border-left: 3px solid rgba(255, 208, 74, 0.55);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 12px rgba(255, 208, 74, 0.08);
}

/* ── Shared chip ─────────────────────────────────────────── */
.hint-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--hint-text);
}

.hint-key {
  font-family: var(--font-body);
  font-size: 0.68rem;
  background: var(--hint-key-bg);
  border: 1px solid rgba(190, 130, 255, 0.35);
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 1px 6px;
  color: rgba(240, 215, 255, 0.95);
  white-space: nowrap;
  min-width: 28px;
  text-align: center;
}

.hint-label {
  opacity: 0.75;
}
</style>
