<template>
  <div class="editor-view">
    <div class="editor-cols">
      <div class="col-entry">
        <EntryUnit />
      </div>
      <div class="col-controls">
        <ControlUnit />
      </div>
    </div>
    <KeyboardHints screen="editor" />
  </div>
</template>

<script setup lang="ts">
import EntryUnit from '../components/EntryUnit.vue'
import ControlUnit from '../components/ControlUnit.vue'
import KeyboardHints from '../components/KeyboardHints.vue'
</script>

<style scoped>
.editor-view {
  flex: 1;
  min-height: 0;
  /* leave room for fixed footer */
  padding-bottom: 56px;
  overflow: hidden;
}

.editor-cols {
  display: flex;
  height: 100%;
}

.col-entry {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.col-controls {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .editor-cols { flex-direction: column; }
}
</style>
