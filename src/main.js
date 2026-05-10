import './style.css'
import { inject } from '@vercel/analytics'

inject()

const ACCESS_CODE = 'gact'
const ACCESS_KEY = 'hl_site_auth'

function applyUnlock() {
  document.documentElement.classList.add('gate-unlocked')
  try {
    sessionStorage.setItem(ACCESS_KEY, '1')
  } catch (_) {}
}

try {
  if (sessionStorage.getItem(ACCESS_KEY) === '1') {
    document.documentElement.classList.add('gate-unlocked')
  }
} catch (_) {}

const gateForm = document.getElementById('gate-form')
const gateInput = document.getElementById('gate-input')
const gateError = document.getElementById('gate-error')

gateForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const val = gateInput?.value.trim() ?? ''
  if (val === ACCESS_CODE) {
    if (gateError) gateError.hidden = true
    applyUnlock()
  } else {
    if (gateError) gateError.hidden = false
    gateInput?.select()
  }
})

if (!document.documentElement.classList.contains('gate-unlocked')) {
  queueMicrotask(() => gateInput?.focus())
}

const dropdowns = document.querySelectorAll('.nav-item--dropdown')

function closeAllDropdowns() {
  dropdowns.forEach((wrap) => {
    wrap.classList.remove('is-open')
    const btn = wrap.querySelector('.nav-trigger')
    if (btn) btn.setAttribute('aria-expanded', 'false')
  })
}

dropdowns.forEach((wrap) => {
  const btn = wrap.querySelector('.nav-trigger')
  const menu = wrap.querySelector('.submenu')
  if (!btn || !menu) return

  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    const willOpen = !wrap.classList.contains('is-open')
    closeAllDropdowns()
    if (willOpen) {
      wrap.classList.add('is-open')
      btn.setAttribute('aria-expanded', 'true')
    }
  })

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeAllDropdowns())
  })

  wrap.addEventListener('click', (e) => e.stopPropagation())
})

document.addEventListener('click', () => closeAllDropdowns())

const overlay = document.getElementById('mobile-nav-overlay')
const burger = document.querySelector('.nav-burger')
const backdrop = document.querySelector('.mobile-nav-overlay__backdrop')
const closeBtn = document.querySelector('.mobile-nav-overlay__close')

function openMobileNav() {
  if (!overlay || !burger) return
  overlay.hidden = false
  burger.setAttribute('aria-expanded', 'true')
  document.body.style.overflow = 'hidden'
  queueMicrotask(() => closeBtn?.focus({ preventScroll: true }))
}

function closeMobileNav() {
  if (!overlay || !burger) return
  overlay.hidden = true
  burger.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
  burger.focus({ preventScroll: true })
}

burger?.addEventListener('click', () => {
  if (overlay?.hidden) openMobileNav()
  else closeMobileNav()
})

backdrop?.addEventListener('click', () => closeMobileNav())

closeBtn?.addEventListener('click', () => closeMobileNav())

overlay
  ?.querySelectorAll('.mobile-nav-overlay__nav a')
  .forEach((link) => link.addEventListener('click', () => closeMobileNav()))

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  if (overlay && !overlay.hidden) {
    closeMobileNav()
    return
  }
  closeAllDropdowns()
})
