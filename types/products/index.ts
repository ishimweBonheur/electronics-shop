/** Temporary presentation data. These records cannot be purchased. */
export interface DemoProduct {
  slug: string
  name: string
  image: string
  price: number
  currency: 'USD'
  isDemo: true
  rating?: number
}
