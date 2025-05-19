# 📖 Project Scroll – Developer Overview

Project Scroll is a scoped full-stack learning project focused on building a multiplayer TTRPG campaign assistant.

---

## 🧱 Core Features

- Game creation & listing
- Auto-generated session tracking
- Role-based multiplayer access
- Firebase-based real-time syncing

---

## 🗃️ File Structure

```
src/
├── pages/                 → High-level pages (dashboard, session views)
├── components/            → Reusable UI parts (forms, buttons)
├── app/games/[gameId]/    → Route-based GamePage
├── firebase/              → Firebase setup
├── AuthContext.jsx        → User context manager
```

---

## 🚦 Workflow Rules

- Follow roadmap (one week = one block of scoped features)
- No scope creep or optional features unless approved
- Write clear, scoped components
- Always revalidate new routes

---

## 🔥 Current Roadmap

See `README.md` or `project-scroll-roadmap.md` for full status.

This file is intended for onboarding and quick reference.