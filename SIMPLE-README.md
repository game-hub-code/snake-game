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

- **`background.js.map`** = ⚠️ this one is a leftover, and it's telling. It's a decoder file for something called `background.js` — but that actual file isn't included in this folder at all. When I looked inside this leftover file, it reveals that the *original* version of this game (wherever it was first built) included code for **fetching ads and tracking when someone uninstalls it** — the kind of thing you'd find in a browser add-on, not a plain game page. None of that ad/tracking code is present or running in what you have here — it's just an empty trace of it. Worth knowing in case you got this game from somewhere and want to understand what the "full" original version might have included.

- **`images/head.png`** = the picture of the snake's head while it's alive.

- **`images/redHead.png`** = the picture of the snake's head after it dies (turns red).

## The one-line summary

You only ever open `index.html`. `app.js` is the machine that runs the actual game. The two `.map` files aren't used while playing at all — they're just leftover technical notes, and one of them (`background.js.map`) hints that this game was originally part of something bigger (with ads/tracking) that isn't included in what you have.