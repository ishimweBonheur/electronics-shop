import { onBeforeUnmount, onMounted, onUpdated, type Ref } from 'vue'
import { interpolate, scrollProgress } from '~/utils/ui/scroll-animation'

// One passive scroll listener and at most one pending frame across all sections.
const subscribers = new Set<() => void>()
let frame = 0
function scheduleScrollFrame() {
  if (!frame) frame = window.requestAnimationFrame(() => {
    frame = 0
    subscribers.forEach(render => render())
  })
}

interface ScrollAnimationOptions {
  /** Absolute document scroll positions; per-element attributes can override. */
  start?: number
  end?: number
}
interface Target {
  element: HTMLElement
  top: number
  start: number
  end: number
  opacity: string
  transform: string
  transition: string
}

/** Progress is a pure function of scrollY: no playback, easing timers or inertia. */
export function useScrollAnimation(root: Ref<HTMLElement | null>, options: ScrollAnimationOptions = {}) {
  let targets: Target[] = []
  let media: MediaQueryList | undefined
  let resize: ResizeObserver | undefined
  let needsMeasure = true
  let mounted = false
  let focused = false

  function restore() {
    targets.forEach(({ element, opacity, transform, transition }) => {
      element.style.opacity = opacity
      element.style.transform = transform
      element.style.transition = transition
    })
  }

  function refresh() {
    needsMeasure = true
    scheduleScrollFrame()
  }

  function discover() {
    if (!mounted) return
    restore()
    targets = Array.from(root.value?.querySelectorAll<HTMLElement>('[data-scroll]') ?? []).map(element => ({
      element, top: 0, start: 0, end: 1,
      opacity: element.style.opacity,
      transform: element.style.transform,
      transition: element.style.transition,
    }))
    refresh()
  }

  function measure() {
    const viewport = window.innerHeight
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport)
    targets.forEach((target) => {
      const { element } = target
      // offsetTop is unaffected by our transforms or transformed ancestors.
      let top = 0
      let parent: HTMLElement | null = element
      while (parent) {
        top += parent.offsetTop
        parent = parent.offsetParent as HTMLElement | null
      }
      target.top = top
      let stagger = 0
      if (element.hasAttribute('data-scroll-stagger') && element.parentElement) {
        const siblings = Array.from(element.parentElement.children)
        stagger = Math.min(4, siblings.slice(0, siblings.indexOf(element)).filter(sibling =>
          sibling instanceof HTMLElement && Math.abs(sibling.offsetTop - element.offsetTop) < 4,
        ).length) * 16
      }
      const hero = ['hero', 'parallax'].includes(element.dataset.scroll ?? '')
      const start = Number(element.dataset.scrollStart ?? options.start ?? (hero ? 0 : top - viewport * 0.95 + stagger))
      const end = Number(element.dataset.scrollEnd ?? options.end ?? (hero ? 400 : top - viewport * 0.55 + stagger))
      target.start = Math.min(start, maxScroll)
      target.end = Math.min(end, maxScroll)
    })
    needsMeasure = false
  }

  function render() {
    if (media?.matches) {
      restore()
      return
    }
    if (needsMeasure) measure()
    const scroll = window.scrollY
    targets.forEach(({ element, start, end, opacity, transform, transition }) => {
      if (focused && element.contains(document.activeElement)) {
        element.style.opacity = opacity
        element.style.transform = transform
        element.style.transition = transition
        return
      }
      const p = scrollProgress(scroll, start, end)
      const effect = element.dataset.scroll
      const hero = effect === 'hero'
      const parallax = effect === 'parallax'
      const number = (key: string, fallback: number) => Number(element.dataset[key] ?? fallback)
      const x = interpolate(number('scrollFromX', effect === 'fade-left' ? 20 : effect === 'fade-right' ? -20 : 0), number('scrollToX', 0), p)
      const y = interpolate(number('scrollFromY', effect === 'fade-up' ? 20 : 0), number('scrollToY', parallax ? 24 : hero ? -20 : 0), p)
      const scale = interpolate(number('scrollFromScale', effect === 'zoom-in' ? 0.97 : parallax ? 1.08 : 1), number('scrollToScale', parallax ? 1.08 : 1), p)
      element.style.transition = 'none'
      element.style.opacity = String(interpolate(number('scrollFromOpacity', hero || parallax ? 1 : 0), number('scrollToOpacity', hero ? 0.7 : 1), p))
      element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    })
  }

  function onFocus() {
    focused = true
    scheduleScrollFrame()
  }
  function onBlur() {
    focused = false
    scheduleScrollFrame()
  }

  onMounted(() => {
    mounted = true
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', refresh)
    if (!subscribers.size) window.addEventListener('scroll', scheduleScrollFrame, { passive: true })
    subscribers.add(render)
    window.addEventListener('resize', refresh, { passive: true })
    window.visualViewport?.addEventListener('resize', refresh)
    root.value?.addEventListener('focusin', onFocus)
    root.value?.addEventListener('focusout', onBlur)
    root.value?.addEventListener('load', refresh, true)
    if ('ResizeObserver' in window) {
      resize = new ResizeObserver(refresh)
      if (root.value) resize.observe(root.value)
      resize.observe(document.body)
    }
    discover()
  })
  onUpdated(discover)
  onBeforeUnmount(() => {
    mounted = false
    restore()
    subscribers.delete(render)
    if (!subscribers.size) {
      window.removeEventListener('scroll', scheduleScrollFrame)
      window.cancelAnimationFrame(frame)
      frame = 0
    }
    resize?.disconnect()
    window.removeEventListener('resize', refresh)
    window.visualViewport?.removeEventListener('resize', refresh)
    media?.removeEventListener('change', refresh)
    root.value?.removeEventListener('focusin', onFocus)
    root.value?.removeEventListener('focusout', onBlur)
    root.value?.removeEventListener('load', refresh, true)
  })
}
