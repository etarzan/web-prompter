import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type ScrollSpeed = 1 | 2 | 4 | 6

interface PrompterState {
  lines: string[]
  fontSize: number
  scrollSpeed: ScrollSpeed
  textColor: string
  backColor: string
  mirrorMode: boolean
}

const STORAGE_KEY = 'web-prompter-state'

const DEFAULTS: PrompterState = {
  lines: [],
  fontSize: 20,
  scrollSpeed: 1,
  textColor: '#faeefd',
  backColor: '#d4d0e6',
  mirrorMode: false,
}

function loadFromStorage(): PrompterState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULTS }
  }
}

export const usePrompterStore = defineStore('prompter', () => {
  const saved = loadFromStorage()

  const lines = ref<string[]>(saved.lines)
  const fontSize = ref<number>(saved.fontSize)
  const scrollSpeed = ref<ScrollSpeed>(saved.scrollSpeed)
  const textColor = ref<string>(saved.textColor)
  const backColor = ref<string>(saved.backColor)
  const mirrorMode = ref<boolean>(saved.mirrorMode)

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        lines: lines.value,
        fontSize: fontSize.value,
        scrollSpeed: scrollSpeed.value,
        textColor: textColor.value,
        backColor: backColor.value,
        mirrorMode: mirrorMode.value,
      }))
    } catch {
      // storage unavailable — continue without persistence
    }
  }

  watch([lines, fontSize, scrollSpeed, textColor, backColor, mirrorMode], persist, { deep: true })

  function addLine(line: string) {
    const trimmed = line.trim()
    if (trimmed.length > 0) lines.value.push(trimmed)
  }

  function editLine(index: number, text: string) {
    const trimmed = text.trim()
    if (trimmed.length > 0) lines.value.splice(index, 1, trimmed)
  }

  function deleteLine(index: number) {
    lines.value.splice(index, 1)
  }

  function setFontSize(val: number) { fontSize.value = val }
  function setScrollSpeed(val: ScrollSpeed) { scrollSpeed.value = val }
  function setTextColor(val: string) { textColor.value = val }
  function setBackColor(val: string) { backColor.value = val }
  function toggleMirror() { mirrorMode.value = !mirrorMode.value }

  return {
    lines,
    fontSize,
    scrollSpeed,
    textColor,
    backColor,
    mirrorMode,
    addLine,
    editLine,
    deleteLine,
    setFontSize,
    setScrollSpeed,
    setTextColor,
    setBackColor,
    toggleMirror,
  }
})
