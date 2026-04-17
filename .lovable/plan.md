
# GadgetHive — Premium Audio Storefront

A Sonos-inspired multi-page site for **GadgetHive**, built on TanStack Start + shadcn/ui, with a real product catalog, cart, and checkout.

## Pages (separate routes, each with its own SEO metadata)
- **/** — Landing page (full design from mockup)
- **/products** — Full catalog with filters
- **/products/$slug** — Product detail + add to cart
- **/technology** — Innovation/features story
- **/learn** — Articles/guides
- **/support** — FAQs + contact
- **/about** — Brand story
- **/cart** — Cart review
- **/checkout/success** — Post-purchase confirmation

## Landing page sections (matching the mockup)
1. **Sticky top nav** — GadgetHive logo, links (Products, Technology, Learn, Support, About Us), search, account, cart
2. **Hero** — Dark image of model wearing headphones, oversized "Listen Without Limits" headline overlapping the photo, intro copy + "Explore Products" CTA, floating product card preview
3. **Brand intro** — Centered editorial copy with floating headphone image overlaying the text ("From pioneering wireless audio to designing state-of-the-art speakers, *GadgetHive* commits to innovation that moves and inspires.")
4. **Featured products row** — "Designed for seamless sound and advanced technology" heading + horizontal product carousel (4 cards: New badge, Best Seller badge, price, name, type), small profile avatar, "Explore All Products" pill button
5. **Vibe / Groove / Harmony / Amplify / Move marquee** — Stacked words in muted tones with a single colored "Harmony" highlighted in red, small portrait card overlapping
6. **Dark feature panel** — "Unmatched quality, smart features, and innovative technologies" with a soundbar lifestyle image, small inset product, feature description
7. **Special Offers** — Two-up grid: lifestyle product photo card + dark "Black Friday Flash Sale – 50% Off Sitewide!" promo card with CTA
8. **CTA band** — Dark rounded panel "Transform your listening experience with GadgetHive" + Shop Now
9. **Footer** — Links, contact info, newsletter email signup, "Ready to Experience the Future of Sound?" headline with portrait of a man wearing headphones, social icons

## Mini-store functionality (Lovable Cloud + Stripe)
- **Database**: `products`, `categories`, `orders`, `order_items`, `cart_items` tables with RLS
- **Cart**: Persistent per-user (logged-in) and via localStorage (guest), merged on sign-in
- **Auth**: Email/password sign-in + sign-up (no profile fields beyond email; we can add later)
- **Newsletter**: `newsletter_subscribers` table with email validation + success toast
- **Checkout**: Stripe Payments (Lovable's built-in — no account setup needed for test mode), redirects to `/checkout/success`
- **Admin seed**: ~8 products across Headphones, Speakers, Soundbars, Accessories with prices, descriptions, "New"/"Best Seller" flags

## Visual design
- **Palette**: Off-white background (#F5F2EC warm cream from mockup), deep near-black panels (#0E0E10), accent red (#E63B2E) for highlights and badges, muted grays for secondary text
- **Typography**: Large editorial serif-adjacent display headings (Instrument Serif or similar via Google Fonts) + clean sans-serif (Inter) for body
- **Components**: shadcn Button, Card, Carousel, Sheet (cart drawer), Dialog, Badge, Input, Form, Sonner (toasts)
- **Responsive**: Mobile-first, collapsible nav, single-column stacked sections on small screens
- **Motion**: Subtle fade/slide-in on scroll, marquee animation for the Vibe/Harmony band

## AI-generated imagery (matching mockup style)
- Hero: woman wearing white over-ear headphones, warm cinematic lighting
- Floating product shots: black headphones, soundbar, portable speaker, charging set, mid-size speaker
- Lifestyle: speakers in desert/beach setting, soundbar in modern living room
- Portraits: small avatar of producer, larger portrait of man with headphones for footer
- All consistent moody/warm photography style

## SEO & polish per route
- Unique `<title>`, description, `og:title`, `og:description`, and `og:image` (using each route's hero/product image) on every page
- Sitemap.xml route, robots-friendly
- Scroll restoration, intent-based link preloading
