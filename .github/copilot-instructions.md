# GitHub Copilot Instructions - Resume 2.0

## Project Overview
This is a modern animated resume website built as a **presentation-style single-page application**. The site functions like a slide deck where users navigate between full-screen sections using scroll, keyboard, or touch gestures - similar to animejs.com.

## Architecture & Key Patterns

### Presentation System (`src/App.jsx`)
The core architecture implements a **slide-based navigation system**:
- Each section is positioned `fixed` with `translateY()` transforms for sliding transitions
- State managed via `currentSlide` index and `sectionsRef` array
- `navigateToSlide()` handles GSAP-powered transitions between sections
- Multiple input methods: wheel events, touch gestures, keyboard shortcuts (arrows, space, home/end)

```jsx
const sections = [
  { id: 'hero', component: Hero, title: 'Home' },
  { id: 'about', component: About, title: 'About' },
  // ... other sections
]
```

### GSAP Animation Patterns
**Consistent animation setup across all components:**
- Use `useLayoutEffect` (not `useEffect`) for GSAP animations
- Wrap animations in `gsap.context()` for proper cleanup
- Register plugins at component level: `gsap.registerPlugin(ScrollTrigger)`
- Return `ctx.revert()` in cleanup function

```jsx
useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    // Animation code here
  }, sectionRef)
  return () => ctx.revert()
}, [])
```

### Component Structure
- **Full-screen sections**: Each component fills viewport with `h-full` and centering
- **Container pattern**: `container-custom` + `px-6 py-20` for consistent spacing
- **Ref pattern**: `sectionRef` for GSAP targeting, additional refs for specific elements

### Custom CSS Classes (src/index.css)
- `.gradient-text`: Blue-to-purple gradient text effect
- `.glass-effect`: Glassmorphism with backdrop blur
- `.container-custom`: Max-width wrapper with auto margins
- Global `overflow: hidden` prevents default scrolling

## Development Commands

```bash
npm run dev     # Start development server (Vite)
npm run build   # Production build
npm run preview # Preview production build
```

## Key Dependencies & Configuration

### GSAP Setup
- **ScrollTrigger**: Used for scroll-based animations within sections
- **Multiple registration**: Each component registers plugins independently
- **Animation context**: Always use `gsap.context()` for React compatibility

### Styling Stack
- **Tailwind CSS**: Utility-first styling with custom extensions
- **Custom animations**: `spin-slow`, `float`, `glow` defined in `tailwind.config.js`
- **Inter font**: Loaded via Google Fonts in `index.html`

### File Structure
- `src/components/`: Individual section components (Hero, About, Skills, etc.)
- `src/components/SlideNavigation.jsx`: Dot navigation and controls
- `src/components/HelpOverlay.jsx`: Keyboard shortcuts help
- `public/assets/`: Static images (profile.png, grid-pattern.svg)

## Critical Implementation Details

### Section Layout Requirements
Each section component must:
- Use `h-full` for full viewport height
- Implement `overflow-y-auto` for content that exceeds viewport
- Center content with flexbox: `flex items-center justify-center`
- Wrap content in `container-custom` with proper padding

### Animation Performance
- Use `transform` properties (not position changes) for smooth animations
- Implement proper z-index management during transitions
- Set initial states with `gsap.set()` before animating

### Mobile Considerations
- Touch events handled in main App component
- Responsive spacing with `px-6 py-20` pattern
- Grid layouts with responsive breakpoints (`md:`, `lg:`)

When adding new sections or animations, follow the established patterns in existing components for consistency and performance.
