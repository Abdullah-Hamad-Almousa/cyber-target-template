# Cybersecurity Website — Setup Requirements

## Overview
Single-page website (one `index.html` file). No build tools, no npm, no bundlers.

---

## 1. External Dependencies (CDN only)

| Resource | URL | Purpose |
|----------|-----|---------|
| **Inter font** (weights: 300, 400, 500, 600, 700) | `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap` | Primary font for English |
| **Cairo font** (weights: 400, 500, 600, 700) | `https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap` | Arabic font override |
| **Lucide Icons** | `https://unpkg.com/lucide@latest` | All icons (shield, activity, terminal, cloud, eye, clipboard, users, etc.) |

> Note: All dependencies are loaded via `<link>` and `<script>` tags inside the single HTML file. No package managers needed.

---

## 2. File Structure

```
project-folder/
├── index.html          (single file containing HTML + CSS + TypeScript)
└── images/
    ├── random.png      (temporary image you mentioned)
    ├── hero-soc.jpg    (to be added by you)
    ├── services.jpg    (to be added by you)
    ├── why-us.jpg      (to be added by you)
    └── cta-bg.jpg      (to be added by you)
```

---

## 3. Required Assets (Images to Source)

### `images/hero-soc.jpg`
- **Dimensions:** 1200 x 600 px (16:9)
- **Description:** Cinematic wide shot of a modern Security Operations Center (SOC). Rows of analysts at monitors with live threat dashboards glowing in blue/teal hues. Dim room, dramatic lighting. Real photograph, high contrast, dark tone.
- **Container ID:** `#hero-image`

### `images/services.jpg`
- **Dimensions:** 1400 x 500 px (ultra-wide banner)
- **Description:** Split composite image. Left half = hacker silhouette in dark hoodie at keyboard (threat). Right half = cybersecurity analyst calmly reviewing dashboards (defense). Divided by sharp glowing vertical line in accent color (#00C8FF). Editorial photo-illustration, dark palette.
- **Container ID:** `#services-image`

### `images/why-us.jpg`
- **Dimensions:** 800 x 500 px (landscape)
- **Description:** Close-up of cybersecurity professional's hands on laptop in dark office. Screen glow illuminating focused expression. Multiple monitor setup in background with live dashboards. Cinematic, shallow depth of field, dark moody tones.
- **Container ID:** `#whyus-image`

### `images/cta-bg.jpg`
- **Dimensions:** 1920 x 600 px (background / cover)
- **Description:** Aerial/abstract overhead view of a city at night with glowing fiber-optic-like light trails representing digital connectivity and data flow. Very dark, only light trails and nodes visible. Long-exposure aerial photography or high-quality CGI render.
- **Usage:** CSS `background-image` with overlay gradient for text readability.
- **Container ID:** `#cta-section`

---

## 4. Browser Requirements

- **Modern evergreen browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Required features:** CSS Grid, CSS Flexbox, CSS Custom Properties, `aspect-ratio`, `backdrop-filter`, IntersectionObserver API, `localStorage`, ES6+
- **No IE11 support** (uses modern CSS/JS features)

---

## 5. Functionality Checklist

| Feature | Implementation |
|---------|---------------|
| **Theme Toggle** | 3-way cycle: Light / Dark / Company Mode. Persists in `localStorage` (key: `theme`). |
| **Language Toggle** | EN <-> AR. Switches `dir="rtl"` on `<html>`, flips flex directions, mirrors paddings. Persists in `localStorage` (key: `language`). |
| **Smart Nav** | Hides on scroll-down, reappears on scroll-up. Fixed position with backdrop blur. |
| **Scroll Animations** | IntersectionObserver triggers fade-up + slight scale + staggered children on all sections. |
| **Parallax** | Lite parallax on hero background grid layer. |
| **Counter Animation** | `requestAnimationFrame` count-up for stats (300+, 100+, 10+) triggered on scroll. |
| **Smooth Scroll** | `scroll-behavior: smooth` on html + anchor links. |
| **Responsive** | Mobile-first breakpoints at 768px (tablet) and 1024px (desktop). |
| **Accessibility** | ARIA labels, proper heading hierarchy, alt text on images. |

---

## 6. Key CSS Custom Properties (Variables)

The theme system works by toggling CSS variables on `:root`:

```css
/* Company Mode (default) */
--bg-primary: #020C14;
--bg-secondary: #0a1628;
--text-primary: #f0f4f8;
--text-secondary: #a0aec0;
--accent: #00C8FF;
--accent-secondary: #005F99;
--card-bg: rgba(255,255,255,0.03);
--card-border: rgba(255,255,255,0.08);
```

Switching theme only changes these variables. No duplicated CSS classes.

---

## 7. Notes for Customization

1. **Company Name:** Replace all instances of `[Company Name]` in footer and nav.
2. **Contact Info:** Update email, phone, and address in footer.
3. **Social Links:** Replace `#` with actual LinkedIn / Twitter / GitHub URLs.
4. **Stats Numbers:** Adjust `300+`, `100+`, `10+` to real figures if needed.
5. **Colors:** Company accent is `#00C8FF`. Change this in the CSS variables if you have a different brand color.

---

## 8. How to Run

Simply open `index.html` in any modern browser. No server required.

For local testing with `localStorage` working properly (some browsers restrict file://), use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`.
