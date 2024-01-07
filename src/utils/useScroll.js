import { ref, onMounted, onUnmounted } from "vue"
import { throttle } from 'underscore'

export default function useScroll() {
  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    scrollTop.value = document.documentElement.scrollTop
    clientHeight.value = document.documentElement.clientHeight
    scrollHeight.value = document.documentElement.scrollHeight
    if (scrollTop.value + clientHeight.value + 1 >= scrollHeight.value) {
      // if (reachBottomCB) reachBottomCB()
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}