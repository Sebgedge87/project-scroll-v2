
# 🧙‍♂️ Project Scroll – TTRPG Campaign Manager

Project Scroll is a focused, multi-user campaign manager for tabletop RPGs like D&D 5e. This app is being built as both a real-world tool and a learning experience by a developer learning full-stack web development from the ground up.

This README includes the current status, development constraints, structure, audit results, and the official roadmap.

---

## 🎯 Purpose

- Help GMs and players manage campaigns, sessions, notes, and shared resources
- Real-time collaboration using Firebase
- Learn full-stack development using clean architecture and deliberate feature scope

---

## ⚙️ Tech Stack

- React (Vite)
- Tailwind CSS (dark UI)
- Firebase Auth & Firestore
- React Router v6
- Project structured in feature-based folders (`pages/`, `components/`, `app/`)

---

## 🔒 Scope Rules (Strict)

- ❌ No features added unless explicitly approved in the roadmap
- ✅ One scoped milestone at a time (weekly structure)
- ✅ All code must be modular, readable, and understandable
- ❌ No abstractions or refactors until patterns emerge
- ✅ Brutal honesty preferred — errors are fine, vague fluff is not

---

## 🧱 Architecture Summary

- `src/pages/` — Top-level pages (Dashboard, Sessions)
- `src/components/` — Reusable pieces like JoinGameForm
- `src/app/games/[gameId]/` — Route-based folders (GamePage and related)
- `firebase/config.js` — Firebase client setup
- `AuthContext.jsx` — Global user context and listener

---

## Test User Info

- Username: test@email.com
- PAssword: hunter2

---

## 📋 Week One Milestones (✅ Completed)

- [x] Project scaffolded with routing and Firebase
- [x] Auth: login using Email/Password, real gmId stored
- [x] Game creation form (title, system, session time/day)
- [x] Auto-creates Session 1 under each game
- [x] Session listing inside `/games/:gameId`
- [x] Join Game via code (adds user to `members/`)
- [x] Show games where user is GM *or* member
- [x] Move pages/components into modular structure

---

## 🧨 Audit Results (as of Week Two Kickoff)

### Files created out of scope:

- `src/pages/SignUp.jsx` ❌ Not planned
- `src/pages/Login.jsx` ❌ Redundant (we handled login inline)
- `src/pages/NotesPage.jsx` ❌ Premature — notes not approved yet
- `src/pages/InventoryPage.jsx` ❌ Part of Week 3
- `src/pages/SessionDetailPage.jsx` ❌ Duplicate of SessionsPage or untracked task

### ✅ Action: What to do with them

| File | Action |
|------|--------|
| `SignUp.jsx` / `Login.jsx` | 🔁 **Stash** these until a full auth flow is scoped |
| `NotesPage.jsx` / `InventoryPage.jsx` | ❌ **Remove** until Week 3 |
| `SessionDetailPage.jsx` | ✅ **Consolidate** with SessionsPage or rename if it's meant to replace it |

Ensure the following are fully working and tested:
- `DashboardPage` and `JoinGameForm`
- `GamePage` (in `src/app/games/[gameId]`)
- `SessionsPage` (connected to `/games/:gameId/sessions/:sessionId`)

---

## 📌 Next Required Cleanup (Week Two Start)

- [ ] Review and clean `/pages/` directory
- [ ] Remove or isolate unfinished features into `/stashed/`
- [ ] Confirm all routes still render properly post-refactor
- [ ] Write tests or console logs for session page links

---

## 🚀 Roadmap (Week-by-Week Progress)

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

