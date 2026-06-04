# PM TECHNO HUBB — Deploy, Domain, Gallery & SEO

Repo: [github.com/baryongaming/PMTechnoHub](https://github.com/baryongaming/PMTechnoHub)

---

## 1. Project structure (where to edit)

| Change | File |
|--------|------|
| Workshops, services, products text | `js/data.js` |
| Phone, email, **Maps link** | `js/config.js` |
| Colors / fonts | `css/variables.css`, `design.md` |
| New page | Copy `about.html`, add to nav in all HTML + `sitemap.xml` |
| Gallery project + photos | `js/data.js` → `galleryProjects` + files in `images/gallery/` |
| Footer / logo | `js/layout.js`, `images/logo.png` |

```text
pmtechnohubb/
├── index.html … contact.html   # pages
├── css/main.css                # styles entry
├── js/config.js data.js render.js gallery.js layout.js …
├── images/logo.png gallery/*.jpg
├── robots.txt sitemap.xml
└── DEPLOYMENT.md README.md
```

---

## 2. Gallery images (no database)

Static hosting only — images live in the repo or CDN.

1. Compress photos (WebP or JPG, ~1200px wide, &lt;200 KB each).
2. Save under `images/gallery/` e.g. `robotics-1.jpg`.
3. Edit `js/data.js` → `galleryProjects`:

```javascript
{
  title: 'Robotics Workshop',
  size: 'large',  // large | wide | tall | medium | small
  cover: 'images/gallery/robotics-1.jpg',
  images: [
    'images/gallery/robotics-1.jpg',
    'images/gallery/robotics-2.jpg',
  ],
}
```

4. Commit and redeploy. No backend required.

**Optional later:** Cloudinary / Supabase Storage — change paths in `data.js` to full URLs.

---

## 3. Google Maps location

Official link (used on Contact + Home):

**https://maps.app.goo.gl/XvjBEcS1RpoRpRNu6**

Update in one place: `js/config.js` → `mapsUrl`.

For a custom embed iframe: Google Maps → your place → Share → Embed a map → paste `src` into `contact.html` / `index.html` `.map-container iframe`.

---

## 4. SEO checklist (already in project)

- Unique `<title>` + `meta description` per page
- `link rel="canonical"` (set real domain before launch)
- `robots.txt` + `sitemap.xml` (update domain in sitemap)
- JSON-LD LocalBusiness on home (`index.html`)
- Semantic HTML (`header`, `nav`, `main`, `footer`)
- `loading="lazy"` on gallery images
- Mobile viewport: `width=device-width, initial-scale=1`

**Before go-live:** Replace `https://pmtechnohub.com` in `sitemap.xml`, canonical tags, and `config.js` → `siteUrl`. Add Google Search Console + GA4 (see `skill.md`).

---

## 5. Mobile-first

- Base CSS = mobile layout; `min-width` breakpoints scale up (`768px`, `1024px`).
- Touch-friendly nav (hamburger), full-width forms, stacked grids on small screens.
- Test: Chrome DevTools → iPhone SE / Pixel; real device on Wi‑Fi.

---

## 6. Cheap hosting plan (recommended)

| Step | Service | Cost (approx.) |
|------|---------|----------------|
| Code | **GitHub** [PMTechnoHub](https://github.com/baryongaming/PMTechnoHub) | Free |
| Hosting | **Cloudflare Pages** or **Netlify** | Free tier |
| Domain `.in` | **GoDaddy India** / **Hostinger** / **Namecheap** | ₹500–900/year |
| Domain `.com` | Same registrars | ₹800–1200/year |
| Email | Gmail (existing) | Free |

### Deploy on Cloudflare Pages (free, fast in India)

1. Push code to `baryongaming/PMTechnoHub` (see below).
2. [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create project → Connect GitHub.
3. Build settings: **None** (static HTML). Build command: empty. Output directory: `/`.
4. Custom domain: add `pmtechnohub.in` or `.com` in Pages → Custom domains.
5. DNS at registrar: point nameservers to Cloudflare (or CNAME to `*.pages.dev`).

### Deploy on GitHub Pages (free)

1. Repo → Settings → Pages → Source: **main** branch, folder **/ (root)**.
2. Site URL: `https://baryongaming.github.io/PMTechnoHub/`
3. For root domain, use Cloudflare or Netlify instead (cleaner URLs).

### Deploy on Netlify (free)

Drag-drop folder or connect GitHub; publish directory = project root.

---

## 7. Domain tips (cheap)

- Prefer **`.in`** for Pune/local SEO (~₹600/yr on promos).
- Search coupons: Hostinger/GoDaddy first-year offers.
- Connect domain only after hosting is live; enable **HTTPS** (auto on Cloudflare/Netlify).

---

## 8. Git push to GitHub

```bash
cd d:\pmtechnohubb
git init
git add .
git commit -m "Full multi-page PM TECHNO HUBB site with gallery, SEO, and maps"
git branch -M main
git remote add origin https://github.com/baryongaming/PMTechnoHub.git
git pull origin main --allow-unrelated-histories
# resolve conflicts if any (keep local site files), then:
git push -u origin main
```

**Pull request (optional):** push branch `develop` instead, open PR on GitHub: Compare → `develop` → `main`.

---

## 9. Post-launch

- Submit sitemap in Google Search Console
- Link Instagram bio to live URL
- Add real `og-image.jpg` (1200×630) in `images/`
- Replace `REPLACE_WITH_YOUR_CODE` in meta verification when ready
