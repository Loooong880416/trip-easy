import { ref, onMounted, onUnmounted } from "vue"
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window
  
  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      scrollTop.value = el.scrollTop
      clientHeight.value = el.clientHeight
      scrollHeight.value = el.scrollHeight
    }
    if (scrollTop.value + clientHeight.value + 1 >= scrollHeight.value) {
      // if (reachBottomCB) reachBottomCB()
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) {
      el = elRef.value
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}