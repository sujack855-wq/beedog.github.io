# BeeDog visual system

All 16 static pages load `css/site-system.css` last. It owns the shared graphite/blue-black surfaces, honey-yellow accent, typography, panel edges, etched texture, controls, navigation and footer. The immersive homepage, console dialogs, project pages, articles, books, map, game and guestbook all consume the same tokens.

Legacy page styles retain layout and functional states. `site-system.css` normalizes their visual components. Game entities, meaningful status colors and user content are retained.

## Shared structure

Run `python3 scripts/sync-site-shell.py` after changing the navigation or footer template. The generator is idempotent, preserves page content and active route markers, and appends the shared theme and script once per page. Update its version constant when these assets change.

`js/site-shell.js` owns shared navigation and interior-page motion preferences. `js/world.js` owns the existing homepage motion control and dialogs, avoiding duplicate handlers.

## Verification

- 16 pages: one shared header, footer and theme reference; valid unique IDs and navigation targets.
- Local asset/link checks and five inline-script syntax checks passed.
- Shared navigation behavior: menu toggle, Escape focus restoration, outside click and destination click closing passed in DOM simulation.
- Motion preference persistence and blocked-storage fallback passed; homepage control ownership remains with world.js.
- Existing four-zone exploration flow passed in DOM simulation.
- No browser rendering test was performed for this change.
