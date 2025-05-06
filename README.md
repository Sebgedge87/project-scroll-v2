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

- [ ] Build SessionsPage and /sessions/:sessionId route
- [ ] Add role-based access: GM vs Player
- [ ] Restrict create/edit features to GM only
- [ ] Add real logout and register flow
- [ ] Filter shared resources (notes, inventory) by permissions
- [ ] Show player name in member list

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