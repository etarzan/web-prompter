<template>
  <div class="entry-unit">
    <!-- Line list -->
    <div class="entry-body custom-scroll" ref="bodyEl">
      <p v-if="store.lines.length === 0" class="empty-hint">
        No text to display. Start typing into the input box below.
      </p>
      <div
        v-for="(line, i) in store.lines"
        :key="i"
        class="line-card"
        :class="{ 'line-card--editing': editIndex === i }"
      >
        <span class="line-text">{{ line }}</span>
        <span class="material-icons icon-muted card-btn" @click="startEdit(i)" title="Edit">edit</span>
        <span class="material-icons icon-muted card-btn" @click="remove(i)" title="Delete">cancel</span>
      </div>
    </div>

    <!-- Input area -->
    <div class="entry-footer">
      <div class="input-area">
        <input
          ref="inputEl"
          v-model="draft"
          class="input-text"
          placeholder="Type lines here. Press Enter for a new line."
          @keydown="onKeyDown"
        />
        <span class="material-icons icon-action input-submit-btn" @click="submit" title="Add line">
          subdirectory_arrow_left
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { usePrompterStore } from '../stores/prompter'

const store = usePrompterStore()

const draft = ref('')
const editIndex = ref<number | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const bodyEl = ref<HTMLDivElement | null>(null)

onMounted(() => inputEl.value?.focus())

function submit() {
  if (draft.value.trim().length === 0) return
  if (editIndex.value !== null) {
    store.editLine(editIndex.value, draft.value)
    editIndex.value = null
  } else {
    store.addLine(draft.value)
    nextTick(() => {
      if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
    })
  }
  draft.value = ''
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.ctrlKey) submit()
  if (e.key === 'Escape') {
    editIndex.value = null
    draft.value = ''
  }
}

function startEdit(i: number) {
  editIndex.value = i
  draft.value = store.lines[i]
  inputEl.value?.focus()
}

function remove(i: number) {
  if (editIndex.value !== null) return // guard: block delete while editing
  store.deleteLine(i)
}
</script>

<style scoped>
.entry-unit {
  background: var(--panel-bg);
  border-right: 1px solid var(--panel-border);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.entry-body {
  flex: 1;
  min-height: 0;
  padding: 8px;
  background: var(--panel-inner-bg);
  overflow-y: auto;
}

.empty-hint {
  color: rgba(210, 185, 240, 0.45);
  font-size: 0.85rem;
  padding: 14px;
  margin: 0;
  font-style: italic;
}

.line-card {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--card-text);
  font-size: 14px;
  box-shadow: var(--card-shadow);
  border-radius: 6px;
  padding: 7px 10px;
  margin-bottom: 5px;
  gap: 6px;
  transition: background 0.12s;
}

.line-card:hover { background: rgba(200, 150, 255, 0.14); }

.line-card--editing {
  border-color: rgba(200, 150, 255, 0.55);
  background: rgba(200, 150, 255, 0.12);
}

.line-text {
  flex: 1;
  word-break: break-word;
}

.card-btn {
  font-size: 16px;
  flex-shrink: 0;
  padding: 2px;
  border-radius: 3px;
  transition: color 0.1s;
}

.card-btn:hover { color: rgba(255, 210, 100, 0.95); }

.entry-footer {
  padding: 8px;
  flex-shrink: 0;
  background: var(--panel-inner-bg);
}

.input-area {
  display: flex;
  align-items: center;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
  backdrop-filter: blur(8px);
  min-height: 42px;
}

.input-text {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--input-text);
  padding: 2px 8px;
}

.input-text::placeholder { color: var(--input-placeholder); }

.input-submit-btn {
  font-size: 26px;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.input-submit-btn:hover { opacity: 0.7; }
</style>
