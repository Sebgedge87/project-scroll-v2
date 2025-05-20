# 🧙‍♂️ Project Scroll – TTRPG Campaign Manager

Project Scroll is a scoped multiplayer campaign manager app for TTRPGs like D&D 5e. It is being built from the ground up to help a solo developer learn full-stack practices while solving a real problem for live group games.

---

## 📦 Tech Stack

- React (Vite)
- Tailwind CSS (dark UI)
- Firebase Auth + Firestore
- React Router v6
- Scoped architecture (pages, components, route folders)

---

## ✅ Completed (Week One + Most of Week Two)

- Project scaffolded with clean file structure
- Firebase Auth integrated with test login
- Game creation form and `gmId` tracking
- Auto-creates Session 1 when a game is made
- Joins users via code (`members/{userId}`)
- Dashboard filters by GM/member
- Sessions listed per game
- Session detail page routed and partially implemented

---

## 📁 File Structure (Confirmed)

- `src/pages/` — Page-level components
- `src/components/` — Reusable UI pieces
- `src/app/games/[gameId]/` — Game view route
- `src/app/games/[gameId]/sessions/[sessionId].jsx` — Session detail
- `src/stashed/` — Unused/out-of-scope features (notes, signup, etc.)

---

## 🧭 Active Task (Week Two)

- Finalise session view page
- Display player list from `games/{gameId}/members/{userId}`
- Add logout + auth UI
- GM vs Player role views

---

## 🚫 Out of Scope (Stashed)

- Notes system
- Inventory system
- Full auth UX
- Layout frameworks or styling abstractions

---