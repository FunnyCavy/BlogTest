import mediumZoom from 'medium-zoom'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { nextTick, onMounted, watch } from 'vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    const initZoom = () => mediumZoom('.main img', {
      background: 'var(--vp-c-gray-soft)',
      margin: 24
    })
    onMounted(() => initZoom())
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
