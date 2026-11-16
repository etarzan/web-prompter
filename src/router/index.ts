import { createRouter, createWebHashHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'
import PrompterView from '../views/PrompterView.vue'

const routes = [
  { path: '/',         component: EditorView },
  { path: '/prompter', component: PrompterView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
