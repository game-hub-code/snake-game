# Snake Game — Technical README

Single-page HTML5 canvas Snake game. No build step, no dependencies — `index.html` loads one bundled `app.js`.

## Repo contents

| File | What it is |
|---|---|
| `index.html` | Entire markup + inline `<style>` for the game: header bar (difficulty select, Mode/Score/Best stat pills, Pause/Restart buttons) and the `<canvas>` the game renders to. Loads `app.js` at the bottom. |
| `app.js` | The entire game — minified/obfuscated (short class names `t`, `e`, `l`; short var names throughout). This is the only file actually executed. |
| `app.js.map` | Source map for `app.js`. Load it in DevTools to get back readable original source (real variable/function names) for debugging. |
| `background.js.map` | **Orphaned source map — no matching `background.js` exists in this repo.** Its `sources` list references `webpack://snake/./js/{ads.js, analytics.js, constants.js, storage.js, background.js}`, and its `sourcesContent` reveals the original file fetched ad-serving endpoints (`fetchAdEndpoint`, `fetchAdUrls`, `fetchAndUpdateUninstallUrl`) built via **Webpack**. This strongly suggests the shipped build is a **browser-extension package** (background scripts + ad/analytics/uninstall-tracking modules), and this repo only contains the *leftover map* from that build — the actual `background.js` (and the ads/analytics/storage/constants modules it references) were not committed here. Flagging for your awareness: nothing in `index.html` loads this, so it has zero runtime effect on the game as shipped, but it indicates the original codebase this was extracted/copied from included ad and uninstall-tracking logic not visible in what's here. |
| `images/head.png` | Snake head sprite, "alive" state (`greenFace` in code). |
| `images/redHead.png` | Snake head sprite, "dead" state (`redFace` in code). |

## `app.js` structure (de-minified reading, via `app.js.map`)

Even minified, the structure is legible:

- **Class `t`** — a simple `{xx, yy}` grid-cell point with a `collides()` equality check. Used for both snake segments and obstacles.
- **Class `e`** — the Snake itself:
  - Holds `body` (array of `t` points), current `dir` / queued `newDir`.
  - Loads two `Image` sprites (`head.png`, `redHead.png`) and switches `this.face` between them on death.
  - `_moveTimer` / `_framesPerMove` implement a **discrete per-cell tick system decoupled from render rate**: the game renders every animation frame, but the snake only advances one grid cell every N frames (N derived from `FRAME_RATE / speed`), which is what makes speed changes (difficulty, food-eating ramp) smooth instead of jumpy.
  - `_prevBody` is kept so `draw()` can **linearly interpolate** each segment's screen position between its last grid cell and its next one (`alpha = moveTimer / framesPerMove`), giving smooth motion despite the discrete tick — including wraparound-safe interpolation across the toroidal board edges (`% tileCount` arithmetic in `renderPos`).
  - Movement/turn logic rejects reversing directly into the snake's own second segment, both at input time and again at tick-commit time (since a queued turn can sit for multiple frames before a tick actually fires).
  - Collision: self-collision checks against `body` (or `body.slice(0,-1)` if the move would also grow the snake, since the tail cell will vacate) and against the `obstacles` array.
- **Class `l`** (the food/pellet class, referenced as `g = new l(...)`) — has `generateNew()` (re-roll position, re-rolling again if it lands on an obstacle), and a spawn/despawn shrink animation via `this.p` (padding) that eases in the food after respawn.
- **Persistence helpers** (unnamed local functions around line 136–156) — thin wrappers around `localStorage.getItem`/`setItem` with JSON parse/stringify, used to store a `"_hscore_" + difficultyName` best-score key per difficulty level.
- **`DIFFICULTIES` config object** — `easy` / `medium` / `hard`, each defining `baseSpeed`, a `rampDivisor` (used elsewhere to increase speed as score climbs — divide score by this to get the speed bump), and a fixed `obstacles` array (grid coordinates of static wall tiles), scaling from 2 obstacles (easy) to 8 (hard).
- **`resizeCanvas()`** — computes the largest square canvas that fits the viewport (minus header height) while staying a clean multiple of `tileCount` (15), with a floor of `tileCount * 10`, and keeps it responsive on window resize (debounced via `resizeTimer`).
- **`initGame(diffName)`** — resets game state for a given difficulty: loads that difficulty's obstacle set and speed, creates a new food (`l`) and new snake (`e`) instance, restores that difficulty's persisted high score, and syncs the header UI.
- **`updateHeader()`** / **`updatePauseButton()`** — pure DOM sync functions, no game-state mutation.
- **`k()`** — the per-frame render/update tick: clears canvas, draws obstacles, calls `snake.update()` + `snake.draw()` unless `paused` (in which case it draws a "PAUSED - press space" overlay and returns early, skipping `updateHeader()` for that frame).
- **Boot (`window.onload`)** — wires up `#difficulty-select` (calls `initGame` on change), `#pause-btn` / `#restart-btn` click handlers, a debounced `resize` listener, and global `keydown`/`keyup` listeners that populate a `window.keys` map (lowercased key names) — movement reads WASD *and* arrow keys via this map, and Space is wired to toggle `paused` (matching the in-canvas "press space" prompt).
- Frame loop runs via `setInterval(k, 1000/90)` (`FRAME_RATE = 90` — this is the render/tick-check rate; actual snake movement speed is throttled separately via `_framesPerMove`, not by changing this interval).

## Notable implementation details worth knowing before modifying

- **`SPEED_MULTIPLIER`** at the top of the file is a single global dev/debug knob — set to `0.5` or `2` to slow-mo/fast-forward everything for testing, without touching per-difficulty tuning.
- The board wraps (toroidal), not walled — hitting the edge teleports to the opposite side; only the fixed `obstacles` tiles and self-collision end the game.
- High scores are **per-difficulty**, not global — switching difficulty swaps which `_hscore_*` key is read/displayed.
- The interpolation system means you cannot naively change `_framesPerMove` mid-tick without also resetting `_prevBody`, or you'll get a visible position snap.

## Suggested next step if actively developing this

Since `app.js` is minified without the original multi-file source present (only its *map* exists via `app.js.map`, and the referenced webpack sources for `background.js` aren't in this repo at all), consider either:
- Using `app.js.map` in browser DevTools purely for readable debugging, or
- Asking whoever built this for the pre-minification source tree if you intend to make substantial changes — hand-editing minified code is workable for small tweaks (as done in earlier fixes in this conversation) but gets error-prone for larger changes.