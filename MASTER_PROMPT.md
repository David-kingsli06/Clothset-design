# Master Prompt Specification: Nordic Atelier 3D Curved Rail E-Commerce App

Use this prompt to recreate the exact luxury interactive clothing rail application in a single generation without any visual references.

---

```markdown
Create a complete, single-screen interactive luxury e-commerce web application using Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. 

Follow these exact design principles, layout architecture, interaction physics, and component specifications:

---

### 1. Theme & Visual Aesthetic ("Nordic Atelier / Organic Warmth")
- **Color Palette**: Warm organic tones.
  - Page Background: `#F5F2EB` with a subtle micro-dot grid/grain texture
  - Text: `#22201D`
  - Cards & Drawer Panels: `#FAF7F0` with `#DCD3C5` borders
  - Accents: Brushed bronze/caramel `#C5A67C`
- **Typography**: High-fashion editorial look.
  - Serif: `Cormorant Garamond` (italic headings, currency numbers, luxury brand titles)
  - Sans: `Plus Jakarta Sans` or `Inter` (metadata, tags, button labels)
- **Atmosphere**: Large watermark text `"ATELIER"` stamped faintly in the background (`opacity-[0.035]`, massive `32vw`, non-selectable).

---

### 2. Viewport & Layout Constraints
- **Zero Vertical Page Scroll**: The app must fit strictly in `w-screen h-screen max-h-screen overflow-hidden` across desktop, tablet, and mobile (`flex flex-col justify-between select-none`).

---

### 3. Layout Structure
- **Header (Top)**:
  - Brand seal monogram (`É`) + editorial title `"L’Atelier Édition"` with sub-city stamps `"Paris • Copenhagen • Tokyo"`.
  - Center collection toggle pill (`"A/W 2027 COLLECTION"` vs `"CURATED ARCHIVE"`).
  - Right: Search icon button and Wardrobe cart bag button with an active counter badge.
- **Hero Rail Stage (Middle)**:
  - The central interactive hanging rail showcasing clothes hanging on realistic birchwood hangers with debossed leather price tags.
  - Left & Right circular navigation chevron buttons.
  - Subtle helper guidance underneath: *"Tap a piece to rotate • Tap again to inspect"*.
- **Editorial Dock (Bottom)**:
  - Left: Item index tag (e.g., `06 / 15 • TAILORED SUITING`), active garment name, and price in Garamond serif.
  - Center: Interactive colorway swatch circles with name previews.
  - Right: Quick CTA button `"Inspect Piece ↗"`.

---

### 4. 3D Curved Hanging Rail Mechanics & Physics
Build a custom 3D rotating curved rail carousel component:
1. **Rail Track**:
   - SVG arch rendered across the top (`d="M 40 42 Q 600 132 1160 42"`) textured with a brushed brass/champagne linear gradient and top specular highlight.
2. **Multi-Input Sliding**:
   - Support horizontal mouse dragging, mobile touch gestures, desktop trackpad/mouse wheel, and arrow buttons.
   - Use spring physics (`damping: 28, stiffness: 220, mass: 0.85`) with velocity-based inertia.
3. **Curved Parabolic Projection**:
   - Garment X offset: `(index - current) * spacing` (spacing responsive: 140px mobile, 175px tablet, 210px desktop, 235px wide screen).
   - Parabolic Y sag: `baseDrop - (index - current)^2 * factor`, so center garments hang lowest while sides sweep upward along the rail.
   - Scale: Center garment scales to `1.05x`, smoothly shrinking to `0.65x` as it moves outward.
   - 3D Perspective Y-Rotation: Clothes turn slightly inward toward the center based on distance (`-clampDiff * 14deg`).
   - Pendulum Inertia (`rotateZ` Sway): Garments dynamically sway slightly left/right like real hangers when dragged or slid (`Math.sin(diff * 1.5) * -7deg`).
   - Opacity & Depth: Garments fade out as they reach the outer edges (`|diff| > 2.8` becomes hidden). Center garment gets higher z-index (clamped between 5 and 40).
4. **Hanger & Price Tag Detail**:
   - Realistic birchwood hanger SVG with brushed brass hook and metal rivets.
   - Suspended stitched leather luggage-style price tag tied with cotton twine hanging from the hanger hook showing the item's price (e.g. `$420`).
5. **Two-Step Garment Interaction**:
   - **1st Click/Tap on active piece**: Flips 90° into a 3D side profile view, revealing a floating mini pill `"Inspect Piece ↗"`.
   - **2nd Click/Tap (or clicking the pill)**: Opens the full Product Detail modal.
   - **Auto-Reset**: Changing to next/previous product automatically resets all turned garments back to default front-facing orientation.

---

### 5. Garment Visual System
Provide clean, stylish vector/SVG silhouettes of garments:
- Support front view, back view, and thin hanger-hung side profile view.
- Include various garment styles: tailored blazers with collar lapels, oversized graphic tees with pocket details, heavy wool coats with horn buttons, and knit sweaters.
- Dynamic color swapping: when a colorway swatch is selected, the garment's main SVG fabric fills update seamlessly.

---

### 6. Overlays & Modals (Z-Index Isolated at z-50)
- **Product Detail Modal**:
  - Centered luxury card with blurred backdrop (`bg-[#1E1B18]/60 backdrop-blur-md`).
  - Front/Back toggle preview.
  - Colorway selector swatches with named labels.
  - Size picker pills (`S`, `M`, `L`, `XL`) with a Size Guide trigger.
  - Detailed editorial copy: garment composition (e.g., *100% Virgin Wool Melton*), origin, fit notes, and atelier care instructions.
  - `"Add to Wardrobe"` button with tactile click feedback.
- **Slide-over Wardrobe Cart Drawer**:
  - Smooth slide-in from the right with an opaque `#FAF7F0` surface so rail items behind it are completely hidden.
  - Quantity adjusters (`+` / `-`), item removal, and custom promo code input (`"ATELIER"` for 20% off).
  - Subtotal & total summary calculation, and a Checkout button that fires celebratory confetti (`canvas-confetti`).
- **Stacking Context Protection**:
  - Hide floating rail buttons when any modal/drawer is open (`isOverlayOpen`).
  - Hero rail stays strictly below overlays (`z-0` vs `z-50`).
```
