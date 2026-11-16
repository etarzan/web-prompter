<template>
  <AppNavbar v-if="!isPrompterRoute" />
  <RouterView class="router-view" />
  <ControlBar v-if="!isPrompterRoute" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import ControlBar from './components/ControlBar.vue'

const route = useRoute()
const isPrompterRoute = computed(() => route.path === '/prompter')
</script>

<style>
.router-view {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
