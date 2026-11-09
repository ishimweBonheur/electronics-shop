import type { DemoProduct } from '~/types/catalog'

// Clearly labeled mock-store presentation data; no inventory or sales claims.
export const demoProducts: readonly DemoProduct[] = [
  { slug: 'pro-wireless-earbuds', name: 'Pro Wireless Earbuds', image: '/images/voltix-earbuds-cutout.webp', price: 129.99, currency: 'USD', isDemo: true },
  { slug: 'smartwatch-pro-2', name: 'Smartwatch Pro 2', image: '/images/collections/wearables.webp', price: 249.99, currency: 'USD', isDemo: true },
  { slug: 'noise-cancelling-headphones', name: 'Noise Cancelling Headphones', image: '/images/voltix-headphones-cutout.webp', price: 199.99, currency: 'USD', isDemo: true },
  { slug: 'magnetic-wireless-charger', name: 'Magnetic Wireless Charger', image: '/images/products/charger.webp', price: 59.99, currency: 'USD', isDemo: true },
  { slug: '4k-action-camera', name: '4K Action Camera', image: '/images/products/action-camera-cutout.png', price: 299.99, currency: 'USD', isDemo: true },
]
