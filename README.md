# ✅ Week 1 – Project Scroll V2: Foundation & Scaffolding

> 🎯 **Goal:** Set up a clean, scalable base for a multi-user TTRPG app using Firebase, React, and Tailwind.  
> Focus on routing, Firestore structure, MVP game/session creation, and placeholder auth.

---

## 🧱 Project Setup

- [x] Scaffold new project with **Vite + React + Tailwind**
- [x] Initialise Git and push to **GitHub**
- [x] Set up file structure and remove boilerplate

---

## 🔄 Routing

- [x] Install and configure **React Router**
- [x] Add clean base routes:
  - `/dashboard` → Game list and creation
  - `/games/:gameId` → Single game page
- [x] Redirect `/` to `/dashboard`

---

## 🔥 Firebase Integration

- [x] Create Firebase project
- [x] Enable **Firestore**
- [x] Enable **Email/Password Auth**
- [x] Install Firebase SDK
- [x] Connect Firebase config to app
- [x] Create `firebase/config.js`
- [x] Test Firestore read with `getDocs()`
- [x] Enable **test rules** for development access

---

## 🎮 Game Creation Flow

- [x] Create form to enter:
  - Game Title
  - System (e.g. 5e)
  - Session Day
  - Session Time
- [x] On submit:
  - Add new doc to `games/` collection
  - Include `gmId: 'temp-user-123'` (placeholder)
- [x] Automatically create first session:
  - Path: `games/{gameId}/sessions/session-1`
  - Fields: `name`, `date`, `createdBy`, `noteCount: 0`

---

## 🧠 Current State

- ✅ Firestore is writing correctly
- ✅ Auto-session creation is working
- ✅ Structure matches long-term scalable design

---

## 🚧 Next Goals (choose one)

- [x] List games on the dashboard  
- [x] Build `/games/:gameId/sessions` view  
- [x] Add Firebase Auth (replace `temp-user-123`)  
- [ ] Add game members subcollection on join

---

