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
        const curX = this.head.xx, curY = this.head.yy;
        if (curX !== this._lastCellX || curY !== this._lastCellY) {
          this._lastCellX = curX, this._lastCellY = curY;
          if (this.checkDeath() && !this.isDead) return this.die();
          this.body[1].xx == this.head.xx + this.newDir.x && this.body[1].yy == this.head.yy +
            this.newDir.y || (this.dir.x = this.newDir.x, this.dir.y = this.newDir.y, this.head
              .dir.x = this.dir.x, this.head.dir.y = this.dir.y);
          const boardSize = tileCount * scl;
          for (let t = this.length - 1; t > 0; t--) {
            let dx = this.body[t - 1].x - this.body[t].x,
              dy = this.body[t - 1].y - this.body[t].y;
            dx > boardSize / 2 ? dx -= boardSize : dx < -boardSize / 2 && (dx += boardSize);
            dy > boardSize / 2 ? dy -= boardSize : dy < -boardSize / 2 && (dy += boardSize);
            this.body[t].dir.x = dx / scl, this.body[t].dir.y = dy / scl
          }
        }
        this.body.forEach((t => {
          t.x += t.dir.x * speed, t.y += t.dir.y * speed
          const boardSize = tileCount * scl;
          if (t.x < 0) t.x += boardSize;
          if (t.x >= boardSize) t.x -= boardSize;
          if (t.y < 0) t.y += boardSize;
          if (t.y >= boardSize) t.y -= boardSize;
        }))
      }
    }
    draw(t) {
      // FIX: snap render position to the grid instead of drawing raw accumulated
      // x/y. x/y advance by `speed` px/frame, and speed (5/7/9) has no relation
      // to scl (viewport-derived), so raw pixels rarely land on n*scl — segments
      // rendered off-grid relative to food/obstacles (which always draw at exact
      // n*scl). Collision logic (xx/yy getters) already rounds, so this only
      // changes what's drawn, not game behavior.
      this.body.forEach((e => {
        const rx = Math.round(e.x / scl) * scl, ry = Math.round(e.y / scl) * scl;
        t.fillStyle = this.color, t.fillRect(rx, ry, scl, scl)
      }))
      const hx = Math.round(this.head.x / scl) * scl, hy = Math.round(this.head.y / scl) * scl;
      t.drawImage(this.face, hx, hy, scl, scl)
    }
    appendNew() {
      let e = this.tail;
      this.body.push(new t(e.x, e.y, {
        x: 0,
        y: 0
      }))
    }
    checkDeath() {
      for (let t = 1; t < this.length; t++)
        if (this.head.collides(this.body[t])) return !0;
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
        o.xx == this.xx && o.yy == this.yy && (t = !0)
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
    window.obstacles = preset.obstacles.map((o => ({
      xx: o.xx,
      yy: o.yy
    })));
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
    btn && (btn.textContent = paused ? "Resume" : "Pause", btn.classList.toggle("is-paused",
      paused))
  }

  function k() {
    p.fillStyle = "black", p.fillRect(0, 0, canvas.width, canvas.height), g.draw(p)
    p.fillStyle = "#555", obstacles.forEach((o => {
      p.fillRect(o.xx * scl, o.yy * scl, scl, scl)
    }))
    if (!paused) snake.update()
    snake.draw(p)
    if (paused) {
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
    setInterval(k, 1e3 / 90)
  }, window.keys = {}, document.addEventListener("keydown", (t => {
    if (snake.isDead) return void window.location.reload();
    if (t.key === " ") return paused = !paused, void updatePauseButton();
    keys[t.key.toLowerCase()] = !0
  })), document.addEventListener("keyup", (t => keys[t.key.toLowerCase()] = !1))
})();