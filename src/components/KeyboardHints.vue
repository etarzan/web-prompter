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
    { key: '↵ Enter', label: 'Add / confirm line' },
    { key: 'Esc', label: 'Cancel edit' },
    { key: 'Ctrl + ↵', label: 'Start prompter' },
  ],
  prompter: [
    { key: 'Space', label: 'Play / Pause' },
    { key: 'M', label: 'Toggle mirror' },
    { key: 'R', label: 'Reset to top' },
    { key: 'Esc', label: 'Back to editor' },
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
  gap: 8px;
  font-size: 0.95rem;
  color: var(--hint-text);
}

.hint-key {
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 600;
  background: var(--hint-key-bg);
  border: 1px solid rgba(190, 130, 255, 0.40);
  border-bottom: 3px solid rgba(190, 130, 255, 0.55);
  border-radius: 6px;
  padding: 3px 10px;
  color: rgba(248, 230, 255, 0.98);
  white-space: nowrap;
  min-width: 36px;
  text-align: center;
  letter-spacing: 0.02em;
}

.hint-label {
  opacity: 0.80;
  font-size: 0.90rem;
}
</style>
