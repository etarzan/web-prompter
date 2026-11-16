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
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EntryUnit from '../components/EntryUnit.vue'
import ControlUnit from '../components/ControlUnit.vue'

const router = useRouter()

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault()
    router.push('/prompter')
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown, { capture: true }))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown, { capture: true }))
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
