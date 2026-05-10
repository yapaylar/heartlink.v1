import './style.css'

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllDropdowns()
})
