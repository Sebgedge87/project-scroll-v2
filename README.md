# 🧙‍♂️ Project Scroll – TTRPG Campaign Manager

Project Scroll is a focused, multi-user campaign manager for tabletop RPGs like D&D 5e. It is being built as a learning journey by a developer new to coding, using Firebase and React.

This app follows a strict development roadmap, one scoped feature at a time. Scope creep is **not permitted** unless a feature is broken or critically required.

---

## ⚙️ Tech Stack

- React (Vite)
- Tailwind CSS (dark mode)
- Firebase Auth & Firestore
- React Router v6

---

## ✅ Current Status (End of Week One)

- [x] Project scaffolded and routed
- [x] Firebase Auth integrated
- [x] Game creation with gmId
- [x] Auto-create Session 1
- [x] Session listing under each game
- [x] Dashboard filters by GM and joined games
- [x] Join Game via code
- [x] File structure refactored:
  - `pages/` for views
  - `components/` for UI
  - `app/games/[gameId]/` for game route

---

## 🚫 Scope Creep Detected

The following files are outside the approved roadmap and should be removed or stashed:

- `src/pages/SignUp.jsx`
- `src/pages/Login.jsx`
- `src/pages/NotesPage.jsx`
- `src/pages/InventoryPage.jsx`
- `src/pages/SessionDetailPage.jsx` (duplicate or misaligned)

---

## 📍 Next Step: Week Two

- [ ] Add session view at `/games/:gameId/sessions/:sessionId`
- [ ] Implement GM-only edit/delete logic
- [ ] Add logout and (if needed) real registration flow
- [ ] Prepare for session notes and shared tools

---

## 🧠 Bootstrap Prompt for GPT or Future Sessions

```markdown
Refer to this README for all project context and constraints.

⚠️ Do not introduce scope creep or extra features unless explicitly requested.
Only help with code that aligns to the structure and goals defined here.

Always validate against `project-scroll-roadmap.md`.
```

---

## 🗃 Directory Summary (Important)

- `src/pages/` — UI pages (Dashboard, SessionsPage)
- `src/components/` — reusable components (JoinGameForm)
- `src/app/games/[gameId]/` — nested game view route (GamePage)
- `src/firebase/config.js` — Firebase setup
- `src/AuthContext.jsx` — Auth wrapper and hook

---

---

## ⚙️ Developer Guidelines for AI Support

- Keep code modular and scoped
- Avoid scope creep unless it fixes a bug or adds core functionality
- Follow roadmap week-by-week
- Pages go in `src/pages/`
- Components go in `src/components/`
- Firebase Auth + Firestore are primary stack
- Tailwind for styling (dark UI theme)
- Minimise premature abstraction — refactor only when patterns emerge
- React Router v6 syntax

## 📅 Project Scroll – Weekly Development Roadmap
---

## ✅ Week One: Foundation & Scaffolding

### 🧱 Setup & Core Features

- [x] Scaffold project with Vite + React + Tailwind
- [x] Initialise Git and GitHub repo
- [x] Set up Firebase (Auth + Firestore)
- [x] Implement routing with React Router
- [x] Create Dashboard and GamePage structure

### 🔐 Authentication

- [x] Enable Firebase Email/Password Auth
- [x] Add login with hardcoded user (test@email.com)
- [x] Track current user globally via AuthContext
- [x] Save gmId when creating a game

### 🎮 Game Creation Flow

- [x] Create game with title, system, session day/time
- [x] Auto-create Session 1 under each game
- [x] List all games created by current user
- [x] Navigate to `/games/:gameId`

### 🧭 Game Data View

- [x] Fetch game details on GamePage
- [x] List sessions under each game
- [x] Display session names and dates

### 👥 Multiplayer Prep

- [x] Add “Join Game by Code” form
- [x] Create `members/{userId}` under game
- [x] Assign role: 'player'
- [x] Fetch and display all games where user is GM or player

### 🧹 Cleanup & Structure

- [x] Move `DashboardPage` to `src/pages/`
- [x] Move `JoinGameForm` to `src/components/`
- [x] Move `GamePage` to `src/pages/`

---

## ⏳ Week Two: User Access & Roles (Preview)

- [x] Build SessionsPage and /sessions/:sessionId route
- [x] Add role-based access: GM vs Player
- [x] Restrict create/edit features to GM only
- [x] Add real logout and register flow
- [ ] Filter shared resources (notes, inventory) by permissions
- [x] Show player name in member list

---

## 🔮 Week Three (Planned)

- [ ] Add shared inventory system
- [ ] Add rich text notes (TipTap or Markdown)
- [ ] Support per-session notes
- [ ] Add session creation UI
- [ ] Introduce campaign settings and editing

---

## 📌 Future Enhancements

- [ ] Realtime collaborative editing
- [ ] Puzzle generators, thieves’ cant, NPCs
- [ ] User profiles and avatars
- [ ] Game invite links with token
- [ ] Role-based dashboards