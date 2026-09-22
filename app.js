(() => {
  "use strict";
  const SPEED_MULTIPLIER = 1; // test: 0.5 = half speed, 2 = double speed, etc.
  const FRAME_RATE = 90; // matches setInterval(k, 1000/90) below

  class t {
    constructor(xx, yy) {
      this.xx = xx, this.yy = yy
    }
    collides(t) {
      return this.xx === t.xx && this.yy === t.yy
    }
  }

  class e {
    constructor(x, y, len, r) {
      this.color = r, this.body = [], this.dir = { x: 0, y: 0 }, this.newDir = { x: 0, y: 0 };
      this.greenFace = new Image, this.greenFace.src = "images/head.png";
      this.redFace = new Image, this.redFace.src = "images/redHead.png";
      this.face = this.greenFace;
      this._moveTimer = 0; // FEATURE(B): discrete per-cell tick accumulator
      this._framesPerMove = 1;
      for (let n = 0; n < len; n++) this.body.push(new t(x - n, y));
      this._prevBody = this.body.map((s => ({ xx: s.xx, yy: s.yy }))); // FEATURE: interpolation baseline
    }
    update() {
      if (this.isDead) return;
      // input: queue a turn (reject direct reversal against CURRENT dir here;
      // reversal-into-second-segment is re-checked at commit time below too,
      // since newDir may sit queued across several frames before a tick fires)
      if ((keys.a || keys.arrowleft) && this.dir.x === 0) this.newDir = { x: -1, y: 0 };
      if ((keys.d || keys.arrowright) && this.dir.x === 0) this.newDir = { x: 1, y: 0 };
      if ((keys.s || keys.arrowdown) && this.dir.y === 0) this.newDir = { x: 0, y: 1 };
      if ((keys.w || keys.arrowup) && this.dir.y === 0) this.newDir = { x: 0, y: -1 };

      if (this.dir.x === 0 && this.dir.y === 0 && this.newDir.x === 0 && this.newDir.y === 0) return;

      // FEATURE(B): only step once every framesPerMove frames — this is what
      // makes every rendered frame land exactly on a grid cell, since position
      // only ever changes in whole-cell increments.
      this._moveTimer++;
      const framesPerMove = Math.max(1, Math.round(FRAME_RATE / speed));
      this._framesPerMove = framesPerMove; // FEATURE: exposed for draw()-time interpolation alpha
      if (this._moveTimer < framesPerMove) return;
      this._moveTimer = 0;

      // commit queued turn unless it reverses directly into the 2nd segment
      const wouldReverse = this.body.length > 1 &&
        this.body[1].xx === this.head.xx + this.newDir.x &&
        this.body[1].yy === this.head.yy + this.newDir.y;
      if (!wouldReverse) this.dir = { x: this.newDir.x, y: this.newDir.y };

      if (this.dir.x === 0 && this.dir.y === 0) return;

      const nx = (this.head.xx + this.dir.x + tileCount) % tileCount;
      const ny = (this.head.yy + this.dir.y + tileCount) % tileCount;
      const willGrow = nx === g.xx && ny === g.yy;

      // death check: tail cell is excluded when not growing, since it vacates
      // this same tick (standard classic-Snake self-collision rule)
      const checkAgainst = willGrow ? this.body : this.body.slice(0, -1);
      for (const seg of checkAgainst) if (seg.xx === nx && seg.yy === ny) return this.die();
      for (const o of obstacles) if (o.xx === nx && o.yy === ny) return this.die();

      this._prevBody = this.body.map((s => ({ xx: s.xx, yy: s.yy }))); // FEATURE: snapshot before mutation
      this.body.unshift(new t(nx, ny));
      if (!willGrow) this.body.pop();
      else {
        g.generateNew();
        b++;
        window.speed = (DIFFICULTIES[currentDifficulty].baseSpeed +
          Math.floor(b / DIFFICULTIES[currentDifficulty].rampDivisor)) * SPEED_MULTIPLIER;
        if (b > m) m = b, f["_hscore_" + currentDifficulty] = m;
        updateHeader();
      }
    }
    draw(t) {
      // FEATURE: visual interpolation between the last two committed ticks.
      // Logic/collision stay exactly grid-based (unchanged); only the drawn
      // position glides between prevBody[i] (segment i's position before this
      // tick, or its own current position if it has no predecessor state —
      // e.g. a tail segment retained this tick by growth, which shouldn't move)
      // and body[i] (its authoritative current cell), using shortest-path delta
      // so a wrap-around edge doesn't sweep a segment across the whole board.
      const alpha = Math.min(1, this._moveTimer / this._framesPerMove);
      const renderPos = (i) => {
        const cur = this.body[i];
        const old = i < this._prevBody.length ? this._prevBody[i] : cur;
        let dx = cur.xx - old.xx, dy = cur.yy - old.yy;
        if (dx > tileCount / 2) dx -= tileCount; else if (dx < -tileCount / 2) dx += tileCount;
        if (dy > tileCount / 2) dy -= tileCount; else if (dy < -tileCount / 2) dy += tileCount;
        const fx = ((old.xx + dx * alpha) % tileCount + tileCount) % tileCount;
        const fy = ((old.yy + dy * alpha) % tileCount + tileCount) % tileCount;
        return { x: fx * scl, y: fy * scl };
      };
      this.body.forEach(((e, i) => {
        const pos = renderPos(i);
        t.fillStyle = this.color, t.fillRect(pos.x, pos.y, scl, scl)
      }));
      const headPos = renderPos(0);
      t.drawImage(this.face, headPos.x, headPos.y, scl, scl)
    }
    die() {
      this.isDead = !0;
      this._prevBody = this.body.map((s => ({ xx: s.xx, yy: s.yy }))); // freeze: no mid-interpolation death frame
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

  class l {
    constructor(t, e, s) {
      this.xx = t, this.yy = e, this.padding = s, this.p = s, this.color = "red"
    }
    generateNew() {
      this.xx = Math.floor(Math.random() * tileCount), this.yy = Math.floor(Math.random() * tileCount);
      let t = !1;
      snake.body.forEach((e => {
        e.xx == this.xx && this.yy == e.yy && (t = !0)
      }));
      obstacles.forEach((o => {
        o.xx == this.xx && o.yy == this.yy && (t = !0)
      }));
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

  let g, f, m, p, b = 0;
  let paused = !1;

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

  function resizeCanvas() {
    const canvasEl = document.querySelector("#canvas"),
      headerEl = document.querySelector("#header-row"),
      availW = window.innerWidth,
      availH = window.innerHeight - (headerEl ? headerEl.offsetHeight : 0);
    let size = Math.floor(Math.min(availW, availH) / tileCount) * tileCount;
    size = Math.max(size, tileCount * 10);
    canvasEl.width = size, canvasEl.height = size;
    canvasEl.style.width = size + "px", canvasEl.style.height = size + "px";
  }

  function initGame(diffName) {
    if (!DIFFICULTIES[diffName]) diffName = "medium";
    currentDifficulty = diffName;
    const preset = DIFFICULTIES[diffName];
    window.obstacles = preset.obstacles.map((o => ({ xx: o.xx, yy: o.yy })));
    window.speed = preset.baseSpeed * SPEED_MULTIPLIER;
    paused = !1;
    b = 0;
    resizeCanvas();
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
    btn && (btn.textContent = paused ? "Resume" : "Pause", btn.classList.toggle("is-paused", paused))
  }

  function k() {
    p.fillStyle = "black", p.fillRect(0, 0, canvas.width, canvas.height), g.draw(p);
    p.fillStyle = "#555", obstacles.forEach((o => {
      p.fillRect(o.xx * scl, o.yy * scl, scl, scl)
    }));
    if (!paused) snake.update();
    snake.draw(p);
    if (paused) {
      p.font = .6 * scl + "px Arial", p.fillStyle = "#fff";
      const msg = "PAUSED - press space";
      p.fillText(msg, canvas.width / 2 - p.measureText(msg).width / 2, canvas.height / 2);
      return
    }
    // NOTE: food-eat/score/speed-ramp logic now lives inside snake.update(),
    // since eating only happens on a movement tick, not every render frame.
    updateHeader()
  }

  window.tileCount = 15, window.speed = 7 * SPEED_MULTIPLIER,
  window.onload = function () {
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
    let resizeTimer;
    window.addEventListener("resize", (() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout((() => initGame(currentDifficulty)), 150);
    }));
    setInterval(k, 1e3 / FRAME_RATE)
  }, window.keys = {}, document.addEventListener("keydown", (t => {
    if (snake.isDead) return void window.location.reload();
    if (t.key === " ") return paused = !paused, void updatePauseButton();
    keys[t.key.toLowerCase()] = !0
  })), document.addEventListener("keyup", (t => keys[t.key.toLowerCase()] = !1))
})();