# Design System: PM TECHNO HUBB

## 1. Aesthetic & Theme
*   **Style:** Liquid Glass & Glassmorphism.
*   **Theme:** Light-on-light-blue / Tech-Airy.
*   **Vibe:** Premium, modern, engineering-focused, and highly legible.

## 2. Color Palette (Hex/RGB)
*   **Background Base:** 
    *   Primary Background: `#F0F6FF` (Pale blue-white)
    *   Secondary Background: `#E6F0FE`
    *   Card Backgrounds: `#D8E9FD`
*   **Primary Accents:**
    *   Electric Blue (Primary): `#0070F3`
    *   Deep Blue: `#0055C4`
    *   Bright Cyan (Secondary): `#00C6FF`
    *   Mid Cyan: `#00A8DB`
*   **Text Hierarchy:**
    *   Primary Text: `#0D1B3E` (Dark Navy)
    *   Dimmed Text: `#4A6080`
    *   Muted/Placeholders: `#7A93B8`
*   **Premium Accent (Strictly for Certifications/Partnerships):**
    *   Gold: `#D4A017`
    *   Gold Light: `#F0C040`

## 3. Glassmorphism Tokens
*   **Glass Base:** `rgba(255, 255, 255, 0.60)`
*   **Backdrop Filter:** `blur(20px) saturate(160%)`
*   **Glass Border:** `1px solid rgba(0, 112, 243, 0.12)`
*   **Glass Hover State:** `rgba(255, 255, 255, 0.85)` with box-shadow `0 24px 60px rgba(0, 112, 243, 0.13)`

## 4. Typography
*   **Display / Logos:** `'Orbitron', sans-serif;` (Weights: 400, 600, 700, 900)
*   **Section Headings:** `'Syne', sans-serif;` (Weights: 400, 600, 700, 800)
*   **Body Copy:** `'Exo 2', sans-serif;` (Weights: 300, 400, 500, 600)

## 5. UI Animations & Effects
*   **Scroll Reveal:** Elements fade in and translate up (`translateY(36px)` to `0`) using `cubic-bezier(.22,1,.36,1)`.
*   **Card Lifts:** On hover, cards lift `translateY(-8px)` and borders transition to cyan `rgba(0,198,255,0.30)`.
*   **Watermark:** A transparent PCB trace image (5% opacity) applied to the Hero section background.
*   **Ambient Orbs:** Slow-moving, heavily blurred (`blur(130px)`) circular divs floating in the fixed background.