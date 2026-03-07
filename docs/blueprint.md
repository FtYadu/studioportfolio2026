# **App Name**: NexusFolio

## Core Features:

- Asset Data Ingestion: Server-side utility to read and parse asset details (id, url, caption, tags, type) from `assets.csv` using Node's `fs` and `papaparse`, making this dynamic data available to client components.
- Dynamic Page Layout: Implement a modern, single-page web portfolio architecture integrating a floating navigation, hero section, infinite marquee, responsive bento grid, and interactive gallery.
- Framer Motion Animations: Utilize Framer Motion for engaging UI animations, including fanning hero cards, infinite scrolling marquee, and slide-up reveals for bento blocks upon viewport entry.
- Interactive Masonry Gallery: Display portfolio images/videos in a responsive masonry or densely packed flex layout. Implement a crucial hover effect that aggressively scales up the card and slides up an overlay showing asset caption and tags.
- AI-Enhanced Content Descriptions (Tool): Provide a generative AI tool to assist in enriching asset descriptions or generating additional relevant tags/keywords for portfolio items, aiming to enhance context and discoverability.

## Style Guidelines:

- Primary color: Sophisticated royal purple-blue (#594D7A) for key interactive elements, offering depth against the light background.
- Background color: Soft off-white (#F5F5F7) providing a clean canvas as per user's request.
- Accent color: A complementary muted blue (#6E8DC2) for secondary UI accents, analogous to the primary color.
- Prominent accent colors: Bright Orange (#FF5E00) and vibrant Lime Green (#CCFF00) for specific tags, buttons, and call-to-action elements, as requested by the user.
- Body text color: Dark gray (#4A4A4A) for excellent readability and a modern aesthetic, as specified by the user.
- All text uses 'Inter' (sans-serif) for its clean, geometric style; bold, tight-tracked headings and dark gray body text as specified. Note: currently only Google Fonts are supported.
- Utilize a consistent set of clean, modern line-art style icons from `lucide-react` for a cohesive and minimal visual language.
- A 'Light Mode Bento' design ethos characterized by distinct UI cards (stark white, extreme rounded corners), responsive CSS Grid for bento boxes, and a dynamic masonry layout for galleries.
- Leverage Framer Motion extensively for fluid and delightful micro-interactions: fanned card animation on load, smooth infinite marqee scroll, elements sliding into view (`whileInView`), and aggressive hover effects with scale-up transitions on gallery items.