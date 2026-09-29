# 🐍 Snake Game — Presenter README & Judge Guide

> **Purpose:** This is a one-stop guide for a presenter who is not a programmer but needs to demonstrate and explain the Snake Game confidently to judges.
>
> The explanations use simple language first, followed by the important technical details. You do **not** need to memorize code. You need to understand what each part does and how the parts work together.

---

# 1. THE PROJECT IN ONE MINUTE

### What is this project?

This is a browser-based **Snake game**.

The player controls a snake with the keyboard. The snake moves around a square game board, eats food, gains points, and becomes longer. The player must avoid the snake's own body and the obstacles on the board.

The game has **Easy, Medium and Hard** difficulty levels. The levels change the starting speed and the number/positions of obstacles. The snake also becomes faster as the score increases.

The game remembers the best score for each difficulty on the same browser/device using `localStorage`.

### Simple answer for a judge

> “This is a browser-based Snake game made with HTML, CSS and JavaScript. HTML creates the page, CSS controls how it looks, and JavaScript contains the game logic. The game is drawn on an HTML Canvas. The player controls the snake, eats food to score and grow, avoids obstacles and its own body, and can choose between three difficulty levels. The browser also remembers the best score for each difficulty.”

---

# 2. WHAT THE PLAYER SEES

The page contains the main game area and controls around it.

The important visible parts are:

- Difficulty selector
- Current mode display
- Score display
- Best-score display
- Pause button
- Restart button
- Canvas containing the game board

The Canvas is the actual drawing area where the snake, food and obstacles appear.

---

# 3. HOW TO DEMONSTRATE THE GAME

A simple demonstration should follow this order:

### Step 1 — Introduce it

Say:

> “This is a Snake game where the player controls the snake, eats food to increase the score, grows longer, and tries not to collide with obstacles or its own body.”

### Step 2 — Show the controls

Use the keyboard to move the snake. Show that the game reacts to the player's input.

### Step 3 — Eat food

Move the snake into the red food. Point out that the score increases and the snake grows.

### Step 4 — Show increasing difficulty

Continue playing long enough for the snake to become faster.

### Step 5 — Show an obstacle

Move near an obstacle so the judge can see that obstacles are part of the game board.

### Step 6 — Show the difficulty selector

Switch between Easy, Medium and Hard and explain that the starting speed and obstacle layouts change.

### Step 7 — Show Pause

Pause the game and explain that the game can temporarily stop without restarting.

### Step 8 — Show Restart

Restart the game and explain that a fresh game begins.

### Step 9 — Show Best Score

Get a score, then explain that the browser can remember the best score for that difficulty.

---

# 4. THE PROJECT FILES

The important project structure is:

```text
Snake Game
│
├── index.html
├── app.js
├── app.js.map
│
└── images/
    ├── head.png
    └── redHead.png
```

There are also documentation files, but the most important files for the running game are:

```text
index.html
app.js
images/head.png
images/redHead.png
```

### The easiest way to remember the files

| File | Simple meaning |
|---|---|
| `index.html` | Builds the page and controls |
| `app.js` | Runs the game and contains the game logic |
| `head.png` | Snake-head image used during normal play |
| `redHead.png` | Snake-head image used for the dead/game-over state |
| `app.js.map` | Developer/source-map information for the JavaScript |

---

# 5. `index.html` — THE PAGE STRUCTURE

`index.html` is the page the browser opens.

It creates the visible structure of the game and loads the JavaScript.

One especially important line is:

```html
<script src="app.js"></script>
```

This tells the browser to load `app.js`, which contains the game behaviour.

### Judge question

**“Which file creates the webpage?”**

> “`index.html` creates the webpage structure and loads the JavaScript that makes the game work.”

---

# 6. THE HTML CONTROLS

The HTML provides the parts the player interacts with or watches.

These include the difficulty selector, mode information, score, best score, Pause button, Restart button and Canvas.

Think of HTML as the **skeleton of the page**. It tells the browser what objects should exist.

It does not contain the complete game logic.

---

# 7. CSS — HOW THE PAGE LOOKS

The project includes CSS styling in the page.

CSS controls things such as layout, spacing, borders, sizing, alignment and the visual appearance of controls.

A useful analogy is:

> **HTML = skeleton**
>
> **CSS = clothes and decoration**
>
> **JavaScript = brain**

### Judge question

**“Why do we need CSS if JavaScript already runs the game?”**

> “JavaScript controls the behaviour, while CSS controls how the webpage looks and is arranged.”

---

# 8. THE CANVAS

The game uses an **HTML Canvas**.

A Canvas is like a digital drawing board inside the webpage.

JavaScript can draw on it repeatedly.

The game uses the Canvas to display the game board, snake, food and obstacles.

### Judge question

**“Why use Canvas?”**

> “Canvas gives JavaScript a drawing surface where the game can repeatedly draw and update objects.”

---

# 9. `app.js` — THE BRAIN OF THE GAME

`app.js` contains the important game logic.

It handles things such as:

- starting the game,
- reading keyboard input,
- moving the snake,
- creating food,
- increasing the score,
- growing the snake,
- checking collisions,
- drawing the board,
- pausing,
- restarting,
- changing difficulty,
- updating speed,
- remembering high scores.

If `index.html` is the body of the webpage, `app.js` is the part doing most of the thinking.

---

# 10. `app.js.map` — WHAT IS IT?

`app.js.map` is a **source map**.

A source map helps developers connect bundled/minified JavaScript back to a more understandable source representation during debugging.

It is not the main file that runs the game.

### Important judge answer

> “`app.js` is the JavaScript used by the browser for the game. `app.js.map` is supporting developer information that can help map the bundled code back to source code.”

Do not say that the source map itself runs the game.

---

# 11. THE TWO IMAGE FILES

The project contains two PNG images:

```text
images/head.png
images/redHead.png
```

They are used for the snake's head in different states.

`head.png` represents the normal snake head.

`redHead.png` is used for the dead/game-over state.

The rest of the game can be drawn by JavaScript on the Canvas without requiring a separate image for every square.

---

# 12. HOW THE GAME THINKS ABOUT THE BOARD

The game uses a **15 × 15 grid**.

Imagine a chessboard, but instead of chess pieces there is a Snake game.

Each small square can be represented by a position such as:

```text
(x, y)
```

For example:

```text
(3, 3)
```

means one particular grid cell.

This grid-based design makes movement, food placement and collision detection much easier.

### Judge question

**“Why use a grid?”**

> “Snake naturally moves from one cell to another. A grid makes it easier to store positions and check whether two game objects occupy the same cell.”

---

# 13. THE SNAKE

The snake is represented as a collection of positions.

The first position represents the **head**. The other positions represent the body.

When the snake moves, its positions change so that the body follows the head.

When the snake eats food, the snake grows.

### Easy analogy

Imagine a line of people following the first person.

The first person is the head.

Everyone behind follows the position of the person in front.

That is similar to how the Snake's body follows its head.

---

# 14. MOVEMENT AND KEYBOARD INPUT

The player gives the game directions through the keyboard.

The JavaScript listens for keyboard events and changes the requested direction.

The game does not simply teleport the snake randomly. It keeps track of the current direction and then moves the snake through the grid.

### Why protect against immediate reversal?

A Snake game should not allow the snake to instantly turn directly into itself.

For example, if the snake is moving right, pressing left immediately would create a direct reverse direction.

The project contains logic to prevent invalid reverse-direction movement.

### Judge question

**“Why can't the player immediately turn the snake backwards?”**

> “Because the snake could immediately collide with its own body. The game prevents an immediate opposite-direction turn.”

---

# 15. FOOD

Food appears at a grid position.

The position is selected so that food can appear in different places instead of always appearing in the same location.

This makes every game less predictable.

When the snake reaches the food:

```text
food eaten
   ↓
score increases
   ↓
snake grows
   ↓
new food appears
```

The food also has a visual animation.

### Judge question

**“Why is the food placed randomly?”**

> “Random placement makes the game less predictable and gives the player a different target during gameplay.”

---

# 16. SCORE AND GROWTH

Eating food increases the player's score.

The snake also becomes longer.

This creates the main challenge of Snake:

> The player wants to eat more food to get a higher score, but the longer snake becomes harder to control safely.

The score is also used when calculating the increasing game speed.

---

# 17. THE THREE DIFFICULTIES

The game has three difficulty settings.

| Difficulty | Starting speed | Ramp divisor | Obstacles |
|---|---:|---:|---:|
| Easy | 5 | 4 | 2 |
| Medium | 7 | 3 | 4 |
| Hard | 9 | 2 | 8 |

### Easy

Easy starts slower and has fewer obstacles.

Its obstacle positions are:

```text
(3,3)
(11,11)
```

### Medium

Medium starts faster and has four obstacles:

```text
(3,3)
(11,3)
(3,11)
(11,11)
```

### Hard

Hard starts fastest and has eight obstacles:

```text
(3,3)
(11,3)
(3,11)
(11,11)
(7,3)
(7,11)
(5,5)
(9,9)
```

The important idea is simple:

> Easy gives the player more room. Hard gives the player less room and starts faster.

---

# 18. WHY DOES THE GAME GET FASTER?

The game does not keep exactly the same difficulty forever.

The speed increases as the score increases.

Conceptually, the calculation is:

```text
extra speed = floor(score / rampDivisor)

new speed = base speed + extra speed
```

For example, on Medium:

```text
base speed = 7
ramp divisor = 3
```

At score 0:

```text
floor(0 / 3) = 0
speed = 7
```

At score 3:

```text
floor(3 / 3) = 1
speed = 8
```

At score 6:

```text
floor(6 / 3) = 2
speed = 9
```

So the player has to react faster as the score gets higher.

### Why does Hard ramp faster?

Hard uses a smaller ramp divisor. That means the score reaches each additional speed step sooner.

---

# 19. WRAP-AROUND

The board supports wrap-around movement.

This means that moving past one edge can bring the snake back from the opposite side.

For example, conceptually:

```text
right edge → left edge
left edge → right edge
```

and similarly for the top and bottom.

A mathematical operation called **modulo** helps keep the position inside the board's range.

### Judge question

**“Does touching the edge always kill the snake?”**

> “No. The implementation supports wrap-around, so crossing an edge can bring the snake to the opposite side.”

---

# 20. COLLISION DETECTION

Collision detection is how the game decides whether the snake has hit something dangerous.

The important collision checks include:

### Snake hitting itself

The game checks whether the snake's head occupies a cell already occupied by its body.

### Snake hitting an obstacle

The game checks whether the head reaches an obstacle cell.

### Food collision

The game checks whether the snake's head reaches the food position.

These checks determine whether the game should:

- increase the score,
- grow the snake,
- continue playing,
- or end the game.

---

# 21. WHAT HAPPENS WHEN THE SNAKE DIES?

When a fatal collision occurs, the game enters its game-over/dead state.

The project also has a different red snake-head image for this state.

The important idea is:

```text
collision
   ↓
playing stops
   ↓
dead/game-over state
   ↓
player can restart
```

### Judge question

**“What causes the game to end?”**

> “A collision with the snake's own body or an obstacle causes the snake to die and the game to enter its game-over state.”

---

# 22. THE GAME LOOP

A game needs to repeatedly update and redraw itself.

The project uses a repeating JavaScript update/render process.

The configured frame rate is **90 checks/frames per second**.

An important detail is that the snake does not necessarily move one whole grid cell on every frame.

The project separates:

- how frequently the screen is updated,
- how frequently the snake commits a grid movement.

This gives the game more control over speed and smoothness.

---

# 23. WHY DOES THE SNAKE LOOK SMOOTH?

The game uses visual interpolation.

The actual game logic works on grid cells, but the drawing can visually move the snake between the previous and current positions.

Think of it like this:

```text
Grid logic:
cell 5 → cell 6

Visual drawing:
5.0 → 5.2 → 5.4 → 5.6 → 5.8 → 6.0
```

The player therefore sees smoother movement instead of only seeing sudden jumps between cells.

### Important distinction

The grid still controls the actual game logic. The smooth movement is mainly a visual presentation technique.

---

# 24. PAUSE AND RESTART

The game provides a Pause button and a Restart button.

### Pause

Pause temporarily stops gameplay so the player can take a break.

The game does not need to be recreated just to pause it.

### Restart

Restart begins a fresh game state.

A judge can therefore see that the game has controls beyond simply moving the snake.

---

# 25. RESPONSIVE CANVAS

The Canvas size is adjusted so that it works with the page layout and the 15 × 15 grid.

The project also handles window resizing.

A useful reason for using a Canvas size that works cleanly with the 15-cell grid is that each grid cell can be drawn consistently.

### Simple answer

> “The board is based on a 15-by-15 grid, so the drawing size is managed so that the grid cells fit the Canvas properly.”

---

# 26. HIGH SCORE — `localStorage`

The browser's `localStorage` is used to remember best scores.

Think of it as a small notebook kept by the browser for the website.

The project uses separate keys for the difficulty levels, including:

```text
_hscore_easy
_hscore_medium
_hscore_hard
```

So the best score is tracked separately for each difficulty.

### Is it an online database?

No.

The current implementation stores the score locally in the browser.

That means it is not a global leaderboard shared between different players/devices.

### Judge question

**“If I open the game on another computer, will I automatically see the same high score?”**

> “Not from this localStorage system. The score is stored locally in the browser/device rather than in a central online database.”

---

# 27. DOES THE PROJECT NEED A SERVER?

The main game does not need a backend server just to run the game and save its local high score.

The browser can execute the HTML, CSS and JavaScript and use localStorage.

If the project were changed to have a global leaderboard, accounts, online multiplayer or cloud-saved scores, a server/backend and database would become useful.

---

# 28. WHAT TECHNOLOGIES ARE USED?

| Technology | What it does |
|---|---|
| HTML | Creates the webpage structure |
| CSS | Controls appearance and layout |
| JavaScript | Controls the game logic |
| HTML Canvas | Draws the game board and objects |
| `localStorage` | Saves local best scores |
| PNG images | Provides snake-head graphics |
| Source map | Supports developer debugging/source mapping |

### Three words to remember

**HTML = structure**

**CSS = appearance**

**JavaScript = behaviour**

---

# 29. IMPORTANT JAVASCRIPT IDEAS

A judge may use programming words. These are the simple meanings.

### Variable

A named place where a program keeps information.

### Function

A reusable set of instructions.

### Object

A structure that groups related information and behaviour.

### Array

A list of values.

### Boolean

A value that is either `true` or `false`.

### Event

Something that happens, such as a keyboard press or button click.

### Event listener

Code that waits for an event and reacts to it.

### Class

A blueprint used to create objects.

### JSON

A text format commonly used to represent structured data.

### Modulo

An operation that gives the remainder after division. It is useful here for keeping wrapped positions inside the board range.

---

# 30. HOW THE WHOLE GAME WORKS TOGETHER

The easiest complete picture is:

```text
Browser opens index.html
        ↓
HTML creates the page
        ↓
app.js loads
        ↓
Game is initialized
        ↓
Snake + food + obstacles are created
        ↓
Keyboard/button events are listened for
        ↓
Game loop repeatedly updates and draws the Canvas
        ↓
Snake moves
        ↓
Collision checks happen
        ↓
If food is eaten → score increases + snake grows
        ↓
If speed changes → movement becomes faster
        ↓
If fatal collision → game over/dead state
        ↓
Restart can create a new game
```

This is the most important flow to understand.

---

# 31. THE FOOD FLOW

```text
Food has a grid position
        ↓
Snake moves toward it
        ↓
Head reaches food
        ↓
Score increases
        ↓
Snake grows
        ↓
New food position is selected
        ↓
Game continues
```

### Judge question

**“What happens internally when the snake eats food?”**

> “The game detects that the snake's head has reached the food position, increases the score, makes the snake longer, and places the food at a new position.”

---

# 32. THE DEATH FLOW

```text
Snake moves
   ↓
Collision check
   ↓
Head hits body or obstacle
   ↓
Game enters dead/game-over state
   ↓
Normal play stops
   ↓
Dead-state graphics can be shown
   ↓
Player can restart
```

---

# 33. COMMON JUDGE QUESTIONS

### Q1. What programming language is mainly responsible for the game?

> “JavaScript. HTML creates the structure and CSS controls appearance, while JavaScript handles the game behaviour.”

### Q2. Why is JavaScript needed?

> “Because the game needs changing behaviour: movement, keyboard input, scoring, collisions, timing and drawing updates.”

### Q3. What is Canvas?

> “It is a drawing area provided by the browser. JavaScript uses it to draw the game.”

### Q4. Why is the game grid-based?

> “Snake moves naturally from cell to cell, so a grid makes positions and collisions easier to manage.”

### Q5. How does the snake grow?

> “When it eats food, the game increases the score and adds length to the snake's body.”

### Q6. How does the game know the snake hit itself?

> “It compares the head's position with the positions occupied by the body.”

### Q7. How does the game know the snake hit an obstacle?

> “It checks whether the head occupies an obstacle's grid cell.”

### Q8. Why are there three difficulty levels?

> “They give the player different starting challenges. The speed and obstacle layouts change between Easy, Medium and Hard.”

### Q9. Why does the game become faster?

> “The implementation increases speed based on the score, making the game progressively more challenging.”

### Q10. What is the difference between frame rate and snake speed?

> “Frame rate controls how often the game updates/draws. Snake speed controls how often the snake advances through its grid movement. They are related but not the same thing.”

### Q11. Why does the game use localStorage?

> “To remember the player's best score in the browser without needing an online database.”

### Q12. Is the high score shared online?

> “No. The current implementation stores it locally in the browser.”

### Q13. Does the project need a database?

> “Not for its current local high-score system. A database would be useful if we wanted shared online scores or accounts.”

### Q14. Does it need a backend server?

> “Not for the main local game functionality.”

### Q15. Why are there two head images?

> “One represents the normal snake head and the other is used for the dead/game-over state.”

### Q16. What is `app.js.map`?

> “It is source-map information used by developers to help relate bundled JavaScript back to source code during debugging.”

### Q17. What happens if the player presses the opposite direction immediately?

> “The game has reverse-direction protection so the snake does not immediately turn directly into itself.”

### Q18. Does hitting the outer edge always end the game?

> “No. The implementation supports wrap-around, so the snake can cross an edge and appear on the opposite side.”

### Q19. Why is food random?

> “So the player does not always have the same target and each game can play differently.”

### Q20. How could the project be improved?

> “Possible future improvements could include sound effects, mobile touch controls, more game modes, more obstacle patterns, animations, a global leaderboard, or online multiplayer.”

---

# 34. EXTRA QUESTIONS A JUDGE MAY ASK

These are useful because they go slightly deeper without requiring the presenter to explain every line of code.

### Q21. Why not use an image for the whole game board?

> “The board changes constantly. Drawing the game objects on Canvas lets JavaScript update their positions dynamically.”

### Q22. Why not make every snake body segment a separate HTML element?

> “Canvas is well suited to a game where many objects need to be redrawn repeatedly in a fixed drawing area.”

### Q23. Why does the snake need a previous position for smooth movement?

> “The previous position allows the game to visually interpolate between grid positions, making movement look smoother.”

### Q24. What is randomization useful for besides food?

> “It can make game behaviour less predictable. In this project, food placement is one important use.”

### Q25. Why is Hard mode not simply called ‘faster mode’?

> “Because Hard changes more than starting speed. It also uses a different obstacle layout and a smaller speed-ramp divisor.”

### Q26. What would you need for a worldwide leaderboard?

> “A backend service and a database would normally be needed to receive, store and return scores for different players.”

### Q27. What would you need to make it work well on phones?

> “Touch controls or on-screen buttons would need to be added so the player could control direction without a physical keyboard.”

### Q28. What would you need to add sound?

> “Audio files and JavaScript logic to play sounds when events happen, such as eating food, pausing or losing.”

### Q29. Is Canvas itself a programming language?

> “No. Canvas is a browser feature/API that JavaScript can use as a drawing surface.”

### Q30. Is localStorage the same as a database?

> “No. localStorage is a small browser-based storage mechanism. A database is designed for larger structured data and is commonly used with a server.”

---

# 35. QUESTIONS ABOUT THE CODE

### “What is a class?”

> “A class is like a blueprint. It describes how objects of a certain type should be created and behave.”

### “What is an array?”

> “An array is a list. The snake can use a list of positions to represent its body.”

### “What is an object?”

> “An object groups related information together.”

### “What is a function?”

> “A function is a reusable group of instructions that performs a particular job.”

### “What is an event listener?”

> “It waits for something to happen, such as a keyboard press or button click, and then runs the appropriate code.”

### “What is `window.onload`?”

> “It lets code run after the webpage has loaded.”

### “What is `querySelector` used for?”

> “It lets JavaScript find an element in the webpage so the program can read or change it.”

### “What is `setTimeout` or timed execution used for?”

> “Timing functions let the program schedule work rather than trying to do everything at exactly the same instant.”

---

# 36. IF THE JUDGE ASKS “WHY WAS IT DESIGNED THIS WAY?”

A good general answer is:

> “The design separates the webpage structure, visual styling and game behaviour. HTML provides the controls and Canvas, CSS handles presentation, and JavaScript handles the changing game state. The grid makes movement and collision checks easier, while the game loop repeatedly updates the screen.”

This answer demonstrates understanding without pretending that every design choice was personally invented by the presenter.

---

# 37. IF THE JUDGE ASKS “WHAT IS THE MOST IMPORTANT PART?”

There is not one single line that makes the game work.

The important parts work together:

```text
HTML
  ↓
creates the page

CSS
  ↓
makes it look right

JavaScript
  ↓
controls the game

Canvas
  ↓
shows the changing game state

localStorage
  ↓
remembers local best scores
```

### Simple answer

> “The most important part is how these pieces work together: HTML provides the page, CSS provides the appearance, JavaScript provides the game logic, Canvas displays the game, and localStorage remembers the local best score.”

---

# 38. IF THE JUDGE ASKS “WHAT WOULD YOU IMPROVE?”

Good future improvements include:

- sound effects,
- touch/mobile controls,
- more obstacle patterns,
- additional game modes,
- more visual effects,
- a global online leaderboard,
- player accounts,
- online multiplayer.

A strong answer is:

> “The current game already covers the core Snake experience. If we continued developing it, I would focus on mobile controls, sound, more game modes and an online leaderboard.”

---

# 39. THE 30-SECOND PRESENTATION SCRIPT

> “This is a browser-based Snake game made using HTML, CSS and JavaScript. The player controls the snake, eats food to increase the score and grow longer, and avoids obstacles and its own body. The game uses an HTML Canvas to draw the board and JavaScript to control movement, collisions, scoring and timing. There are Easy, Medium and Hard modes, and the game becomes faster as the score increases. The browser also stores the best score for each difficulty locally.”

---

# 40. THE 2-MINUTE PRESENTATION SCRIPT

> “This project is a browser-based Snake game. The main technologies are HTML, CSS and JavaScript. HTML creates the webpage structure and controls, CSS handles the visual layout, and JavaScript contains the game logic.
>
> The actual game is displayed using an HTML Canvas. The board is based on a 15-by-15 grid, which makes it easier to represent positions and check collisions. The snake is stored as a collection of positions, with the first position representing the head and the remaining positions representing the body.
>
> The player controls the direction with the keyboard. The game prevents an immediate reverse direction because that could make the snake turn directly into itself. Food is placed on the grid, and when the snake reaches it, the score increases and the snake grows. A new food position is then selected.
>
> There are three difficulty levels: Easy, Medium and Hard. They have different starting speeds and obstacle layouts. The game also increases the snake's speed as the score gets higher, so the challenge grows during a game.
>
> The game checks collisions with the snake's own body and with obstacles. A fatal collision puts the game into its dead state. The project also supports pausing and restarting.
>
> Finally, the best scores are stored in browser localStorage. That means the current project can remember scores on the same browser/device without needing an online server or database.
>
> Overall, the project demonstrates how HTML, CSS, JavaScript, Canvas, game timing, keyboard events, collision detection and browser storage can work together to create an interactive game.”

---

# 41. QUICK CHEAT SHEET

If you forget everything else, remember these answers:

| Judge asks | Remember |
|---|---|
| What is it? | Browser-based Snake game |
| Main language? | JavaScript |
| HTML does what? | Page structure |
| CSS does what? | Appearance/layout |
| Canvas does what? | Draws the game |
| Snake movement? | Grid-based movement |
| Food? | Increases score and grows snake |
| Collision? | Body or obstacle can end the game |
| Difficulty? | Easy, Medium, Hard |
| Speed? | Increases as score increases |
| Edge? | Wrap-around is supported |
| Best score? | Browser `localStorage` |
| Online database? | No |
| Backend required? | Not for the current local game |
| `app.js`? | Main game logic |
| `index.html`? | Page structure |
| `app.js.map`? | Source-map/developer information |
| `head.png`? | Normal snake head graphic |
| `redHead.png`? | Dead-state snake head graphic |
| Why grid? | Easier movement and collision checking |
| Why Canvas? | Efficient repeated drawing of game objects |

---

# 42. FINAL RULE FOR THE PRESENTER

Do not try to sound like a programmer if you are not one.

Explain the project in your own simple words.

If a judge asks a technical question, start with the simple explanation and then give the technical term.

For example:

> “The Canvas is basically the game's digital drawing board. Technically, it is an HTML Canvas that JavaScript draws onto.”

That is better than trying to recite complicated code.

The goal of the presentation is to demonstrate that you understand **what the project does, how its major parts work together, and why those parts are used**.
