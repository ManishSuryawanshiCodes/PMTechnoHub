# Technical Stack & Skills

## 1. Frontend Architecture
*   **Framework:** React.js (Target architecture). Note: Initial scaffolding may be built in HTML5/CSS3 before componentization.
*   **Styling:** Tailwind CSS (preferred for rapid glassmorphism and grid implementation) OR Custom CSS using CSS Variables (as defined in `design.md`).
*   **Routing:** React Router (for the multi-page structure: `/`, `/about`, `/services`, `/workshops`, `/products`, `/partnerships`, `/contact`).

## 2. UI/UX Implementation
*   **CSS Grid & Flexbox:** Advanced layout structuring for perfectly aligned service cards and masonry galleries.
*   **CSS Animations:** `@keyframes` for floating orbs, hover states, and smooth modal transitions.
*   **Responsive Design:** Mobile-first approach ensuring fluid typography (`clamp()`) and collapsing grids for tablet/mobile views.

## 3. SEO & Analytics Integration
*   **Semantic HTML5:** Strict adherence to `<header>`, `<nav>`, `<section>`, `<article>`, and `<footer>` tags.
*   **Local SEO (JSON-LD):** Schema markup configured for a "LocalBusiness" located in Karvenagar, Pune.
*   **Metadata:** Open Graph (`og:`) and Twitter card tags for social sharing.
*   **Analytics:** Placeholder `<script>` tags for Google Analytics 4 (GA4) and Google Search Console verification.

## 4. Future Backend Preparedness
*   **State Management:** Structuring data (Workshops, Products) into arrays/state to allow easy swapping for API calls later.
*   **Database Awareness:** Preparing the `Products` component to eventually map data fetched from MongoDB.
*   **Auth Readiness:** Commented-out wrappers indicating where Supabase authentication logic will be injected.