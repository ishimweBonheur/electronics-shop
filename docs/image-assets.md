# Product cutouts

The hero and catalog reuse the existing transparent headphones and earbuds assets.
The action camera cutout is saved at
`public/images/products/action-camera-cutout.png`, with verified alpha transparency.
The original camera image remains unchanged.

Tool: built-in image_gen, edit mode, transparent_background true.
Edit target: `public/images/products/action-camera.webp`.

Final prompt:

> Edit target: the provided black action camera product photo. Remove only the white background and the ground shadow, yielding a genuinely transparent alpha background. Preserve the exact camera shape, lens, materials, lighting, viewing angle, and product details. Keep the entire camera centered with modest transparent margins. No additional objects, text, circles, panels, backdrop, or scenery. This is a background-removal product cutout for an electronics storefront. Save the result as a transparent image.
