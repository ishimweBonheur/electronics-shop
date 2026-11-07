import type { Config } from 'tailwindcss'

// Canonical palette. Legacy names below reference these values, never copies.
const palette = {
  primary: { DEFAULT: '#1677FF', hover: '#005FE8', light: '#E8F2FF' },
  secondary: { DEFAULT: '#111827', hover: '#1F2937' },
  navbar: '#08090B',
  announcement: '#050608',
  hero: '#0B0D12',
  dark: { surface: '#171A21', border: '#292D36', hover: '#222630', outline: '#41454E' },
  background: '#FFFFFF',
  surface: { DEFAULT: '#F8F9FA', hover: '#F1F3F5' },
  border: '#E5E7EB',
  text: { primary: '#111827', secondary: '#64748B', muted: '#A1A1AA', white: '#FFFFFF' },
  success: '#16A34A',
  error: { DEFAULT: '#DC2626', hover: '#B91C1C' },
  warning: '#F59E0B',
  accent: '#60A5FA',
}

export default {
  // Sections choose their colors explicitly; OS appearance never switches them.
  darkMode: 'class',
  // Nuxt supplies Vue paths; include shared TypeScript recipes explicitly.
  content: ['./utils/**/*.{ts,js}'],
  theme: {
    extend: {
      colors: {
        ...palette,
        info: palette.primary.DEFAULT,
        // Compatibility for existing sections. Prefer canonical names in new code.
        night: palette.hero,
        'night-surface': palette.dark.surface,
        'text-inverse': palette.text.white,
        'text-on-dark': palette.text.muted,
        'border-inverse': palette.dark.border,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        'page-mobile': '1rem',
        'page-tablet': '1.5rem',
        'page-desktop': '2rem',
      },
      maxWidth: { content: '80rem' },
      borderRadius: {
        card: '0.75rem',
        control: '0.5rem',
      },
      boxShadow: {
        card: '0 2px 8px rgb(15 23 42 / 0.06)',
        'card-hover': '0 8px 24px rgb(15 23 42 / 0.10)',
      },
      fontSize: {
        promo: ['clamp(2rem, 3.8vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.035em', fontWeight: '800' }],
        'section-heading': ['clamp(0.875rem, 0.8rem + 0.25vw, 1rem)', { lineHeight: '1.4', letterSpacing: '-0.025em', fontWeight: '700' }],
        'product-name': ['clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)', { lineHeight: '1.5', fontWeight: '600' }],
        price: ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],
        navigation: ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '600' }],
        'heading-1': ['clamp(2rem, 1.5rem + 2vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading-2': ['clamp(1.5rem, 1.25rem + 1vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
        'heading-3': ['clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-4': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.65' }],
        label: ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        // White on the exact brand blue meets AA for large bold text, not small text.
        button: ['1.1875rem', { lineHeight: '1.25', fontWeight: '700' }],
        'button-lg': ['1.25rem', { lineHeight: '1.25', fontWeight: '700' }],
        description: ['0.875rem', { lineHeight: '1.6' }],
      },
      transitionDuration: { DEFAULT: '150ms' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.2, 0, 0, 1)' },
    },
  },
} satisfies Partial<Config>
