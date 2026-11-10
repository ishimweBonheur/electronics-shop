import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

function compile(path, require = () => {}) {
  const exports = {}
  const code = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  return { exports, code, require }
}

const math = compile('../utils/ui/scroll-animation.ts')
runInNewContext(math.code, math)

test('progress clamps and restores identical values in both directions', () => {
  const { scrollProgress, interpolate } = math.exports
  const positions = [-100, 0, 100, 200, 400, 500, 400, 200, 100, 0]
  assert.deepEqual(positions.map(y => scrollProgress(y, 0, 400)), [0, 0, 0.25, 0.5, 1, 1, 1, 0.5, 0.25, 0])
  assert.equal(interpolate(60, 0, scrollProgress(200, 0, 400)), 30)
  assert.equal(scrollProgress(0, 0, 0), 1)
})

test('shared frame scheduling, reversal, reduced motion, focus, and cleanup', () => {
  const hooks = []
  let current
  const frames = new Map()
  let id = 0
  const listeners = new Map()
  const media = { matches: false, addEventListener: (_, fn) => { media.change = fn }, removeEventListener() {} }
  class Element {
    dataset = { scroll: 'fade-up', scrollFromY: '60' }
    style = { opacity: '', transform: '', transition: '' }
    offsetTop = 200
    offsetParent = null
    contains(node) { return node === this }
    hasAttribute() { return false }
  }
  const window = {
    scrollY: 0, innerHeight: 800,
    matchMedia: () => media,
    requestAnimationFrame(fn) { frames.set(++id, fn); return id },
    cancelAnimationFrame(key) { frames.delete(key) },
    addEventListener(name, fn) { listeners.set(name, fn) },
    removeEventListener(name) { listeners.delete(name) },
  }
  const document = { activeElement: null, documentElement: { scrollHeight: 2000 } }
  const module = compile('../composables/ui/useScrollAnimation.ts', name => name === 'vue'
    ? { onMounted: fn => { current.mount = fn }, onUpdated: fn => { current.update = fn }, onBeforeUnmount: fn => { current.unmount = fn } }
    : math.exports)
  runInNewContext(module.code, { ...module, window, document, HTMLElement: Element })
  function create() {
    current = {}
    const element = new Element()
    const events = {}
    const root = {
      querySelectorAll: () => [element],
      addEventListener: (name, fn) => { events[name] = fn },
      removeEventListener: name => { delete events[name] },
    }
    module.exports.useScrollAnimation({ value: root }, { start: 0, end: 400 })
    assert.equal(element.style.opacity, '', 'SSR setup leaves content visible')
    hooks.push(current)
    current.mount()
    return { element, events }
  }
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()) }
  const first = create()
  create()
  assert.equal(frames.size, 1, 'all sections share a pending frame')
  flush()
  assert.equal(first.element.style.opacity, '0')
  window.scrollY = 200
  listeners.get('scroll')()
  listeners.get('scroll')()
  assert.equal(frames.size, 1)
  flush()
  assert.equal(first.element.style.opacity, '0.5')
  assert.equal(first.element.style.transform, 'translate3d(0px, 30px, 0) scale(1)')
  assert.equal(frames.size, 0, 'stopping scroll stops all frames')
  window.scrollY = 0
  listeners.get('scroll')()
  flush()
  assert.equal(first.element.style.opacity, '0', 'upward scrolling reverses')
  document.activeElement = first.element
  first.events.focusin()
  flush()
  assert.equal(first.element.style.opacity, '', 'focus restores readable styles')
  media.matches = true
  media.change()
  flush()
  assert.equal(first.element.style.transform, '')
  hooks[0].unmount()
  assert.ok(listeners.has('scroll'), 'second section still subscribed')
  hooks[1].unmount()
  assert.equal(listeners.has('scroll'), false)
  assert.equal(frames.size, 0)
})
