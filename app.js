(() => {
  "use strict";
  const SPEED_MULTIPLIER = 1; // test: 0.5 = half speed, 2 = double speed, etc.
  class t {
    constructor(t, e, s) {
      this.x = t, this.y = e, this.dir = s
    }
    collides(t) {
      return this.xx == t.xx && this.yy == t.yy
    }
    get xx() {
      return Math.round(this.x / scl)
    }
    get yy() {
      return Math.round(this.y / scl)
    }
  }
  class e {
    constructor(e, s, i, r) {
      this.x = e, this.y = s, this.color = r, this.body = [], this.dir = {
          x: 0,
          y: 0
        }, this.newDir = {
          x: 0,
          y: 0
        }, this.greenFace = new Image, this.greenFace.src = "images/head.png", this.redFace =
        new Image, this.redFace.src = "images/redHead.png", this.face = this.greenFace;
      this._lastCellX = null, this._lastCellY = null; // FEATURE: reliable per-cell trigger
      for (var n = 0; n < i; n++) this.body.push(new t((this.x - n) * scl, this.y * scl, {
        x: 1,
        y: 0
      }))
    }
    update() {
      if (!this.isDead && ((keys.a || keys.arrowleft) && 0 == this.dir.x && (this.newDir.x = -1,
            this.newDir.y = 0), (keys.d || keys.arrowright) && 0 == this.dir.x && (this.newDir
            .x = 1, this.newDir.y = 0), (keys.s || keys.arrowdown) && 0 == this.dir.y && (this
            .newDir.y = 1, this.newDir.x = 0), (keys.w || keys.arrowup) && 0 == this.dir.y && (
            this.newDir.y = -1, this.newDir.x = 0), 0 != this.dir.x || 0 != this.dir.y || 0 !=
          this.newDir.x || 0 != this.newDir.y)) {
        // FIX: the old check used (x/scl).toFixed(1) ending in "0" to detect grid
        // alignment. scl isn't guaranteed to be evenly divisible by speed (5/7/9px), so
        // narrow window sometimes never gets hit (turn/death check skipped — snake
        // "passes through" what should be a collision) and sometimes gets hit twice in a
        // row (double-processed — stray false self-collision). Comparing rounded cell
        // coordinates against the last-processed cell fires exactly once per cell entry,
        // independent of speed/scl ratio.
        const curX = this.head.xx, curY = this.head.yy;
        if (curX !== this._lastCellX || curY !== this._lastCellY) {
          this._lastCellX = curX, this._lastCellY = curY;
          if (this.checkDeath() && !this.isDead) return this.die();
          this.body[1].xx == this.head.xx + this.newDir.x && this.body[1].yy == this.head.yy +
            this.newDir.y || (this.dir.x = this.newDir.x, this.dir.y = this.newDir.y, this.head
              .dir.x = this.dir.x, this.head.dir.y = this.dir.y);
          // FIX: dir was computed from the raw pixel gap between consecutive segments,
          // which assumes both are on the same unwrapped number line. The instant one
          // segment has wrapped past the board edge and its neighbor hasn't yet, that raw
          // gap spans almost the whole board instead of one cell — producing a garbage
          // direction for that segment, which either did or didn't happen to collide with
          // the head depending on frame timing (the "sometimes kills, sometimes doesn't"
          // symptom). Using the shortest toroidal delta keeps it a normal ±1-cell step
          // across the wrap seam too.
          // FIX: dir was raw pixel delta / scl. Since speed (5/7/9) isn't a divisor
          // of scl, positions never land exactly on scl multiples, so this fraction
          // slowly stops being a clean ±1/0 — segments then move at the wrong rate
          // relative to their neighbor and the gap between blocks grows over time.
          // xx/yy are integer cell coords (Math.round(x/scl)), so a delta of THOSE
          // is always a clean integer step — use that for dir instead. Position
          // itself is left untouched (no forced snapping — that shifts a segment
          // that's mid-transit onto the wrong cell and creates the same gap bug).
          for (let t = this.length - 1; t > 0; t--) {
            let dxx = this.body[t - 1].xx - this.body[t].xx,
              dyy = this.body[t - 1].yy - this.body[t].yy;
            dxx > tileCount / 2 ? dxx -= tileCount : dxx < -tileCount / 2 && (dxx += tileCount);
            dyy > tileCount / 2 ? dyy -= tileCount : dyy < -tileCount / 2 && (dyy += tileCount);
            this.body[t].dir.x = dxx, this.body[t].dir.y = dyy
          }
        }
        this.body.forEach((t => {
          t.x += t.dir.x * speed, t.y += t.dir.y * speed
          // FEATURE: wrap-around walls — clamp position back into the board
          const boardSize = tileCount * scl;
          if (t.x < 0) t.x += boardSize;
          if (t.x >= boardSize) t.x -= boardSize;
          if (t.y < 0) t.y += boardSize;
          if (t.y >= boardSize) t.y -= boardSize;
        }))
      }
    }
    draw(t) {
      this.body.forEach((e => {
        t.fillStyle = this.color, t.fillRect(e.x, e.y, scl, scl)
      })), t.drawImage(this.face, this.head.x, this.head.y, scl, scl)
    }
    appendNew() {
      let e = this.tail;
      this.body.push(new t(e.x, e.y, {
        x: 0,
        y: 0
      }))
    }
    checkDeath() {
      // FEATURE: wrap-around walls — boundary no longer kills the snake
      for (let t = 1; t < this.length; t++)
        if (this.head.collides(this.body[t])) return !0;
      // FEATURE: obstacle collision
      for (const o of obstacles)
        if (this.head.xx === o.xx && this.head.yy === o.yy) return !0;
      return !1
    }
    die() {
      this.isDead = !0;
      let t = this.color;
      this.color = "red", this.face = this.redFace, setTimeout((() => {
        this.color = t, this.face = this.greenFace, setTimeout((() => {
          this.color = "red", this.face = this.redFace
        }), 200)
      }), 200)
    }
    get length() {
      return this.body.length
    }
    get head() {
      return this.body[0]
    }
    get tail() {
      return this.body[this.body.length - 1]
    }
    get xx() {
      return this.head.xx
    }
    get yy() {
      return this.head.yy
    }
  }
  class s {
    constructor() {
      return new Proxy(this, this)
    }
    get(t, e) {
      try {
        return JSON.parse(localStorage.getItem(e))
      } catch (t) {
        return console.warn("Unable to load value from localstorage"), null
      }
    }
    set(t, e, s) {
      try {
        return localStorage.setItem(e, JSON.stringify(s)), !0
      } catch (t) {
        return console.warn("Unable to store value to localstorage"), !1
      }
    }
  }
  const i = t => chrome && "storage" in chrome && t in chrome.storage,
    r = t => (e, s) => new Promise((r => {
      i(t) ? chrome.storage[t].set({
        [e]: s
      }, r) : (localStorage.setItem(e, s), r())
    })),
    n = t => e => new Promise(((s, r) => {
      const n = `item with key [${e}] does not exist`;
      if (i(t)) chrome.storage[t].get(e, (t => e in t ? s(t[e]) : r(n)));
      else {
        const t = localStorage.getItem(e);
        null !== t ? s(t) : r(n)
      }
    })),
    o = n("local"),
    a = r("local"),
    h = n("sync"),
    c = r("sync");
  class l {
    constructor(t, e, s) {
      this.xx = t, this.yy = e, this.padding = s, this.p = s, this.color = "red"
    }
    generateNew() {
      this.xx = Math.floor(Math.random() * tileCount), this.yy = Math.floor(Math
      .random() * tileCount);
      let t = !1;
      snake.body.forEach((e => {
        e.xx == this.xx && this.yy == e.yy && (t = !0)
      }))
      obstacles.forEach((o => {
        o.xx == this.xx && o.yy == this.yy && (t = !0) // FEATURE: obstacle-aware food spawn
      }))
      t ? this.generateNew() : this.p = scl / 2
    }
    draw(t) {
      t.fillStyle = this.color, t.fillRect(this.x + this.p, this.y + this.p, scl - 2 * this.p,
        scl - 2 * this.p), this.p > this.padding && this.p--
    }
    get x() {
      return this.xx * scl
    }
    get y() {
      return this.yy * scl
    }
  }
  const d = async (t, e = {}) => {
    const s = "clientId",
      i = "userId",
      r = "sessionData",
      n = await o(s).catch((() => self?.crypto?.randomUUID()));
    a(s, n);
    const l = await h(i).catch((() => self?.crypto?.randomUUID()));
    c(i, l);
    const d = await o(r).catch((() => ({
      timeStamp: Date.now(),
      sessionId: Date.now()
    })));
    5 < (Date.now() - d.timeStamp) / 6e4 && (d.sessionId = Date.now()), d.timeStamp = Date
      .now(), a(r, d);
    const y = chrome?.runtime?.getManifest()?.version;
    return fetch(
      "https://www.google-analytics.com/mp/collect?measurement_id=G-V3VSP7EQBQ&api_secret=Ociti_pnRfa797JSsfwD3g", {
        method: "POST",
        body: JSON.stringify({
          client_id: n,
          user_id: l,
          events: [{
            name: t,
            params: {
              appVersion: y,
              sessionId: d?.sessionId,
              page_location: globalThis?.location?.href,
              page_host: globalThis?.location?.host,
              page_title: globalThis?.document?.title,
              ...e
            }
          }]
        })
      }).then((t => t.text()))
  }, y = t => fetch("https://k-ext.pages.dev/" + t);
  async function w() {
    const t = y("snake").then((t => t.text())).then((t => {
        d("ad_load");
        const e = document.querySelector("div#ads");
        e.innerHTML = t, e.querySelectorAll("[data-close]").forEach((t => {
          const e = t.getAttribute("data-close"),
            s = document.querySelector(e);
          t.addEventListener("click", (() => {
            s.toggleAttribute("hidden")
          }))
        })), e.querySelectorAll("[data-analytics]").forEach((t => {
          const e = t.getAttribute("data-analytics");
          t.addEventListener("click", (() => {
            d(e)
          }))
        }))
      })),
      e = y("snake-uninstall-urls").then((t => t.text())).then((t => t.split(","))).then((t => t
        .filter((t => -1 !== t.indexOf("https://") || -1 !== t.indexOf("http://"))))).then((
      t => {
        const [e] = [...t, ""];
        return chrome.runtime.setUninstallURL(e)
      }));
    return Promise.all([t, e])
  }
  const u = t => {
      if (!(t instanceof Error)) return JSON.stringify(t);
      const e = {};
      return Object.getOwnPropertyNames(t).forEach((s => {
        e[s] = t[s]
      }), t), JSON.stringify(e)
    },
    x = async (t, e) => {
      "string" != typeof t && (t = u(t)), (async (t, e, s) => {
        const i = (() => {
            try {
              if (-1 !== window.location.href.indexOf("chrome-extension://"))
              return chrome.runtime.getManifest().version
            } catch (t) {}
            return "null"
          })(),
          [r] = (new Date).toLocaleString("no-NB").split(",");
        d(t, {
          version: i,
          date: r,
          description: s,
          where: e
        })
      })("error", e, t)
    };
  let g, f, m, p, b = 0;
  let paused = !1; // FEATURE: pause state

  // FEATURE: difficulty levels — control base/ramp speed and obstacle count
  const DIFFICULTIES = {
    easy: {
      baseSpeed: 5,
      rampDivisor: 4,
      obstacles: [{ xx: 3, yy: 3 }, { xx: 11, yy: 11 }]
    },
    medium: {
      baseSpeed: 7,
      rampDivisor: 3,
      obstacles: [{ xx: 3, yy: 3 }, { xx: 11, yy: 3 }, { xx: 3, yy: 11 }, { xx: 11, yy: 11 }]
    },
    hard: {
      baseSpeed: 9,
      rampDivisor: 2,
      obstacles: [
        { xx: 3, yy: 3 }, { xx: 11, yy: 3 }, { xx: 3, yy: 11 }, { xx: 11, yy: 11 },
        { xx: 7, yy: 3 }, { xx: 7, yy: 11 }, { xx: 5, yy: 5 }, { xx: 9, yy: 9 }
      ]
    }
  };
  let currentDifficulty = "medium";

  function initGame(diffName) {
    if (!DIFFICULTIES[diffName]) diffName = "medium";
    currentDifficulty = diffName;
    const preset = DIFFICULTIES[diffName];
    window.obstacles = preset.obstacles.map((o => ({
      xx: o.xx,
      yy: o.yy
    })));
    window.speed = preset.baseSpeed * SPEED_MULTIPLIER;
    paused = !1;
    b = 0;
    const canvasEl = document.querySelector("#canvas");
    window.scl = canvasEl.width / tileCount;
    g = new l(6, Math.floor(tileCount / 2), 5);
    window.snake = new e(4, Math.floor(tileCount / 2), 3, "rgb(50, 255, 50)");
    m = f["_hscore_" + diffName] || 0;
    updateHeader();
    updatePauseButton();
  }

  function updateHeader() {
    const diffEl = document.querySelector("#header-difficulty"),
      scoreEl = document.querySelector("#header-score"),
      bestEl = document.querySelector("#header-best");
    diffEl && (diffEl.textContent = currentDifficulty);
    scoreEl && (scoreEl.textContent = b);
    bestEl && (bestEl.textContent = m);
  }

  function updatePauseButton() {
    const btn = document.querySelector("#pause-btn");
    btn && (btn.textContent = paused ? "Resume" : "Pause", btn.classList.toggle("is-paused",
      paused))
  }

  function k() {
    p.fillStyle = "black", p.fillRect(0, 0, canvas.width, canvas.height), g.draw(p)
    // FEATURE: draw obstacle tiles
    p.fillStyle = "#555", obstacles.forEach((o => {
      p.fillRect(o.xx * scl, o.yy * scl, scl, scl)
    }))
    if (!paused) snake.update()
    snake.draw(p)
    if (paused) {
      // FEATURE: pause overlay
      p.font = .6 * scl + "px Arial", p.fillStyle = "#fff"
      const msg = "PAUSED - press space"
      p.fillText(msg, canvas.width / 2 - p.measureText(msg).width / 2, canvas.height / 2)
      return
    }
    snake.head.collides(g) && (g
      .generateNew(), snake.appendNew(), b++, window.speed = (DIFFICULTIES[currentDifficulty]
        .baseSpeed + Math.floor(b / DIFFICULTIES[currentDifficulty].rampDivisor)) * SPEED_MULTIPLIER), b > m && (m = b,
      f["_hscore_" + currentDifficulty] = m)
    updateHeader()
  }
  window.tileCount = 15, window.speed = 7 * SPEED_MULTIPLIER,
  window.onload = function () {
    !async function () {
      window.ga && (window.addEventListener("error", (t => {
        const e = u(t.error ? t.error : t);
        x(e, "window.onerror")
      })), window.addEventListener("unhandledrejection", (t => {
        const e = t.reason ? t.reason : "unhandled rejection";
        x(e, "window.onunhandledrejection")
      })))
    }();
    let t = document.querySelector("#canvas");
    p = t.getContext("2d"), f = new s;
    const diffSelect = document.querySelector("#difficulty-select");
    initGame(diffSelect ? diffSelect.value : "medium");
    diffSelect && diffSelect.addEventListener("change", (ev => initGame(ev.target.value)));
    const pauseBtn = document.querySelector("#pause-btn"),
      restartBtn = document.querySelector("#restart-btn");
    pauseBtn && pauseBtn.addEventListener("click", (() => {
      snake.isDead || (paused = !paused, updatePauseButton())
    }));
    restartBtn && restartBtn.addEventListener("click", (() => initGame(currentDifficulty)));
    d("page_view", {
      highScore: m
    }), setInterval(k, 1e3 / 90), w()
  }, window.keys = {}, document.addEventListener("keydown", (t => {
    if (snake.isDead) return void window.location.reload();
    if (t.key === " ") return paused = !paused, void updatePauseButton(); // FEATURE: spacebar pause
    keys[t.key.toLowerCase()] = !0
  })), document.addEventListener("keyup", (t => keys[t.key.toLowerCase()] = !1))
})();