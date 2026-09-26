# Snake Game — Plain-English Guide

A classic Snake game that runs in your web browser. Here's what's inside, explained without any coding terms.

## How to play it

1. Keep all files and the `images` folder together in one place.
2. Double-click `index.html`.
3. Pick a difficulty at the top (Easy / Medium / Hard), then use WASD or the arrow keys to steer. Press Space to pause.

## What each file is for

- **`index.html`** = the whole game screen. This is the only file you open. It's got the top bar (difficulty picker, your score, your best score, Pause and Restart buttons) and the game board itself.

- **`app.js`** = the entire game's brain, all packed into one file. Everything the game does — how fast the snake moves, when it dies, how food spawns, how your best score is remembered — lives in here. It's written in a very compressed, hard-to-read style (this is normal for finished games — think of it like a book printed with no spaces between words to save paper; it still works fine, it's just not meant for humans to casually read).

- **`app.js.map`** = a "decoder ring" for the file above. On its own it does nothing for the player — it's a technical helper that lets a developer un-compress `app.js` back into readable code if they need to fix or understand something inside it.

- **`images/head.png`** = the picture of the snake's head while it's alive.

- **`images/redHead.png`** = the picture of the snake's head after it dies (turns red).

## The one-line summary

You only ever open `index.html`. `app.js` is the machine that runs the actual game. The two `.map` files aren't used while playing at all — they're just leftover technical notes.