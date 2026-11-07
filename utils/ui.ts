// Complete, static class names keep these recipes discoverable by Tailwind.
const control = 'block w-full min-h-11 rounded-control border px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error'
const field = `${control} border-border bg-background text-text-primary placeholder:text-text-secondary focus:border-primary disabled:bg-surface`
const darkField = `${control} border-dark-border text-text-white placeholder:text-text-muted focus:border-primary [color-scheme:dark]`

export const ui = {
  pageContainer: 'mx-auto w-full max-w-content px-page-mobile sm:px-page-tablet lg:px-page-desktop',
  section: 'py-8 sm:py-12 lg:py-16',
  sectionHeading: 'mb-6 space-y-2 sm:mb-8',
  sectionTitle: 'text-heading-2 text-text-primary',
  description: 'text-description text-text-secondary',
  label: 'mb-1.5 block text-label text-text-primary',
  productCard: 'overflow-hidden rounded-card border border-border bg-background text-text-primary shadow-card motion-safe:transition-shadow hover:shadow-card-hover focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
  input: field,
  darkInput: `${darkField} bg-dark-surface`,
  darkSearchInput: `${darkField} bg-navbar pl-10`,
  searchWrapper: 'relative',
  searchInput: `${field} pl-11`,
  searchIcon: 'pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-secondary',
  fieldError: 'mt-1.5 text-description text-error',
  badge: 'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-4',
  badgeTone: {
    neutral: 'border-border bg-surface text-text-secondary',
    primary: 'border-primary/20 bg-primary-light text-primary-hover',
    info: 'border-info/20 bg-primary-light text-primary-hover',
    success: 'border-success/20 bg-success/10 text-text-primary',
    error: 'border-error/20 bg-error/10 text-error-hover',
    warning: 'border-warning/30 bg-warning/15 text-text-primary',
  },
  divider: 'border-border',
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
} as const
